import type { StandardSchemaV1Issue } from "@tanstack/react-form";
import React from "react";

export type FormFieldItemContextValues = {
  id: string;
  name: string;
  hasError: boolean;
  errors: StandardSchemaV1Issue[];
  formFieldItemId: string;
  formFieldDescriptionId: string;
  formFieldMessageId: string;
};

export const FormFieldItemContext = React.createContext<
  FormFieldItemContextValues | undefined
>(undefined);

export const useFormFieldItemContext = () => {
  const context = React.useContext(FormFieldItemContext);

  if (typeof context === "undefined")
    throw new Error(
      "useFormFieldItem should be used within <FormFieldItemContext/>"
    );

  return context;
};
