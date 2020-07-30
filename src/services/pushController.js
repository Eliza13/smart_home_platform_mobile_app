import PushNotification from 'react-native-push-notification';
import { PushNotificationIOS } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-toast-native';


const configure = () => {
  console.log('Got in configure method');

  PushNotification.configure({

   onRegister: function(token) {
     //process token
   },

   onNotification: function(notification) {
     // process the notification
     console.log('Notification', notification);
     Actions.notifications();

     Toast.show('The user clicked me!', Toast.LONG, Toast.BOTTOM, 
     {  color: 'white', 
        backgroundColor: '#02a5bc',
        borderRadius: 40,
        fontSize: 15,
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10
     });
     // required on iOS only
     notification.finish(PushNotificationIOS.FetchResult.NoData);
   },

   permissions: {
     alert: true,
     badge: true,
     sound: true
   },

   popInitialNotification: true,
   requestPermissions: true
 });
};


const localNotification = () => {
    PushNotification.localNotification({
      autoCancel: true,
      bigText: "My big text that will be shown when notification is expanded",
      subText: "This is a subText",
      color: "green",
      vibrate: true,
      vibration: 300,
      title: "Notification Title",
      message: "Notification Message",
      playSound: true,
      soundName: 'default'
    });
};
   

export { configure, localNotification };