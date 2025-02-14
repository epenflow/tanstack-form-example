import type { Slot } from "@radix-ui/react-slot";
import {
  ReactFormExtendedApi,
  type DeepKeys,
  type DeepValue,
  type FieldApi,
  type FormState,
  type Validator,
} from "@tanstack/react-form";
import type { UseFieldOptions } from "node_modules/@tanstack/react-form/dist/esm/types";
import type React from "react";
import type { LabelProps } from "../label";
import type {
  ExtendChildren,
  ExtendProps,
  OmitChildren,
  OmitProps,
} from "../type";

export type FormProps<
  TFormData,
  TFormValidator extends Validator<TFormData, unknown> | undefined = undefined
> = React.ComponentProps<"form"> & {
  form: ReactFormExtendedApi<TFormData, TFormValidator>;
};

export type FormFieldProps<
  TParentData,
  TName extends DeepKeys<TParentData>,
  TFieldValidator extends
    | Validator<DeepValue<TParentData, TName>, unknown>
    | undefined = undefined,
  TFormValidator extends
    | Validator<TParentData, unknown>
    | undefined = undefined,
  TData extends DeepValue<TParentData, TName> = DeepValue<TParentData, TName>
> = ExtendChildren<
  FieldApi<TParentData, TName, TFieldValidator, TFormValidator, TData>,
  (
    fieldApi: FieldApi<
      TParentData,
      TName,
      TFieldValidator,
      TFormValidator,
      TData
    >
  ) => React.ReactNode
> &
  UseFieldOptions<TParentData, TName, TFieldValidator, TFormValidator, TData>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFieldApi = FieldApi<any, any, any, any, any>;

export type FormFieldContextValue<
  TParentData,
  TName extends DeepKeys<TParentData>,
  TFieldValidator extends
    | Validator<DeepValue<TParentData, TName>, unknown>
    | undefined = undefined,
  TFormValidator extends
    | Validator<TParentData, unknown>
    | undefined = undefined,
  TData extends DeepValue<TParentData, TName> = DeepValue<TParentData, TName>
> = FieldApi<TParentData, TName, TFieldValidator, TFormValidator, TData>;

export type FormItemContextValue = { id: string };

export type UseFormFieldReturnType = {
  id: string;
  error: boolean;
  message: string;
  formItemId: string;
  formDescriptionId: string;
  formMessageId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldApi: FormFieldContextValue<any, any, any, any, any>;
};

export type FormItemProps = OmitChildren<React.ComponentProps<"div">> &
  ExtendChildren<Pick<UseFormFieldReturnType, "id">>;

export type FormLabelProps = OmitProps<LabelProps> &
  ExtendProps<UseFormFieldReturnType>;

export type FormControlProps = OmitProps<React.ComponentProps<typeof Slot>> &
  ExtendProps<UseFormFieldReturnType>;

export type FormDescriptionProps = OmitProps<React.ComponentProps<"p">> &
  ExtendProps<UseFormFieldReturnType>;

export type FormMessageProps = OmitProps<React.ComponentProps<"p">> &
  ExtendProps<UseFormFieldReturnType>;

export type FormSubscriberProps<
  TFormData,
  TFormValidator extends Validator<TFormData, unknown> | undefined = undefined
> = {
  form: ReactFormExtendedApi<TFormData, TFormValidator>;
} & ExtendChildren<FormState<TFormData>>;
export type FormFieldSchema<TName> = {
  name: DeepKeys<TName>;
  label: string;
  description?: string;
} & Pick<
  React.ComponentProps<"input">,
  "type" | "placeholder" | "autoComplete"
>;

export type ForFormFieldProps<
  TFormData,
  TFormValidator extends Validator<TFormData, unknown> | undefined = undefined
> = {
  form: ReactFormExtendedApi<TFormData, TFormValidator>;
  schemas: FormFieldSchema<TFormData>[];
};
