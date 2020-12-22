import Axios, {AxiosRequestConfig} from 'axios';

const BUSINESS_ID = 'eTC3QY5W3p_HmGHezKfxJw';
const BASE_URL = `http://api-gateway-dev.phorest.com/third-party-api-server/api/business/${BUSINESS_ID}`;
const USERNAME = 'global/cloud@apiexamples.com';
const PASSWORD = 'VMlRo/eh+Xd8M~l';

export const createRequest = async (axiosRequest: AxiosRequestConfig) => {
  axiosRequest.auth = {
    username: USERNAME,
    password: PASSWORD,
  };

  axiosRequest.baseURL = BASE_URL;

  if (axiosRequest.url) {
    if (axiosRequest.method === 'GET') {
      return await Axios.get(axiosRequest.url, axiosRequest);
    } else if (axiosRequest.method === 'POST') {
      return await Axios.post(
        axiosRequest.url,
        axiosRequest.data,
        axiosRequest,
      );
    }
  }
};
