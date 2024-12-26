import CustomButton from '@/components/Buttons/CustomButton'
import FormField from '@/components/FormField'
import { useEffect, useState } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from "expo-router"
import axios from 'axios';

const SignIn = () => {

  const [credentials, setCredentials] = useState({
    email: 'anas',
    password: 'hilali'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFetching, setIsFetching] = useState(false);
  useEffect(()=>{
    fetchHelloMessage();

  }, []);
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
  const submit =  () => {



    

  }

  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView contentContainerStyle={{justifyContent: 'center', flexGrow: 1}}>
        <View className='px-6 my-6'>

          <Text className="text-2xl text-white font-psemibold ">Log in to expense saver</Text>

          <FormField
            title="E-mail"
            placeholder='Enter your e-mail'
            value={credentials.email}
            handleChangedText={(input: any) => setCredentials({ ...credentials, email: input })}
            styles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            placeholder='Enter your password'
            value={credentials.password}
            handleChangedText={(input: any) => setCredentials({ ...credentials, password: input })}
            styles="mt-7"
          />

          <CustomButton
            title='Sign in'
            containerStyles='bg-primary mt-10'
            textStyles='text-text-primary'
            handlePress={submit}
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-base font-pmedium' style={{color: "#91919f"}}>
              Don't have an account ?
            </Text>
            <Link href="/(auth)/sign-up" className="text-base text-primary font-psemibold">
              Sign Up
            </Link>
          </View>
      <Link href="/home">Home</Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn