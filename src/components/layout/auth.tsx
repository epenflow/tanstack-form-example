import type { DeepKeys } from "@tanstack/react-form";
import { Lock, Mail, type LucideIcon } from "lucide-react";
import React from "react";
import * as z from "zod";
import { useAppForm } from "~/hooks/form";
import { Input, InputPassword } from "../ui/input";
import For from "./for";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});
type SignInSchema = z.infer<typeof signInSchema>;

const Auth = () => {
  const { signInFields } = resources;
  const signInForm = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: signInSchema,
      onChangeAsync: signInSchema,
      onChangeAsyncDebounceMs: 500,
    },
    onSubmit: async (props) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(props);
          resolve(props);
        }, 10_000);
      });
    },
  });

  const onSubmit = React.useCallback(
    <T,>(e: React.FormEvent<T>) => {
      e.stopPropagation();
      e.preventDefault();
      signInForm.handleSubmit();
    },
    [signInForm]
  );

  return (
    <div className="w-full h-dvh flex p-4">
      <div className="container max-w-md my-auto bg-accent border rounded-md p-2">
        <div className="bg-card px-6 py-14 border rounded-md">
          <form onSubmit={onSubmit} className="space-y-6 grid">
            <div className="space-y-6">
              <For
                each={signInFields}
                children={(schemaField, key) => (
                  <signInForm.AppField
                    key={`${key}-${schemaField.name}`}
                    name={schemaField.name}
                    children={(field) => (
                      <field.FormFieldItem>
                        <field.FormFieldLabel>
                          {schemaField.label}
                        </field.FormFieldLabel>
                        <field.FormFieldControlIcon icon={<schemaField.icon />}>
                          <field.FormFieldControl>
                            {schemaField.name === "password" ? (
                              <InputPassword
                                value={field.state.value}
                                placeholder={schemaField.placeholder}
                                autoComplete={schemaField.autoComplete}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                              />
                            ) : (
                              <Input
                                value={field.state.value}
                                placeholder={schemaField.placeholder}
                                autoComplete={schemaField.autoComplete}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                              />
                            )}
                          </field.FormFieldControl>
                        </field.FormFieldControlIcon>
                        <field.FormFieldDescription>
                          {schemaField.description}
                        </field.FormFieldDescription>
                        <field.FormFieldMessage />
                      </field.FormFieldItem>
                    )}
                  />
                )}
              />
            </div>

            <signInForm.AppForm>
              <signInForm.FormButton>
                {({ isSubmitting }) =>
                  isSubmitting ? "Submitting..." : "Submit"
                }
              </signInForm.FormButton>
            </signInForm.AppForm>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Auth;

type SignInSchemaField = {
  name: DeepKeys<SignInSchema>;
  label: string;
  description: string;
  autoComplete: React.HTMLInputAutoCompleteAttribute;
  placeholder: string;
  icon: LucideIcon;
};

const resources = {
  signInFields: [
    {
      name: "email",
      label: "Email",
      icon: Mail,
      autoComplete: "email",
      description: "Enter your registered email address.",
      placeholder: "example@mail.com",
    },
    {
      name: "password",
      label: "Password",
      icon: Lock,
      autoComplete: "current-password",
      description: "Enter your password",
      placeholder: "************",
    },
  ] satisfies SignInSchemaField[],
};
