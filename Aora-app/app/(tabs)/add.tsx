import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import { addExpenseToDB } from '@/api/expense';
import { ExpenseType } from '@/types/types';
import { formatISO } from 'date-fns'
import { useAuth } from '@/components/AuthContext';
import { addCategoryToDB } from '@/api/category';
import { SafeAreaView } from 'react-native-safe-area-context';
import { defaultCategoriesNum } from '@/utils/constants';
import { customCategoriesColor } from '@/utils/categoriesColors';

const Add = () => {

  const { user, setUser } = useAuth()

  const [repeatTransaction, setRepeatTransaction] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | undefined>(undefined);
  const [showSuccess, setShowSucess] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);

  const [categories, setCategories] = useState<any>([
    { label: '', value: '' }
  ]);

  useEffect(() => {

    const categoriesLabelValue = user.categories.map((category: any) => ({
      label: category.name,
      value: category.name
    }))

    setCategories(categoriesLabelValue)
  }, [user.categories])

  const [expense, setExpense] = useState<ExpenseType>({
    category: '',
    description: '',
    amount: 0,
    date: ''
  })

  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showImageOptionsModal, setShowImageOptionsModal] = useState(false);

  const wallet = [
    { label: 'Paypal', value: 'Paypal' },
    { label: 'CIH', value: 'CIH' },
    { label: 'BqChaabi', value: 'BqChaabi' },
  ];

  const expenseAddedNotif = () => {
    setShowSucess(true);
    setTimeout(() => {
      setShowSucess(false);
    }, 3000)
  }

  const handleDeleteImage = (index: number) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((_, i) => i !== index)
    );
  };

  const pickFromGallery = async () => {
    try {
      setShowImageOptionsModal(false);

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
      console.log('Error picking images from gallery:', error);
    }
  };

  const takePhoto = async () => {
    try {
      setShowImageOptionsModal(false);

      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        base64: false,
        quality: 1,
      });

      if (!result.canceled) {

        const newPhotoUri = result.assets[0].uri;
        setAttachments((prev) => [...prev, newPhotoUri]);
      }
    } catch (error) {
      console.log('Error taking photo:', error);
    }
  };

  const addExpense = async () => {

    let date = formatISO(new Date())
    setExpense({ ...expense, date: date })
    const newExpense = await addExpenseToDB(expense)

    if (newExpense) {

      expenseAddedNotif()

      const updatedExpenses = [newExpense, ...user.expenses];

      const updatedTotalExpenses = user.totalExpenses + newExpense.amount

      const updatedCategories = [...user.categories];

      setUser({
        ...user,
        expenses: updatedExpenses,
        totalExpenses: updatedTotalExpenses,
        categories: updatedCategories
      })

    }
  }

  const addCategory = async () => {
    const numberOfCategories = user.categories.reduce((sum: number, category: any) => ++sum, 0);
    const index = numberOfCategories - defaultCategoriesNum
    const color = customCategoriesColor[index];
    const newCategory = await addCategoryToDB(newCategoryName, color)

    if (newCategory) {
      newCategory.total = 0
      setUser({
        ...user,
        categories: [...user.categories, newCategory]
      })
      setShowNewCategoryModal(false)
    }
  }

  return (
    <SafeAreaView className='h-full w-full bg-white'>
      <View className="flex-1 bg-red-500 relative">
        <View className="flex-1 justify-center items-center mt-12">
          <View className="flex-row items-center border-b border-white pb-2 w-3/4">
            <Text className="text-white text-3xl">$</Text>
            <TextInput
              className="flex-1 text-white text-4xl ml-2"
              keyboardType="numeric"
              value={`${expense.amount}`}
              onChangeText={(input) => {
                const amount = input ? parseFloat(input) : 0;
                setExpense({ ...expense, amount: amount });
              }}
              placeholder="0"
              placeholderTextColor="#ffffff88"
            />
          </View>
        </View>

        <View className="bg-white rounded-t-3xl p-6">
          <View className="mb-2 flex-row justify-between items-center">
            <Text className="text-gray-500">Category</Text>
            <TouchableOpacity
              onPress={() => setShowNewCategoryModal(true)}
            >
              <Text className="text-violet font-semibold">
                + Add New Category
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mb-4">
            <RNPickerSelect
              onValueChange={(input) => setExpense({ ...expense, category: input })}
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
              className="border border-gray-300 rounded-lg p-4 text-gray-700"
              placeholder="Enter description"
              placeholderTextColor="#9CA3AF"
              value={expense.description}
              onChangeText={(input) => setExpense({ ...expense, description: input })}
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
                },
              }}
            />
          </View>

          <View className="mb-4">
            <TouchableOpacity
              className="border border-dashed border-gray-300 rounded-lg p-4 flex-row justify-center items-center"
              onPress={() => setShowImageOptionsModal(true)}
            >
              <Text className="text-gray-500">📎 Add attachment</Text>
            </TouchableOpacity>
          </View>

          {attachments.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="my-2"
            >
              {attachments.map((uri, index) => (
                <View key={index} className="relative mr-2">
                  <TouchableOpacity
                    className="absolute z-10 right-1 top-1 bg-black bg-opacity-50 rounded-full px-1"
                    onPress={() => handleDeleteImage(index)}
                  >
                    <Text className="text-white">X</Text>
                  </TouchableOpacity>
                  <Image
                    source={{ uri }}
                    className="w-20 h-20 rounded-md"
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

          <TouchableOpacity
            className="bg-violet p-4 rounded-lg mt-6"
            onPress={() => addExpense()}
          >
            <Text className="text-white text-center text-lg font-bold">
              Add expense
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        transparent
        animationType="fade"
        visible={showSuccess}
        onRequestClose={() => setShowSucess(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="w-48 p-5 bg-white rounded-lg items-center">
            <Text className="text-lg font-bold text-emerald-400 mb-2">Success!</Text>
            <Text className="text-center text-gray-500">
              Your transaction was added successfully.
            </Text>
          </View>
        </View>
      </Modal>

      <Modal
        transparent
        animationType="slide"
        visible={showNewCategoryModal}
        onRequestClose={() => setShowNewCategoryModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="w-64 p-6 bg-white rounded-xl">
            <Text className="text-lg font-semibold text-gray-700 mb-3">
              Add New Category
            </Text>
            <TextInput
              className="border border-gray-300 rounded-md p-2 mb-3"
              placeholder="Category Name"
              placeholderTextColor="#9CA3AF"
              value={newCategoryName}
              onChangeText={(input) => setNewCategoryName(input)}
            />
            <View className="flex-row justify-between">
              <TouchableOpacity
                className="bg-gray-300 p-2 rounded-md"
                onPress={() => setShowNewCategoryModal(false)}
              >
                <Text className="text-gray-700">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-violet p-2 rounded-md"
                onPress={() => addCategory()}
              >
                <Text className="text-white">Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        transparent
        animationType="fade"
        visible={showImageOptionsModal}
        onRequestClose={() => setShowImageOptionsModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="w-64 p-6 bg-white rounded-xl">
            <Text className="text-lg font-semibold text-gray-700 mb-3">Add Attachment</Text>

            <TouchableOpacity
              className="bg-gray-300 p-3 rounded-md mb-3"
              onPress={pickFromGallery}
            >
              <Text className="text-center text-gray-700">Pick from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-gray-300 p-3 rounded-md" onPress={takePhoto}>
              <Text className="text-center text-gray-700">Take a Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="mt-4 p-2 rounded-md items-center"
              onPress={() => setShowImageOptionsModal(false)}
            >
              <Text className="text-gray-500">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Add;