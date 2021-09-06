import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface CategoryScreenProps {}

const CategoryScreen = (props: CategoryScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>CategoryScreen</Text>
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {},
});
