import strings from 'res/strings';
import * as Yup from 'yup';

export const checkPhoneNumberVietnamese = /(0)+([0-9]{9})\b/;
export const LOGIN_FORM_SCHEMA = Yup.object().shape({
  phone: Yup.string().required(strings.warningInputRequired).matches(checkPhoneNumberVietnamese, strings.isValidPhone),
  password: Yup.string().required(strings.warningInputRequired)
});

