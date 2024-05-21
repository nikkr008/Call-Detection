import 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';

import Routes from './src/routes/routes';
import {UserProvider} from './src/utils/context';

export default function App() {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
}

const styles = StyleSheet.create({});
