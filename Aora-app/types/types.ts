export interface ExpenseType {
  category: string
  description: string
  amount: number
  date: string
}

export interface UpdateExpenseType {
  id: string
  description: string
  amount: number
}

export interface CommunityExpenseType extends ExpenseType {
  communityCode: string;
}

export interface BudgetType {
  category: string
  maxAmount: number,
  currentAmount: number,
  date: string
}
export interface CommunityBudgetType extends BudgetType{
  communityCode: string
}

export interface CommnunityType {
  name: string
  description: string,
  members: Array<any>
}
export interface CommnunityCategoryType {
  name: string
  communityCode: string,
  color: string
}

interface CategoryValue {
  categoryName: string;
  communityCode?: string; // Optional property since not all entries have this
  parent: string;
}

export interface CategoryItem {
  color?: string; // Optional property
  inputLabel?: string; // Optional property
  key?: string; // Optional property
  label: string;
  value: string | CategoryValue;
  parent?: string; // Optional property
}
