import network from 'network/apis';
import API, {RequestMethod} from 'network/request';
import {NotificationParams} from './NotificationRequest';

class NotificationApi {
  getListNotification = <T>(params: NotificationParams) => {
    return API.request<T>(
      RequestMethod.GET,
      network.path.listNotifications,
      params,
    );
  };
  getReadNotification = <T>(params?: NotificationParams) => {
    return API.request<T>(
      RequestMethod.GET,
      network.path.getReadNotifications,
      params,
    );
  };
  readNotification = <T>(id: string) => {
    return API.request<T>(
      RequestMethod.GET,
      network.path.readNotifications + '/' + id,
    );
  };
}

export default new NotificationApi();
