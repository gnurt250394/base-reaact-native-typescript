import React, {Component} from 'react';
import {View, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import {connect} from 'react-redux';
// import firebase from 'react-native-firebase';
// import {Notification, NotificationOpen} from 'react-native-firebase';
import stringUtils from 'utils/string-utils';

import screenName from 'routers/screenName';
import {navigate} from 'routers/service/RootNavigation';
import strings from 'res/strings';
interface Props {}
class PushController extends Component<Props> {
  componentDidMount() {
    // Build a channel
    const channel = new firebase.notifications.Android.Channel(
      'jay-channel',
      'jay-channel',
      firebase.notifications.Android.Importance.Max,
    ).setDescription('JAY Notification channel');
    // Create the channel
    firebase.notifications().android.createChannel(channel);
    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (!enabled) {
          firebase
            .messaging()
            .requestPermission()
            .then(() => {
              // User has authorised
            })
            .catch(error => {
              // User has rejected permissions
            });
        }
      });

    firebase
      .messaging()
      .getToken()
      .then(token => {
        console.log('Device FCM Token: ', token);
        firebase.messaging().subscribeToTopic('test');
      });

    this.notificationListener = firebase
      .notifications()
      .onNotification(this.onNotification.bind(this));
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(this.onNotificationOpened.bind(this));
    this.notificationInitialListener = firebase
      .notifications()
      .getInitialNotification()
      .then(this.getInitialNotification.bind(this));
  }
  onNotification(notification) {
    console.log('notification: ', notification);
    if (!notification || notification.show_in_foreground) return;
    const type = notification.data.type;
    let title = notification.title;
    let data = notification.data;
    let body = notification?.body || '';
    let fbNotification = null;
    fbNotification = new firebase.notifications.Notification()
      .setNotificationId(stringUtils.guid())
      .setBody(body)
      .setTitle(title)
      .android.setChannelId('jay-channel')
      .android.setSmallIcon('ic_launcher')
      .android.setPriority(2)
      .setSound('default')
      .setData(data);
    firebase.notifications().displayNotification(fbNotification);
    // firebase
    //   .notifications()
    //   .setBadge(this.props.userApp.unReadNotificationCount + 1);
    // this.props.dispatch(redux.getUnreadNotificationCount());
    // firebase.notifications().setBadge(0);
  }
  onNotificationOpened(notificationOpen) {
    console.log('notificationOpen: ', notificationOpen);
    try {
      firebase
        .notifications()
        .removeDeliveredNotification(
          notificationOpen.notification.notificationId,
        );
      if (notificationOpen?.notification) {
        let {type, data} = notificationOpen.notification?.data;
        data = JSON.parse(data);
        console.log('data: ', data);
        switch (type) {
          case strings.type.jobRecived:
            navigate(screenName.receivedCv);
            break;

          default:
            if (type) {
            }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  getInitialNotification(notificationOpen) {
    console.log('notificationOpen: ', notificationOpen);
    if (notificationOpen) {
      try {
        firebase
          .notifications()
          .removeDeliveredNotification(
            notificationOpen.notification.notificationId,
          );
        const {data, type} = notificationOpen?.notification?.data;
        console.log('type: ', type);

        switch (type) {
          case strings.type.jobRecived:
            navigate(screenName.receivedCv);
            break;
          default:
            if (type) {
            }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  componentWillUnmount() {
    try {
      this.notificationInitialListener();
      this.notificationListener();
      this.notificationOpenedListener();
    } catch (error) {}
  }

  render() {
    return <View />;
  }
}
function mapStateToProps(state) {
  console.log('state: ', state);
  return {
    // userApp: state.auth.userApp,
  };
}
export default connect(mapStateToProps, null, null, {forwardRef: true})(
  PushController,
);
