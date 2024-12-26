import CustomButton from '@/components/Buttons/CustomButton'
import FormField from '@/components/FormField'
import { useState, useEffect } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, useNavigation } from "expo-router"
import { useHeaderHeight } from '@react-navigation/elements'
import axios from 'axios'

const SignIn = () => {

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const headerHeight = useHeaderHeight();
  const submit = () => { }
  const fetchHelloMessage = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get('http://100.103.97.26:3000');
      Alert.alert('Response', response.data); // Show the server response
    } catch (error) {
      console.error('Error fetching hello message:', error);
      Alert.alert('Error', 'Failed to fetch the message.');
    } finally {
      setIsFetching(false);
    }
  };
  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView contentContainerStyle={{ justifyContent: 'center', flexGrow: 1 }}>
        <View className='px-6' style={{ marginBottom: headerHeight / 2 }}>

          <View className='flex-col gap-6'>
            <FormField
              title="E-mail"
              placeholder='E-mail'
              value={credentials.email}
              handleChangedText={(input: any) => setCredentials({ ...credentials, email: input })}
              keyboardType="email-address"
            />
            <FormField
              title="Password"
              placeholder='Password'
              value={credentials.password}
              handleChangedText={(input: any) => setCredentials({ ...credentials, password: input })}
            />
          </View>

          <CustomButton
            title='Login'
            containerStyles='bg-buttPrimary justify-center mt-7'
            textStyles='text-text-primary text-center'
            handlePress={submit}
            isLoading={isSubmitting}
          />

          <Text className='text-base text-buttPrimary font-psemibold text-center mt-5'>
            Forgot password?
          </Text>

          <View className='justify-center mt-7 flex-row gap-2'>
            <Text className='text-base text-text-gray font-pregular'>
              Don't have an account?
            </Text>
            <Link href="/(auth)/sign-up" className="text-base text-buttPrimary font-psemibold">
              Sign Up
            </Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn