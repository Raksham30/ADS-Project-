import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { predictRevenue, predictPrice, getPredictionTrend } from '@/utils/predictions';
import { TrendingUp, DollarSign, Calendar, Sparkles } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  const [showResults, setShowResults] = useState(false);

  const years = Array.from({ length: 16 }, (_, i) => (2025 + i).toString());

  const handlePredict = () => {
    setShowResults(true);
  };

  const getResults = () => {
    const year = parseInt(selectedYear);
    if (predictionType === 'revenue') {
      return {
        value: predictRevenue(year, revenueType),
        label: `${revenueType === 'global' ? 'Global' : 'India'} iPhone Revenue`,
        unit: 'Crore INR'
      };
    } else {
      return {
        value: predictPrice(year, priceVariant),
        label: `iPhone ${priceVariant} Base Price`,
        unit: 'INR'
      };
    }
  };

  const getChartData = () => {
    if (predictionType === 'revenue') {
      const data = getPredictionTrend(parseInt(selectedYear), revenueType);
      return {
        labels: data.map(d => d.year.toString()),
        datasets: [
          {
            label: 'Historical Data',
            data: data.filter(d => !d.isPrediction).map(d => d.value),
            borderColor: 'rgb(0, 113, 227)',
            backgroundColor: 'rgba(0, 113, 227, 0.1)',
            fill: true,
            tension: 0.4,
          },
          {
            label: 'Predictions',
            data: [...Array(data.filter(d => !d.isPrediction).length - 1).fill(null), 
                   data.filter(d => !d.isPrediction)[data.filter(d => !d.isPrediction).length - 1].value,
                   ...data.filter(d => d.isPrediction).map(d => d.value)],
            borderColor: 'rgb(168, 85, 247)',
            backgroundColor: 'rgba(168, 85, 247, 0.1)',
            borderDash: [5, 5],
            fill: true,
            tension: 0.4,
          },
        ],
      };
    } else {
      const variants: Array<'Base' | 'Pro' | 'Pro Max'> = ['Base', 'Pro', 'Pro Max'];
      const currentYear = 2024;
      const targetYear = parseInt(selectedYear);
      const years = Array.from({ length: targetYear - currentYear + 1 }, (_, i) => currentYear + i);
      
      return {
        labels: years.map(y => y.toString()),
        datasets: variants.map((variant, idx) => ({
          label: `iPhone ${variant}`,
          data: years.map(year => predictPrice(year, variant)),
          borderColor: ['rgb(0, 113, 227)', 'rgb(168, 85, 247)', 'rgb(34, 197, 94)'][idx],
          backgroundColor: ['rgba(0, 113, 227, 0.1)', 'rgba(168, 85, 247, 0.1)', 'rgba(34, 197, 94, 0.1)'][idx],
          fill: true,
          tension: 0.4,
        })),
      };
    }
  };

  const results = showResults ? getResults() : null;
  const chartData = showResults ? getChartData() : null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
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

          {/* Prediction Controls */}
          <Card className="p-8 mb-8 border-border/50">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-3 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    Target Year
                  </Label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-primary" />
                    Prediction Type
                  </Label>
                  <Select value={predictionType} onValueChange={(v) => setPredictionType(v as 'revenue' | 'price')}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="revenue">Revenue Forecast</SelectItem>
                      <SelectItem value="price">Price Prediction</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Right Column - Conditional Options */}
              <div className="space-y-6">
                {predictionType === 'revenue' ? (
                  <div>
                    <Label className="text-base font-semibold mb-3">Market Region</Label>
                    <Select value={revenueType} onValueChange={(v) => setRevenueType(v as 'global' | 'india')}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="global">Global Market</SelectItem>
                        <SelectItem value="india">India Market</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground mt-2">
                      Select the geographic market for revenue predictions
                    </p>
                  </div>
                ) : (
                  <div>
                    <Label className="text-base font-semibold mb-3 flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-primary" />
                      iPhone Variant
                    </Label>
                    <Select value={priceVariant} onValueChange={(v) => setPriceVariant(v as 'Base' | 'Pro' | 'Pro Max')}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Base">Base Model</SelectItem>
                        <SelectItem value="Pro">Pro Model</SelectItem>
                        <SelectItem value="Pro Max">Pro Max Model</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground mt-2">
                      Choose the iPhone variant for price forecasting
                    </p>
                  </div>
                )}

                <Button 
                  onClick={handlePredict} 
                  className="w-full h-12 gradient-apple text-white border-0 hover:opacity-90 transition-opacity"
                  size="lg"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Prediction
                </Button>
              </div>
            </div>
          </Card>

          {/* Results Section */}
          {showResults && results && chartData && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Prediction Result Card */}
              <Card className="p-8 gradient-apple text-white border-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 mb-2">{results.label} in {selectedYear}</p>
                    <p className="text-5xl font-bold">
                      {predictionType === 'revenue' 
                        ? `₹${(results.value / 100000).toFixed(2)}L Cr`
                        : `₹${results.value.toLocaleString()}`
                      }
                    </p>
                    <p className="text-white/70 mt-2 text-sm">{results.unit}</p>
                  </div>
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    {predictionType === 'revenue' ? (
                      <TrendingUp className="w-10 h-10" />
                    ) : (
                      <DollarSign className="w-10 h-10" />
                    )}
                  </div>
                </div>
              </Card>

              {/* Chart */}
              <Card className="p-8 border-border/50">
                <h3 className="text-xl font-semibold mb-6">
                  {predictionType === 'revenue' ? 'Revenue Trend Analysis' : 'Price Evolution Forecast'}
                </h3>
                <div className="h-[400px]">
                  <Line
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top' as const,
                        },
                        tooltip: {
                          callbacks: {
                            label: function(context) {
                              let label = context.dataset.label || '';
                              if (label) {
                                label += ': ';
                              }
                              if (predictionType === 'revenue') {
                                label += '₹' + (context.parsed.y / 100000).toFixed(2) + 'L Cr';
                              } else {
                                label += '₹' + context.parsed.y.toLocaleString();
                              }
                              return label;
                            }
                          }
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: false,
                          ticks: {
                            callback: function(value) {
                              if (predictionType === 'revenue') {
                                return '₹' + (Number(value) / 100000).toFixed(1) + 'L';
                              } else {
                                return '₹' + (Number(value) / 1000).toFixed(0) + 'K';
                              }
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>
              </Card>

              {/* Insights */}
              <Card className="p-6 bg-muted/50 border-border/50">
                <h4 className="font-semibold mb-3 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-primary" />
                  Model Insights
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {predictionType === 'revenue' ? (
                    <>
                      <li>• Predictions based on linear regression with R&D growth factor correlation</li>
                      <li>• Historical data from 2015-2024 used for model training</li>
                      <li>• Growth acceleration factor of 8% year-over-year applied based on R&D trends</li>
                      <li>• Model accuracy improves with consistent R&D investment patterns</li>
                    </>
                  ) : (
                    <>
                      <li>• Price predictions use 3.5% annual growth rate accounting for inflation and premium positioning</li>
                      <li>• Base year pricing: Base (₹79,900), Pro (₹1,19,900), Pro Max (₹1,44,900)</li>
                      <li>• Apple's premium strategy maintains consistent price gaps between variants</li>
                      <li>• Predictions rounded to nearest ₹100 for market-realistic pricing</li>
                    </>
                  )}
                </ul>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Predictions;
