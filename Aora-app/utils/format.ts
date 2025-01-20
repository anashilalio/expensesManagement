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
export const formatDate = (dateIso: string) => {
  let date = new Date(dateIso)

  const month = String(date.getMonth() + 1).padStart(2, '0');  
  const day = String(date.getDate()).padStart(2, '0');          
  const year = date.getFullYear();                              
  const hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // hours = hours % 12 || 12;
  // const ampm = hours >= 12 ? 'PM' : 'AM';
  return `${month}/${day} ${hours}:${minutes}`;
}