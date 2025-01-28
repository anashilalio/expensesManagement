import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AddCommunity from './AddCommunity';

interface CommunityProps {
  onBack: () => void;
}

const Community: React.FC<CommunityProps> = ({ onBack }) => {
  const [communityCode, setCommunityCode] = useState('');
  const [createCommunity, setCreateCommunity] = useState(false);
  if (createCommunity) {
    return <AddCommunity onBack={() => setCreateCommunity(false)} />
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-gray-50 px-4 py-4">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity
            onPress={onBack}
            className="p-2 mr-3 rounded-full bg-gray-200"
          >
            <Text className="text-gray-600">&larr;</Text>
          </TouchableOpacity>
          <Text className="flex-1 text-center text-xl font-semibold text-gray-900">
            Community
          </Text>
          <View className="w-8" />
        </View>

        <View className="bg-white rounded-2xl p-4 mb-4 shadow shadow-gray-300">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Join a Community
          </Text>
          <View className="flex-row items-center">
            <TextInput
              className="flex-1 h-12 border border-gray-300 rounded-lg px-3 mr-2 text-gray-800"
              placeholder="Enter Community Code"
              placeholderTextColor="#999"
              value={communityCode}
              onChangeText={setCommunityCode}
            />
            <TouchableOpacity className="h-12 px-4 bg-violet rounded-lg flex items-center justify-center">
              <Text className="text-white font-semibold">Join</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity className="mt-auto bg-violet rounded-lg py-4" onPress={() => setCreateCommunity(true)}>
          <Text className="text-center text-white font-semibold text-base">
            Create New Community
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Community;
