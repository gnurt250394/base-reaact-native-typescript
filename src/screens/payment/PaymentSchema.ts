import * as Yup from 'yup';

export const PAYMENT_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .required('Vui lòng không để trống thông tin')
    .typeError('Vui lòng không để trống thông tin'),
});
