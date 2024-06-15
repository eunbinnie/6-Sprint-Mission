import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { OrderByListType } from "../types/common.interface";
import { GetArticlesQuery } from "@/lib/axios";
import toggleIcon from "@/public/icons/toggle_icon.svg";

type PropsType = {
  list: OrderByListType[];
  setOption: React.Dispatch<React.SetStateAction<GetArticlesQuery>>;
};

const Dropdown = (props: PropsType) => {
  const DropdownRef = useRef<HTMLDivElement | null>(null);
  const { list, setOption } = props;
  const [view, setView] = useState(false);
  const [selected, setSelected] = useState(list[0].text);

  const handleDropDownClick = () => {
    setView(!view);
  };

  const handleOptionClick = (key: "recent" | "like") => () => {
    setOption({
      orderBy: `${key}`,
    });
    const selectedItem = list.find((item) => item.key === key);
    if (selectedItem) {
      setSelected(selectedItem.text);
    }
    setView(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        DropdownRef.current &&
        !DropdownRef.current.contains(event.target as Node)
      ) {
        setView(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [DropdownRef]);

  return (
    <div className="relative" ref={DropdownRef}>
      <button
        onClick={handleDropDownClick}
        className="w-[130px] px-5 py-2 cursor-pointer border border-gray-200 rounded-xl flex justify-between"
      >
        <span>{selected}</span>
        <div className="w-6 h-6 flex justify-center items-center">
          <Image src={toggleIcon} alt="더보기" />
        </div>
      </button>
      {view && (
        <ul className="absolute mt-1 w-[130px] border border-gray-200 rounded-xl bg-white z-[1] transition-transform">
          {list?.map((i, index) => {
            return (
              <li
                key={index}
                onClick={handleOptionClick(i.key)}
                className="cursor-pointer text-center leading-[1.5] py-[9px] border-b border-b-gray-200 last-of-type:border-b-0"
              >
                {i.text}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
