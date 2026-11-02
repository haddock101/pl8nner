import { useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card.tsx";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { login, register } from "../lib/shse-api";

/**
 * Sign in, or create an account (which comes with a calendar).
 * On success the stored token changes and the app switches to the calendar.
 */
function LoginForm() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isLogin = mode === "login";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await (isLogin ? login : register)(email.trim(), password);
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  };

  return (
    <Card className="w-full max-w-sm rounded-sm">
      <CardContent>
        <form onSubmit={handleSubmit}>
          <h2 className="font-semibold mb-2">{isLogin ? "Sign in" : "Create an account"}</h2>
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
          {error && <p className="text-destructive text-xs mt-2">{error}</p>}
          <Button type="submit" size="lg" className="w-full mt-4 rounded-sm" disabled={busy}>
            {busy ? "Please wait…" : isLogin ? "Sign in" : "Create account"}
          </Button>
          <button
            type="button"
            className="w-full mt-3 text-xs underline cursor-pointer text-muted-foreground"
            onClick={() => {
              setMode(isLogin ? "register" : "login");
              setError(null);
            }}
          >
            {isLogin ? "No account? Create one" : "Have an account? Sign in"}
          </button>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
