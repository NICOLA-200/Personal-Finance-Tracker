import { deleteExpense, fetchExpenseData } from '@/services';
import { IExpense } from '@/types';
import { AntDesign } from '@expo/vector-icons';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

export default function ExpenseScreen() {
    const { id } = useLocalSearchParams();
    const [expense, setExpense] = useState<IExpense | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast();

    const getExpenseData = async () => {
        await fetchExpenseData({ id: id as string, setExpense, toast, setLoading });
    };

    const removeExpense = async () => {
        await deleteExpense({ id: id as string, toast, setLoading });
    };

    useEffect(() => {
        getExpenseData();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <SafeAreaView className='flex-1 pt-12 px-3 bg-white'>
            <Stack.Screen options={{ headerShown: false }} />
            <View className='flex-row justify-between items-center'>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className='ml-4 bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center'
                >
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={removeExpense}
                    className='mr-4 bg-neutral-600 rounded-full w-10 h-10 flex items-center justify-center'
                >
                    <AntDesign name="delete" size={24} color="white" />
                </TouchableOpacity>
            </View>
            {expense ? (
                <ScrollView>
                    <Text className='text-lg my-4 font-semibold'>{expense.name}</Text>
                    <Text className='mb-2 text-base font-medium text-green-600'>
                        ${parseFloat(expense.amount).toFixed(2)}
                    </Text>
                    <Text className='mb-4 text-sm text-gray-600'>{expense.description}</Text>
                    <Text className='mb-4 text-xs text-gray-500'>
                        Date: {formatDate(expense.createdAt)}
                    </Text>
                    <Image
                        className='w-full h-56 rounded-lg'
                       source={require("./../../assets/images/logo.jpg")}
                    />
                </ScrollView>
            ) : (
                <View className='flex-1 justify-center items-center'>
                    <Text className='text-lg text-gray-700'>Loading expense...</Text>
                </View>
            )}
        </SafeAreaView>
    );
}