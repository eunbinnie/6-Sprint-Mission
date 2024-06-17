import { InputPropertyType } from "@/src/types/common.interface";
import React from "react";

const Input = ({ value, onChange, placeholder }: InputPropertyType) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className=" text-gray-800 placeholder:text-gray-400 leading-[1.5] bg-transparent flex-1 focus:outline-0"
    />
  );
};

export default Input;
