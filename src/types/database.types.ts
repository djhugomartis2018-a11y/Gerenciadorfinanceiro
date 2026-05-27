// ============================================================
// NAVEX Finance — Database Types
// Gerado após Sprint 1 Migration — sincronizado com Supabase
// ============================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type TransactionType = 'income' | 'expense'
export type CategoryType = 'income' | 'expense' | 'both'
export type InstallmentStatus = 'active' | 'completed' | 'cancelled'
export type BudgetPeriod = 'weekly' | 'monthly' | 'yearly'
export type NotificationType = 'info' | 'warning' | 'success' | 'error'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          email?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }

      transactions: {
        Row: {
          id: string
          user_id: string
          description: string
          amount: number
          type: TransactionType
          category_id: string | null
          merchant: string | null
          transaction_date: string
          notes: string | null
          is_subscription: boolean
          installment_group_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          description: string
          amount: number
          type: TransactionType
          category_id?: string | null
          merchant?: string | null
          transaction_date?: string
          notes?: string | null
          is_subscription?: boolean
          installment_group_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          description?: string
          amount?: number
          type?: TransactionType
          category_id?: string | null
          merchant?: string | null
          transaction_date?: string
          notes?: string | null
          is_subscription?: boolean
          installment_group_id?: string | null
          updated_at?: string
        }
      }

      categories: {
        Row: {
          id: string
          user_id: string
          name: string
          icon: string | null
          color: string
          type: CategoryType
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          icon?: string | null
          color?: string
          type?: CategoryType
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          icon?: string | null
          color?: string
          type?: CategoryType
          updated_at?: string
        }
      }

      goals: {
        Row: {
          id: string
          user_id: string
          name: string
          target_amount: number
          current_amount: number
          due_date: string | null
          color: string
          icon: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          target_amount: number
          current_amount?: number
          due_date?: string | null
          color?: string
          icon?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          target_amount?: number
          current_amount?: number
          due_date?: string | null
          color?: string
          icon?: string
          updated_at?: string
        }
      }

      subscriptions: {
        Row: {
          id: string
          user_id: string
          merchant: string
          description: string | null
          amount: number
          billing_day: number | null
          active: boolean
          category_id: string | null
          next_billing_date: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          merchant: string
          description?: string | null
          amount: number
          billing_day?: number | null
          active?: boolean
          category_id?: string | null
          next_billing_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          merchant?: string
          description?: string | null
          amount?: number
          billing_day?: number | null
          active?: boolean
          category_id?: string | null
          next_billing_date?: string | null
          notes?: string | null
          updated_at?: string
        }
      }

      installments: {
        Row: {
          id: string
          user_id: string
          merchant: string
          description: string | null
          total_installments: number
          current_installment: number
          total_amount: number
          installment_amount: number
          start_date: string
          category_id: string | null
          status: InstallmentStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          merchant: string
          description?: string | null
          total_installments: number
          current_installment?: number
          total_amount: number
          installment_amount: number
          start_date?: string
          category_id?: string | null
          status?: InstallmentStatus
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          merchant?: string
          description?: string | null
          total_installments?: number
          current_installment?: number
          total_amount?: number
          installment_amount?: number
          start_date?: string
          category_id?: string | null
          status?: InstallmentStatus
          updated_at?: string
        }
      }

      budgets: {
        Row: {
          id: string
          user_id: string
          category_id: string | null
          name: string | null
          limit_amount: number
          period: BudgetPeriod
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category_id?: string | null
          name?: string | null
          limit_amount: number
          period?: BudgetPeriod
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          category_id?: string | null
          name?: string | null
          limit_amount?: number
          period?: BudgetPeriod
          updated_at?: string
        }
      }

      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          body: string | null
          read: boolean
          type: NotificationType
          link: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          body?: string | null
          read?: boolean
          type?: NotificationType
          link?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          body?: string | null
          read?: boolean
          type?: NotificationType
          link?: string | null
          metadata?: Json | null
        }
      }

      user_data: {
        Row: {
          id: string
          data: Json
          updated_at: string | null
        }
        Insert: {
          id: string
          data: Json
          updated_at?: string | null
        }
        Update: {
          id?: string
          data?: Json
          updated_at?: string | null
        }
      }
    }

    Views: {
      subscriptions_summary: {
        Row: {
          user_id: string
          active_count: number
          monthly_total: number
          yearly_total: number
        }
      }
    }

    Functions: {
      get_financial_summary: {
        Args: {
          p_user_id: string
          p_start_date: string
          p_end_date: string
        }
        Returns: {
          total_income: number
          total_expenses: number
          balance: number
          transaction_count: number
        }[]
      }
      mark_all_notifications_read: {
        Args: { p_user_id: string }
        Returns: void
      }
    }
  }
}
