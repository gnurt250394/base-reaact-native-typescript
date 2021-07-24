import ButtonBase from 'components/button/ButtonBase';
import Container from 'components/Container';
import InputBase from 'components/Input/InputBase';
import {useTasks} from 'components/TaskProvider';
import TextBase from 'components/text/TextBase';
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import sizes from 'res/sizes';
import {MainParamList} from 'routers';
import {BaseNavigationProps} from 'routers/BaseNavigationProps';
import {CommonScreen, UserScreens} from 'routers/screenName';
import {reset} from 'routers/service/RootNavigation';
import {DataHair} from 'screens/home/HomeScreen';
import Item from 'screens/services/Item';
import {getTotal} from 'utils/other-utils';
import {useFormik} from 'formik';
import {PAYMENT_SCHEMA} from './PaymentSchema';

interface PaymentScreenProps {}

const PaymentScreen = ({
  route,
  navigation,
}: BaseNavigationProps<MainParamList, UserScreens.PaymentScreen>) => {
  const task = useTasks();
  const [data, setData] = useState(route.params.data || []);
  const [countItem, setCountItem] = useState(1);
  const onDecrease = (item, index) => {
    if (item.count == 1) return;
    let list = [...data];
    list[index]['count'] = Number(item.count || 0) - 1;
    setData(list);
  };
  const onIncrease = (item, index) => {
    let list = [...data];
    list[index]['count'] = Number(item.count || 0) + 1;
    setData(list);
  };
  const _renderItem: ListRenderItem<DataHair> = ({item, index}) => {
    return (
      <Item
        item={item}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
        index={index}
      />
    );
  };
  React.useLayoutEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);
  const _keyExtractor = (item, index) => index.toString();
  const renderBetweenItem = () => <View style={{height: sizes._10sdp}} />;
  const onConfirm = () => {
    task.createTask(values.name, data);
    reset(CommonScreen.Home);
  };
  const {values, errors, touched, handleChange, handleSubmit} = useFormik({
    initialValues: {name: ''},
    validationSchema: PAYMENT_SCHEMA,
    onSubmit: onConfirm,
  });

  const onShowItem = isShow => () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCountItem(isShow);
  };
  const renderFooter = () => {
    if (data.length >= 2) {
      return (
        <View>
          {countItem ? (
            <ButtonBase
              text="Xem thêm"
              textStyle={styles.txtShowMore}
              onPress={onShowItem(undefined)}
            />
          ) : (
            <ButtonBase
              text="Rút gọn"
              textStyle={styles.txtShowMore}
              onPress={onShowItem(1)}
            />
          )}
        </View>
      );
    }
    return null;
  };
  return (
    <Container title="Thanh toán" style={styles.container}>
      <View style={{paddingHorizontal: sizes._20sdp, flex: 1}}>
        <InputBase
          label={'Tên khách hàng'}
          isRequired={true}
          errors={errors}
          name="name"
          onChangeText={handleChange('name')}
          touched={touched}
          placeholder="Nhập tên khách hàng"
          style={{borderColor: colors.textColor, borderWidth: sizes._1sdp}}
        />
        <TextBase
          text={'Dịch vụ và sản phẩm đã chọn'}
          style={{
            fontSize: sizes._18sdp,
            fontWeight: 'bold',
            paddingBottom: sizes._10sdp,
          }}
        />
        <FlatList
          data={data.slice(0, countItem)}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={_keyExtractor}
          bounces={false}
          ListFooterComponent={renderFooter}
          ItemSeparatorComponent={renderBetweenItem}
        />
      </View>
      <View style={{}}>
        <View style={styles.containerTotal}>
          <TextBase text="Tổng cộng" style={styles.txtTotal} />
          <TextBase
            text={getTotal(data).formatPrice() + 'đ'}
            style={styles.txtTotal}
          />
        </View>
        <ButtonBase
          text={'Thanh toán'}
          style={styles.buttonPay}
          onPress={handleSubmit}
        />
      </View>
    </Container>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  txtShowMore: {
    color: colors.textColor,
    textDecorationLine: 'underline',
    fontWeight: '400',
  },
  containerTotal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: sizes._15sdp,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: sizes._20sdp,
  },
  txtTotal: {
    fontSize: sizes._19sdp,
    fontWeight: '600',
  },
  buttonPay: {
    backgroundColor: colors.buttonColor,
    shadowColor: colors.buttonColor,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.7,
    marginBottom: sizes._25sdp,
    borderRadius: sizes._30sdp,
    paddingHorizontal: sizes._50sdp,
    marginTop: sizes._10sdp,
  },
  container: {
    backgroundColor: colors.white,
  },
});
