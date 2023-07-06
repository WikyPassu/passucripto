import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import NavigationStack from './src/routes/NavigationStack';

const App = () => {
  return (
    <View style={styles.body}>
      <StatusBar barStyle="light-content" backgroundColor="black"/>
      <NavigationStack />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#220035'
  },
});
