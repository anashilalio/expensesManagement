import CustomButton from '@/components/Buttons/CustomButton'
import FormField from '@/components/FormField'
import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from "expo-router"

const SignUp = () => {

  const [info, setInfo] = useState({
    username:'',
    email: '',
    pwd: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = () => {}

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{justifyContent: 'center', flexGrow: 1}}>
        <View className='px-6 my-6'>

          <Text className="text-2xl text-white font-psemibold ">Create an account</Text>

          <FormField
            title="Username"
            placeholder='Enter your username'
            value={info.username}
            handleChangedText={(input: any) => setInfo({ ...info, username: input })}
            styles="mt-7"
          />

          <FormField
            title="E-mail"
            placeholder='Enter your e-mail'
            value={info.email}
            handleChangedText={(input: any) => setInfo({ ...info, email: input })}
            styles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            placeholder='Enter your password'
            value={info.pwd}
            handleChangedText={(input: any) => setInfo({ ...info, pwd: input })}
            styles="mt-7"
          />

          <CustomButton
            title='Sign Up'
            containerStyles='bg-secondary mt-10'
            textStyles='text-primary'
            handlePress={submit}
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-base text-gray-100 font-pregular'>
              Have an account already ?
            </Text>
            <Link href="/(auth)/sign-in" className="text-base text-secondary font-psemibold">
              Sign In
            </Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp