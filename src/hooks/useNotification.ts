import messaging from '@react-native-firebase/messaging';
import CallKeep from 'components/CallKeep';
import { useEffect, useState } from 'react';
import { DeviceEventEmitter } from 'react-native';

const useNotification = () => {
    const [shown, setShown] = useState(false);
    useEffect(() => {
        console.log('useEffect: useNotification');
        const unsubscribe = messaging().onMessage(async (remoteMessage: any): Promise<void> => {
            console.log('FCM Message Data:', remoteMessage);
            let data = JSON.parse(remoteMessage.data.data);
            if (data.type == 'call') {
                const callKeep = new CallKeep('adsfa', 'trung', 'dsafdsafds', 'android');

                callKeep.displayCallAndroid();
            }
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        DeviceEventEmitter.addListener('accept', () => {
            console.log('accept: ');
            //Do something!
        })
        DeviceEventEmitter.addListener('reject', () => {
            console.log('reject: ');
            //Do something!
        })
    }, [])

    return {
    };
};

export default useNotification;
