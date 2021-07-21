import BottomModal from 'components/ModalBase/BottomModal';
import TextBase from 'components/text/TextBase';
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  Ref,
  forwardRef,
} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import sizes from 'res/sizes';
import Picker from '@gregfrench/react-native-wheel-picker';
import ButtonBase from 'components/button/ButtonBase';
import colors from 'res/colors';
var PickerItem = Picker.Item;
export interface OptionMenuBottom {
  value: string | number;
  label: string;
  type?: string;
}
interface BottomSheetMenuProps {
  onPressClose: (option?: OptionMenuBottom) => void;
  title?: string;
  value?: string;
  listOptions?: OptionMenuBottom[];
}
export interface RefBottomSheetMenuProps {
  datePicker: Ref<BottomModal>;
  showModal: () => void;
}
const BottomSheetMenu = (
  props: BottomSheetMenuProps,
  ref: Ref<RefBottomSheetMenuProps>,
) => {
  const datePickerRef = useRef<BottomModal>(null);
  const [selectedItem, setSelectedItem] = useState<OptionMenuBottom>();
  const [value, setValue] = useState<string>('');
  // const [listOptions, setListOptions] = useState<OptionMenuBottom[]>([]);
  useEffect(() => {
    let isSelected = props?.listOptions?.find(e => e.value == props?.value);
    console.log('isSelected: ', isSelected);
    if (props?.value && isSelected) {
      console.log('props?.value: ', props?.value);
      setValue(props?.value);
      setSelectedItem(isSelected);
    } else {
      setValue(props?.listOptions?.[0]?.value || '');
      setSelectedItem(props?.listOptions?.[0]);
    }
  }, [props?.value, props?.listOptions]);
  React.useImperativeHandle(ref, () => ({
    datePicker: datePickerRef,
    showModal,
  }));
  const showModal = () => {
    datePickerRef?.current?.showModal();
  };
  const onPressClose = () => {
    if (props?.onPressClose) {
      props?.onPressClose(selectedItem);
    }
    datePickerRef?.current?.closeModal();
  };

  const onValueChange = (value: string) => {
    setValue(value);
    let selected = props?.listOptions?.find(option => option.value == value);
    if (selected) setSelectedItem(selected);
  };
  const renderBottomMennu = useCallback(() => {
    return (
      <View style={{paddingVertical: sizes._20sdp}}>
        <TextBase text={props.title ?? 'Chọn ngày'} style={styles.textTitle} />
        <Picker
          style={{height: 180}}
          lineColor="#000000" //to set top and bottom line color (Without gradients)
          // lineGradientColorFrom="#008000" //to set top and bottom starting gradient line color
          // lineGradientColorTo="#FF5733" //to set top and bottom ending gradient
          selectedValue={value}
          // itemStyle={{color: 'black', fontSize: 26}}
          onValueChange={onValueChange}>
          {props?.listOptions?.map((item, i) => (
            <PickerItem label={item.label} value={item.value} key={i} />
          ))}
        </Picker>
        <ButtonBase
          onPress={onPressClose}
          text={'Cập nhật'}
          style={styles.styleButton}
          textStyle={styles.textButton}
        />
      </View>
    );
  }, [selectedItem, value, props?.listOptions]);
  return (
    <BottomModal
      ref={datePickerRef}
      renderContent={renderBottomMennu}
      // height={sizes._340sdp}
    />
  );
};

export default forwardRef(BottomSheetMenu);

const styles = StyleSheet.create({
  styleButton: {
    backgroundColor: colors.buttonColor,
    margin: sizes._10sdp,
    paddingVertical: sizes._10sdp,
    paddingHorizontal: sizes._40sdp,
    height: 'auto',
  },
  textButton: {
    color: colors.white,
    fontWeight: '600',
    fontSize: sizes._font_size_17,
  },
  textTitle: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: sizes._19sdp,
    lineHeight: sizes._23sdp,
  },
  datePicker: {
    alignSelf: 'center',
    height: sizes._210sdp,
    paddingVertical: sizes._30sdp,
  },
});
