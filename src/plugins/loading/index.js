import loadingComponent from '@/components/Loading.vue';

const loading = {
  install(Vue) {
    // 1. 創建子類
    const LoadingConstructor = Vue.extend(loadingComponent);

    // 2. 創建子類的實例並掛載到 div 上
    const loadingInstance = new LoadingConstructor({
      el: document.createElement('div'),
    });

    // 3. 掛載實例後，元素可用 $el 訪問，將元素新增至 document.body
    document.body.appendChild(loadingInstance.$el);

    // 4. 定義 Global 可用的 methods
    const loadingMethods = {
      show() {
        loadingInstance.show();
      },
      hide() {
        loadingInstance.hide();
      },
    };

    // 5. 註冊到 Global
    /* eslint-disable no-param-reassign */
    Vue.prototype.$loading = loadingMethods;
    /* eslint-enable no-param-reassign */
  },
};

export default loading;
