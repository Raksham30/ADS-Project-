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

  const [results, setResults] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const years = Array.from({ length: 16 }, (_, i) => (2025 + i).toString());

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
      setShowResults(true);
    } finally {
      setLoading(false);
    }
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

          <Card className="p-8 mb-8 border-border/50">
            <div className="grid md:grid-cols-2 gap-8">

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
                  </div>
                )}

                <Button
                  onClick={handlePredict}
                  className="w-full h-12 gradient-apple text-white border-0 transition-opacity"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Prediction
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {showResults && results && chartData && (
            <div className="space-y-8">

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
                    {predictionType === 'revenue' ? <TrendingUp className="w-10 h-10" /> : <DollarSign className="w-10 h-10" />}
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-border/50">
                <h3 className="text-xl font-semibold mb-6">
                  {predictionType === 'revenue' ? 'Revenue Trend Analysis' : 'Price Evolution Forecast'}
                </h3>
                <div className="h-[400px]">
                  <Line
                    data={{
                      labels: chartData.map((d: any) => d.year.toString()),
                      datasets: [
                        {
                          label: 'Predicted Trend',
                          data: chartData.map((d: any) => d.value),
                          borderColor: 'rgb(168, 85, 247)',
                          backgroundColor: 'rgba(168, 85, 247, 0.1)',
                          fill: true,
                          tension: 0.4,
                        },
                      ],
                    }}
                  />
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
