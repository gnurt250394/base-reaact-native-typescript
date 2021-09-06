import Container from 'elements/Layout/Container';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface HomeScreenProps {}

const HomeScreen = (props: HomeScreenProps) => {
  return (
    <Container title="Trang chủ" style={styles.container}>
      <Text>HomeScreen</Text>
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {},
});
