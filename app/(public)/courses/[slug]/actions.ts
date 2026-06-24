"use server";

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { env } from "@/lib/env";
import arcjet, { fixedWindow } from "@/lib/arcjet";
import { request } from "@arcjet/next";

const aj = arcjet.withRule(
    fixedWindow({
        mode: "LIVE",
        window: "1m",
        max: 5,
    })
);

export async function enrollInCourseAction(
    courseId: string
): Promise<ApiResponse | never> {

    const user = await requireUser();

    let checkoutUrl: string;

    try {
        const req = await request();
        const decision = await aj.protect(req, {
            fingerprint: user.id,
        });

        if (decision.isDenied()) {
            return {
                status: "error",
                message: "You have been blocked. Please try again later.",
            }
        }

        const course = await prisma.course.findUnique({
            where: { 
                id: courseId, 
            },
            select: {
                id: true,
                title: true,
                price: true,
                slug: true,
            },
        });

        if(!course) {
            return {
                status: "error",
                message: "Course not found.",
            };
        }

        let stripeCustomerId: string;
        const userWithStripeCustomerId = await prisma.user.findUnique({
            where: {
                id: user.id,
            },
            select: {
                stripeCustomerId: true,
            },
        });

        if(userWithStripeCustomerId?.stripeCustomerId) {
            stripeCustomerId = userWithStripeCustomerId.stripeCustomerId;
        } else {

            const customer = await stripe.customers.create({
                email: user.email,
                name: user.name,
                metadata: {
                    userId: user.id,
                },
            });

            stripeCustomerId = customer.id;
            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    stripeCustomerId: stripeCustomerId,
                },
            });
        }

        // Replace the $transaction block with this:

const existingEnrollment = await prisma.enrollment.findUnique({
    where: {
        userId_courseId: {
            userId: user.id,
            courseId: courseId,
        },
    },
    select: {
        status: true,
        id: true,
    },
});

if (existingEnrollment?.status === "COMPLETED") {
    return {
        status: "success",
        message: "You are already enrolled in this course.",
    };
}

let enrollment;
if (existingEnrollment) {
    enrollment = await prisma.enrollment.update({
        where: { id: existingEnrollment.id },
        data: {
            amount: course.price,
            status: "PENDING",
            updatedAt: new Date(),
        },
    });
} else {
    enrollment = await prisma.enrollment.create({
        data: {
            userId: user.id,
            courseId: course.id,
            amount: course.price,
            status: "PENDING",
        },
    });
}

// NOW call Stripe OUTSIDE the transaction
const checkoutSession = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    line_items: [
        {
            price: "price_1TLQjlCXspA7h7ZM2QusQLAA",
            quantity: 1,
        },
    ],
    mode: "payment",
    // Include the Checkout Session ID so the success page can verify and finalize enrollment
    // Stripe will replace the placeholder with the real session id when redirecting.
    success_url: `${env.BETTER_AUTH_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.BETTER_AUTH_URL}/payment/cancel`,
    metadata: {
        userId: String(user.id),
        courseId: String(course.id),
        enrollmentId: String(enrollment.id),
    },
});

checkoutUrl = checkoutSession.url as string;


    } catch (error) {

        if (error instanceof Stripe.errors.StripeError) {
            return {
                status: "error",
                message: "Payment system error. Plz try again later.",
            }
        }

        return {
            status: "error",
            message: "Failed to enroll in course.",
        };
    }

    redirect(checkoutUrl);
}