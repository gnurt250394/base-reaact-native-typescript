import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CodePush from 'react-native-code-push';
import DeviceInfo from 'react-native-device-info';
import Modal from 'react-native-modal';

import * as Progress from 'react-native-progress';
import codepushUtils from 'utils/codepush-utils';
import colors from 'res/colors';
const VERSION = DeviceInfo.getVersion() + '.' + DeviceInfo.getBuildNumber();

interface IProgress {
  receivedBytes: number;
  totalBytes: number;
}
interface IProps {}
interface IState {
  isVisibleModal?: boolean;
  restartAllowed?: boolean;
  syncMessage?: string;
  progress?: IProgress;
}
class UpdateApp extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {restartAllowed: true, isVisibleModal: false};
  }

  componentDidMount() {
    // CodePush.getUpdateMetadata(CodePush.UpdateState.LATEST).then((update) => {
    //   console.log('update: ', update);
    //   // If the current app "session" represents the first time
    //   // this update has run, and it had a description provided
    //   // with it upon release, let's show it to the end user
    //   if (update?.isFirstRun && update?.description) {
    // Display a "what's new?" modal
    codepushUtils
      .checkupDate()
      .then(update => {
        if (update) {
          this.setState({isVisibleModal: true});
        }
      })
      .catch(err => {});
    //   }
    // });
  }

  codePushStatusDidChange(syncStatus) {
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.setState({syncMessage: 'Đang kiểm tra cập nhật'});
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({syncMessage: 'Đang tải xuống'});
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        this.setState({syncMessage: 'Awaiting user action.'});
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        this.setState({syncMessage: 'Installing update.'});
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        this.setState({
          syncMessage: 'App up to date.',
          progress: undefined,
          isVisibleModal: false,
        });
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        this.setState({
          syncMessage: 'Update cancelled by user.',
          progress: undefined,
          isVisibleModal: false,
        });
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        this.setState({
          syncMessage: 'Update installed and will be applied on restart.',
          progress: undefined,
          isVisibleModal: false,
        });
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        this.setState({
          syncMessage: 'Có lỗi xảy ra vui lòng thử lại!',
          progress: undefined,
        });
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    this.setState({progress});
  }

  toggleAllowRestart() {
    this.state.restartAllowed
      ? CodePush.disallowRestart()
      : CodePush.allowRestart();

    this.setState({restartAllowed: !this.state.restartAllowed});
  }

  getUpdateMetadata() {
    CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING).then(
      metadata => {
        this.setState({
          syncMessage: metadata
            ? JSON.stringify(metadata)
            : 'Running binary version',
          progress: undefined,
        });
      },
      error => {
        this.setState({syncMessage: 'Error: ' + error, progress: undefined});
      },
    );
  }

  /** Update is downloaded silently, and applied on restart (recommended) */
  sync() {
    CodePush.sync(
      {},
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this),
    );
  }

  /** Update pops a confirmation dialog, and then immediately reboots the app */
  syncImmediate() {
    CodePush.sync(
      {installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: undefined},
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this),
    );
  }
  onCloseModal = () => {
    this.setState({isVisibleModal: false});
  };

  render() {
    let progressView;
    if (this.state.progress) {
      let percent = Math.round(
        (100 * this.state.progress.receivedBytes) /
          this.state.progress.totalBytes,
      );
      progressView = (
        <View style={{paddingTop: 10}}>
          <Progress.Bar progress={percent / 100} width={200} />
          <Text style={styles.messages}>
            {this.state.progress.receivedBytes}/{this.state.progress.totalBytes}
          </Text>
        </View>
      );
    }
    return (
      <Modal
        isVisible={this.state.isVisibleModal}
        style={styles.containerModal}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        backdropOpacity={0.8}
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={0}
        backdropTransitionOutTiming={0}>
        <View style={styles.container}>
          <Text style={{textAlign: 'center', fontSize: 18}}>
            Ứng dụng đã có phiên bản mới. Bạn vui lòng cập nhật để có trải
            nghiệm tốt nhất!
          </Text>
          {progressView}
          <Text style={styles.messages}>{this.state.syncMessage || ''}</Text>
          <Text>Phiên bản {VERSION}</Text>
          <View style={styles.containerButtonUpdate}>
            <TouchableOpacity
              onPress={this.onCloseModal}
              style={[
                styles.buttonUpdate,
                {
                  borderRightColor: '#00000060',
                },
              ]}>
              <Text style={styles.txLabelButton}>Để sau</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.syncImmediate.bind(this)}
              style={styles.buttonUpdate}>
              <Text style={styles.txLabelButton}>Cập nhật</Text>
            </TouchableOpacity>
          </View>
          {/* {this.props.children} */}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  txLabelButton: {
    fontSize: 16,
    color: colors.text,
  },
  containerButtonUpdate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopColor: '#00000060',
    borderTopWidth: 1,
    width: '100%',
    marginTop: 20,
  },
  buttonUpdate: {
    padding: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
  },
  containerModal: {
    margin: 20,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingTop: 50,
    borderRadius: 10,
  },
  messages: {
    marginTop: 30,
    textAlign: 'center',
  },
  restartToggleButton: {
    color: 'blue',
    fontSize: 17,
  },
  syncButton: {
    color: 'green',
    fontSize: 17,
    marginVertical: 10,
  },
});

/**
 * Configured with a MANUAL check frequency for easy testing. For production apps, it is recommended to configure a
 * different check frequency, such as ON_APP_START, for a 'hands-off' approach where CodePush.sync() does not
 * need to be explicitly called. All options of CodePush.sync() are also available in this decorator.
 */
let codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  //   checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  updateDialog: false,
  installMode: CodePush.InstallMode.IMMEDIATE,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
};

export default CodePush(codePushOptions)(UpdateApp);
