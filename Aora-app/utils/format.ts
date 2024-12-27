export const formatAmount = (amount: number, currency: string): string => {
  switch (currency) {
    case "dollar":
      return `$${amount}`
    case "euro":
      return `${amount}€`
    default:
      return `$${amount}`
  }
}
export const formatDate = (date: Date) => {
  let hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0');

  hours = hours % 12 || 12;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  return `${hours}:${minutes} ${ampm}`;
}