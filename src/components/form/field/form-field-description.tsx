import type React from "react";
import { cn } from "~/lib/utils";
import { useFormFieldItemContext } from "./form-field-context";

type FormFieldDescriptionProps = React.ComponentProps<"p">;
const FormFieldDescription: React.FC<FormFieldDescriptionProps> = ({
  className,
  ...props
}) => {
  const { formFieldDescriptionId } = useFormFieldItemContext();

  return (
    <p
      id={formFieldDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  );
};
export default FormFieldDescription;
