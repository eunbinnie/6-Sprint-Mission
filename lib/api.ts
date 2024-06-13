import axios from "axios";

export interface GetArticlesQuery {
  page?: number;
  pageSize?: number;
  orderBy: "recent" | "like";
  keyword?: string;
}

export const getArticlesApi = async (option: GetArticlesQuery) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/articles`, {
    params: option,
  });
  const articles = res.data;
  return articles;
};
