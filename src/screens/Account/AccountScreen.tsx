import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface AccountScreenProps {}

const AccountScreen = (props: AccountScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>AccountScreen</Text>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {}
});
