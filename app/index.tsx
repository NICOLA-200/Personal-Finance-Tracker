import CustomButton from '@/components/CustomButton'
import { Stack, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import api from '@/lib/axios.config'

const Onboarding = () => {
    const router = useRouter();
    const toast = useToast();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isStrongPassword = (pwd: string) => {
        const minLength = 5;
        const hasUpperCase = /[A-Z]/.test(pwd);
        const hasLowerCase = /[a-z]/.test(pwd);
        const hasNumbers = /\d/.test(pwd);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
        
        return (
            pwd.length >= minLength &&
        
            hasLowerCase &&
            hasNumbers 
           
        );
    };

    const handleLogin = async () => {
        // Check password strength first
        if (!isStrongPassword(password)) {
            toast.show(
                "Password must be at least 5 characters long and include character and numbers",
                {
                    type: "danger",
                    placement: "bottom",
                    

                }
            );
            return;
        }

        try {
            setIsLoading(true);
            const response = await api.get(`/users?username=${username}`);
            
            if (response.data.length === 0) {
                toast.show("User not found", {
                    type: "danger",
                    placement: "top"
                });
                return;
            }

            const user = response.data[0];
            if (user.password === password) {
                toast.show("Login successful", {
                    type: "success",
                    placement: "bottom"
                });
                router.navigate("(tabs)");
            } else {
                toast.show("Invalid password", {
                    type: "danger",
                    placement: "bottom"
                });
            }
        } catch (error) {
            console.log(error);
            toast.show("Error during login", {
                type: "danger",
                placement: "bottom"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView className='bg-white'>
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView
                contentContainerStyle={{
                    height: "100%"
                }}
            >
                <View className='h-full items-center justify-center px-6 font-rubik'>
             
                    <Text className=' font-bold text-3xl my-1  font-rubik'>Welcome!</Text>
                     <Text className=''> Login to continue!</Text>
                    <View className='w-full mt-10 space-y-3'>
                        <TextInput
                            className='border border-gray-300 rounded-md p-2 mb-3'
                            placeholder='Username (Email)'
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize='none'
                        />
                        <TextInput
                            className='border border-gray-300 rounded-md p-2 mb-3'
                            placeholder='Password'
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <CustomButton
                            title='Login'
                            handlePress={handleLogin}
                            containerStyles='mb-3 bg-gray-600 mt-6'
                            isLoading={isLoading}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Onboarding