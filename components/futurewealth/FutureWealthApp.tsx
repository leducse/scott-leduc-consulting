"use client";

import { useState } from "react";
import {
  ASSET_BENCHMARKS,
  TIME_HORIZONS,
  amountLabel,
  formatCurrency,
  formatDate,
  horizonDisplayLabel,
  paymentPeriodLabel,
  targetDateFromYears,
  totalContributedForInput,
  totalContributedForPurchase,
  type RecurrenceFrequency,
  type SavedPurchase,
  type TemptationInput,
} from "@/lib/futurewealth/types";
import {
  projectedValueForInput,
  projectedValueForPurchase,
  totalFutureWealth,
} from "@/lib/futurewealth/calculator";
import {
  addPurchase,
  deletePurchase,
  loadPurchases,
} from "@/lib/futurewealth/storage";

type Screen = "dashboard" | "entry" | "reality";

function tomorrowISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export default function FutureWealthApp() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [purchases, setPurchases] = useState<SavedPurchase[]>(() => loadPurchases());

  // Entry form state
  const [kind, setKind] = useState<"oneTime" | "recurring">("oneTime");
  const [itemName, setItemName] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState<RecurrenceFrequency>("monthly");
  const [horizonMode, setHorizonMode] = useState<"preset" | "custom">("preset");
  const [presetYears, setPresetYears] = useState(5);
  const [customDate, setCustomDate] = useState(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 10);
    return d.toISOString().slice(0, 10);
  });
  const [pendingInput, setPendingInput] = useState<TemptationInput | null>(null);

  const resolvedTargetDate =
    horizonMode === "preset"
      ? targetDateFromYears(presetYears).toISOString()
      : new Date(customDate).toISOString();

  const parsedAmount = parseFloat(amount) || 0;
  const entryValid =
    itemName.trim().length > 0 &&
    parsedAmount > 0 &&
    new Date(resolvedTargetDate) > new Date();

  function resetEntry() {
    setKind("oneTime");
    setItemName("");
    setAmount("");
    setFrequency("monthly");
    setHorizonMode("preset");
    setPresetYears(5);
    const d = new Date();
    d.setFullYear(d.getFullYear() + 10);
    setCustomDate(d.toISOString().slice(0, 10));
  }

  function openEntry() {
    resetEntry();
    setScreen("entry");
  }

  function seeTheMath() {
    if (!entryValid) return;
    setPendingInput({
      itemName: itemName.trim(),
      amount: parsedAmount,
      isRecurring: kind === "recurring",
      frequency: kind === "recurring" ? frequency : undefined,
      targetDate: resolvedTargetDate,
    });
    setScreen("reality");
  }

  function saveTemptation() {
    if (!pendingInput) return;
    const purchase: SavedPurchase = {
      id: crypto.randomUUID(),
      itemName: pendingInput.itemName,
      cost: pendingInput.amount,
      dateSaved: new Date().toISOString(),
      horizonYears: Math.max(
        1,
        Math.round(
          (new Date(pendingInput.targetDate).getTime() - Date.now()) /
            (365.25 * 24 * 60 * 60 * 1000)
        )
      ),
      assetChoice: "S&P 500",
      isRecurring: pendingInput.isRecurring,
      recurrenceFrequency: pendingInput.frequency,
      targetDate: pendingInput.targetDate,
    };
    setPurchases(addPurchase(purchase));
    setPendingInput(null);
    setScreen("dashboard");
  }

  function dismissFlow() {
    setPendingInput(null);
    setScreen("dashboard");
  }

  function handleDelete(id: string) {
    setPurchases(deletePurchase(id));
  }

  return (
    <div className="min-h-[100dvh] bg-[#0f1419] text-white flex flex-col max-w-lg mx-auto">
      {screen === "dashboard" && (
        <>
          <header className="px-5 pt-8 pb-4">
            <h1 className="text-2xl font-bold tracking-tight">FutureWealth</h1>
            <p className="text-sm text-white/50 mt-1">Opportunity cost calculator</p>
          </header>

          <div className="px-5 pb-4">
            <p className="text-sm text-white/60">Total Future Wealth Saved</p>
            <p className="text-4xl font-bold text-emerald-400 tabular-nums mt-1">
              {formatCurrency(totalFutureWealth(purchases))}
            </p>
            <p className="text-xs text-white/40 mt-1">Projected at 10% (S&P 500)</p>
          </div>

          <div className="flex-1 px-5 pb-24 overflow-y-auto">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">
              Skipped Purchases
            </h2>
            {purchases.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
                <p className="text-white/70">Nothing saved yet</p>
                <p className="text-sm text-white/40 mt-2">
                  Log a temptation to see what skipping it could be worth.
                </p>
              </div>
            ) : (
              <ul className="space-y-2">
                {purchases.map((p) => (
                  <li
                    key={p.id}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 flex justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="font-medium truncate flex items-center gap-1.5">
                        {p.isRecurring && (
                          <span className="text-white/40 text-xs" aria-hidden>
                            ↻
                          </span>
                        )}
                        {p.itemName}
                      </p>
                      <p className="text-xs text-white/40 mt-1">
                        {formatDate(p.dateSaved)}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm text-white/60">
                        {(() => {
                          const total = totalContributedForPurchase(p);
                          if (total != null) {
                            return `${amountLabel(p)} · ${formatCurrency(total)} total`;
                          }
                          return amountLabel(p);
                        })()}
                      </p>
                      <p className="text-xs font-semibold text-emerald-400 mt-1">
                        → {formatCurrency(projectedValueForPurchase(p))}{" "}
                        {horizonDisplayLabel(p)}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id)}
                        className="text-xs text-red-400/70 hover:text-red-400 mt-2"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0f1419] via-[#0f1419] to-transparent max-w-lg mx-auto">
            <button
              type="button"
              onClick={openEntry}
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0f1419] font-semibold transition-colors"
            >
              + Log a Temptation
            </button>
          </div>
        </>
      )}

      {screen === "entry" && (
        <div className="flex flex-col min-h-[100dvh]">
          <header className="px-5 pt-6 pb-4 flex items-center gap-3 border-b border-white/10">
            <button
              type="button"
              onClick={() => setScreen("dashboard")}
              className="text-emerald-400 text-sm"
            >
              Cancel
            </button>
            <h2 className="font-semibold flex-1 text-center pr-12">Log a Temptation</h2>
          </header>

          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
            <Segmented
              options={[
                { value: "oneTime", label: "One-time" },
                { value: "recurring", label: "Recurring" },
              ]}
              value={kind}
              onChange={(v) => setKind(v as "oneTime" | "recurring")}
            />

            <Field label="What are you tempted to buy?">
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Dinner out, Netflix…"
                className={inputClass}
              />
            </Field>

            <Field
              label={
                kind === "recurring"
                  ? "How much per period?"
                  : "How much does it cost?"
              }
            >
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                  $
                </span>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className={`${inputClass} pl-7`}
                />
              </div>
            </Field>

            {kind === "recurring" && (
              <Field label="Frequency">
                <Segmented
                  options={[
                    { value: "monthly", label: "Monthly" },
                    { value: "yearly", label: "Yearly" },
                  ]}
                  value={frequency}
                  onChange={(v) => setFrequency(v as RecurrenceFrequency)}
                />
              </Field>
            )}

            <div className="space-y-3">
              <p className="text-sm text-white/60">
                When do you want to see this money again?
              </p>
              <Segmented
                options={[
                  { value: "preset", label: "Preset" },
                  { value: "custom", label: "Custom Date" },
                ]}
                value={horizonMode}
                onChange={(v) => setHorizonMode(v as "preset" | "custom")}
              />
              {horizonMode === "preset" ? (
                <div className="grid grid-cols-2 gap-2">
                  {TIME_HORIZONS.map((h) => (
                    <button
                      key={h.years}
                      type="button"
                      onClick={() => setPresetYears(h.years)}
                      className={`py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                        presetYears === h.years
                          ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                          : "border-white/10 text-white/70 hover:border-white/20"
                      }`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  type="date"
                  min={tomorrowISO()}
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className={inputClass}
                />
              )}
            </div>
          </div>

          <div className="p-4 border-t border-white/10">
            <button
              type="button"
              disabled={!entryValid}
              onClick={seeTheMath}
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-[#0f1419] font-semibold transition-colors"
            >
              See the Math
            </button>
          </div>
        </div>
      )}

      {screen === "reality" && pendingInput && (
        <div className="flex flex-col min-h-[100dvh]">
          <header className="px-5 pt-6 pb-4 border-b border-white/10">
            <h2 className="font-semibold text-center">Reality Check</h2>
          </header>

          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
            <p className="text-center text-white/80 leading-relaxed">
              {pendingInput.isRecurring ? (
                (() => {
                  const total = totalContributedForInput(pendingInput);
                  const periodLabel = paymentPeriodLabel(pendingInput);
                  if (total != null && periodLabel) {
                    return (
                      <>
                        If you skip <strong>{pendingInput.itemName}</strong> and save{" "}
                        <strong>
                          {formatCurrency(pendingInput.amount)}/
                          {pendingInput.frequency === "monthly" ? "mo" : "yr"}
                        </strong>{" "}
                        for <strong>{periodLabel}</strong> (
                        <strong>{formatCurrency(total)} total</strong>), here is what that
                        grows to if invested by{" "}
                        <strong>{formatDate(pendingInput.targetDate)}</strong>:
                      </>
                    );
                  }
                  return (
                    <>
                      If you skip <strong>{pendingInput.itemName}</strong> and invest{" "}
                      <strong>
                        {formatCurrency(pendingInput.amount)}/
                        {pendingInput.frequency === "monthly" ? "mo" : "yr"}
                      </strong>{" "}
                      instead, here is what you&apos;ll have by{" "}
                      <strong>{formatDate(pendingInput.targetDate)}</strong>:
                    </>
                  );
                })()
              ) : (
                <>
                  If you skip <strong>{pendingInput.itemName}</strong> today and invest{" "}
                  <strong>{formatCurrency(pendingInput.amount)}</strong>, here is what
                  you&apos;ll have by{" "}
                  <strong>{formatDate(pendingInput.targetDate)}</strong>:
                </>
              )}
            </p>

            {ASSET_BENCHMARKS.map((asset) => {
              const futureValue = projectedValueForInput(pendingInput, asset);
              const contributed = totalContributedForInput(pendingInput);
              return (
              <div
                key={asset.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-2 font-medium">
                    <span aria-hidden>{asset.icon}</span>
                    {asset.name}
                  </span>
                  <span className="text-sm text-white/50">
                    {(asset.annualRate * 100).toFixed(0)}%
                  </span>
                </div>
                {contributed != null ? (
                  <div className="flex items-end gap-4">
                    <div>
                      <p className="text-xs text-white/50">Out of pocket</p>
                      <p className="text-xl font-semibold tabular-nums">
                        {formatCurrency(contributed)}
                      </p>
                    </div>
                    <span className="text-white/40 pb-1">→</span>
                    <div>
                      <p className="text-xs text-white/50">Invested value</p>
                      <p className="text-2xl font-bold text-emerald-400 tabular-nums">
                        {formatCurrency(futureValue)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-3xl font-bold tabular-nums">
                    {formatCurrency(futureValue)}
                  </p>
                )}
              </div>
            );
            })}
          </div>

          <div className="p-4 border-t border-white/10 flex gap-3">
            <button
              type="button"
              onClick={dismissFlow}
              className="flex-1 py-3 rounded-xl border border-red-500/40 text-red-400 font-medium hover:bg-red-500/10 transition-colors"
            >
              I bought it anyway
            </button>
            <button
              type="button"
              onClick={saveTemptation}
              className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0f1419] font-semibold transition-colors"
            >
              I&apos;m Saving It!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-500/50";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-white/60">{label}</label>
      {children}
    </div>
  );
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex rounded-xl border border-white/10 p-1 bg-white/5">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            value === opt.value
              ? "bg-emerald-500 text-[#0f1419]"
              : "text-white/60 hover:text-white"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
