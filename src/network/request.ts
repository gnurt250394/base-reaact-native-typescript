import Axios from "axios";
import { logError, logResponse } from "utils/log-utils";
import { store } from "middlewares/stores";
import { logout } from "middlewares/actions/auth/actionLogin";
import strings from "res/strings";
import HostConfig from './HostConfig'
import { AuthReducer, UserProfile } from "middlewares/reducers/auth/loginReducer";
const codeMessage: any = {
  200: "Máy chủ đã trả lại thành công dữ liệu được yêu cầu.",
  201: "Dữ liệu mới hoặc đã sửa đổi thành công.",
  202: "Một yêu cầu đã vào hàng đợi nền (tác vụ không đồng bộ).",
  204: "Dữ liệu đã được xóa thành công.",
  400: "Đã xảy ra lỗi trong yêu cầu được gửi và máy chủ không tạo hoặc sửa đổi dữ liệu.",
  401: "Token không đúng hoặc hết hạn",
  403: "Người dùng được ủy quyền, nhưng truy cập bị cấm.",
  404: "Yêu cầu được gửi dành cho một bản ghi không tồn tại và máy chủ không hoạt động.",
  406: "Định dạng được yêu cầu không có sẵn.",
  410: "Tài nguyên được yêu cầu sẽ bị xóa vĩnh viễn và sẽ không còn nữa.",
  422: "Khi tạo một đối tượng, đã xảy ra lỗi xác thực.",
  500: "Đã xảy ra lỗi trong máy chủ, vui lòng kiểm tra máy chủ.",
  502: "Lỗi cổng.",
  503: "Dịch vụ không khả dụng và máy chủ tạm thời bị quá tải hoặc được bảo trì.",
  504: "Cổng vào đã hết thời gian chờ.",
};
/**
 * 异常处理程序
 */
String.prototype.absoluteUrl =
  String.prototype.absolute ||
  function (defaultValue) {
    var _this = this.toString();
    if (_this == "")
      if (defaultValue != undefined) return defaultValue;
      else return _this;

    if (_this.indexOf("http") == 0 || _this.indexOf("blob") == 0) {
      return _this;
    }
    let _this2 = _this.toLowerCase();
    if (
      _this2.endsWith(".jpg") ||
      _this2.endsWith(".png") ||
      _this2.endsWith(".gif") ||
      _this2.endsWith(".jpeg")
    ) {
      let image = HostConfig.BASE_URL + HostConfig.PREFIX + encodeURIComponent(_this + "") + "?alt=media";
      //
      return image;
    }
    if (
      !_this2.endsWith(".jpg") ||
      !_this2.endsWith(".png") ||
      _this2.endsWith(".gif") ||
      _this2.endsWith(".jpeg")
    ) {
      return defaultValue;
    }
    // if(this.startsWith("user"))

    //     return
    return HostConfig.BASE_URL + HostConfig.PREFIX + _this + "";
  };

/**
 * requset
 */

const request = Axios.create({
  baseURL: HostConfig.BASE_URL + HostConfig.PREFIX,
  timeout: 10000,
});
request.interceptors.request.use(
  (config) => {
    let auth: AuthReducer = store.getState()?.userProfile

    if (auth?.user?.loginToken && auth?.user?.loginToken.length > 0) {
      config.headers.Authorization = auth?.user?.loginToken;
    }
    config.headers.role = auth?.position;
    return config;
  },
  (err) => { }
);
request.interceptors.response.use(
  (resp) => {
    const { data, status } = resp;
    if (!status || Math.floor(status / 100) === 2) {
      return resp;
    }
    return Promise.reject(resp);
  },
  (error) => {
    const { response } = error;

    logError(error);
    if (response?.data?.type == "token") {
      store.dispatch(logout());
    }
    if (response) return Promise.reject(response);
    return Promise.reject(error);
  }
);
export default request;
