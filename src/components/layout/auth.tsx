import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import Button from "../ui/button";
import Form, { ForFormField, FormSubscriber } from "../ui/form";
import type { FormFieldSchema } from "../ui/form/type";

const signUpSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .regex(
      /^[a-z0-9._]+$/,
      "Username must contain only lowercase letters, numbers, dots, or underscores"
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});
type TSignUpSchema = z.infer<typeof signUpSchema>;
const SIGN_UP_SCHEMA: FormFieldSchema<TSignUpSchema>[] = [
  {
    name: "username",
    label: "Username",
    type: "text",
    autoComplete: "username",
    description: "Enter your unique username 🌟",
    placeholder: "e.g., john_doe123",
  },
  {
    name: "password",
    label: "Password",
    type: "text",
    description: "Create a strong password 🔒",
    placeholder: "e.g., P@ssw0rd!",
  },
];

const Auth = () => {
  const form = useForm<TSignUpSchema>({
    defaultValues: {
      username: "",
      password: "",
    },
    validators: {
      onChange: signUpSchema,
      onChangeAsync: signUpSchema,
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

  return (
    <div className=" container h-dvh flex items-center justify-center">
      <Form
        className="bg-card w-96 border rounded-xl py-12 px-6 space-y-4"
        form={form}>
        <ForFormField form={form} schemas={SIGN_UP_SCHEMA} />
        <FormSubscriber form={form}>
          {({ canSubmit, isSubmitting }) => (
            <Button disabled={!canSubmit} isLoading={isSubmitting}>
              {({ disabled, isLoading }) => {
                return (
                  <span>
                    {isLoading
                      ? "In progress..."
                      : disabled
                      ? "Complete the required fields"
                      : "Submit"}
                  </span>
                );
              }}
            </Button>
          )}
        </FormSubscriber>
      </Form>
    </div>
  );
};
export default Auth;
