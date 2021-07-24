import ButtonBase from 'components/button/ButtonBase';
import TextBase from 'components/text/TextBase';
import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import sizes from 'res/sizes';
import {DataHair} from '../home/HomeScreen';

interface ItemProps {
  item: DataHair;
  index: number;
  onIncrease: (item: DataHair, index: number) => void;
  onDecrease: (item: DataHair, index: number) => void;
}

const Item = ({item, index, onDecrease, onIncrease}: ItemProps) => {
  const onIncreaseItem = () => {
    onIncrease && onIncrease(item, index);
  };
  const onDecreaseItem = () => {
    onDecrease && onDecrease(item, index);
  };
  return (
    <View style={styles.containerItem}>
      <View style={styles.containerName}>
        <TextBase text={item.name} style={styles.txtName} />
        <TextBase
          text={item.price.formatPrice() + 'đ'}
          style={{fontStyle: 'italic', color: colors.textColor}}
        />
      </View>
      {!!item.count && (
        <ButtonBase iconLeft={images.ic_minus} onPress={onDecreaseItem} />
      )}
      {!!item.count && <TextBase text={item.count?.toString()} />}
      <ButtonBase iconLeft={images.ic_add} onPress={onIncreaseItem} />
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  txtName: {
    fontWeight: '700',
    color: colors.textColor,
    paddingBottom: sizes._6sdp,
  },
  containerName: {
    flex: 1,
    paddingLeft: sizes._10sdp,
  },
  containerItem: {
    backgroundColor: colors.default,
    borderColor: colors.border,
    borderWidth: sizes._1sdp,
    padding: sizes._15sdp,
    borderRadius: sizes._8sdp,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {},
});
