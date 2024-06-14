import React, { useEffect, useState } from "react";
import axios, { GetArticlesQuery } from "@/lib/axios";
import BoardList from "@/src/components/Boards/BoardList";
import Title from "@/src/components/Title";
import LinkButton from "@/src/components/LinkButton";
import SearchForm from "@/src/components/SearchForm";
import BestBoardList from "@/src/components/Boards/BestBoardList";
import Dropdown from "@/src/components/Dropdown";
import { orderByList } from "@/src/constants";
import useWindowSize from "@/src/hooks/useWindowSize";

export interface ArticleType {
  content: string;
  createdAt: string;
  id: number;
  image: string | null;
  likeCount: number;
  title: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
}

export interface ArticleArrayType {
  list: ArticleType[];
  totalCount: number;
}

const setBestPageSize = (category: string) => {
  if (category === "S") return 1;
  else if (category === "M") return 2;
  else return 3;
};

const Boards = ({ initialBestArticles, initialArticles }: any) => {
  const category = useWindowSize();

  // state
  const [articles, setArticles] =
    useState<ArticleArrayType["list"]>(initialArticles);
  const [bestArticles, setBestArticles] =
    useState<ArticleArrayType["list"]>(initialBestArticles);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [bestOption, setBestOption] = useState<GetArticlesQuery>({
    orderBy: "like",
    pageSize: 0,
  });
  const [option, setOption] = useState<GetArticlesQuery>({
    orderBy: "recent",
    keyword: "",
  });

  const onSubmitSearch = async () => {
    setOption({
      ...option,
      keyword: searchKeyword,
    });
  };

  const onChangeSearchInput: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setSearchKeyword(e.target.value);
    return;
  };

  useEffect(() => {
    setBestOption((prev) => ({
      ...prev,
      pageSize: setBestPageSize(category),
    }));
  }, [category, bestOption.pageSize]);

  useEffect(() => {
    const getBestArticles = async () => {
      try {
        const res = await axios.get("/articles", {
          params: bestOption,
        });
        const bestArticles = res.data;
        const { list }: { list: ArticleArrayType["list"] } = bestArticles;
        setBestArticles(list);
      } catch (error) {
        console.error("Failed to fetch best articles: ", error);
      }
    };

    getBestArticles();
  }, [bestOption]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const res = await axios.get("/articles", {
          params: option,
        });
        const articles = res.data;
        const { list }: { list: ArticleArrayType["list"] } = articles;
        setArticles(list);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    getArticles();
  }, [option]);

  return (
    <main className="max-w-[1200px] px-4 py-4 mx-auto grid gap-10 sm:px-6 sm:py-6 box-content">
      <section className="grid gap-4 md:gap-6">
        <Title>베스트 게시글</Title>
        <div className="flex gap-6">
          <ul className="flex w-full gap-6">
            {bestArticles?.map((best) => {
              return <BestBoardList id={best.id} key={best.id} list={best} />;
            })}
          </ul>
        </div>
      </section>

      <section className="grid gap-4 md:gap-6">
        <div className="flex items-center justify-between">
          <Title>게시글</Title>
          <LinkButton href={"/addboard"}>글쓰기</LinkButton>
        </div>
        <div className="flex items-center gap-2">
          <SearchForm
            value={searchKeyword}
            onChange={onChangeSearchInput}
            onSubmit={onSubmitSearch}
          />
          <Dropdown list={orderByList} setOption={setOption} />
        </div>
        <ul>
          {articles?.map((article) => {
            return (
              <li
                className="grid gap-4 py-6 border-b border-b-gray-200"
                key={article.id}
              >
                <BoardList id={article.id} list={article} />
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export const getServerSideProps = async () => {
  const bestOption: GetArticlesQuery = {
    orderBy: "like",
    pageSize: 0,
  };

  const option: GetArticlesQuery = {
    orderBy: "recent",
    keyword: "",
  };

  try {
    const [bestArticlesRes, articlesRes] = await Promise.all([
      axios.get("/articles", { params: bestOption }),
      axios.get("/articles", { params: option }),
    ]);

    const initialBestArticles = bestArticlesRes.data.list;
    const initialArticles = articlesRes.data.list;

    return {
      props: {
        initialBestArticles,
        initialArticles,
      },
    };
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return {
      props: {
        initialBestArticles: [],
        initialArticles: [],
      },
    };
  }
};

export default Boards;
