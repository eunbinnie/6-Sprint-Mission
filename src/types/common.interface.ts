import React from "react";

// 자식 컴포넌트 타입
export interface ChildrenProps {
  children: React.ReactNode;
}

// input 타입
export interface InputPropertyType {
  value: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

// 정렬 기준 타입
export type OrderByListType = {
  text: string;
  key: "recent" | "like";
};
