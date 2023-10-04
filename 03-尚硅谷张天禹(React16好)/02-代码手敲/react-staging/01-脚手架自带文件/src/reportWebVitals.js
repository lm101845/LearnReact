/*
 * @Author: liming
 * @Date: 2021-08-02 23:26:58
 * @LastEditTime: 2021-08-03 00:29:55
 * @FilePath: \react-staging\src\reportWebVitals.js
 */
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

// 这个文件用于监控页面性能的
