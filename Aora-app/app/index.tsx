import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import Hand from '../assets/images/handGrabingCash.png'
import Receipt from '../assets/images/receipt.png'
import Plan from '../assets/images/plan.png'
import { router } from 'expo-router';
import '../global.css';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <Swiper
          style={styles.wrapper}
          showsButtons={false}
          autoplay={true}
          autoplayTimeout={3}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          loop={false}
        >
          <View style={styles.slide}>
            <Image source={Hand} style={styles.image} resizeMode="contain" />
            <Text style={styles.textStyle}>Gain Total Control of Your Money</Text>
            <Text style={styles.smallText}>
              Become your own money manager and make every cent count.
            </Text>
          </View>

          <View style={styles.slide}>
            <Image source={Receipt} style={styles.image} resizeMode="contain" />
            <Text style={styles.textStyle}>Track Your Expenses Easily</Text>
            <Text style={styles.smallText}>
              Stay on top of your spending and achieve your financial goals.
            </Text>
          </View>

          <View style={styles.slide}>
            <Image source={Plan} style={styles.image} resizeMode="contain" />
            <Text style={styles.textStyle}>Achieve Financial Freedom</Text>
            <Text style={styles.smallText}>
              Take the first step towards a brighter financial future today.
            </Text>
          </View>
        </Swiper>

        <View style={styles.buttons}>
          <TouchableOpacity 
            style={[styles.button, styles.buttonSign]}
            activeOpacity={0.6}
            onPress={() => {router.push('/(auth)/sign-up')}}
          >
            <Text style={[styles.buttonTextSignUp, styles.buttonText]}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.6}
            onPress={() => {router.push('/(auth)/login')}}
          >
            <Text style={[styles.buttonTextLogIn, styles.buttonText]}>Login</Text>
          </TouchableOpacity>
          
        </View>

      </View>
      <StatusBar
        backgroundColor='#FFFFFF'
        style="dark"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
  wrapper: {
    flex: 1
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  image: {
    height: 250,
    width: 250,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  smallText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },
  buttons:{
    flexDirection: 'column',
    gap: 10
  },
  button: {
    backgroundColor: '#EEE5FF',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonSign: {
    backgroundColor: '#7F3DFF'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextSignUp: {
    color: '#FCFCFC'
  },
  buttonTextLogIn: {
    color: '#7F3DFF',
  },
  dotStyle: {
    backgroundColor: '#EEE5FF',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDotStyle: {
    backgroundColor: '#7F3DFF',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
});
