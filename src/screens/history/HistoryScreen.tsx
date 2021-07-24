import Container from 'components/Container';
import {useTasks} from 'components/TaskProvider';
import TextBase from 'components/text/TextBase';
import * as React from 'react';
import {Text, View, StyleSheet, FlatList, ListRenderItem} from 'react-native';
import colors from 'res/colors';
import sizes from 'res/sizes';
import {getTotal} from 'utils/other-utils';

interface HistoryScreenProps {}
interface ServiceProps {
  name: string;
  price: number;
  count: number;
}
interface HistoryItemProps {
  services: ServiceProps[];
  date: Date;
  name: string;
}
const HistoryScreen = (props: HistoryScreenProps) => {
  const task = useTasks();
  console.log('task: ', task.tasks);
  const _renderItem: ListRenderItem<HistoryItemProps> = ({item, index}) => {
    return (
      <View style={styles.containerItem}>
        <TextBase text={item.name} style={styles.txtName} />
        <TextBase
          text={item.date.format('HH:mm thu dd/MM/YYYY')}
          style={styles.txtDate}
        />
        <View style={styles.containerContent}>
          {item.services?.map((service, i) => {
            return (
              <View key={i} style={styles.contentName}>
                <TextBase>
                  {service.name}
                  <TextBase text={' × '} style={styles.txtX} /> {service.count}
                </TextBase>
                <TextBase
                  text={
                    (service.price * (service.count || 1)).formatPrice() + 'đ'
                  }
                />
              </View>
            );
          })}
          <View style={styles.containerTotal}>
            <TextBase text={'Tổng cộng'} style={styles.txtTotal} />
            <TextBase
              text={getTotal(item.services).formatPrice() + 'đ'}
              style={styles.txtTotal}
            />
          </View>
        </View>
      </View>
    );
  };
  const _keyExtractor = (item, index) => index.toString();
  return (
    <Container title="Lịch sử" style={styles.container}>
      <FlatList
        data={task.tasks}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
      />
    </Container>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  txtName: {
    fontSize: sizes._16sdp,
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: sizes._10sdp,
    paddingBottom: sizes._5sdp,
  },
  containerTotal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: sizes._10sdp,
    paddingVertical: sizes._10sdp,
    // borderTopWidth: 1,
    // borderTopColor: colors.border,
  },
  txtX: {
    fontWeight: 'bold',
    color: colors.seagreen,
  },
  contentName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: sizes._10sdp,
    marginHorizontal: sizes._10sdp,
  },
  containerContent: {
    borderRadius: sizes._5sdp,
    shadowColor: colors.black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.1,
    backgroundColor: colors.white,
    marginHorizontal: sizes._10sdp,
  },
  txtDate: {
    fontSize: sizes._13sdp,
    fontWeight: '600',
    textAlign: 'center',
    paddingBottom: sizes._10sdp,
  },
  containerItem: {
    marginTop: sizes._10sdp,
  },
  txtTotal: {
    fontSize: sizes._16sdp,
    fontWeight: '700',
  },
  container: {},
});
