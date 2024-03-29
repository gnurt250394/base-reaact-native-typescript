import BottomSheet from 'components/bottomSheet/BottomSheet';
import {
  requestCameraPermission,
  requestGalleryPermission,
} from 'configs/Permission';
import Image from 'elements/Image';
import React from 'react';
import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {PermissionStatus} from 'react-native-permissions';
import colors from 'res/colors';
import images from 'res/images';
import strings from 'res/strings';
import scale from 'utils/scale';
const useImagePicker = () => {
  const onChooseCamera = (): Promise<ImageOrVideo> => {
    return new Promise((resolve, reject) => {
      requestCameraPermission(
        (isGranted: boolean, status: PermissionStatus) => {
          ImagePicker.openCamera({
            cropping: false,
            mediaType: 'photo',
          })
            .then((image: ImageOrVideo) => {
              // check độ dài của ảnh 10mb = 10485760 byte
              if (image && image.size > 10485760) {
                reject({message: strings.maxFileSize});
                return;
              }
              if (image) {
                resolve(image);
              }
            })
            .catch(err => {
              reject(err);
              if (err.message == 'User did not grant camera permission.') {
                // showPopup2Button(
                //   strings.permission.cameraTitle,
                //   strings.permission.cameraContent,
                //   strings.cancel,
                //   strings.settingLabel,
                //   undefined,
                //   () => {
                //     Linking.openSettings();
                //   },
                // );
              }
            });
        },
      );
    });
  };

  const onChoosePicker = (): Promise<ImageOrVideo> => {
    return new Promise((resolve, reject) => {
      requestGalleryPermission(
        (isGranted: boolean, status: PermissionStatus) => {
          ImagePicker.openPicker({
            cropping: false,
            mediaType: 'photo',
            // multiple: this.props.multipleChooseImage || false,
            maxFiles: 20,
          })
            .then((image: ImageOrVideo) => {
              // check độ dài của ảnh 10mb = 10485760 byte
              let isError = false;
              if (Array.isArray(image)) {
                image.map(i => {
                  if (i.size > 10485760) {
                    isError = true;
                  }
                });
              }

              if (!isError) {
                resolve(image);
                // this.state.callback && this.state.callback(image);
              } else {
                reject({message: strings.maxFileSize});
              }
            })
            .catch(err => {
              reject(err);
              if (err.message == 'User did not grant library permission.') {
                // showPopup2Button(
                //   strings.permission.libraryTitle,
                //   strings.permission.libraryContent,
                //   strings.cancel,
                //   strings.settingLabel,
                //   undefined,
                //   () => {
                //     Linking.openSettings();
                //   },
                // );
              }
            });
        },
      );
    });
  };
  return {onChoosePicker, onChooseCamera};
};
export default useImagePicker;
