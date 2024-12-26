import CustomButton from '@/components/Buttons/CustomButton'
import FormField from '@/components/FormField'
import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from "expo-router"
import Google from '../../assets/icons/google.png'
import CheckBox from 'expo-checkbox'
import { useHeaderHeight } from '@react-navigation/elements'

const SignUp = () => {

  const [info, setInfo] = useState({
    username:'',
    email: '',
    pwd: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [agreeingToTerms, setAgreeingToTerms] = useState(false)

  const headerHeight = useHeaderHeight();

  const submit = () => {}

  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView contentContainerStyle={{justifyContent: 'center', flexGrow: 1}}>
        <View className='px-6' style={{marginBottom: headerHeight/2}}>

          <View className='flex-col gap-6'>
            <FormField
              title="Username"
              placeholder='Username'
              value={info.username}
              handleChangedText={(input: any) => setInfo({ ...info, username: input })}
            />

            <FormField
              title="E-mail"
              placeholder='E-mail'
              value={info.email}
              handleChangedText={(input: any) => setInfo({ ...info, email: input })}
              keyboardType="email-address"
            />

            <FormField
              title="Password"
              placeholder='Password'
              value={info.pwd}
              handleChangedText={(input: any) => setInfo({ ...info, pwd: input })}
            />
          </View>

          <View className='flex-row gap-2 items-center mt-5'>
            <CheckBox
              value={agreeingToTerms}
              onValueChange={setAgreeingToTerms}
              color={agreeingToTerms ? '#7F3DFF' : undefined}
              style={{
                borderWidth: 2,
                borderRadius: 5,
                borderColor: '#7F3DFF' 
              }}
            />
            <Text className="flex-1 font-psemibold text-sm">
              By signing up, you agree to the
              <Text className='text-violet'>
                Terms of Service and Privacy Policy
              </Text>
            </Text>
          </View>

          <View className='flex-col gap-5 mt-8'>
            <CustomButton
              title='Sign Up'
              containerStyles='bg-buttPrimary justify-center'
              textStyles='text-text-primary text-center'
              handlePress={submit}
              isLoading={isSubmitting}
            />

            <Text className='text-center text-text-gray text-base font-psemibold'>
              Or with
            </Text>

            <CustomButton
              title='Sign Up with Google'
              containerStyles='bg-white flex-row items-center justify-center gap-3 border-2 border-borderInactive'
              textStyles='text-text-dark'
              icon={Google}
              handlePress={submit}
              isLoading={isSubmitting}
            />
          </View>
          
          <View className='justify-center mt-7 flex-row gap-2'>
            <Text className='text-base text-text-gray font-pregular'>
              Have an account already?
            </Text>
            <Link href="/(auth)/login" className="text-base text-buttPrimary font-psemibold">
              Login
            </Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp