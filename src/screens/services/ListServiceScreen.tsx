import ButtonBase from 'components/button/ButtonBase';
import Container from 'components/Container';
import TextBase from 'components/text/TextBase';
import * as React from 'react';
import {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  Image,
} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import sizes from 'res/sizes';
import {MainParamList} from 'routers';
import {BaseNavigationProps} from 'routers/BaseNavigationProps';
import {UserScreens} from 'routers/screenName';
import {getTotal} from 'utils/other-utils';
import Item from './Item';

interface ListServiceScreenProps {}
export interface DataHair {
  name: string;
  price: number;
  isSelected?: boolean;
  id?: number;
  count?: number;
}

const ListServiceScreen = ({
  navigation,
  route,
}: BaseNavigationProps<MainParamList>) => {
  const [data, setData] = useState<DataHair[]>([
    {
      id: 1,
      name: 'Cắt tóc',
      price: 1000000,
    },
    {
      id: 2,
      name: 'Gội đầu',
      price: 200000,
    },
    {
      id: 3,
      name: 'Lấy ráy tai',
      price: 1000000,
    },
    {
      id: 4,
      name: 'Nhuộm',
      price: 1000000,
    },
    {
      id: 5,
      name: 'Cắt tóc',
      price: 1000000,
    },
    {
      id: 6,
      name: 'Gội đầu',
      price: 200000,
    },
    {
      id: 3,
      name: 'Lấy ráy tai',
      price: 1000000,
    },
    {
      id: 4,
      name: 'Nhuộm',
      price: 1000000,
    },
    {
      id: 5,
      name: 'Cắt tóc',
      price: 1000000,
    },
    {
      id: 6,
      name: 'Gội đầu',
      price: 200000,
    },
  ]);
  const onDecrease = (item, index) => {
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
  const _keyExtractor = (item, index) => index.toString();
  const renderBetweenItem = () => <View style={{height: sizes._10sdp}} />;
  const onPay = () => {
    let list = data.filter(e => e?.count);
    navigation.navigate(UserScreens.PaymentScreen, {data: list});
  };

  return (
    <Container hideBackButton title="Trang chủ" style={styles.container}>
      <FlatList
        data={data}
        renderItem={_renderItem}
        ItemSeparatorComponent={renderBetweenItem}
        contentContainerStyle={{
          paddingHorizontal: sizes._20sdp,
          paddingBottom: sizes._20sdp,
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={_keyExtractor}
      />
      <View style={styles.containerBottom}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={images.ic_bill} style={styles.icBill} />
          <View>
            <TextBase text={'Tổng cộng'} style={styles.txtTotal} />
            <TextBase
              text={getTotal(data).formatPrice() + 'đ'}
              style={styles.txtPriceTotal}
            />
          </View>
        </View>
        <ButtonBase text="Xác nhận" style={styles.buttonPay} onPress={onPay} />
      </View>
    </Container>
  );
};

export default ListServiceScreen;

const styles = StyleSheet.create({
  containerBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: sizes._20sdp,
    paddingBottom: sizes._10sdp,
    borderTopColor: colors.border,
    borderTopWidth: 1,
  },
  txtPriceTotal: {
    fontSize: sizes._15sdp,
    paddingTop: sizes._5sdp,
  },
  txtTotal: {
    color: colors.red,
    fontSize: sizes._18sdp,
    fontWeight: 'bold',
  },
  icBill: {
    height: sizes._35sdp,
    width: sizes._35sdp,
    resizeMode: 'contain',
    marginRight: sizes._10sdp,
  },
  buttonPay: {
    backgroundColor: colors.buttonColor,
    shadowColor: colors.buttonColor,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.7,
    marginBottom: sizes._25sdp,
    borderRadius: sizes._30sdp,
    paddingHorizontal: sizes._30sdp,
    marginTop: sizes._10sdp,
  },
  container: {
    backgroundColor: colors.white,
  },
});
