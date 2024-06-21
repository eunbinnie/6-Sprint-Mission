import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Profile from "../../Profile";
import { ArticleType } from "@/pages/boards";
import BoardTitleImage from "./BoardTitleImage";
import likeImg from "@/public/icons/favorite_icon.svg";

export interface BoardListProps {
  id?: number;
  list: ArticleType;
}

const BoardList = ({ id, list }: BoardListProps) => {
  const router = useRouter();
  const { title, createdAt, image, likeCount, writer } = list;
  const { nickname } = writer;
  const customDate = new Date(createdAt).toLocaleDateString();

  return (
    <>
      <div
        onClick={() => {
          router.push(`/board/${id}`);
        }}
        className="relative flex justify-between gap-2 min-h-12 cursor-pointer"
      >
        <BoardTitleImage title={title} image={image} />
      </div>
      <div className="flex justify-between gap-2">
        <div className="flex items-center flex-wrap gap-2">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <Profile />
          </div>
          <h6 className="text-sm text-gray-600 leading-[1.2]">{nickname}</h6>
          <span className="text-sm leading-[1.2] text-gray-400">
            {customDate}
          </span>
        </div>
        <div className="flex items-center gap-[10px]">
          <Image
            src={likeImg}
            alt="좋아요"
            width={20}
            className="cursor-pointer"
          />
          <span className="leading-[1.2] text-gray-500">{likeCount}</span>
        </div>
      </div>
    </>
  );
};

export default BoardList;