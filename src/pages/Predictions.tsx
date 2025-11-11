import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useState, useEffect, useRef } from 'react';
import { predictRevenue, predictPrice, getPredictionTrend } from '@/utils/predictions';
import { TrendingUp, DollarSign, Calendar, Sparkles, Globe, MapPin, BarChart3, Tag, Activity, PieChart as PieChartIcon } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Predictions = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2030');
  const [predictionType, setPredictionType] = useState<'revenue' | 'price'>('revenue');
  const [revenueType, setRevenueType] = useState<'global' | 'india'>('global');
  const [priceVariant, setPriceVariant] = useState<'Base' | 'Pro' | 'Pro Max'>('Pro');

  const [results, setResults] = useState<{ value: number; label: string; unit: string } | null>(null);
  const [chartData, setChartData] = useState<{ year: number; value: number }[] | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chartKey, setChartKey] = useState(0);
  const [chartType, setChartType] = useState<'line' | 'pie' | 'bar'>('line');
  const resultsRef = useRef<HTMLDivElement>(null);

  const years = Array.from({ length: 16 }, (_, i) => (2025 + i).toString());

  useEffect(() => {
    if (showResults && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showResults]);

  const handlePredict = async () => {
    setLoading(true);
    const year = parseInt(selectedYear);

    try {
      if (predictionType === 'revenue') {
        const value = await predictRevenue(year, revenueType);
        setResults({
          value,
          label: `${revenueType === 'global' ? 'Global' : 'India'} iPhone Revenue`,
          unit: 'Crore INR'
        });
      } else {
        const value = await predictPrice(year, priceVariant);
        setResults({
          value,
          label: `iPhone ${priceVariant} Base Price`,
          unit: 'INR'
        });
      }

      const trend = await getPredictionTrend(year, revenueType);
      setChartData(trend);
      setChartKey(prev => prev + 1); // Force chart re-render for animation
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  };

  // Generate colors for charts
  const generateColors = (count: number) => {
    const colors = [
      'rgba(168, 85, 247, 0.8)', // Purple
      'rgba(59, 130, 246, 0.8)', // Blue
      'rgba(16, 185, 129, 0.8)', // Green
      'rgba(245, 158, 11, 0.8)', // Yellow
      'rgba(239, 68, 68, 0.8)',  // Red
      'rgba(236, 72, 153, 0.8)', // Pink
      'rgba(139, 92, 246, 0.8)', // Indigo
      'rgba(20, 184, 166, 0.8)', // Teal
    ];
    return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
  };

  // Chart configuration for line chart
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          font: {
            size: 14,
            weight: 'bold' as const,
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle' as const,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 13,
        },
        borderColor: 'rgba(168, 85, 247, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: { parsed: { y: number } }) {
            const value = context.parsed.y;
            if (predictionType === 'revenue') {
              return `Revenue: ₹${(value / 100000).toFixed(2)}L Cr`;
            } else {
              return `Price: ₹${value.toLocaleString()}`;
            }
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
            weight: 'normal' as const,
          },
          color: 'rgba(0, 0, 0, 0.7)',
        },
      },
      y: {
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
            weight: 'normal' as const,
          },
          color: 'rgba(0, 0, 0, 0.7)',
          callback: function(value: number | string) {
            const numValue = typeof value === 'string' ? parseFloat(value) : value;
            if (predictionType === 'revenue') {
              return `₹${(numValue / 100000).toFixed(1)}L`;
            } else {
              return `₹${(numValue / 1000).toFixed(0)}K`;
            }
          },
        },
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart' as const,
      delay: (context: { dataIndex: number }) => {
        return context.dataIndex * 50;
      },
    },
    elements: {
      point: {
        radius: 6,
        hoverRadius: 8,
        borderWidth: 3,
        hoverBorderWidth: 4,
      },
      line: {
        borderWidth: 3,
        tension: 0.4,
      },
    },
  };

  // Chart configuration for bar chart
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          font: {
            size: 14,
            weight: 'bold' as const,
          },
          padding: 20,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 13,
        },
        borderColor: 'rgba(168, 85, 247, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: { parsed: { y: number } }) {
            const value = context.parsed.y;
            if (predictionType === 'revenue') {
              return `Revenue: ₹${(value / 100000).toFixed(2)}L Cr`;
            } else {
              return `Price: ₹${value.toLocaleString()}`;
            }
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            weight: 'normal' as const,
          },
          color: 'rgba(0, 0, 0, 0.7)',
        },
      },
      y: {
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
            weight: 'normal' as const,
          },
          color: 'rgba(0, 0, 0, 0.7)',
          callback: function(value: number | string) {
            const numValue = typeof value === 'string' ? parseFloat(value) : value;
            if (predictionType === 'revenue') {
              return `₹${(numValue / 100000).toFixed(1)}L`;
            } else {
              return `₹${(numValue / 1000).toFixed(0)}K`;
            }
          },
        },
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart' as const,
    },
  };

  // Chart configuration for pie chart
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right' as const,
        labels: {
          font: {
            size: 12,
            weight: 'normal' as const,
          },
          padding: 15,
          usePointStyle: true,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 13,
        },
        borderColor: 'rgba(168, 85, 247, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: { label: string; parsed: number; chart: { data: { datasets: Array<{ data: unknown[] }> } } }) {
            const value = context.parsed;
            const dataset = context.chart.data.datasets[0];
            const dataArray = dataset.data as number[];
            const total = dataArray.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            if (predictionType === 'revenue') {
              return `${context.label}: ₹${(value / 100000).toFixed(2)}L Cr (${percentage}%)`;
            } else {
              return `${context.label}: ₹${value.toLocaleString()} (${percentage}%)`;
            }
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1500,
      easing: 'easeInOutQuart' as const,
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">

          <div className="mb-12 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">ML-Powered Forecasting</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Prediction Dashboard</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Generate accurate forecasts for iPhone revenue and pricing using advanced predictive models
            </p>
          </div>

          <div className="space-y-8 mb-8">
            {/* Prediction Type Selection */}
            <Card className="p-6 border-border/50 bg-gradient-to-br from-background to-muted/20">
              <div className="mb-6">
                <Label className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Prediction Type
                </Label>
                <p className="text-sm text-muted-foreground">Choose what you want to predict</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                    predictionType === 'revenue'
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setPredictionType('revenue')}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${
                        predictionType === 'revenue' ? 'bg-primary/10' : 'bg-muted'
                      }`}>
                        <TrendingUp className={`w-6 h-6 ${
                          predictionType === 'revenue' ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">Revenue Forecast</h3>
                        <p className="text-sm text-muted-foreground">
                          Predict future iPhone revenue trends
                        </p>
                      </div>
                      {predictionType === 'revenue' && (
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                    predictionType === 'price'
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setPredictionType('price')}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${
                        predictionType === 'price' ? 'bg-primary/10' : 'bg-muted'
                      }`}>
                        <Tag className={`w-6 h-6 ${
                          predictionType === 'price' ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">Price Prediction</h3>
                        <p className="text-sm text-muted-foreground">
                          Forecast iPhone pricing for future models
                        </p>
                      </div>
                      {predictionType === 'price' && (
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Card>

            {/* Target Year Selection */}
            <Card className="p-6 border-border/50 bg-gradient-to-br from-background to-muted/20">
              <div className="mb-6">
                <Label className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Target Year
                </Label>
                <p className="text-sm text-muted-foreground">Select the year for your prediction</p>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                {years.map(year => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 font-semibold ${
                      selectedYear === year
                        ? 'border-primary bg-primary text-primary-foreground shadow-md scale-105'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </Card>

            {/* Market Region / Variant Selection */}
            {predictionType === 'revenue' ? (
              <Card className="p-6 border-border/50 bg-gradient-to-br from-background to-muted/20">
                <div className="mb-6">
                  <Label className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Market Region
                  </Label>
                  <p className="text-sm text-muted-foreground">Choose the market for revenue prediction</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                      revenueType === 'global'
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setRevenueType('global')}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${
                          revenueType === 'global' ? 'bg-primary/10' : 'bg-muted'
                        }`}>
                          <Globe className={`w-6 h-6 ${
                            revenueType === 'global' ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">Global Market</h3>
                          <p className="text-sm text-muted-foreground">
                            Worldwide iPhone revenue
                          </p>
                        </div>
                        {revenueType === 'global' && (
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                      revenueType === 'india'
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setRevenueType('india')}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${
                          revenueType === 'india' ? 'bg-primary/10' : 'bg-muted'
                        }`}>
                          <MapPin className={`w-6 h-6 ${
                            revenueType === 'india' ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">India Market</h3>
                          <p className="text-sm text-muted-foreground">
                            India-specific iPhone revenue
                          </p>
                        </div>
                        {revenueType === 'india' && (
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Card>
            ) : (
              <Card className="p-6 border-border/50 bg-gradient-to-br from-background to-muted/20">
                <div className="mb-6">
                  <Label className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    iPhone Variant
                  </Label>
                  <p className="text-sm text-muted-foreground">Select the iPhone model variant</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(['Base', 'Pro', 'Pro Max'] as const).map(variant => (
                    <Card
                      key={variant}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                        priceVariant === variant
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setPriceVariant(variant)}
                    >
                      <CardContent className="p-6 text-center">
                        <div className={`inline-flex p-3 rounded-lg mb-3 ${
                          priceVariant === variant ? 'bg-primary/10' : 'bg-muted'
                        }`}>
                          <DollarSign className={`w-6 h-6 ${
                            priceVariant === variant ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{variant}</h3>
                        <p className="text-sm text-muted-foreground">
                          {variant === 'Base' ? 'Standard Model' : variant === 'Pro' ? 'Professional Model' : 'Premium Model'}
                        </p>
                        {priceVariant === variant && (
                          <div className="mt-3 flex justify-center">
                            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </Card>
            )}

            {/* Generate Button */}
            <Card className="p-6 border-border/50">
              <Button
                onClick={handlePredict}
                className="w-full h-14 gradient-apple text-white border-0 transition-all hover:shadow-lg hover:scale-[1.02] text-lg font-semibold"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Generating Prediction...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Prediction</span>
                  </div>
                )}
              </Button>
            </Card>
          </div>

          {showResults && results && chartData && (
            <div ref={resultsRef} className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              {/* Result Card with Animation */}
              <Card className="p-8 gradient-apple text-white border-0 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center justify-between">
                  <div className="animate-in fade-in slide-in-from-left-4 duration-1000 delay-200">
                    <p className="text-white/80 mb-2 text-lg">{results.label} in {selectedYear}</p>
                    <p className="text-5xl md:text-6xl font-bold animate-in fade-in zoom-in-95 duration-1000 delay-300">
                      {predictionType === 'revenue'
                        ? `₹${(results.value / 100000).toFixed(2)}L Cr`
                        : `₹${results.value.toLocaleString()}`
                      }
                    </p>
                    <p className="text-white/70 mt-2 text-sm">{results.unit}</p>
                  </div>
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-in fade-in zoom-in-95 duration-1000 delay-400 shadow-lg">
                    {predictionType === 'revenue' ? (
                      <TrendingUp className="w-10 h-10 animate-pulse" />
                    ) : (
                      <DollarSign className="w-10 h-10 animate-pulse" />
                    )}
                  </div>
                </div>
              </Card>

              {/* Chart Card with Enhanced Styling */}
              <Card className="p-8 border-border/50 shadow-xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                        <Activity className="w-6 h-6 text-primary animate-pulse" />
                        {predictionType === 'revenue' ? 'Revenue Trend Analysis' : 'Price Evolution Forecast'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Interactive forecast visualization with animated charts
                      </p>
                    </div>
                    {/* Chart Type Buttons */}
                    <div className="flex gap-2">
                      <Button
                        variant={chartType === 'pie' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          setChartType('pie');
                          setChartKey(prev => prev + 1);
                        }}
                        className={`transition-all ${
                          chartType === 'pie' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-primary/10'
                        }`}
                      >
                        <PieChartIcon className="w-4 h-4 mr-2" />
                        Pie Chart
                      </Button>
                      <Button
                        variant={chartType === 'bar' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          setChartType('bar');
                          setChartKey(prev => prev + 1);
                        }}
                        className={`transition-all ${
                          chartType === 'bar' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-primary/10'
                        }`}
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Bar Graph
                      </Button>
                      <Button
                        variant={chartType === 'line' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          setChartType('line');
                          setChartKey(prev => prev + 1);
                        }}
                        className={`transition-all ${
                          chartType === 'line' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-primary/10'
                        }`}
                      >
                        <Activity className="w-4 h-4 mr-2" />
                        Line Chart
                      </Button>
                    </div>
                  </div>
                  <div className="h-[450px] relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none z-10"></div>
                    {chartType === 'line' && (
                      <Line
                        key={chartKey}
                        data={{
                          labels: chartData.map((d: { year: number; value: number }) => d.year.toString()),
                          datasets: [
                            {
                              label: 'Predicted Trend',
                              data: chartData.map((d: { year: number; value: number }) => d.value),
                              borderColor: 'rgb(168, 85, 247)',
                              backgroundColor: (context: { chart: { ctx: CanvasRenderingContext2D } }) => {
                                const ctx = context.chart.ctx;
                                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                                gradient.addColorStop(0, 'rgba(168, 85, 247, 0.3)');
                                gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.15)');
                                gradient.addColorStop(1, 'rgba(168, 85, 247, 0.02)');
                                return gradient;
                              },
                              fill: true,
                              tension: 0.4,
                              pointBackgroundColor: 'rgb(168, 85, 247)',
                              pointBorderColor: '#ffffff',
                              pointHoverBackgroundColor: 'rgb(139, 69, 219)',
                              pointHoverBorderColor: '#ffffff',
                              pointHoverRadius: 8,
                              pointRadius: 6,
                              pointBorderWidth: 3,
                              pointHoverBorderWidth: 4,
                            },
                          ],
                        }}
                        options={lineChartOptions}
                      />
                    )}
                    {chartType === 'bar' && (
                      <Bar
                        key={chartKey}
                        data={{
                          labels: chartData.map((d: { year: number; value: number }) => d.year.toString()),
                          datasets: [
                            {
                              label: 'Predicted Trend',
                              data: chartData.map((d: { year: number; value: number }) => d.value),
                              backgroundColor: generateColors(chartData.length),
                              borderColor: chartData.map(() => 'rgba(255, 255, 255, 0.8)'),
                              borderWidth: 2,
                              borderRadius: 8,
                              borderSkipped: false,
                            },
                          ],
                        }}
                        options={barChartOptions}
                      />
                    )}
                    {chartType === 'pie' && (
                      <Pie
                        key={chartKey}
                        data={{
                          labels: chartData.map((d: { year: number; value: number }) => d.year.toString()),
                          datasets: [
                            {
                              label: 'Predicted Trend',
                              data: chartData.map((d: { year: number; value: number }) => d.value),
                              backgroundColor: generateColors(chartData.length),
                              borderColor: chartData.map(() => 'rgba(255, 255, 255, 0.8)'),
                              borderWidth: 2,
                            },
                          ],
                        }}
                        options={pieChartOptions}
                      />
                    )}
                  </div>
                  
                  {/* Chart Stats */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50 border border-border/50 animate-in fade-in slide-in-from-left-4 duration-700 delay-500">
                      <p className="text-sm text-muted-foreground mb-1">Starting Value</p>
                      <p className="text-lg font-semibold">
                        {predictionType === 'revenue'
                          ? `₹${(chartData[0]?.value / 100000).toFixed(2)}L Cr`
                          : `₹${chartData[0]?.value.toLocaleString()}`
                        }
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50 border border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600">
                      <p className="text-sm text-muted-foreground mb-1">Target Year Value</p>
                      <p className="text-lg font-semibold">
                        {predictionType === 'revenue'
                          ? `₹${(results.value / 100000).toFixed(2)}L Cr`
                          : `₹${results.value.toLocaleString()}`
                        }
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50 border border-border/50 animate-in fade-in slide-in-from-right-4 duration-700 delay-700">
                      <p className="text-sm text-muted-foreground mb-1">Growth Period</p>
                      <p className="text-lg font-semibold">
                        {chartData.length} Years
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Predictions;
