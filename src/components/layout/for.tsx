import React from "react";

type ForProps<T> = {
  each?: T[];
  children?: (value: T, index: number) => React.ReactNode;
};
const For = <T,>({ each, children }: ForProps<T>) => {
  return each?.map((value, index) => children?.(value, index));
};
export default For;
