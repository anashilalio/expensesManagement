import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Switch, 
  Image, 
  ScrollView ,
  Modal
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import * as ImagePicker from 'expo-image-picker';

const Add = () => {
  const [repeatTransaction, setRepeatTransaction] = useState(false);
  const [budgetAmount, setBudgetAmount] = useState<string>('0');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedWallet, setSelectedWallet] = useState<string | undefined>(undefined);
  const [showSuccess , setShowSucess ] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);
  const completed = ()=>{
    setShowSucess(true);
    setTimeout(()=>{
      setShowSucess(false);
    },3000)
  }
  const categories = [
    { label: 'Transportation', value: 'Transportation' },
    { label: 'Food', value: 'Food' },
    { label: 'Entertainment', value: 'Entertainment' },
    { label: 'Shopping', value: 'Shopping' },
  ];

  const wallet = [
    { label: 'Paypal', value: 'Paypal' },
    { label: 'CIH', value: 'CIH' },
    { label: 'BqChaabi', value: 'BqChaabi' },
  ];

  const handleDeleteImage = (index: number) => {
    setAttachments((prevAttachments) => 
      prevAttachments.filter((_, i) => i !== index)
    );
  };
  
  const pickImages = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }


      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true, 
        base64: false,
        quality: 1,
      });

      if (!result.canceled) {

        const pickedImages = result.assets.map((asset) => asset.uri);

        setAttachments((prev) => [...prev, ...pickedImages]);
      }
    } catch (error) {
      console.log('Error picking images:', error);
    }
  };

  return (
    <View className="flex-1 bg-red-500 relative">
     
      <View className="flex-1 justify-center items-center mt-12">
        <View className="flex-row items-center border-b border-white pb-2 w-3/4">
          <Text className="text-white text-3xl">$</Text>
          <TextInput
            className="flex-1 text-white text-4xl text-left"
            keyboardType="numeric"
            value={budgetAmount}
            onChangeText={setBudgetAmount}
            placeholder="0"
            placeholderTextColor="#ffffff88"
          />
        </View>
      </View>

      <View className="bg-white rounded-t-3xl p-6">
        <View className="mb-4">
          <Text className="text-gray-500 mb-2">Category</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedCategory(value)}
            items={categories}
            placeholder={{
              label: 'Select a Category',
              value: null,
              color: '#9CA3AF',
            }}
            style={{
              inputAndroid: {
                backgroundColor: '#FFFFFF',
                borderRadius: 8,
                borderColor: '#E5E7EB',
                borderWidth: 1,
                padding: 12,
                color: '#6B7280',
              },
            }}
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-500 mb-2">Description</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4"
            placeholder="Enter description"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-500 mb-2">Wallet</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedWallet(value)}
            items={wallet}
            placeholder={{
              label: 'Select a Wallet',
              value: null,
              color: '#9CA3AF',
            }}
            style={{
              inputAndroid: {
                backgroundColor: '#FFFFFF',
                borderRadius: 8,
                borderColor: '#E5E7EB',
                borderWidth: 1,
                padding: 12,
                color: '#6B7280',
              }
            }}
          />
        </View>

        <View className="mb-4">
          <TouchableOpacity
            className="border border-dashed border-gray-300 rounded-lg p-4 flex-row justify-center items-center"
            onPress={pickImages}
          >
            <Text className="text-gray-500">📎 Add attachment</Text>
          </TouchableOpacity>
        </View>

        {attachments.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 8 }}>
            {attachments.map((uri, index) => (
              <View key={index} style={{ marginRight: 10 }} className='relative'>
                <TouchableOpacity className=" absolute z-10 right-1 "           onPress={() => handleDeleteImage(index)}>              
                  <Text className=" text-white bg-black bg-opacity-50  z-10 rounded-full  top-1 px-1">X</Text>
                </TouchableOpacity>
                <Image 
                  source={{ uri }}
                  style={{ width: 80, height: 80, borderRadius: 8 }}
                />
              </View>
            ))}
          </ScrollView>
        )}

        <View className="flex-row justify-between items-center mt-4">
          <Text className="text-gray-500">Repeat</Text>
          <Switch
            value={repeatTransaction}
            onValueChange={(value) => setRepeatTransaction(value)}
            trackColor={{ false: '#767577', true: '#7C3AED' }}
            thumbColor={repeatTransaction ? '#7C3AED' : '#f4f3f4'}
          />
        </View>

        <TouchableOpacity className="bg-violet p-4 rounded-lg mt-6">
          <Text className="text-white text-center text-lg font-bold"  onPress={completed}>Continue</Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent
        animationType="fade"
        visible={showSuccess}
        onRequestClose={() => setShowSucess(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
          }}
        >
          <View
            style={{
              width: 200,
              padding: 20,
              backgroundColor: 'white',
              borderRadius: 10,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#34D399', // Green text
                marginBottom: 10,
              }}
            >
              Success!
            </Text>
            <Text style={{ textAlign: 'center', color: '#6B7280' }}>
              Your transaction was added successfully.
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Add;
