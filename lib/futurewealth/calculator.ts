import type {
  AssetBenchmark,
  RecurrenceFrequency,
  SavedPurchase,
  TemptationInput,
} from "./types";
import { SP500, projectionYears, yearsBetween } from "./types";

export function calculateFutureValue(
  presentValue: number,
  rate: number,
  years: number
): number {
  return presentValue * Math.pow(1 + rate, years);
}

export function futureValueOfAnnuity(
  payment: number,
  annualRate: number,
  years: number,
  periodsPerYear: number
): number {
  const periods = Math.max(1, Math.round(years * periodsPerYear));
  const ratePerPeriod = Math.pow(1 + annualRate, 1 / periodsPerYear) - 1;
  if (ratePerPeriod <= 0) return payment * periods;
  return (payment * (Math.pow(1 + ratePerPeriod, periods) - 1)) / ratePerPeriod;
}

function periodsPerYear(frequency: RecurrenceFrequency): number {
  return frequency === "monthly" ? 12 : 1;
}

export function projectedValue(
  amount: number,
  isRecurring: boolean,
  frequency: RecurrenceFrequency | undefined,
  asset: AssetBenchmark,
  years: number
): number {
  if (isRecurring && frequency) {
    return futureValueOfAnnuity(
      amount,
      asset.annualRate,
      years,
      periodsPerYear(frequency)
    );
  }
  return calculateFutureValue(amount, asset.annualRate, years);
}

export function projectedValueForInput(
  input: TemptationInput,
  asset: AssetBenchmark
): number {
  const years = yearsBetween(new Date(), new Date(input.targetDate));
  return projectedValue(
    input.amount,
    input.isRecurring,
    input.frequency,
    asset,
    years
  );
}

export function projectedValueForPurchase(
  purchase: SavedPurchase,
  asset: AssetBenchmark = SP500
): number {
  return projectedValue(
    purchase.cost,
    purchase.isRecurring,
    purchase.recurrenceFrequency,
    asset,
    projectionYears(purchase)
  );
}

export function totalFutureWealth(purchases: SavedPurchase[]): number {
  return purchases.reduce(
    (sum, p) => sum + projectedValueForPurchase(p, SP500),
    0
  );
}
