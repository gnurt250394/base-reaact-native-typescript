export const formatData = (list, page) => (data) => {
  if (list.length == 0) {
    if (page == 0) {
      return [];
    } else {
      return data;
    }
  } else {
    if (page == 0) {
      return list;
    } else {
      return [...data, ...list];
    }
  }
};
export function findDateLastestInField(arr) {
  let array = [];
  var mostRecentDate = new Date(
    Math.max.apply(
      null,
      arr.map((e) => {
        return new Date(e.dateSelected);
      }),
    ),
  );
  console.log('mostRecentDate: ', mostRecentDate);
  array = arr.filter((e) => {
    var d = new Date(e.dateSelected);
    return d.getTime() == mostRecentDate.getTime();
  });
  return array;
}
