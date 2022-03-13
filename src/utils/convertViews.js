const convertViews = (views) => {
  if (views >= 10000 && views < 1000000) {
    const arrNumber = views.toString().split('');
    arrNumber.splice(-3);
    return `${arrNumber.join('')}k`;
  }
  if (views >= 1000000) {
    const arrNumber = views.toString().split('');
    arrNumber.splice(-6);
    return `${arrNumber.join('')}m`;
  }
  return views;
};

export default convertViews;
