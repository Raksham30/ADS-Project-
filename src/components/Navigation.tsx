import { NavLink } from '@/components/NavLink';
import { BarChart3, Layout, TrendingUp } from 'lucide-react';

export const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 glass-card border-b">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold">iPhone Analytics Studio</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <NavLink
              to="/"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              activeClassName="!text-primary !bg-primary/10"
            >
              <Layout className="w-4 h-4" />
              <span className="font-medium">Overview</span>
            </NavLink>
            
            <NavLink
              to="/predictions"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              activeClassName="!text-primary !bg-primary/10"
            >
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">Predictions</span>
            </NavLink>
            
            <NavLink
              to="/compare"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              activeClassName="!text-primary !bg-primary/10"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="font-medium">Compare Models</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
