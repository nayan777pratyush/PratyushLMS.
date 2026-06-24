import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
    console.log("\n====================================");
    console.log("🚀 WEBHOOK HIT");
    console.log("====================================");

    try {
        const body = await req.text();

        const headerList = await headers();

        const signature =
            headerList.get("Stripe-Signature");

        console.log(
            "Signature exists:",
            !!signature
        );

        if (!signature) {
            console.log("❌ Missing signature");

            return new Response(
                "Missing signature",
                {
                    status: 400,
                }
            );
        }

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(
                body,
                signature,
                env.STRIPE_WEBHOOK_SECRET
            );

            console.log("✅ Event verified");
        } catch (err) {
            console.log(
                "❌ Signature verification failed"
            );

            console.log(err);

            return new Response(
                "Webhook Error",
                {
                    status: 400,
                }
            );
        }

        console.log(
            "Event Type:",
            event.type
        );

if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // ✅ Read metadata directly from the event object
    const enrollmentId = session.metadata?.enrollmentId;
    const courseId = session.metadata?.courseId;
    const userId = session.metadata?.userId;

    console.log("Enrollment ID:", enrollmentId);
    console.log("Course ID:", courseId);
    console.log("User ID:", userId);

    if (!enrollmentId) {
        console.log("❌ enrollmentId missing");
        return new Response("Enrollment ID missing", { status: 400 });
        //return new Response("OK", { status: 200 });
    }

    const updatedEnrollment = await prisma.enrollment.update({
        where: { id: enrollmentId },
        data: { status: "COMPLETED" },
    });

    console.log("✅ ENROLLMENT UPDATED", updatedEnrollment);
}

        console.log(
            "✅ WEBHOOK FINISHED SUCCESSFULLY"
        );

        return new Response("OK", {
            status: 200,
        });

    } catch (err) {
        console.log(
            "❌ WEBHOOK CRASHED"
        );

        console.log(err);

        return new Response(
            "Webhook Error",
            {
                status: 500,
            }
        );
    }
}