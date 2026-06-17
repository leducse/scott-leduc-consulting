export type RecurrenceFrequency = "monthly" | "yearly";

export interface SavedPurchase {
  id: string;
  itemName: string;
  cost: number;
  dateSaved: string;
  horizonYears: number;
  assetChoice?: string;
  isRecurring: boolean;
  recurrenceFrequency?: RecurrenceFrequency;
  targetDate?: string;
}

export interface TemptationInput {
  itemName: string;
  amount: number;
  isRecurring: boolean;
  frequency?: RecurrenceFrequency;
  targetDate: string;
}

export interface AssetBenchmark {
  id: string;
  name: string;
  annualRate: number;
  icon: string;
}

export const ASSET_BENCHMARKS: AssetBenchmark[] = [
  { id: "hys", name: "High-Yield Savings", annualRate: 0.04, icon: "🏦" },
  { id: "sp500", name: "S&P 500", annualRate: 0.1, icon: "📈" },
  { id: "tech", name: "Blue Chip Tech", annualRate: 0.14, icon: "💻" },
];

export const SP500 = ASSET_BENCHMARKS[1];

export const TIME_HORIZONS = [
  { years: 1, label: "Next Year" },
  { years: 5, label: "5 Years" },
  { years: 10, label: "10 Years" },
  { years: 18, label: "College Fund" },
] as const;

export function targetDateFromYears(years: number, from = new Date()): Date {
  const d = new Date(from);
  d.setFullYear(d.getFullYear() + years);
  return d;
}

export function yearsBetween(from: Date, to: Date): number {
  const days = (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24);
  return Math.max(days / 365.25, 1 / 365.25);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function amountLabel(purchase: SavedPurchase): string {
  if (purchase.isRecurring && purchase.recurrenceFrequency) {
    const short = purchase.recurrenceFrequency === "monthly" ? "mo" : "yr";
    return `${formatCurrency(purchase.cost)}/${short}`;
  }
  return formatCurrency(purchase.cost);
}

export function horizonDisplayLabel(purchase: SavedPurchase): string {
  if (purchase.targetDate) {
    return `by ${formatDate(purchase.targetDate)}`;
  }
  return `in ${purchase.horizonYears} yrs`;
}

export function projectionYears(purchase: SavedPurchase): number {
  if (purchase.targetDate) {
    return yearsBetween(new Date(purchase.dateSaved), new Date(purchase.targetDate));
  }
  return purchase.horizonYears;
}
