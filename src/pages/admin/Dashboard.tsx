import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import supabase from '@/lib/supabase';
import AdminSidebar from '@/components/admin/AdminSidebar';
import DashboardOverview from '@/components/admin/DashboardOverview';
import ContactsManager from '@/components/admin/ContactsManager';
import ServicesManager from '@/components/admin/ServicesManager';
import ProjectsManager from '@/components/admin/ProjectsManager';
import { LogOut, Shield } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/admin/login');
        return;
      }
      setUser(user);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/admin/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Déconnexion",
        description: "Vous avez été déconnecté avec succès",
      });
      navigate('/admin/login');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la déconnexion",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      <div className="relative flex flex-col h-screen">
        {/* Header */}
        <header className="border-b border-primary/20 bg-background/80 backdrop-blur-sm">
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Administration</h1>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </header>

        {/* Main Content with Sidebar */}
        <div className="flex flex-1 overflow-hidden">
          <AdminSidebar />
          
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route index element={<DashboardOverview />} />
              <Route path="messages" element={<ContactsManager />} />
              <Route path="services" element={<ServicesManager />} />
              <Route path="projects" element={<ProjectsManager />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;