export const helloService = async (event: any): Promise<any | null> => {
  try {
    const data = {
      name: event?.name,
    };
    console.log(data);
    return data;
  } catch (e) {
    console.error({ error: e?.message });
    return null;
  }
};
