import strings from 'res/strings';

export const renderPrice = item => {
  if (item?.fromPrice == 0 && item?.toPrice == 0) return 'Thoả thuận';
  return (
    item?.fromPrice?.formatPrice() +
    'đ' +
    ' - ' +
    item?.toPrice?.formatPrice() +
    'đ'
  );
};
export const getLevel = level => {
  switch (level) {
    case strings.level.unskilled:
      return strings.msg.level.unskilled;
    case strings.level.high:
      return strings.msg.level.high;
    case strings.level.postgraduate:
      return strings.msg.level.postgraduate;
    case strings.level.secondary:
      return strings.msg.level.secondary;
    case strings.level.university:
      return strings.msg.level.university;
    case strings.level.students:
      return strings.msg.level.students;

    default:
      return '';
  }
};

export const getTotal = (data: any[]): number => {
  let list = data.filter(e => e?.count);
  let price = list.reduce((acc, current) => {
    return acc + (current?.count || 0) * current.price;
  }, 0);
  return price;
};
