import React, {memo} from 'react';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import {View, Text, StyleSheet} from 'react-native';
const {Popover, ContextMenu, NotAnimatedContextMenu, SlideInMenu} = renderers;
interface OptionArray {
  value: string;
}
interface Props {
  [key: string]: any;
  MenuSelectOption: React.ReactNode;
  options?: OptionArray[];
  customOption?: React.ReactNode;
  onSelected: (e: OptionArray, i: number) => void;
  placement?: 'bottom' | 'top' | 'left' | 'right';
  popover?: boolean;
}
const CustomMenu = ({
  MenuSelectOption,
  options,
  customOption,
  onSelected,
  placement = 'bottom',
  popover,
  ...props
}: Props) => {
  const onSelect = (e: OptionArray, i: number) => () => {
    onSelected && onSelected(e, i);
  };
  return (
    <Menu
      {...props}
      renderer={popover ? Popover : ContextMenu}
      rendererProps={{
        placement: placement,
        anchorStyle: {backgroundColor: '#00CBA7'},
      }}>
      <MenuTrigger>{MenuSelectOption}</MenuTrigger>
      <MenuOptions optionsContainerStyle={{}}>
        {customOption
          ? customOption
          : options?.length
          ? options.map((e, i) => {
              return (
                <MenuOption
                  key={i}
                  style={styles.containerOption}
                  onSelect={onSelect(e, i)}>
                  <View style={[styles.buttonAnwser]}>
                    <Text>{e.value}</Text>
                  </View>
                </MenuOption>
              );
            })
          : null}
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  containerOption: {
    borderBottomColor: '#00000020',
    borderBottomWidth: 1,
  },
  buttonAnwser: {
    // alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
});
export default memo(CustomMenu);
