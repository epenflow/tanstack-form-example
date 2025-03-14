import { Lock, Mail } from "lucide-react";
import React from "react";
import * as z from "zod";
import { useAppForm } from "~/hooks/form";
import Button from "../ui/button";
import { Input, InputPassword } from "../ui/input";

const signUpSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

const Auth = () => {
  const signInForm = useAppForm({
    defaultValues: {
      email: "",
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
              <signInForm.AppField
                name="email"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Username</field.FormLabel>
                    <field.FormFieldWithIcon Icon={Mail}>
                      <field.FormControl>
                        <Input
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="email@example.com"
                        />
                      </field.FormControl>
                    </field.FormFieldWithIcon>
                    <field.FormDescription>
                      Enter your registered email address.
                    </field.FormDescription>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />

              <signInForm.AppField
                name="password"
                children={(field) => (
                  <field.FormItem>
                    <div className="grid grid-cols-2">
                      <field.FormLabel>Password</field.FormLabel>
                      <Button
                        variant="link"
                        className="p-0 h-auto justify-end text-sm leading-none">
                        Forgot password?
                      </Button>
                    </div>
                    <field.FormFieldWithIcon Icon={Lock}>
                      <field.FormControl>
                        <InputPassword
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="**************"
                        />
                      </field.FormControl>
                    </field.FormFieldWithIcon>
                    <field.FormDescription>
                      Enter your account password.
                    </field.FormDescription>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />
            </div>

            <signInForm.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  isPending={isSubmitting}
                  disabled={!canSubmit}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              )}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default Auth;
