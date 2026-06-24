import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const sessionId = body?.session_id;

    if (!sessionId) {
      return new Response(JSON.stringify({ error: "session_id missing" }), { status: 400 });
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId as string);

    // Ensure the session is paid
    const isPaid = session.payment_status === "paid" || session.status === "complete";

    const enrollmentId = session.metadata?.enrollmentId as string | undefined;

    if (!enrollmentId) {
      return new Response(JSON.stringify({ error: "enrollmentId missing in session metadata" }), { status: 400 });
    }

    if (isPaid) {
      const updated = await prisma.enrollment.update({
        where: { id: enrollmentId },
        data: { status: "COMPLETED" },
      });

      return new Response(JSON.stringify({ ok: true, updated }), { status: 200 });
    }

    return new Response(JSON.stringify({ ok: false, message: "session not paid" }), { status: 200 });
  } catch (err) {
    console.error("/api/payments/complete error", err);
    return new Response(JSON.stringify({ error: "internal_error" }), { status: 500 });
  }
}
