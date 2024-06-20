import Image from "next/image";
import React from "react";
import Input from "./Input";
import searchIcon from "@/public/icons/search_icon.svg";

interface SearchFormProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const SearchForm = ({ value, onChange, onSubmit }: SearchFormProps) => {
  const handleSubmitSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form
      onSubmit={handleSubmitSearch}
      className="w-full py-[9px] px-4 bg-gray-100 rounded-xl flex items-center gap-2"
    >
      <Image src={searchIcon} alt="검색" width={15} />
      <Input
        value={value}
        placeholder="검색할 상품을 입력해주세요"
        onChange={onChange}
      />
    </form>
  );
};

export default SearchForm;
