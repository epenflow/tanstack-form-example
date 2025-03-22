import type React from "react";
import { Label, type LabelProps } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import { useFormFieldItemContext } from "./form-field-context";

const FormFieldLabel: React.FC<LabelProps> = ({ className, ...props }) => {
  const { hasError, formFieldItemId } = useFormFieldItemContext();

  return (
    <Label
      htmlFor={formFieldItemId}
      className={cn(hasError && "text-destructive", className)}
      {...props}
    />
  );
};
export default FormFieldLabel;
