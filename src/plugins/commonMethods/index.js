const commonMethods = {
  install(Vue) {
    /**
     * 使用預設圖片時顯示提示文字
     *
     * @param {string} imgUrl - 圖片路徑
     */
    const isDefaultImg = (imgUrl) => {
      if (imgUrl.indexOf('/img/') > -1) {
        return 'defaultImg';
      }
      return null;
    };

    /* eslint-disable no-param-reassign */
    Vue.prototype.$isDefaultImg = isDefaultImg;
    /* eslint-enable no-param-reassign */
  },
};

export default commonMethods;
