/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useConfetti } from "@/hooks/use-confetti";
import { ArrowLeft, CheckIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

export default function PaymentSuccessful() {
    const { triggerConfetti } = useConfetti();

    useEffect(() => {
        triggerConfetti();
    }, []);

    // Finalize the payment by verifying the Stripe session and updating enrollment immediately.
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const sessionId = params.get("session_id");

        if (!sessionId) return;

        (async () => {
            try {
                await fetch("/api/payments/complete", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ session_id: sessionId }),
                });
            } catch (err) {
                // ignore - webhook will still handle it
                console.error("Finalize payment failed", err);
            }
        })();
    }, []);

    return (
        <div className="w-full min-h-screen flex flex-1 items-center justify-center">
            <Card className="w-[350px]">
                <CardContent>
                    <div className="w-full flex justify-center">
                        <CheckIcon className="size-12 p-2 bg-green-500/30 text-green-500 rounded-full" />
                    </div>

                    <div className="mt-3 text-center sm:mt-5 w-full">
                        <h2 className="text-xl font-semibold">Payment Successful</h2>
                        <p className="text-sm mt-2 text-muted-foreground tracking-tight text-balance">
                            Your payment was successful. You can now access your course. 
                            If you have any questions, please contact support.
                        </p>
                        <Link href="/dashboard" className={buttonVariants({ className: "w-full mt-5" })}>
                            <ArrowLeft className="size-4" />
                            Go to Dashboard
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}