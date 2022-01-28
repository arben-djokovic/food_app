import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import BagScreen from './components/BagScreen';
import ProfileScreen from './components/ProfileScreen';
import { Provider } from 'react-redux';
import { store } from './redux/CombinedReducers';
import ItemScreen from './components/ItemScreen';
import SearchScreen from './components/SearchScreen';


export default function App() {
  const Stack = createNativeStackNavigator();


  return (<Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Bag" component={BagScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Item" component={ItemScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
});
