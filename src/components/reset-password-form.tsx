import { useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card.tsx";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { resetPassword } from "../lib/shse-api";

/**
 * Choose a new password, opened from the emailed reset link.
 * On success the user is signed in and onDone is called.
 */
function ResetPasswordForm({ token, onDone }: { token: string; onDone: () => void }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("The passwords don't match");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await resetPassword(token, password);
      onDone();
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  };

  return (
    <Card className="w-full max-w-sm rounded-sm">
      <CardContent>
        <form onSubmit={handleSubmit}>
          <h2 className="font-semibold mb-2">Choose a new password</h2>
          <Field className="gap-0">
            <FieldLabel htmlFor="reset-password">New password</FieldLabel>
            <Input
              id="reset-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              className="rounded-sm bg-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          <Field className="gap-0 mt-2">
            <FieldLabel htmlFor="reset-confirm">Repeat new password</FieldLabel>
            <Input
              id="reset-confirm"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              className="rounded-sm bg-input"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </Field>
          {error && <p className="text-destructive text-xs mt-2">{error}</p>}
          <Button type="submit" size="lg" className="w-full mt-4 rounded-sm" disabled={busy}>
            {busy ? "Please wait…" : "Set password and sign in"}
          </Button>
          <button
            type="button"
            className="w-full mt-3 text-xs underline cursor-pointer text-muted-foreground"
            onClick={onDone}
          >
            Cancel
          </button>
        </form>
      </CardContent>
    </Card>
  );
}

export default ResetPasswordForm;
