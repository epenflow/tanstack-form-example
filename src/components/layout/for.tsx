import React from "react";
import { withMemo } from "~/lib/utils";

type ForProps<TFor> = {
  each?: TFor[];
  render?: (value: TFor, index: number) => React.ReactNode;
  children?: (value?: TFor, index?: number) => React.ReactNode;
};

const For = withMemo(<TFor,>({ each, children, render }: ForProps<TFor>) => {
  if (render && children) {
    throw new Error(
      'Only one of "children" or "render" should be provided, not both.'
    );
  }

  const memoize = React.useMemo(() => {
    if (children) {
      return React.Children.toArray(
        each?.map((value, index) => children(value, index))
      );
    } else if (render) {
      return React.Children.toArray(
        each?.map((value, index) => render(value, index))
      );
    } else {
      return null;
    }
  }, [children, render, each]);

  return memoize;
});
export default For;
