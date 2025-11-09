import { financialData } from '@/data/iphoneData';

// Simple linear regression for revenue prediction
export function predictRevenue(year: number, type: 'global' | 'india'): number {
  const data = financialData.map(d => ({
    x: d.fiscalYear,
    y: type === 'global' ? d.globalRevenue : d.indiaRevenue
  }));

  // Calculate linear regression coefficients
  const n = data.length;
  const sumX = data.reduce((sum, point) => sum + point.x, 0);
  const sumY = data.reduce((sum, point) => sum + point.y, 0);
  const sumXY = data.reduce((sum, point) => sum + point.x * point.y, 0);
  const sumX2 = data.reduce((sum, point) => sum + point.x * point.x, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Add some growth acceleration factor based on R&D
  const avgRnDGrowth = 1.08; // 8% year-over-year growth
  const yearDiff = year - 2024;
  const growthFactor = Math.pow(avgRnDGrowth, yearDiff / 2);

  return Math.round((slope * year + intercept) * growthFactor);
}

// Predict iPhone prices based on historical trends and inflation
export function predictPrice(year: number, variant: 'Base' | 'Pro' | 'Pro Max'): number {
  const basePrices = {
    'Base': 79900,
    'Pro': 119900,
    'Pro Max': 144900
  };

  const baseYear = 2024;
  const yearDiff = year - baseYear;
  
  // Annual price increase rate (considering inflation + premium positioning)
  const priceGrowthRate = 1.035; // 3.5% year-over-year
  
  const predictedPrice = basePrices[variant] * Math.pow(priceGrowthRate, yearDiff);
  
  return Math.round(predictedPrice / 100) * 100; // Round to nearest 100
}

// Generate historical trend data for charts
export function getHistoricalTrend(type: 'revenue' | 'rnd'): Array<{ year: number; value: number }> {
  return financialData.map(d => ({
    year: d.fiscalYear,
    value: type === 'revenue' ? d.globalRevenue : d.globalRnD
  }));
}

// Generate prediction trend including historical + future
export function getPredictionTrend(
  targetYear: number,
  type: 'global' | 'india'
): Array<{ year: number; value: number; isPrediction: boolean }> {
  const historical = financialData.map(d => ({
    year: d.fiscalYear,
    value: type === 'global' ? d.globalRevenue : d.indiaRevenue,
    isPrediction: false
  }));

  const futureYears = Array.from(
    { length: targetYear - 2024 + 1 },
    (_, i) => 2025 + i
  );

  const predictions = futureYears.map(year => ({
    year,
    value: predictRevenue(year, type),
    isPrediction: true
  }));

  return [...historical, ...predictions];
}
