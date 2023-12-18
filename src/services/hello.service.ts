import { logger } from 'src/infrastructures/utils/logger.utils';

export const helloService = async (event: any): Promise<any | null> => {
  try {
    const data: any = {
      name: event?.name,
    };
    logger.info(data);
    return data;
  } catch (e) {
    console.error({ error: e?.message });
    return null;
  }
};
