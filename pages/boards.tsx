import React, { useEffect, useState } from "react";
import { GetArticlesQuery, getArticlesApi } from "@/lib/api";
import BoardList from "@/src/components/BoardList";
import Title from "@/src/components/Title";
import LinkButton from "@/src/components/LinkButton";
import SearchForm from "@/src/components/SearchForm";
import BestBoardList from "@/src/components/BestBoardList";

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

const Boards = () => {
  // state
  const [articles, setArticles] = useState<ArticleArrayType["list"]>([]);
  const [bestArticles, setBestArticles] = useState<ArticleArrayType["list"]>(
    []
  );
  const [searchKeyword, setSearchKeyword] = useState("");
  const [bestOption, setBestOption] = useState<GetArticlesQuery>({
    orderBy: "like",
    pageSize: 3,
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
    const getBestArticles = async () => {
      try {
        const bestArticles: ArticleArrayType = await getArticlesApi(bestOption);
        const { list }: { list: ArticleArrayType["list"] } = bestArticles;
        setBestArticles(list);
      } catch (error) {
        console.error("Failed tooo fetch best articles: ", error);
      }
    };

    getBestArticles();
  }, []);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const articles: ArticleArrayType = await getArticlesApi(option);
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
              return <BestBoardList key={best.id} list={best} />;
            })}
          </ul>
        </div>
      </section>

      <section className="grid gap-4 md:gap-6">
        <div className="flex items-center justify-between">
          <Title>게시글</Title>
          <LinkButton href={"/"}>글쓰기</LinkButton>
        </div>
        <div className="flex items-center gap-2">
          <SearchForm
            value={searchKeyword}
            onChange={onChangeSearchInput}
            onSubmit={onSubmitSearch}
          />
        </div>
        <ul>
          {articles?.map((article) => {
            return (
              <li
                className="grid gap-4 py-6 border-b border-b-gray-200"
                key={article.id}
              >
                <BoardList list={article} />
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default Boards;
