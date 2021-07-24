import Container from 'components/Container';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {MainParamList} from 'routers';
import {BaseNavigationProps} from 'routers/BaseNavigationProps';
import {UserScreens} from 'routers/screenName';

interface PaymentSuccessScreenProps {}

const PaymentSuccessScreen = (
  props: BaseNavigationProps<MainParamList, UserScreens.PaymentSuccessScreen>,
) => {
  return (
    <Container
      title="Thanh toán thành công"
      hideBackButton
      style={styles.container}>
      <View></View>
    </Container>
  );
};

export default PaymentSuccessScreen;

const styles = StyleSheet.create({
  container: {},
});
