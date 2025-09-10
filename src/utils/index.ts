
const colors = [
  { bg: 'bg-purple-50', border: 'border-purple-300', text: 'text-purple-500', shadow: 'shadow-purple-400' },
  { bg: 'bg-pink-50', border: 'border-pink-300', text: 'text-pink-500', shadow: 'shadow-pink-400' },
  { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-500', shadow: 'shadow-blue-400' },
  { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-500', shadow: 'shadow-yellow-400' },
  { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-500', shadow: 'shadow-green-400' },
  { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-500', shadow: 'shadow-red-400' },
];

export function getCompanyBadge(company?: string) {
  const firstLetter = company?.trim().charAt(0).toUpperCase() || '?';
  const color = colors[Math.floor(Math.random() * colors.length)];
  return { firstLetter, ...color };
}

export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);
  const daya = date.getDate();
  const month = date.toLocaleString('es-MX', { month: 'long' });
  const year = date.getFullYear();
  return `${daya} de ${month} de ${year}`
}

// Format Currency
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}