export function formatMoney(minorUnits: number, currency: string): string {
  return (minorUnits / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  });
}
