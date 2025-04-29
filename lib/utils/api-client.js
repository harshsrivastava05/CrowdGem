/**
 * Client-side utility functions for making API requests
 */

// Fetch all hotspots
export async function getHotspots() {
  try {
    const response = await fetch("/api/hotspots");
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch hotspots");
    }

    return data.data;
  } catch (error) {
    console.error("Error fetching hotspots:", error);
    throw error;
  }
}

// Fetch a single hotspot by ID
export async function getHotspot(id) {
  try {
    const response = await fetch(`/api/hotspots/${id}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch hotspot");
    }

    return data.data;
  } catch (error) {
    console.error(`Error fetching hotspot with ID ${id}:`, error);
    throw error;
  }
}

// Create a new hotspot
export async function createHotspot(hotspotData) {
  try {
    const response = await fetch("/api/hotspots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hotspotData),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to create hotspot");
    }

    return data.data;
  } catch (error) {
    console.error("Error creating hotspot:", error);
    throw error;
  }
}

// Add a review to a hotspot
export async function addReview(reviewData) {
  try {
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to add review");
    }

    return data.data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
}

// Add like to a hotspot
export async function likeHotspot(id) {
  try {
    const hotspot = await getHotspot(id);
    const updatedHotspot = {
      ...hotspot,
      likes: hotspot.likes + 1,
    };

    const response = await fetch(`/api/hotspots/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedHotspot),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to like hotspot");
    }

    return data.data;
  } catch (error) {
    console.error(`Error liking hotspot with ID ${id}:`, error);
    throw error;
  }
}

// Fetch hotspots by location
export async function getHotspotsByLocation(location) {
  try {
    // URL encode the location parameter to handle spaces and special characters
    const encodedLocation = encodeURIComponent(location);
    const response = await fetch(`/api/hotspots/location/${encodedLocation}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch hotspots for this location");
    }

    return data.data;
  } catch (error) {
    console.error(`Error fetching hotspots for location ${location}:`, error);
    throw error;
  }
}
