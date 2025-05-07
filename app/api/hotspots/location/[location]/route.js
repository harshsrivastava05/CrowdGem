import { connectToDatabase } from "../../../../../lib/db/mongodb";
import Hotspot from "../../../../../lib/db/models/Hotspot";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { location } = await params;

    if (!location) {
      return NextResponse.json(
        { success: false, error: "Location parameter is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const hotspots = await Hotspot.find({
      location: { $regex: new RegExp(location, "i") },
    });

    return NextResponse.json({ success: true, data: hotspots });
  } catch (error) {
    console.error("Error fetching hotspots by location:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch hotspots" },
      { status: 500 }
    );
  }
}
