import ButtonBase from 'components/button/ButtonBase';
import BottomModal from 'components/ModalBase/BottomModal';
import TextBase from 'components/text/TextBase';
import moment from 'moment';
import React, {
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useState,
  Ref,
} from 'react';
import {StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import colors from 'res/colors';
import sizes from 'res/sizes';
import strings from 'res/strings';
// import { formatDateDDMMYYYY, formatDateDD_MM_YY } from 'utils/DateTimeUtils';

type TimeType = 'date' | 'time' | 'datetime';
interface Props {
  title?: string;
  value?: string;
  type?: TimeType;
  onPressClose?: (date: Date) => void;
}
export interface RefDatePickerProps {
  datePicker: any;
  showModal: () => void;
}
const DateTimePicker = React.memo(
  forwardRef((props: Props, ref: Ref<RefDatePickerProps>) => {
    const [date, setDate] = useState<Date>(new Date());
    const datePickerRef = useRef<BottomModal>(null);

    React.useImperativeHandle(ref, () => ({
      datePicker: datePickerRef,
      showModal,
    }));

    useEffect(() => {
      if (props.value) setDate(moment(props.value, 'DD/MM/YYYY').toDate());
    }, [props.value]);
    const showModal = () => {
      datePickerRef?.current?.showModal();
    };

    const onPressClose = () => {
      if (props.onPressClose) props.onPressClose(date);
      datePickerRef?.current?.closeModal();
    };

    var renderDatePicker = useCallback(() => {
      return (
        <View style={{paddingVertical: sizes._20sdp}}>
          <TextBase
            text={props.title ?? 'Chọn ngày'}
            style={modalDatePicker.textTitle}
          />
          <DatePicker
            date={date}
            onDateChange={setDate}
            mode={props.type || 'date'}
            style={modalDatePicker.datePicker}
            locale="vi"
          />
          <ButtonBase
            onPress={onPressClose}
            text={'Cập nhật'}
            style={modalDatePicker.styleButton}
            textStyle={modalDatePicker.textButton}
          />
        </View>
      );
    }, [date]);

    return (
      <BottomModal
        ref={datePickerRef}
        renderContent={renderDatePicker}
        height={sizes._340sdp}
      />
    );
  }),
);

export default DateTimePicker;

const modalDatePicker = StyleSheet.create({
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
