import type { SavedPurchase } from "./types";

const STORAGE_KEY = "futurewealth-purchases";

export function loadPurchases(): SavedPurchase[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedPurchase[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function savePurchases(purchases: SavedPurchase[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(purchases));
}

export function addPurchase(purchase: SavedPurchase): SavedPurchase[] {
  const next = [purchase, ...loadPurchases()];
  savePurchases(next);
  return next;
}

export function deletePurchase(id: string): SavedPurchase[] {
  const next = loadPurchases().filter((p) => p.id !== id);
  savePurchases(next);
  return next;
}
