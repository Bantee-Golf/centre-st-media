import { NextRequest, NextResponse } from "next/server";
import {
  createCheckoutIntent,
  getCheckoutIntent,
  confirmCheckoutIntent,
} from "@/lib/rye";

/** POST — create or confirm a checkout intent */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === "create") {
      const intent = await createCheckoutIntent(
        body.productUrl,
        body.buyer,
        body.quantity ?? 1
      );
      return NextResponse.json(intent);
    }

    if (action === "confirm") {
      const intent = await confirmCheckoutIntent(
        body.intentId,
        body.stripeToken
      );
      return NextResponse.json(intent);
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/** GET — poll checkout intent status */
export async function GET(req: NextRequest) {
  const intentId = req.nextUrl.searchParams.get("intentId");
  if (!intentId) {
    return NextResponse.json(
      { error: "intentId required" },
      { status: 400 }
    );
  }

  try {
    const intent = await getCheckoutIntent(intentId);
    return NextResponse.json(intent);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Poll failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
