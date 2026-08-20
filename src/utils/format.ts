/**
 * Helper utilities for formatting Vietnamese Dong (VNĐ) currency
 */

/**
 * Format full currency amount (e.g. 10000000 -> "10.000.000 ₫", -500000 -> "- 500.000 ₫")
 */
export function formatMoney(amount: number | undefined | null): string {
  if (amount === undefined || amount === null) return '0 ₫';
  const isNegative = amount < 0;
  const abs = Math.abs(amount);
  const formatted = abs.toLocaleString('vi-VN');
  return isNegative ? `- ${formatted} ₫` : `${formatted} ₫`;
}

/**
 * Format compact currency for board tiles & compact badges (e.g. 600000 -> "600K ₫", 4000000 -> "4 Tr ₫", 1500000 -> "1.5 Tr ₫")
 */
export function formatMoneyCompact(amount: number | undefined | null): string {
  if (amount === undefined || amount === null) return '0 ₫';
  const isNegative = amount < 0;
  const abs = Math.abs(amount);

  let formatted = '';
  if (abs >= 1_000_000) {
    const tr = abs / 1_000_000;
    formatted = tr % 1 === 0 ? `${tr} Tr ₫` : `${tr.toFixed(1).replace('.', ',')} Tr ₫`;
  } else if (abs >= 1_000) {
    const k = abs / 1_000;
    formatted = k % 1 === 0 ? `${k}K ₫` : `${k.toFixed(1).replace('.', ',')}K ₫`;
  } else {
    formatted = `${abs} ₫`;
  }

  return isNegative ? `-${formatted}` : formatted;
}
