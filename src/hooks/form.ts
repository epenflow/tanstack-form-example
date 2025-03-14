import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import React from "react";

const fieldComponents = {
  FormItem: React.lazy(() =>
    import("~/components/ui/form").then((res) => ({
      default: res.FormItem,
    }))
  ),
  FormLabel: React.lazy(() =>
    import("~/components/ui/form").then((res) => ({
      default: res.FormLabel,
    }))
  ),
  FormControl: React.lazy(() =>
    import("~/components/ui/form").then((res) => ({
      default: res.FormControl,
    }))
  ),
  FormMessage: React.lazy(() =>
    import("~/components/ui/form").then((res) => ({
      default: res.FormMessage,
    }))
  ),
  FormDescription: React.lazy(() =>
    import("~/components/ui/form").then((res) => ({
      default: res.FormDescription,
    }))
  ),
  FormFieldWithIcon: React.lazy(() =>
    import("~/components/ui/form").then((res) => ({
      default: res.FormFieldWithIcon,
    }))
  ),
};

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { withForm, useAppForm } = createFormHook({
  fieldComponents,
  formComponents: {},
  fieldContext,
  formContext,
});
