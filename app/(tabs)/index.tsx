import ExpenseComponent from '@/components/ExpenseComponent';
import { fetchExpenses } from '@/services';
import { IExpense } from '@/types';
import { Link, router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, Image, RefreshControl, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

export default function Home() {
    const [loading, setLoading] = useState<boolean>(false);
    const [expenses, setExpenses] = useState<IExpense[]>([]);
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(5); // Optimized for performance
    const toast = useToast();

    const getExpenses = async () => {
        setLoading(true);
        try {
            await fetchExpenses({
                toast,
                setExpenses: (data: IExpense[]) => {
                    // Sort expenses by createdAt in descending order
                    const sortedExpenses = [...data].sort((a, b) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    );
                    setExpenses(sortedExpenses);
                    console.log('Sorted expenses:', sortedExpenses.map(e => ({
                        id: e.id,
                        name: e.name,
                        createdAt: e.createdAt
                    })));
                },
                setLoading
            });
        } catch (error) {
            console.error('Fetch expenses error:', error);
            toast.show('Failed to fetch expenses', { type: 'danger', placement: 'top' });
        } finally {
            setLoading(false);
        }
    };

    // Re-fetch expenses when the screen is focused
    useFocusEffect(
        useCallback(() => {
            getExpenses();
        }, [])
    );

    const handleLoadMore = () => {
        if (page * limit < expenses.length) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const displayedExpenses = expenses.slice(0, page * limit);

    return (
        <SafeAreaView className='w-full flex flex-1 flex-col bg-neutral-100 pt-12 px-3'>
            <View className='w-full flex-row items-center justify-between px-1'>
                <Link href="/" className='rpunded-full w-10 h-10'>
                    <Image className=' w-15 h-15 rounded-full' source={require("./../../assets/images/logo.jpg")} />
                </Link>
                <Image className='w-10 h-10 rounded-full' source={{ uri: "https://picsum.photos/250/250" }} />
            </View>
            <Text className='text-lg font-semibold my-6'>Track Your Expenses 👋</Text>
            <View className='w-full'>
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={getExpenses} />
                    }
                    scrollEnabled={true}
                    data={displayedExpenses}
                    ListEmptyComponent={() => (
                        <View className='h-full justify-center items-center rounded-lg'>
                            <Text className='text-lg text-gray-700 pt-3'>No expenses available</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => router.push(`/expense/${item.id}`)}>
                            <ExpenseComponent expense={item} />
                        </TouchableOpacity>
                    )}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={1}
                    initialNumToRender={5} // Optimize rendering
                    maxToRenderPerBatch={10} // Control batch rendering
                />
            </View>
        </SafeAreaView>
    );
}