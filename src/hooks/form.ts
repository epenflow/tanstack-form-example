import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import React from "react";

const fieldComponents = {
  FormFieldItem: React.lazy(
    () => import("~/components/form/field/form-field-item")
  ),
  FormFieldLabel: React.lazy(
    () => import("~/components/form/field/form-field-label")
  ),
  FormFieldControl: React.lazy(
    () => import("~/components/form/field/form-field-control")
  ),
  FormFieldControlIcon: React.lazy(
    () => import("~/components/form/field/form-field-control-icon")
  ),
  FormFieldDescription: React.lazy(
    () => import("~/components/form/field/form-field-description")
  ),
  FormFieldMessage: React.lazy(
    () => import("~/components/form/field/form-field-message")
  ),
};
const formComponents = {
  FormButton: React.lazy(() => import("~/components/form/form-button")),
};

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { withForm, useAppForm } = createFormHook({
  fieldComponents,
  formComponents,
  fieldContext,
  formContext,
});
