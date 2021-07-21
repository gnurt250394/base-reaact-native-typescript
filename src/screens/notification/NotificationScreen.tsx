import Container from 'components/Container';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import moment from 'moment';

import {navigate} from 'routers/service/RootNavigation';
import {formatData} from 'utils/array-utils';
import colors from 'res/colors';
import strings from 'res/strings';
import {BaseNavigationProps} from 'routers/BaseNavigationProps';
import {MainParamList} from 'routers';
import {CommonScreen, PartnerScreens} from 'routers/screenName';
import sizes from 'res/sizes';
import TextBase from 'components/text/TextBase';
import NotificationApi from 'network/apis/notification/NotificationApi';
import {NotificationParams} from 'network/apis/notification/NotificationRequest';
import {NotificationResponse} from 'network/apis/notification/NotificationResponse';
const NotificationScreen = ({
  navigation,
  route,
}: BaseNavigationProps<MainParamList>) => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(20);

  const getData = async () => {
    try {
      let res = await NotificationApi.getListNotification<NotificationResponse>(
        {page, size},
      );
      setData(formatData(res?.data?.data, page));
    } catch (error) {
      setData(formatData([], page));
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const getDate = (item: any, index: number) => {
    let notiTime = moment(item.create_at);
    if (index == 0) {
      let date = moment();
      if (date.format('DD/MM/YYYY') == notiTime.format('DD/MM/YYYY'))
        return <TextBase style={styles.txtDate}>Hôm nay</TextBase>;
      else
        return (
          <TextBase style={styles.txtDate}>
            Ngày {notiTime.format('DD/MM/YYYY')}
          </TextBase>
        );
    } else {
      let preNoti = data[index - 1];
      let preNotiDate = moment(preNoti.create_at);
      if (preNotiDate.format('DD/MM/YYYY') != notiTime.format('DD/MM/YYYY'))
        return (
          <TextBase style={styles.txtDate}>
            Ngày {notiTime.format('DD/MM/YYYY')}
          </TextBase>
        );
    }
    return null;
  };
  const onReadNoti = async (id: string) => {
    try {
      let res = await NotificationApi.readNotification(id);
    } catch (error) {}
  };
  const onViewNoti = (item: any) => () => {
    const data = JSON.parse(item?.data);
    console.log('data: ', data);

    onReadNoti(item?._id);
    // switch (item?.type) {
    //   case TypeCommon.jobRecived:
    //     navigate(CommonScreen.ReceivedCvScreen);
    //     break;
    //   case TypeCommon.requestInterviewRecived:
    //     navigate(CommonScreen.DetailRequestInterviewScreen, {id: data?._id});
    //     break;

    //   default:
    //     break;
    // }
  };
  const _renderItem = ({item, index}: any) => {
    return (
      <View style={{}}>
        {getDate(item, index)}
        <TouchableOpacity
          onPress={onViewNoti(item)}
          style={[
            {
              backgroundColor: item?.isRead ? colors.white : '#6495ed40',
            },
            styles.containerButton,
          ]}>
          <TextBase style={styles.txtNotiTitle}>{item?.title}</TextBase>
          <TextBase style={styles.txtNotiBody}>{item?.body}</TextBase>
        </TouchableOpacity>
      </View>
    );
  };
  const _onEndReached = () => {
    if (data?.length >= (page + 1) * size) setPage(page => page + 1);
  };
  const _keyExtractor = (item: any, index: number) => index.toString();
  return (
    <Container title="Thông báo" hideButtonRight={true}>
      <FlatList
        data={data}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
        onEndReached={_onEndReached}
        onEndReachedThreshold={0.7}
      />
    </Container>
  );
};
const styles = StyleSheet.create({
  txtNotiBody: {color: colors.gray},
  txtNotiTitle: {
    color: colors.text,
    fontSize: sizes._16sdp,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  containerButton: {
    borderColor: '#6495ed40',
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
  txtDate: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
    color: colors.text,
  },
});
export default NotificationScreen;
