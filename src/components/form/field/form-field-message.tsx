import type React from "react";
import { cn } from "~/lib/utils";
import { useFormFieldItemContext } from "./form-field-context";

type FormFieldMessageProps = React.ComponentProps<"p">;
const FormFieldMessage: React.FC<FormFieldMessageProps> = ({
  className,
  ...props
}) => {
  const { hasError, errors, formFieldMessageId } = useFormFieldItemContext();

  return hasError ? (
    <p
      id={formFieldMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}>
      {errors.map((error) => error.message).join(", ")}
    </p>
  ) : null;
};

export default FormFieldMessage;
