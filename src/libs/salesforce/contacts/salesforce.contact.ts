/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { ISalesForceLead } from '../../../infrastructures/interfaces/salesforce.leads';
import { logger } from '../../../infrastructures/utils/logger.utils';
import { refreshAccessToken } from '../../../infrastructures/token/accessToken';
import { httpClient } from '../../http/client.http';

export default class SalesforceClient {
  private baseUrl: string | undefined;
  private objectName: string | undefined;

  constructor() {
    this.baseUrl = process.env.SALESFORCE_API_BASE_URL;
    this.objectName = process.env.SALESFORCE_API_OBJECT_NAME2;
  }

  public async createLead(LeadData: ISalesForceLead): Promise<ISalesForceLead | any> {
    try {
      const accesstoken = await refreshAccessToken();
      const data = accesstoken.data?.access_token;
      logger.info('get my access token:  ', { data });
      const response = await httpClient.post(`${this.baseUrl}/sobjects/${this.objectName}`, LeadData, {
        headers: {
          Authorization: `Bearer ${data}`,
        },
      });

      return response;
    } catch (e: any) {
      logger.error('SalesforceClient: Error on Create Salesforce lead', { error: e?.message });

      return {} as ISalesForceLead;
    }
  }

  public async updateLead(leadId: string, leadData: ISalesForceLead): Promise<ISalesForceLead | any> {
    try {
      const accesstoken = await refreshAccessToken();
      const data = accesstoken.data?.access_token;
      logger.info('get my access token:  ', { data });
      const response: any = await httpClient.patch(`${this.baseUrl}/sobjects/${this.objectName}/${leadId}`, leadData, {
        headers: {
          Authorization: `Bearer ${data}`,
        },
      });

      return response;
    } catch (e: any) {
      logger.error('SalesforceClient: Error on Salesforce Update Lead', { error: e?.message });
      return {} as ISalesForceLead;
    }
  }
}
