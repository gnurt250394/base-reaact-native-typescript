import Container from 'components/Container';
import apis from 'controllers/apis';
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
import screenName from 'routers/screenName';
import {formatData} from 'utils/array-utils';
import colors from 'res/colors';
import strings from 'res/strings';
const NotificationScreen = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);

  const getData = async () => {
    try {
      let res = await apis.fetch(apis.path.listNotifications, {page, size});
      setData(formatData(res?.data?.data, page));
    } catch (error) {
      setData(formatData([], page));
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const getDate = (item, index) => {
    let notiTime = moment(item.create_at);
    if (index == 0) {
      let date = moment();
      if (date.format('DD/MM/YYYY') == notiTime.format('DD/MM/YYYY'))
        return <Text style={styles.txtDate}>Hôm nay</Text>;
      else
        return (
          <Text style={styles.txtDate}>
            Ngày {notiTime.format('DD/MM/YYYY')}
          </Text>
        );
    } else {
      let preNoti = data[index - 1];
      let preNotiDate = moment(preNoti.create_at);
      if (preNotiDate.format('DD/MM/YYYY') != notiTime.format('DD/MM/YYYY'))
        return (
          <Text style={styles.txtDate}>
            Ngày {notiTime.format('DD/MM/YYYY')}
          </Text>
        );
    }
    return null;
  };
  const onReadNoti = async (id) => {
    try {
      let res = await apis.put(apis.path.readNotifications + '/' + id);
    } catch (error) {}
  };
  const onViewNoti = (item) => () => {
    const data = JSON.parse(item?.data);
    console.log('data: ', data);

    onReadNoti(item?._id);
    switch (item?.type) {
      case strings.type.jobRecived:
        navigate(screenName.receivedCv);
        break;
      case strings.type.requestInterviewRecived:
        navigate(screenName.detailRequestInterviewScreen, {id: data?._id});
        break;

      default:
        break;
    }
  };
  const _renderItem = ({item, index}) => {
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
          <Text style={styles.txtNotiTitle}>{item?.title}</Text>
          <Text style={styles.txtNotiBody}>{item?.body}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const _onEndReached = () => {
    if (data?.length >= (page + 1) * size) setPage((page) => page + 1);
  };
  const _keyExtractor = (item, index) => index.toString();
  return (
    <Container title="Thông báo" hideBackButton>
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
    fontSize: 16,
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
