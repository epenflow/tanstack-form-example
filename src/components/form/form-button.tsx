import React from "react";
import { useFormContext } from "~/hooks/form";
import type { ButtonProps } from "../ui/button";
import Button from "../ui/button";

type FormButtonProps = Omit<ButtonProps, "children"> & {
  children?: (props: { isSubmitting?: boolean }) => React.ReactNode;
};

const FormButton: React.FC<FormButtonProps> = ({ children }) => {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting]}
      children={([canSubmit, isSubmitting]) => (
        <Button disabled={!canSubmit} isPending={isSubmitting}>
          {children?.({ isSubmitting })}
        </Button>
      )}
    />
  );
};
export default FormButton;
