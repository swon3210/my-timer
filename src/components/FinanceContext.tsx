'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'

type Category = {
  id: string
  name: string
  type: 'income' | 'expense'
}

type Budget = {
  categoryId: string
  amount: number
}

type Transaction = {
  id: number
  amount: number
  description: string
  category: string
  date: string
}

type FinanceContextType = {
  categories: Category[]
  addCategory: (name: string, type: 'income' | 'expense') => void
  removeCategory: (id: string) => void
  editCategory: (id: string, name: string) => void
  budgets: Budget[]
  setBudget: (categoryId: string, amount: number) => void
  transactions: Transaction[]
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

export const useFinance = () => {
  const context = useContext(FinanceContext)
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider')
  }
  return context
}

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: '급여', type: 'income' },
    { id: '2', name: '식비', type: 'expense' },
    { id: '3', name: '교통', type: 'expense' },
    { id: '4', name: '주거', type: 'expense' },
    { id: '5', name: '의료', type: 'expense' },
    { id: '6', name: '교육', type: 'expense' },
    { id: '7', name: '여가', type: 'expense' },
    { id: '8', name: '쇼핑', type: 'expense' },
  ])

  const [budgets, setBudgets] = useState<Budget[]>([
    { categoryId: '2', amount: 300000 },
    { categoryId: '3', amount: 100000 },
    { categoryId: '4', amount: 500000 },
    { categoryId: '5', amount: 100000 },
    { categoryId: '6', amount: 200000 },
    { categoryId: '7', amount: 150000 },
    { categoryId: '8', amount: 200000 },
  ])

  const [transactions, setTransactions] = useState<Transaction[]>([
    // 일간 데이터 (오늘)
    { id: 1, amount: 150000, description: '일일 급여', category: '1', date: new Date().toISOString() },
    { id: 2, amount: -15000, description: '점심', category: '2', date: new Date().toISOString() },
    { id: 3, amount: -5000, description: '버스 요금', category: '3', date: new Date().toISOString() },
    
    // 주간 데이터 (지난 7일)
    { id: 4, amount: 1000000, description: '주급', category: '1', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 5, amount: -100000, description: '주간 식비', category: '2', date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 6, amount: -30000, description: '주간 교통비', category: '3', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 7, amount: -500000, description: '월세', category: '4', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    
    // 월간 데이터 (지난 30일)
    { id: 8, amount: 3000000, description: '월급', category: '1', date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 9, amount: -400000, description: '월간 식비', category: '2', date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 10, amount: -120000, description: '월간 교통비', category: '3', date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 11, amount: -100000, description: '병원비', category: '5', date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 12, amount: -200000, description: '학원비', category: '6', date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 13, amount: -150000, description: '영화 및 외식', category: '7', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 14, amount: -300000, description: '의류 구매', category: '8', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
  ])

  useEffect(() => {
    const storedCategories = localStorage.getItem('categories')
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories))
    }

    const storedBudgets = localStorage.getItem('budgets')
    if (storedBudgets) {
      setBudgets(JSON.parse(storedBudgets))
    }

    const storedTransactions = localStorage.getItem('transactions')
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories))
  }, [categories])

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets))
  }, [budgets])

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  const addCategory = (name: string, type: 'income' | 'expense') => {
    setCategories([...categories, { id: Date.now().toString(), name, type }])
  }

  const removeCategory = (id: string) => {
    setCategories(categories.filter(category => category.id !== id))
    setBudgets(budgets.filter(budget => budget.categoryId !== id))
  }

  const editCategory = (id: string, name: string) => {
    setCategories(categories.map(category => 
      category.id === id ? { ...category, name } : category
    ))
  }

  const setBudget = (categoryId: string, amount: number) => {
    const existingBudgetIndex = budgets.findIndex(b => b.categoryId === categoryId)
    if (existingBudgetIndex !== -1) {
      const newBudgets = [...budgets]
      newBudgets[existingBudgetIndex] = { categoryId, amount }
      setBudgets(newBudgets)
    } else {
      setBudgets([...budgets, { categoryId, amount }])
    }
  }

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }])
  }

  return (
    <FinanceContext.Provider value={{
      categories,
      addCategory,
      removeCategory,
      editCategory,
      budgets,
      setBudget,
      transactions,
      addTransaction
    }}>
      {children}
    </FinanceContext.Provider>
  )
}

