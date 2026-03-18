import type { User } from '@/types/index';

const USERS_STORAGE_KEY = 'spa_users';
const SESSION_STORAGE_KEY = 'spa_session';

// Simple hash function (for demo purposes - in production use proper server-side hashing)
const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

// Get all users
const getAllUsers = (): User[] => {
  try {
    const data = localStorage.getItem(USERS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
};

// Save users
const saveUsers = (users: User[]): void => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

// Check if email exists
export const emailExists = (email: string): boolean => {
  const users = getAllUsers();
  return users.some(user => user.email.toLowerCase() === email.toLowerCase());
};

// Register new user
export const registerUser = async (name: string, email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> => {
  try {
    // Validate inputs
    if (!name || !email || !password) {
      return { success: false, message: 'All fields are required' };
    }

    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' };
    }

    // Check if email already exists
    if (emailExists(email)) {
      return { success: false, message: 'Email already exists' };
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Get all users to determine role
    const users = getAllUsers();
    const isFirstUser = users.length === 0;

    // Create new user
    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      password: hashedPassword,
      role: isFirstUser ? 'admin' : 'user',
      createdAt: new Date().toISOString()
    };

    // Save user
    users.push(newUser);
    saveUsers(users);

    return {
      success: true,
      message: isFirstUser 
        ? 'Registration successful! You are the first user and have been granted admin privileges.' 
        : 'Registration successful!',
      user: { ...newUser, password: '' } // Don't return password
    };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'Registration failed. Please try again.' };
  }
};

// Login user
export const loginUser = async (email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> => {
  try {
    // Validate inputs
    if (!email || !password) {
      return { success: false, message: 'Email and password are required' };
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Find user
    const users = getAllUsers();
    const user = users.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === hashedPassword
    );

    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    // Create session
    const session = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));

    return {
      success: true,
      message: 'Login successful!',
      user: { ...user, password: '' } // Don't return password
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Login failed. Please try again.' };
  }
};

// Admin login
export const loginAdmin = async (email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> => {
  const result = await loginUser(email, password);
  
  if (result.success && result.user) {
    if (result.user.role !== 'admin') {
      // Clear session if not admin
      localStorage.removeItem(SESSION_STORAGE_KEY);
      return { success: false, message: 'Access denied. Admin privileges required.' };
    }
  }
  
  return result;
};

// Get current session
export const getCurrentSession = (): { userId: string; email: string; name: string; role: 'user' | 'admin' } | null => {
  try {
    const data = localStorage.getItem(SESSION_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading session:', error);
    return null;
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  const session = getCurrentSession();
  if (!session) return null;

  const users = getAllUsers();
  const user = users.find(u => u.id === session.userId);
  
  if (user) {
    return { ...user, password: '' }; // Don't return password
  }
  
  return null;
};

// Logout
export const logout = (): void => {
  localStorage.removeItem(SESSION_STORAGE_KEY);
};

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  return getCurrentSession() !== null;
};

// Check if user is admin
export const isAdmin = (): boolean => {
  const session = getCurrentSession();
  return session?.role === 'admin';
};

// Initialize admin user (for testing)
export const initializeAdminUser = async (): Promise<void> => {
  const users = getAllUsers();
  
  // Check if admin already exists
  const adminExists = users.some(u => u.email === 'admin@spa.com');
  
  if (!adminExists && users.length === 0) {
    // Create default admin
    const hashedPassword = await hashPassword('admin123');
    const adminUser: User = {
      id: crypto.randomUUID(),
      name: 'Admin',
      email: 'admin@spa.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date().toISOString()
    };
    
    users.push(adminUser);
    saveUsers(users);
  }
};
