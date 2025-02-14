export type ExtendChildren<
  TContext,
  TChild = ((context: TContext) => React.ReactNode) | React.ReactNode
> = {
  children?: TChild;
  render?: TChild;
};
export type ExtendClassName<TContext> = {
  className?: ((context: TContext) => string) | string;
};

export type ExtendChildrenParams<TExtendChildren> =
  ExtendChildren<TExtendChildren> & {
    context: TExtendChildren;
  };
export type OmitChildren<TOmit> = Omit<TOmit, "children">;
export type OmitProps<TExtend> = Omit<TExtend, "children" | "className">;
export type ExtendProps<TContext> = ExtendChildren<TContext> &
  ExtendClassName<TContext>;
export type ExtendClassNameParams<TContext> = ExtendClassName<TContext> & {
  context: TContext;
};
