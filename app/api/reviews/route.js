import { connectToDatabase } from "@/lib/db/mongodb";
import Hotspot from "@/lib/db/models/Hotspot";
import { NextResponse } from "next/server";

// Add a review to a hotspot
export async function POST(request) {
  try {
    const body = await request.json();
    const { hotspotId, user, text, rating } = body;

    if (!hotspotId || !user || !text || !rating) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const hotspot = await Hotspot.findById(hotspotId);

    if (!hotspot) {
      return NextResponse.json(
        { success: false, error: "Hotspot not found" },
        { status: 404 }
      );
    }

    hotspot.reviews.push({ user, text, rating });
    await hotspot.save();

    return NextResponse.json({ success: true, data: hotspot }, { status: 201 });
  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add review" },
      { status: 500 }
    );
  }
}
