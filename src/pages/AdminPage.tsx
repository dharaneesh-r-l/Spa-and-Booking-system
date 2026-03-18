import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import AdminTable from '@/components/admin/AdminTable';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Admin <span className="gradient-text">Dashboard</span>
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage all spa and salon appointments
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="border-gold hover:bg-gold/10"
            >
              ← Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <AdminTable />
      </main>
    </div>
  );
};

export default AdminPage;
