import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import colors from 'res/colors';
import images from 'res/images';
import sizes from 'res/sizes';

interface Props {
  height?: number;
  renderContent: () => React.ReactElement;
  onClose?: () => void;
}

interface States {
  isVisible: boolean;
}

class BottomModal extends React.PureComponent<Props, States> {
  modal?: Modal;

  state = {
    isVisible: false,
  };

  closeModal = () => {
    this.setState(
      {
        isVisible: false,
      },
      () => {
        this.props.onClose && this.props.onClose();
      },
    );
  };

  showModal = () => {
    this.setState({
      isVisible: true,
    });
  };

  render() {
    return (
      <Modal isVisible={this.state.isVisible} onBackdropPress={this.closeModal}>
        <View
          style={[
            style.bsView,
            {
              height: this.props.height,
            },
          ]}>
          {/* <TouchableOpacity style={style.icClose} onPress={this.closeModal}>
            <Image source={images.ic_reject} style={style.ic} />
          </TouchableOpacity> */}
          {this.props.renderContent()}
        </View>
      </Modal>
    );
  }
}

export default BottomModal;

const style = StyleSheet.create({
  icClose: {
    position: 'absolute',
    top: sizes._20sdp,
    right: sizes._20sdp,
    zIndex: 999,
  },
  ic: {
    tintColor: colors.black,
  },
  bsView: {
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: sizes._20sdp,
    width: '100%',
    borderRadius: sizes._18sdp,
  },
});
