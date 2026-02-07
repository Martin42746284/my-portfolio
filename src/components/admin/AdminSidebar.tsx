import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Mail, Settings, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminSidebar = () => {
  const navItems = [
    {
      title: 'Vue d\'ensemble',
      icon: LayoutDashboard,
      href: '/admin/dashboard',
    },
    {
      title: 'Messages',
      icon: Mail,
      href: '/admin/dashboard/messages',
    },
    {
      title: 'Services',
      icon: Settings,
      href: '/admin/dashboard/services',
    },
    {
      title: 'Projets',
      icon: FolderOpen,
      href: '/admin/dashboard/projects',
    },
  ];

  return (
    <aside className="w-64 border-r border-primary/20 bg-card/50 backdrop-blur-sm">
      <nav className="flex flex-col gap-2 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              end
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                  'hover:bg-primary/10',
                  isActive
                    ? 'bg-primary/20 text-primary font-medium'
                    : 'text-muted-foreground'
                )
              }
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
