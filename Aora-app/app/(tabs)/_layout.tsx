import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Tabs } from 'expo-router'
import Dashboard from '../../assets/icons/home.png'
import Budgets from "../../assets/icons/budgets.png"
import Profile from "../../assets/icons/profile.png"
import Expenses from '../../assets/icons/expenses.png'
import AddButton from '@/components/Buttons/AddButton'
import { AuthProvider } from '@/components/AuthContext'

interface TabIconProps {
    icon: any;
    color: string;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color }) => {
    return (
        <View className='mb-2'>
            <Image
                source={icon}
                className="w-7 h-10"
                tintColor={color}
                resizeMode="contain"
            />
        </View>
    )
}

interface TabLabelProps {
    name: string;
    color: string;
    focused: boolean
}

const TabLabel: React.FC<TabLabelProps> = ({ name, color, focused }) => {
    return (
        <Text
            className={`${focused === true ? 'font-psemibold' : 'font-pregular'} text-xs`}
            style={{ color: color }}
        >
            {name}
        </Text>
    )
}

const TabsLayout = () => {

    return (
        <AuthProvider>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: true,
                    tabBarActiveTintColor: "#7C3AED",
                    tabBarInactiveTintColor: "#D8B4FE",
                    tabBarStyle: {
                        height: 70,
                        paddingTop: 6
                    }
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <TabIcon icon={Dashboard} color={color} />
                        ),
                        tabBarLabel: ({ color, focused }) => (
                            <TabLabel color={color} focused={focused} name="Home" />
                        )
                    }}
                />
                <Tabs.Screen
                    name="expenses"
                    options={{
                        title: 'Expenses',
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <TabIcon icon={Expenses} color={color} />
                        ),
                        tabBarLabel: ({ color, focused }) => (
                            <TabLabel color={color} focused={focused} name="Expenses" />
                        )
                    }}
                />
                <Tabs.Screen
                    name="add"
                    options={{
                        headerShown: false,
                        tabBarLabel: () => null,
                        tabBarIcon: () => (
                            <View className="">

                                <AddButton />
                            </View>
                        )
                    }}
                />
                <Tabs.Screen
                    name="budgets"
                    options={{
                        title: 'Budgets',
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <TabIcon icon={Budgets} color={color} />
                        ),
                        tabBarLabel: ({ color, focused }) => (
                            <TabLabel color={color} focused={focused} name="Budgets" />
                        )
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <TabIcon icon={Profile} color={color} />
                        ),
                        tabBarLabel: ({ color, focused }) => (
                            <TabLabel color={color} focused={focused} name="Profile" />
                        )
                    }}
                />
            </Tabs>
        </AuthProvider>
    )
}

export default TabsLayout
