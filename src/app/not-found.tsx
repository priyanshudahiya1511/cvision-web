"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileQuestion } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileQuestion className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-5xl font-bold text-primary mb-2">404</h1>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Page not found
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button onClick={() => router.push("/")}>Go home</Button>
        </CardContent>
      </Card>
    </div>
  );
}
