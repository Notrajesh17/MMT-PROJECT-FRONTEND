import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TravelerNavigator from './TravelerNavigation';
import SplashScreen from '../screens/SplashScreen';
import AuthStack from './AuthStack';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="Dashboard" component={TravelerNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
