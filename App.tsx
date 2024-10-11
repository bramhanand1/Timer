import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MultipleTimers from './component/MultiperTimers';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <MultipleTimers />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default App;
