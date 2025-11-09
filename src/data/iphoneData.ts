export interface FinancialData {
  fiscalYear: number;
  globalRnD: number; // Crore INR
  globalRevenue: number; // Crore INR
  indiaRevenue: number; // Crore INR
  majorModels: string[];
}

export interface iPhoneModel {
  name: string;
  variant: 'Base' | 'Pro' | 'Pro Max';
  storage: string[];
  colors: string[];
  rating: number;
  basePrice: number;
  discount: number;
  releaseYear: number;
}

export const financialData: FinancialData[] = [
  { fiscalYear: 2015, globalRnD: 64000, globalRevenue: 1200000, indiaRevenue: 12000, majorModels: ['iPhone 6s', 'iPhone 6s Plus'] },
  { fiscalYear: 2016, globalRnD: 72000, globalRevenue: 1360000, indiaRevenue: 16000, majorModels: ['iPhone 7', 'iPhone 7 Plus'] },
  { fiscalYear: 2017, globalRnD: 88000, globalRevenue: 1410000, indiaRevenue: 22000, majorModels: ['iPhone 8', 'iPhone X'] },
  { fiscalYear: 2018, globalRnD: 96000, globalRevenue: 1640000, indiaRevenue: 28000, majorModels: ['iPhone XS', 'iPhone XR'] },
  { fiscalYear: 2019, globalRnD: 112000, globalRevenue: 1420000, indiaRevenue: 24000, majorModels: ['iPhone 11', 'iPhone 11 Pro'] },
  { fiscalYear: 2020, globalRnD: 128000, globalRevenue: 1370000, indiaRevenue: 26000, majorModels: ['iPhone 12', 'iPhone 12 Pro'] },
  { fiscalYear: 2021, globalRnD: 144000, globalRevenue: 1920000, indiaRevenue: 42000, majorModels: ['iPhone 13', 'iPhone 13 Pro'] },
  { fiscalYear: 2022, globalRnD: 168000, globalRevenue: 2050000, indiaRevenue: 52000, majorModels: ['iPhone 14', 'iPhone 14 Pro'] },
  { fiscalYear: 2023, globalRnD: 192000, globalRevenue: 2000000, indiaRevenue: 58000, majorModels: ['iPhone 15', 'iPhone 15 Pro'] },
  { fiscalYear: 2024, globalRnD: 208000, globalRevenue: 2100000, indiaRevenue: 68000, majorModels: ['iPhone 16', 'iPhone 16 Pro'] },
];

export const iPhoneModels: iPhoneModel[] = [
  { name: 'iPhone 16', variant: 'Base', storage: ['128GB', '256GB', '512GB'], colors: ['Black', 'White', 'Pink', 'Teal', 'Ultramarine'], rating: 4.7, basePrice: 79900, discount: 5, releaseYear: 2024 },
  { name: 'iPhone 16 Plus', variant: 'Base', storage: ['128GB', '256GB', '512GB'], colors: ['Black', 'White', 'Pink', 'Teal', 'Ultramarine'], rating: 4.7, basePrice: 89900, discount: 5, releaseYear: 2024 },
  { name: 'iPhone 16 Pro', variant: 'Pro', storage: ['128GB', '256GB', '512GB', '1TB'], colors: ['Black Titanium', 'White Titanium', 'Natural Titanium', 'Desert Titanium'], rating: 4.8, basePrice: 119900, discount: 3, releaseYear: 2024 },
  { name: 'iPhone 16 Pro Max', variant: 'Pro Max', storage: ['256GB', '512GB', '1TB'], colors: ['Black Titanium', 'White Titanium', 'Natural Titanium', 'Desert Titanium'], rating: 4.9, basePrice: 144900, discount: 3, releaseYear: 2024 },
  { name: 'iPhone 15', variant: 'Base', storage: ['128GB', '256GB', '512GB'], colors: ['Black', 'Blue', 'Green', 'Yellow', 'Pink'], rating: 4.6, basePrice: 69900, discount: 12, releaseYear: 2023 },
  { name: 'iPhone 15 Plus', variant: 'Base', storage: ['128GB', '256GB', '512GB'], colors: ['Black', 'Blue', 'Green', 'Yellow', 'Pink'], rating: 4.6, basePrice: 79900, discount: 12, releaseYear: 2023 },
  { name: 'iPhone 15 Pro', variant: 'Pro', storage: ['128GB', '256GB', '512GB', '1TB'], colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'], rating: 4.8, basePrice: 109900, discount: 8, releaseYear: 2023 },
  { name: 'iPhone 15 Pro Max', variant: 'Pro Max', storage: ['256GB', '512GB', '1TB'], colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'], rating: 4.9, basePrice: 134900, discount: 8, releaseYear: 2023 },
  { name: 'iPhone 14', variant: 'Base', storage: ['128GB', '256GB', '512GB'], colors: ['Midnight', 'Purple', 'Starlight', 'Blue', 'Red'], rating: 4.5, basePrice: 59900, discount: 18, releaseYear: 2022 },
  { name: 'iPhone 14 Plus', variant: 'Base', storage: ['128GB', '256GB', '512GB'], colors: ['Midnight', 'Purple', 'Starlight', 'Blue', 'Red'], rating: 4.5, basePrice: 69900, discount: 18, releaseYear: 2022 },
  { name: 'iPhone 14 Pro', variant: 'Pro', storage: ['128GB', '256GB', '512GB', '1TB'], colors: ['Space Black', 'Silver', 'Gold', 'Deep Purple'], rating: 4.7, basePrice: 99900, discount: 15, releaseYear: 2022 },
  { name: 'iPhone 14 Pro Max', variant: 'Pro Max', storage: ['128GB', '256GB', '512GB', '1TB'], colors: ['Space Black', 'Silver', 'Gold', 'Deep Purple'], rating: 4.8, basePrice: 119900, discount: 15, releaseYear: 2022 },
  { name: 'iPhone 13', variant: 'Base', storage: ['128GB', '256GB', '512GB'], colors: ['Starlight', 'Midnight', 'Blue', 'Pink', 'Red'], rating: 4.5, basePrice: 49900, discount: 22, releaseYear: 2021 },
  { name: 'iPhone 13 Pro', variant: 'Pro', storage: ['128GB', '256GB', '512GB', '1TB'], colors: ['Graphite', 'Gold', 'Silver', 'Sierra Blue'], rating: 4.7, basePrice: 89900, discount: 20, releaseYear: 2021 },
  { name: 'iPhone 13 Pro Max', variant: 'Pro Max', storage: ['128GB', '256GB', '512GB', '1TB'], colors: ['Graphite', 'Gold', 'Silver', 'Sierra Blue'], rating: 4.8, basePrice: 109900, discount: 20, releaseYear: 2021 },
];
