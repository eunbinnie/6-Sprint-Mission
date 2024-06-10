export interface IApiOption {
  orderBy: string;
  keyword: string;
}

export interface IBestApiOption {
  orderBy: string;
  pageSize: number;
}

const convertToRecord = (
  option: IApiOption | IBestApiOption
): Record<string, string> => {
  const record: Record<string, string> = {};
  Object.keys(option).forEach((key) => {
    record[key] = String((option as any)[key]);
  });
  return record;
};

export const getArticlesApi = async (option: IApiOption) => {
  const params = new URLSearchParams(convertToRecord(option)).toString();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles?${params}`
  );
  const body = await response.json();
  return body;
};

export const getBestArticlesApi = async (option: IBestApiOption) => {
  const params = new URLSearchParams(convertToRecord(option)).toString();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles?${params}`
  );
  const body = await response.json();
  return body;
};
