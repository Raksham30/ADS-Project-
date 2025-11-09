import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, BarChart3, TrendingUp, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { financialData } from '@/data/iphoneData';

const Index = () => {
  const latestData = financialData[financialData.length - 1];
  const revenueGrowth = ((latestData.globalRevenue - financialData[financialData.length - 2].globalRevenue) / financialData[financialData.length - 2].globalRevenue * 100).toFixed(1);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-premium opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,113,227,0.15),transparent_50%)]" />
        
        <div className="relative container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 backdrop-blur-sm border border-primary/20">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">ML-Powered Analytics Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              iPhone Analytics
              <span className="block text-gradient mt-2">Prediction Studio</span>
            </h1>
            
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Forecast future iPhone sales revenue and pricing using advanced machine learning models trained on historical performance, R&D investments, and market trends.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/predictions">
                <Button size="lg" className="gradient-apple text-white border-0 hover:opacity-90 transition-opacity">
                  Start Predicting
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/compare">
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
                  Compare Models
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto -mt-12">
          <Card className="p-6 glass-card border-border/50 hover:border-primary/50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Global Revenue</p>
                <p className="text-2xl font-bold">₹{(latestData.globalRevenue / 100000).toFixed(1)}L Cr</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass-card border-border/50 hover:border-primary/50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-green-500/10">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">YoY Growth</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">+{revenueGrowth}%</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass-card border-border/50 hover:border-primary/50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-purple-500/10">
                <Smartphone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">R&D Investment</p>
                <p className="text-2xl font-bold">₹{(latestData.globalRnD / 10000).toFixed(0)}K Cr</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Analytics Features</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive tools to analyze, predict, and compare iPhone performance metrics
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-border/50 hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Revenue Forecasting</h3>
              <p className="text-muted-foreground mb-4">
                Predict global and India-specific iPhone sales revenue from 2025 to 2040 using linear regression models enhanced with R&D growth factors.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                  Historical trend analysis
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                  R&D investment correlation
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                  Interactive visualization
                </li>
              </ul>
            </Card>

            <Card className="p-8 border-border/50 hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Price Prediction</h3>
              <p className="text-muted-foreground mb-4">
                Forecast future iPhone pricing for Base, Pro, and Pro Max models based on historical pricing patterns and market positioning strategy.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2" />
                  Multi-variant predictions
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2" />
                  Inflation-adjusted models
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2" />
                  Premium positioning insights
                </li>
              </ul>
            </Card>

            <Card className="p-8 border-border/50 hover:border-primary/50 transition-all hover:shadow-lg md:col-span-2">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Model Comparison</h3>
              <p className="text-muted-foreground mb-4">
                Compare specifications, pricing, and features across all iPhone models with advanced filtering and sorting capabilities.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                  Filter by variant & year
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                  Sort by price & rating
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                  Detailed specifications
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16 mb-16">
        <Card className="p-12 gradient-apple text-center text-white border-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Explore iPhone Analytics?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Start making data-driven predictions about Apple's future product performance
          </p>
          <Link to="/predictions">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Launch Prediction Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </Card>
      </section>
    </div>
  );
};

export default Index;
