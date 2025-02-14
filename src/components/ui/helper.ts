import React from "react";
import type { ExtendChildrenParams, ExtendClassNameParams } from "./type";

export function useExtendChildren<TExtendChildren>({
  children,
  render,
  context,
}: ExtendChildrenParams<TExtendChildren>) {
  if (children && render) {
    throw new Error(
      'Only one of "children" or "render" should be provided, not both.'
    );
  }
  return React.useMemo(() => {
    if (typeof children === "function") {
      return children(context);
    } else if (children) {
      return children;
    } else if (typeof render === "function") {
      return render(context);
    } else if (render) {
      return render;
    } else {
      return null;
    }
  }, [children, render, context]);
}

export function extendChildren<TExtendChildren>({
  children,
  render,
  context,
}: ExtendChildrenParams<TExtendChildren>): React.ReactNode {
  if (children && render) {
    throw new Error(
      'Only one of "children" or "render" should be provided, not both.'
    );
  }

  if (typeof children === "function") {
    return children(context);
  } else if (children) {
    return children;
  } else if (typeof render === "function") {
    return render(context);
  } else if (render) {
    return render;
  } else {
    return null;
  }
}

export function extendClassName<TContext>({
  className,
  context,
}: ExtendClassNameParams<TContext>) {
  if (typeof className === "function") {
    return className(context);
  }
  return className;
}
export function useExtendClassName<TContext>({
  className,
  context,
}: ExtendClassNameParams<TContext>) {
  return React.useMemo(() => {
    if (typeof className === "function") {
      return className(context);
    }
    return className;
  }, [className, context]);
}
