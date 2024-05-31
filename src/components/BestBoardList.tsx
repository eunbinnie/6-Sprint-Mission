import React from "react";
import Image from "next/image";
import bestBadge from "@/src/assets/icons/best_badge.svg";
import BoardTitleImage from "./BoardTitleImage";
import { BoardListProps } from "./BoardList";
import likeImage from "@/src/assets/icons/favorite_icon.svg";

const BestBoardList = ({ list }: BoardListProps) => {
  const { createdAt, image, likeCount, title, writer } = list;
  const { nickname } = writer;
  const customDate = new Date(createdAt).toLocaleDateString();

  return (
    <li className="flex-1 grid gap-4 pb-4 px-6 bg-gray-50 rounded-[8px]">
      <Image src={bestBadge} alt="Best" width={102} height={30} />
      <div className="flex justify-between gap-2 h-[72px]">
        <BoardTitleImage title={title} image={image} />
      </div>
      <div className="flex justify-between items-center mt-[2px]">
        <div className="flex gap-2">
          <h6 className="text-sm text-gray-600 leading-12">{nickname}</h6>
          <div className="flex items-center gap-1">
            <Image src={likeImage} alt="좋아요" width={14} height={14} />
            <span className="text-sm leading-12 text-gray-500">
              {likeCount}
            </span>
          </div>
        </div>
        <span className="text-sm leading-12 text-gray-400">{customDate}</span>
      </div>
    </li>
  );
};

export default BestBoardList;