import { Slot } from "@radix-ui/react-slot";
import {
  functionalUpdate,
  useField,
  type DeepKeys,
  type DeepValue,
  type Validator,
} from "@tanstack/react-form";
import React from "react";
import For from "~/components/layout/for";
import { cn, withMemo } from "~/lib/utils";
import {
  extendChildren,
  useExtendChildren,
  useExtendClassName,
} from "../helper";
import Input from "../input";
import Label from "../label";
import {
  FormFieldContext,
  FormItemContext,
  onChangeExtend,
  onSubmitExtend,
  useFormField,
} from "./helper";
import {
  type AnyFieldApi,
  type ForFormFieldProps,
  type FormControlProps,
  type FormDescriptionProps,
  type FormFieldProps,
  type FormItemProps,
  type FormLabelProps,
  type FormMessageProps,
  type FormProps,
  type FormSubscriberProps,
} from "./type";

const Form = withMemo(
  <
    TFormData,
    TFormValidator extends Validator<TFormData, unknown> | undefined = undefined
  >({
    onSubmit,
    form,
    ...props
  }: FormProps<TFormData, TFormValidator>): React.ReactNode => {
    return (
      <form
        onSubmit={
          typeof onSubmit === "undefined"
            ? onSubmitExtend(form.handleSubmit)
            : onSubmit
        }
        {...props}
      />
    );
  }
);
export default Form;

export const FormField = withMemo((<
  TParentData,
  TName extends DeepKeys<TParentData>,
  TFieldValidator extends
    | Validator<DeepValue<TParentData, TName>, unknown>
    | undefined = undefined,
  TFormValidator extends
    | Validator<TParentData, unknown>
    | undefined = undefined,
  TData extends DeepValue<TParentData, TName> = DeepValue<TParentData, TName>
>({
  children,
  render,
  ...fieldOptions
}: FormFieldProps<
  TParentData,
  TName,
  TFieldValidator,
  TFormValidator,
  TData
>) => {
  const fieldApi = useField(fieldOptions);

  if (children && render) {
    throw new Error(
      'Only one of "children" or "render" should be provided, not both.'
    );
  }

  const jsxToDisplay = React.useMemo(
    () =>
      functionalUpdate(children ? children : render ? render : null, fieldApi),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [children, render, fieldApi.state.value, fieldApi.state.meta]
  );

  return (
    <FormFieldContext value={fieldApi}>{jsxToDisplay}</FormFieldContext>
  ) as never;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) satisfies React.FC<FormFieldProps<any, any, any, any, any>>);

export const FormSubscriber = withMemo(
  <
    TFormData,
    TFormValidator extends Validator<TFormData, unknown> | undefined = undefined
  >({
    form,
    children,
    render,
  }: FormSubscriberProps<TFormData, TFormValidator>) => {
    return (
      <form.Subscribe selector={(selector) => [selector]}>
        {([selector]) =>
          extendChildren({ children, render, context: selector })
        }
      </form.Subscribe>
    );
  }
);
export const ForFormField = withMemo(
  <
    TFormData,
    TFormValidator extends Validator<TFormData, unknown> | undefined
  >({
    form,
    schemas,
  }: ForFormFieldProps<TFormData, TFormValidator>) => {
    return (
      <For
        each={schemas}
        render={(schema, key) => {
          return (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <FormField<any, any, any, any, any>
              key={key}
              form={form}
              name={schema.name}
              render={(field: AnyFieldApi) => {
                return (
                  <FormItem>
                    <FormLabel>{schema.label}</FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-xs"
                        onChange={onChangeExtend(field.handleChange)}
                        onBlur={field.handleBlur}
                        autoComplete={schema.autoComplete}
                        placeholder={schema.placeholder}
                        type={schema.type}
                      />
                    </FormControl>
                    <FormMessage>{schema.description}</FormMessage>
                  </FormItem>
                );
              }}
            />
          );
        }}
      />
    );
  }
);
export const FormItem: React.FC<FormItemProps> = ({
  className,
  children,
  render,
  ...props
}) => {
  const id = React.useId();
  const jsxToDisplay = useExtendChildren({ context: { id }, children, render });

  return (
    <FormItemContext value={{ id }}>
      <div className={cn("space-y-2 flex flex-col", className)} {...props}>
        {jsxToDisplay}
      </div>
    </FormItemContext>
  );
};
FormItem.displayName = "FormItem";
export const FormLabel: React.FC<FormLabelProps> = ({
  className: _className,
  children,
  render,
  ...props
}) => {
  const field = useFormField();
  const jsxToDisplay = useExtendChildren({ children, render, context: field });
  const className = useExtendClassName({
    className: _className,
    context: field,
  });

  return (
    <Label
      className={cn(field.error && "text-destructive", className)}
      htmlFor={field.formItemId}
      {...props}>
      {jsxToDisplay}
    </Label>
  );
};
FormLabel.displayName = "FormLabel";

export const FormControl: React.FC<FormControlProps> = ({
  children,
  className: _className,
  render,
  ...props
}) => {
  const field = useFormField();
  const jsxToDisplay = useExtendChildren({ context: field, children, render });
  const className = useExtendClassName({
    context: field,
    className: _className,
  });

  return (
    <Slot
      id={field.formItemId}
      className={className}
      aria-describedby={
        !field.error
          ? `${field.formDescriptionId}`
          : `${field.formDescriptionId} ${field.formMessageId}`
      }
      aria-invalid={!!field.error}
      {...props}>
      {jsxToDisplay}
    </Slot>
  );
};
FormControl.displayName = "FormControl";

export const FormDescription: React.FC<FormDescriptionProps> = ({
  className: _className,
  children,
  render,
  ...props
}) => {
  const field = useFormField();
  const jsxToDisplay = useExtendChildren({ context: field, children, render });
  const className = useExtendClassName({
    className: _className,
    context: field,
  });

  return (
    <p
      id={field.formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}>
      {jsxToDisplay}
    </p>
  );
};
FormDescription.displayName = "FormDescription";

export const FormMessage: React.FC<FormMessageProps> = ({
  className: _className,
  children,
  render,
  ...props
}) => {
  const field = useFormField();

  const jsxToDisplay = React.useMemo(
    () =>
      field.error
        ? field.message
        : extendChildren({ context: field, children, render }),
    [field, children, render]
  );
  const className = useExtendClassName({
    className: _className,
    context: field,
  });

  if (!jsxToDisplay) {
    return null;
  }

  return (
    <p
      id={field.formMessageId}
      className={cn(
        "text-[0.8rem] font-medium text-muted-foreground",
        field.error && "text-destructive",
        className
      )}
      {...props}>
      {jsxToDisplay}
    </p>
  );
};
FormMessage.displayName = "FormMessage";
