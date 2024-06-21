import React from "react";

const TextArea = ({
  id,
  value,
  onChange,
  placeholder,
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className=" text-gray-800 placeholder:text-gray-400 leading-[1.5] flex-1 focus:outline-0 w-full h-[282px] px-6 py-4 bg-gray-100 rounded-xl flex items-center gap-2 resize-none"
    />
  );
};

export default TextArea;
