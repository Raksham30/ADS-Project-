// src/utils/predictions.ts

// Predict Revenue using Backend ML Model
export async function predictRevenue(year: number, region: "global" | "india") {

  // Set different R&D values for global vs India
  const rnd = region === "global" ? 200000 : 1200;

  const res = await fetch("http://127.0.0.1:5000/predict-revenue", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ year, rnd })
  });

  const data = await res.json();
  return data.predictedRevenue;
}

// Predict Price using Backend ML Model
export async function predictPrice(year: number, variant: "Base" | "Pro" | "Pro Max") {
  const res = await fetch("http://127.0.0.1:5000/predict-price", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ year, variant })
  });

  const data = await res.json();
  return data.predictedPrice;
}


// Generate prediction trend for charts (no historical data here)
// Because your UI already shows historical data separately
export async function getPredictionTrend(targetYear: number, region: "global" | "india") {
  const currentYear = 2024;
  const years = Array.from({ length: targetYear - currentYear + 1 }, (_, i) => currentYear + i);

  const rnd = region === "global" ? 200000 : 1200;

  const values = await Promise.all(
    years.map(async (year) => {
      const res = await fetch("http://127.0.0.1:5000/predict-revenue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year, rnd })
      });
      const data = await res.json();
      return {
        year,
        value: data.predictedRevenue,
        isPrediction: true
      };
    })
  );

  return values;
}

