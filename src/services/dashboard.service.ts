import { transactionService } from './transaction.service'
import { buildDashboardSummary } from '../utils/calculations'
import { getCurrentMonthRange } from '../utils/date'
import type { DashboardSummary } from '../types/finance.types'
import { supabase } from './supabase.service'

export const dashboardService = {
  async getSummary(userId: string): Promise<DashboardSummary> {
    const { start, end } = getCurrentMonthRange()
    const [transactions, subResult, instResult] = await Promise.all([
      transactionService.getByDateRange(userId, start, end),
      supabase.from('subscriptions').select('amount').eq('user_id', userId).eq('active', true),
      supabase.from('installments').select('installment_amount').eq('user_id', userId).eq('status', 'active'),
    ])

    const base = buildDashboardSummary(transactions)
    const subscriptionsTotal = ((subResult.data ?? []) as Array<{ amount: number }>)
      .reduce((s, r) => s + Number(r.amount), 0)
    const installmentsTotal = ((instResult.data ?? []) as Array<{ installment_amount: number }>)
      .reduce((s, r) => s + Number(r.installment_amount), 0)

    return { ...base, subscriptionsTotal, installmentsTotal }
  },

  async getSummaryForPeriod(userId: string, start: string, end: string): Promise<DashboardSummary> {
    const transactions = await transactionService.getByDateRange(userId, start, end)
    const base = buildDashboardSummary(transactions)
    return { ...base, subscriptionsTotal: 0, installmentsTotal: 0 }
  },
}
