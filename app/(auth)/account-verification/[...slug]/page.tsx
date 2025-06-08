import { getUserByEmail, updateUserByEmail } from "@/server/db/users";
import {
  deleteVerificationTokenById,
  getVerificationTokenByToken,
} from "@/server/db/auth/verification-token";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import LinkButton from "../_components/linkButton";
import Link from "next/link";



interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function AccountVerificationPage({ params }: PageProps) {
  const token = (await params).slug[0] ?? "";

  let status = true;
  let isExpired = false;
  let email: string | null = null;

  if (!token) {
    status = false;
  }

  const verificationToken = await getVerificationTokenByToken(token);

  if (verificationToken) {
    const currentTime = new Date();
    const expiryDate = new Date(verificationToken.expiresAt);

    if (expiryDate <= currentTime) {
      status = false;
      isExpired = true;
      email = verificationToken.email;
    } else {
      const userEmail = verificationToken.emailReplaced || verificationToken.email;
      const existingUser = await getUserByEmail(userEmail);

      if (existingUser) {
        await updateUserByEmail(existingUser.email, {
          emailVerified: currentTime,
          email: verificationToken.email,
        });
      }

      await deleteVerificationTokenById(verificationToken.id);
    }
  } else {
    status = false;
  }

  return (
    <main className="min-h-[90vh] flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle>Account Verification</CardTitle>
        </CardHeader>
        <CardContent>
          {status ? (
            <div className="flex flex-col items-center space-y-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <p className="text-base font-semibold">Your account is now verified!</p>
              <Button className="w-full" variant="default" asChild>
                <Link href="/signin">Sign in</Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4 text-center">
              <XCircle className="h-8 w-8 text-destructive" />
              <p className="text-base font-semibold text-destructive">Verification failed</p>
              <p className="text-sm text-muted-foreground">
                {isExpired
                  ? "This link is expired. Please request a new verification email."
                  : "This link is invalid. Please check that you are using the right verification link."}
              </p>

              {isExpired && email && <LinkButton email={email} />}

              <Button className="w-full" variant="link" asChild>
                <Link href="/">Back to dashboard</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
