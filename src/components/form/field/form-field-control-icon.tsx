import { Slot } from "@radix-ui/react-slot";
import type React from "react";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useFormFieldItemContext } from "./form-field-context";

type FormFieldControlIconProps = React.ComponentProps<"div"> & {
  icon: React.ReactNode;
};
const FormFieldControlIcon: React.FC<FormFieldControlIconProps> = ({
  className,
  children,
  icon,
  ...props
}) => {
  const { hasError, id, name } = useFormFieldItemContext();
  return (
    <div
      id={`${id}-${name}-control-icon`}
      className={cn("relative", className)}
      {...props}>
      <div
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "hover:bg-transparent",
          "absolute top-0 left-0 px-3 py-2 h-full inline-flex items-center justify-center",
          hasError && "text-destructive"
        )}>
        {icon}
      </div>
      <Slot className="pl-9">{children}</Slot>
    </div>
  );
};
export default FormFieldControlIcon;
