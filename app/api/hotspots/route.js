import { connectToDatabase } from "../../../lib/db/mongodb";
import Hotspot from "../../../lib/db/models/Hotspot";
import { NextResponse } from "next/server";

// Get all hotspots
export async function GET() {
  try {
    await connectToDatabase();
    const hotspots = await Hotspot.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: hotspots });
  } catch (error) {
    console.error("Error fetching hotspots:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch hotspots" },
      { status: 500 }
    );
  }
}

// Create a new hotspot
export async function POST(request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const hotspot = await Hotspot.create(body);

    return NextResponse.json({ success: true, data: hotspot }, { status: 201 });
  } catch (error) {
    console.error("Error creating hotspot:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create hotspot" },
      { status: 400 }
    );
  }
}
