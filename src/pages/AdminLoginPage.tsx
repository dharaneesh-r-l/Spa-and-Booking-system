import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface AdminLoginFormData {
  email: string;
  password: string;
}

const AdminLoginPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const form = useForm<AdminLoginFormData>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: AdminLoginFormData) => {
    setIsSubmitting(true);

    try {
      const result = await adminLogin(data.email, data.password);

      if (result.success) {
        toast.success('Admin login successful!');
        navigate('/admin', { replace: true });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Admin login error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-foreground via-secondary to-muted p-4">
      <div className="w-full max-w-md">
        <Card className="border-2 border-gold shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Badge className="bg-gold text-gold-foreground text-sm px-3 py-1">
                ADMIN ACCESS
              </Badge>
            </div>
            <CardTitle className="text-3xl font-bold">
              Admin <span className="gradient-text">Portal</span>
            </CardTitle>
            <CardDescription className="text-base">
              Restricted access for administrators only
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Email field */}
                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Admin Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="admin@spa.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password field */}
                <FormField
                  control={form.control}
                  name="password"
                  rules={{ required: 'Password is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Admin Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter admin password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit button */}
                <Button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold/90 text-gold-foreground py-6 text-lg font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Verifying...' : 'Admin Sign In'}
                </Button>
              </form>
            </Form>

            {/* Info box */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                This portal is for authorized administrators only. Unauthorized access attempts will be logged.
              </p>
            </div>

            {/* Back link */}
            <div className="mt-4 text-center">
              <Link to="/" className="text-sm text-primary hover:underline">
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLoginPage;
