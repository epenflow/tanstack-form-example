import { Slot } from "@radix-ui/react-slot";
import type React from "react";
import { useFormFieldItemContext } from "./form-field-context";

type FormFieldControlProps = React.ComponentProps<typeof Slot>;
const FormFieldControl: React.FC<FormFieldControlProps> = ({ ...props }) => {
  const { hasError, formFieldItemId } = useFormFieldItemContext();

  return (
    <Slot
      id={formFieldItemId}
      aria-describedby={hasError ? `${formFieldItemId}-error` : formFieldItemId}
      aria-invalid={hasError}
      {...props}
    />
  );
};

export default FormFieldControl;
