export const formatAmount = (amount: number, currency: string):string => {
  switch (currency) {
    case "dollar":
      return `$${amount}`
    case "euro":
      return `${amount}€`
    default:
      return `$${amount}`
  }
}