import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, Plus, List } from 'lucide-react';
import { User } from '../App';

interface DashboardLayoutProps {
  currentUser: User;
  onLogout: () => void;
  children: ReactNode;
}

export function DashboardLayout({ currentUser, onLogout, children }: DashboardLayoutProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div>
                <h1 className="text-white">Todos Error</h1>
              </div>
              
              <div className="flex gap-2">
                <Link
                  to="/add"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive('/add')
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700/50'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  Add Error
                </Link>
                
                <Link
                  to="/todos"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive('/todos')
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700/50'
                  }`}
                >
                  <List className="w-4 h-4" />
                  View Errors
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white">{currentUser.name}</p>
                <p className="text-slate-400 text-xs">{currentUser.email}</p>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
