import React from "react";
import { useFieldContext } from "~/hooks/form";
import { cn } from "~/lib/utils";
import {
  FormFieldItemContext,
  FormFieldItemContextValues,
} from "./form-field-context";

type FormFieldItemProps = React.ComponentProps<"div">;
const FormFieldItem: React.FC<FormFieldItemProps> = ({
  className,
  ...props
}) => {
  const field = useFieldContext();
  const id = React.useId();
  const formFieldItemContextValues = React.useMemo<FormFieldItemContextValues>(
    () => ({
      id,
      name: field.name,
      hasError: field.state.meta.errors.length > 0,
      errors: field.state.meta.errors,
      formFieldItemId: `${id}-${field.name}-item`,
      formFieldDescriptionId: `${id}-${field.name}-description`,
      formFieldMessageId: `${id}-${field.name}-message`,
    }),
    [id, field.name, field.state.meta.errors]
  );

  return (
    <FormFieldItemContext value={formFieldItemContextValues}>
      <div
        id={`${id}-${field.name}`}
        className={cn("space-y-2", className)}
        {...props}
      />
    </FormFieldItemContext>
  );
};
export default FormFieldItem;
