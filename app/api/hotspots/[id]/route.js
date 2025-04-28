import { connectToDatabase } from "../../../../lib/db/mongodb"; // Adjust the import path as necessar
import Hotspot from "../../../../lib/db/models/Hotspot"; // Adjust the import path as necessar
import { NextResponse } from "next/server";

// Get a single hotspot by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    await connectToDatabase();

    const hotspot = await Hotspot.findById(id);

    if (!hotspot) {
      return NextResponse.json(
        { success: false, error: "Hotspot not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: hotspot });
  } catch (error) {
    console.error("Error fetching hotspot:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch hotspot" },
      { status: 500 }
    );
  }
}

// Update a hotspot
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    await connectToDatabase();

    const hotspot = await Hotspot.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!hotspot) {
      return NextResponse.json(
        { success: false, error: "Hotspot not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: hotspot });
  } catch (error) {
    console.error("Error updating hotspot:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update hotspot" },
      { status: 500 }
    );
  }
}

// Delete a hotspot
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await connectToDatabase();

    const hotspot = await Hotspot.findByIdAndDelete(id);

    if (!hotspot) {
      return NextResponse.json(
        { success: false, error: "Hotspot not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error("Error deleting hotspot:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete hotspot" },
      { status: 500 }
    );
  }
}
