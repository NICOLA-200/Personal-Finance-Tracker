import React from 'react';
import { Text, View } from 'react-native';
import { IExpense } from '@/types';

interface ExpenseComponentProps {
    expense: IExpense;
}

const ExpenseComponent: React.FC<ExpenseComponentProps> = ({ expense }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <View className='bg-gray-50 p-4 rounded-lg mb-3 shadow-sm border border-gray-200'>
            <Text className='text-lg font-semibold text-gray-800'>{expense.name}</Text>
            <Text className='text-base font-medium text-green-600'>${parseFloat(expense.amount).toFixed(2)}</Text>
            <Text className='text-sm text-gray-600 mt-1'>{expense.description}</Text>
            <Text className='text-xs text-gray-500 mt-1'>Date: {formatDate(expense.createdAt)}</Text>
        </View>
    );
};

export default ExpenseComponent;