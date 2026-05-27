// ============================================================
// NAVEX Finance — Domain Types
// ============================================================
import type { Database } from './database.types'

// ─── Tabela base types ────────────────────────────────────────
export type Transaction   = Database['public']['Tables']['transactions']['Row']
export type TransactionInsert = Database['public']['Tables']['transactions']['Insert']
export type TransactionUpdate = Database['public']['Tables']['transactions']['Update']

export type Category      = Database['public']['Tables']['categories']['Row']
export type CategoryInsert = Database['public']['Tables']['categories']['Insert']
export type CategoryUpdate = Database['public']['Tables']['categories']['Update']

export type Goal          = Database['public']['Tables']['goals']['Row']
export type GoalInsert    = Database['public']['Tables']['goals']['Insert']
export type GoalUpdate    = Database['public']['Tables']['goals']['Update']

export type Subscription  = Database['public']['Tables']['subscriptions']['Row']
export type SubscriptionInsert = Database['public']['Tables']['subscriptions']['Insert']
export type SubscriptionUpdate = Database['public']['Tables']['subscriptions']['Update']

export type Installment   = Database['public']['Tables']['installments']['Row']
export type InstallmentInsert = Database['public']['Tables']['installments']['Insert']
export type InstallmentUpdate = Database['public']['Tables']['installments']['Update']

export type Budget        = Database['public']['Tables']['budgets']['Row']
export type BudgetInsert  = Database['public']['Tables']['budgets']['Insert']
export type BudgetUpdate  = Database['public']['Tables']['budgets']['Update']

export type Notification  = Database['public']['Tables']['notifications']['Row']
export type NotificationInsert = Database['public']['Tables']['notifications']['Insert']

// ─── Re-export enums ─────────────────────────────────────────
export type { TransactionType, CategoryType, InstallmentStatus, BudgetPeriod, NotificationType }
  from './database.types'

// ─── Tipos enriquecidos (com joins) ──────────────────────────
export type TransactionWithCategory = Transaction & {
  categories: Category | null
}

export type SubscriptionWithCategory = Subscription & {
  categories: Category | null
}

export type InstallmentWithCategory = Installment & {
  categories: Category | null
}

export type BudgetWithCategory = Budget & {
  categories: Category | null
  spent?: number
  percentage?: number
}

// ─── Filtros ─────────────────────────────────────────────────
export interface TransactionFilters {
  search?: string
  type?: 'income' | 'expense' | 'all'
  category_id?: string
  date_from?: string
  date_to?: string
  amount_min?: number
  amount_max?: number
  is_subscription?: boolean
}

// ─── Dashboard ───────────────────────────────────────────────
export interface DashboardSummary {
  totalIncome: number
  totalExpenses: number
  balance: number
  savingsRate: number
  transactionCount: number
  topCategories: CategorySummary[]
  recentTransactions: TransactionWithCategory[]
  monthlyTrend: MonthlyTrend[]
  subscriptionsTotal: number
  installmentsTotal: number
}

export interface CategorySummary {
  category: Category
  total: number
  percentage: number
  count: number
}

export interface MonthlyTrend {
  month: string
  income: number
  expenses: number
  balance: number
}
