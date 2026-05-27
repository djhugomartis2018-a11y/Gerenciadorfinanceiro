import { useState, useEffect, useCallback } from 'react'
import { transactionService } from '../services/transaction.service'
import { useAuth } from './useAuth'
import type {
  TransactionWithCategory,
  TransactionInsert,
  TransactionUpdate,
  TransactionFilters,
} from '../types/finance.types'

interface UseTransactionsReturn {
  transactions: TransactionWithCategory[]
  loading: boolean
  error: string | null
  filters: TransactionFilters
  setFilters: (filters: TransactionFilters) => void
  refetch: () => Promise<void>
  create: (payload: Omit<TransactionInsert, 'user_id'>) => Promise<TransactionWithCategory>
  update: (id: string, payload: TransactionUpdate) => Promise<TransactionWithCategory>
  remove: (id: string) => Promise<void>
}

export function useTransactions(initialFilters?: TransactionFilters): UseTransactionsReturn {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState<TransactionWithCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<TransactionFilters>(initialFilters ?? {})

  const fetch = useCallback(async () => {
    if (!user) return
    setLoading(true)
    setError(null)
    try {
      const data = await transactionService.getAll(user.id, filters)
      setTransactions(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao carregar transações')
    } finally {
      setLoading(false)
    }
  }, [user, filters])

  useEffect(() => { fetch() }, [fetch])

  const create = useCallback(
    async (payload: Omit<TransactionInsert, 'user_id'>): Promise<TransactionWithCategory> => {
      if (!user) throw new Error('Not authenticated')
      const created = await transactionService.create({ ...payload, user_id: user.id })
      setTransactions((prev) => [created, ...prev])
      return created
    },
    [user]
  )

  const update = useCallback(
    async (id: string, payload: TransactionUpdate): Promise<TransactionWithCategory> => {
      const updated = await transactionService.update(id, payload)
      setTransactions((prev) => prev.map((t) => (t.id === id ? updated : t)))
      return updated
    },
    []
  )

  const remove = useCallback(async (id: string): Promise<void> => {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
    try {
      await transactionService.delete(id)
    } catch (e) {
      fetch()
      throw e
    }
  }, [fetch])

  return { transactions, loading, error, filters, setFilters, refetch: fetch, create, update, remove }
}
