import { createExpense } from '@/services';
import { ICreateExpenseData } from '@/types';
import { AntDesign } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import * as yup from 'yup';

export default function CreateExpense() {
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast();

    const CreateExpenseSchema = yup.object({
        name: yup.string().required().label("Name"),
        amount: yup
            .string()
            .required()
            .matches(/^\d+(\.\d{1,2})?$/, "Amount must be a valid number with up to 2 decimal places")
            .label("Amount"),
        description: yup.string().required().label("Description")
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ICreateExpenseData>({
        resolver: yupResolver(CreateExpenseSchema) as Resolver<ICreateExpenseData, any>,
        mode: "onTouched"
    });

    const onSubmit: SubmitHandler<ICreateExpenseData> = async (data) => {
        await createExpense({
            toast,
            setLoading,
            data,
            reset,
            onSuccess: () => {
                // Navigate to Home with refresh flag
                router.replace('/(tabs)?refresh=true');
            }
        });
    };

    return (
        <SafeAreaView className='w-full flex-1 pt-12 bg-white'>
            <View className='w-full flex-row items-center justify-between px-4'>
                <View className='flex flex-row items-center'>
                    <Image className='w-10 h-10 rounded-full' source={require("./../../assets/images/logo.png")} />
                </View>
                <Image className='w-10 h-10 rounded-full' source={{ uri: "https://picsum.photos/250/250" }} />
            </View>
            <TouchableOpacity onPress={() => router.back()} className='mt-14 left-4'>
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView className='w-full p-4'>
                <Text className='text-xl font-bold'>Add New Expense</Text>
                <View className='my-2 w-full'>
                    <View className='w-full flex flex-col my-2'>
                        <Text className='mb-1'>Name</Text>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    placeholder="e.g., Rebecca Bernhard"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    className='border w-full p-2 rounded-lg border-slate-400'
                                />
                            )}
                            name="name"
                        />
                        <Text className='text-red-500'>{errors?.name?.message}</Text>
                    </View>
                    <View className='w-full flex flex-col my-2'>
                        <Text className='mb-1'>Amount</Text>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    placeholder="e.g., 497.76"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    keyboardType="decimal-pad"
                                    className='border w-full p-2 rounded-lg border-slate-400'
                                />
                            )}
                            name="amount"
                        />
                        <Text className='text-red-500'>{errors?.amount?.message}</Text>
                    </View>
                    <View className='w-full flex flex-col my-2'>
                        <Text className='mb-1'>Description</Text>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    placeholder="e.g., Southwest"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical='top'
                                    className='border w-full p-2 rounded-lg border-slate-400'
                                />
                            )}
                            name="description"
                        />
                        <Text className='text-red-500'>{errors?.description?.message}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    className="flex items-center justify-center mx-auto w-10/12 bg-gray-600 text-white rounded-lg p-2 my-2"
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text className='text-center text-white text-lg font-semibold'>
                        {loading ? <ActivityIndicator size='small' color='white' /> : "Save"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}