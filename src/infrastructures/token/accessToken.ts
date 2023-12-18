/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import axios, { AxiosResponse } from 'axios';

const salesforceClientId: string = process.env.SALESFORCE_CLIENT_ID;
const salesforceClientSecret: string = process.env.SALEESFORCE_CLIENT_SECRET;
const salesforceRefreshtoken: string = process.env.SALESFORCE_REFRESH_TOKEN;

export const refreshAccessToken = async (): Promise<any> => {
  const url: string = `https://morneaushepell3--hubspot.sandbox.my.salesforce.com/services/oauth2/token`;
  const data = {
    grant_type: 'refresh_token',
    client_id: salesforceClientId,
    client_secret: salesforceClientSecret,
    refresh_token: salesforceRefreshtoken,
  };

  try {
    const response: AxiosResponse<any> = await axios.post(url, new URLSearchParams(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    });
    return response;
  } catch (error: any) {
    console.error('Error refreshing access token:', error.message);
    throw error;
  }
};
