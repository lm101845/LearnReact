/**
 * @Author liming
 * @Date 2022/11/12 10:39
 **/

const devBaseURL = "https://httpbin.org";
const proBaseURL = "https://production.org";
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: proBaseURL;

export const TIMEOUT = 5000;