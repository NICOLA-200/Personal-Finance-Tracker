import api from "@/lib/axios.config"
import { IComment, ICreatePostData, IPost, IUser, IExpense } from "@/types"
import { router } from "expo-router"
import React from "react"
import { UseFormReset } from "react-hook-form"
import { ToastType } from "react-native-toast-notifications"

interface ICreateExpenseData {
    name: string;
    amount: string;
    description: string;
}

export const createExpense = async ({
    setLoading,
    data,
    toast,
    reset,
    onSuccess
}: {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    data: ICreateExpenseData,
    toast: ToastType,
    reset: UseFormReset<ICreateExpenseData>,
    onSuccess?: () => void
}) => {
    try {
        setLoading(true)
        const url = "/expenses"
        console.log('Creating expense:', data);
        const response = await api.post(url, data)
       
        toast.show("Expense created successfully", { type: "success", placement: "top" })
        reset()
        onSuccess?.()
    } catch (error: any) {
        console.error('Create expense error:', error.response?.status, error.message);
        return toast.show("Error creating expense", {
            type: "danger",
            placement: "top"
        })
    } finally {
        setLoading(false)
    }
}

export const fetchExpenses = async ({
    toast,
    setExpenses,
    setLoading
}: {
    toast: ToastType,
    setExpenses: React.Dispatch<React.SetStateAction<IExpense[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    try {
        setLoading(true)
        const url = "/expenses"
        console.log('Fetching expenses from:', url);
        const response = await api.get(url)
        console.log('Fetched expenses:', response.data.length, 'items');
        setExpenses(response.data)
    } catch (error: any) {
        console.error('Fetch expenses error:', error.response?.status, error.message);
        return toast.show("Error fetching expenses", {
            type: "danger",
            placement: "top"
        })
    } finally {
        setLoading(false)
    }
}

export const fetchExpenseData = async ({
    toast,
    setExpense,
    id,
    setLoading
}: {
    id: string,
    toast: ToastType,
    setExpense: React.Dispatch<React.SetStateAction<IExpense | undefined>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    try {
        setLoading(true)
        const url = `/expenses/${id}`
        console.log('Fetching expense:', url);
        const response = await api.get(url)
     
        setExpense(response.data)
    } catch (error: any) {
        console.error('Fetch expense data error:', error.response?.status, error.message);
        return toast.show("Error fetching expense data", {
            type: "danger",
            placement: "top"
        })
    } finally {
        setLoading(false)
    }
}

export const deleteExpense = async ({
    id,
    toast,
    setLoading
}: {
    id: string,
    toast: ToastType,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    try {
        setLoading(true)
        const url = `/expenses/${id}`
        console.log('Deleting expense:', url);
        await api.delete(url)
        toast.show("Expense deleted successfully", {
            type: "success",
            placement: "top"
        })
        router.navigate("(tabs)")
    } catch (error: any) {
        console.error('Delete expense error:', error.response?.status, error.message);
        return toast.show("Error deleting expense", {
            type: "danger",
            placement: "top"
        })
    } finally {
        setLoading(false)
    }
}

export const fetchUsers = async ({
    setLoading,
    toast,
    setUsers
}: {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    toast: ToastType,
    setUsers: React.Dispatch<React.SetStateAction<IUser[]>>
}) => {
    try {
        setLoading(true)
        const url = "/users"
        console.log('Fetching users from:', url);
        const response = await api.get(url)

        setUsers(response.data)
    } catch (error: any) {
        console.error('Fetch users error:', error.response?.status, error.message);
        return toast.show("Error fetching users", {
            type: "danger",
            placement: "top"
        })
    } finally {
        setLoading(false)
    }
}

export const getUser = async ({
    id,
    setLoading,
    setUser,
    toast
}: {
    id: number,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>,
    toast: ToastType
}) => {
    try {
        setLoading(true)
        const url = `/users/${id}`
        console.log('Fetching user:', url);
        const response = await api.get(url)

        setUser(response.data)
    } catch (error: any) {
        console.error('Fetch user error:', error.response?.status, error.message);
        return toast.show("Error fetching user", {
            type: "danger",
            placement: "top"
        })
    } finally {
        setLoading(false)
    }
}