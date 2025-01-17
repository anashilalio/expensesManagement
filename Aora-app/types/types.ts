export interface ExpenseType {
  category: string
  description: string,
  amount: number,
  date: string
}

export interface BudgetType {
  category: string
  maxAmount: number,
  currentAmount: number,
  date: string
}