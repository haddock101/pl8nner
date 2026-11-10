import { useState, type SubmitEvent } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card.tsx";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { login, register, requestPasswordReset } from "../lib/shse-api";

/**
 * Sign in, create an account (which comes with a calendar), or ask for a
 * password reset link. On sign-in the stored token changes and the app
 * switches to the calendar.
 */
function LoginForm() {
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const isLogin = mode === "login";
  const isForgot = mode === "forgot";

  const switchMode = (next: typeof mode) => {
    setMode(next);
    setError(null);
    setResetSent(false);
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (isForgot) {
        await requestPasswordReset(email.trim());
        setResetSent(true);
        setBusy(false);
      } else {
        await (isLogin ? login : register)(email.trim(), password);
      }
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  };

  return (
    <Card className="w-full max-w-sm rounded-sm login-form">
      <CardContent>
        <form onSubmit={handleSubmit}>
          <h2 className="font-semibold mb-2">
            {isForgot ? "Reset your password" : isLogin ? "Sign in" : "Create an account"}
          </h2>
          <Field className="gap-0">
            <FieldLabel htmlFor="login-email">Email</FieldLabel>
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              autoCapitalize="off"
              required
              className="rounded-sm bg-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          {!isForgot && (
            <Field className="gap-0 mt-2">
              <FieldLabel htmlFor="login-password">Password</FieldLabel>
              <Input
                id="login-password"
                type="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                minLength={isLogin ? undefined : 8}
                className="rounded-sm bg-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
          )}
          {error && <p className="text-destructive text-xs mt-2">{error}</p>}
          {resetSent && (
            <p className="text-xs mt-2">
              If {email.trim()} has an account, a reset link is on its way. It works for one hour.
            </p>
          )}
          <Button type="submit" size="lg" className="w-full mt-4 rounded-sm" disabled={busy}>
            {busy
              ? "Please wait…"
              : isForgot
                ? resetSent ? "Send again" : "Email me a reset link"
                : isLogin ? "Sign in" : "Create account"}
          </Button>
          {isLogin && (
            <button
              type="button"
              className="w-full mt-3 text-xs underline cursor-pointer text-muted-foreground"
              onClick={() => switchMode("forgot")}
            >
              Forgot password?
            </button>
          )}
          <button
            type="button"
            className="w-full mt-3 text-xs underline cursor-pointer text-muted-foreground"
            onClick={() => switchMode(isLogin ? "register" : "login")}
          >
            {isLogin ? "No account? Create one" : isForgot ? "Back to sign in" : "Have an account? Sign in"}
          </button>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
