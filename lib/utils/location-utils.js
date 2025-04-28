// lib/utils/location-utils.js

// Mock city data - in a real app, this would connect to a geolocation API like Google Places
const POPULAR_CITIES = [
  "Mumbai, Maharashtra",
  "Delhi, Delhi",
  "Bangalore, Karnataka",
  "Hyderabad, Telangana",
  "Chennai, Tamil Nadu",
  "Kolkata, West Bengal",
  "Pune, Maharashtra",
  "Ahmedabad, Gujarat",
  "Jaipur, Rajasthan",
  "Lucknow, Uttar Pradesh",
  "Chandigarh, Punjab",
  "Bhopal, Madhya Pradesh",
  "Indore, Madhya Pradesh",
  "Surat, Gujarat",
  "Nagpur, Maharashtra",
  "Visakhapatnam, Andhra Pradesh",
  "Patna, Bihar",
  "Vadodara, Gujarat",
  "Kanpur, Uttar Pradesh",
  "Ludhiana, Punjab",
  "Agra, Uttar Pradesh",
  "Nashik, Maharashtra",
  "Faridabad, Haryana",
  "Meerut, Uttar Pradesh",
  "Rajkot, Gujarat",
  "Amritsar, Punjab",
  "Varanasi, Uttar Pradesh",
  "Srinagar, Jammu and Kashmir",
  "Coimbatore, Tamil Nadu",
  "Thiruvananthapuram, Kerala",
  "Kochi, Kerala",
  "Goa, Goa",
  "Dehradun, Uttarakhand",
  "Rishikesh, Uttarakhand",
  "Shimla, Himachal Pradesh",
  "Manali, Himachal Pradesh",
  "Mysore, Karnataka",
  "Udaipur, Rajasthan",
  "Jodhpur, Rajasthan",
  "Guwahati, Assam",
  "Shillong, Meghalaya",
  "Pondicherry, Puducherry",
  "Tiruchirappalli, Tamil Nadu",
  "Madurai, Tamil Nadu",
  "Jamshedpur, Jharkhand",
  "Ranchi, Jharkhand",
  "Gwalior, Madhya Pradesh",
  "Kozhikode, Kerala",
  "Alappuzha, Kerala",
  "Aizawl, Mizoram",
  "Itanagar, Arunachal Pradesh",
  "Imphal, Manipur",
  "Gangtok, Sikkim",
  "Panaji, Goa",
  "Dharamshala, Himachal Pradesh",
  "Mount Abu, Rajasthan",
  "Ajmer, Rajasthan",
  "Pushkar, Rajasthan",
  "Bhubaneswar, Odisha",
  "Cuttack, Odisha",
  "Siliguri, West Bengal",
  "Durgapur, West Bengal",
  "Asansol, West Bengal",
  "Noida, Uttar Pradesh",
  "Ghaziabad, Uttar Pradesh",
  "Aligarh, Uttar Pradesh",
  "Gaya, Bihar",
  "Muzaffarpur, Bihar",
  "Bareilly, Uttar Pradesh",
  "Moradabad, Uttar Pradesh",
  "Jalandhar, Punjab",
  "Patiala, Punjab",
  "Ambala, Haryana",
  "Rohtak, Haryana",
  "Hisar, Haryana",
  "Karnal, Haryana",
  "Vellore, Tamil Nadu",
  "Salem, Tamil Nadu",
  "Erode, Tamil Nadu",
  "Warangal, Telangana",
  "Karimnagar, Telangana",
  "Nellore, Andhra Pradesh",
  "Tirupati, Andhra Pradesh",
  "Anantapur, Andhra Pradesh",
  "Bhavnagar, Gujarat",
  "Jamnagar, Gujarat",
  "Gandhinagar, Gujarat",
  "Dhanbad, Jharkhand",
  "Bokaro, Jharkhand",
  "Saharanpur, Uttar Pradesh",
  "Mathura, Uttar Pradesh",
  "Faizabad (Ayodhya), Uttar Pradesh",
  "Banda, Uttar Pradesh",
  "Sambalpur, Odisha",
  "Berhampur, Odisha",
  "Ratnagiri, Maharashtra",
  "Latur, Maharashtra",
  "Kolhapur, Maharashtra",
  "Satara, Maharashtra",
  "Sangli, Maharashtra",
  "Palakkad, Kerala",
  "Thrissur, Kerala",
  "Kottayam, Kerala",
  "Raipur, Chhattisgarh",
  "Bilaspur, Chhattisgarh",
  "Korba, Chhattisgarh",
  "Durg, Chhattisgarh",
  "Ujjain, Madhya Pradesh",
  "Sagar, Madhya Pradesh",
  "Rewa, Madhya Pradesh",
  "Alwar, Rajasthan",
  "Bikaner, Rajasthan",
  "Bhilwara, Rajasthan",
  "Kota, Rajasthan",
  "Jaisalmer, Rajasthan",
  "Haldwani, Uttarakhand",
  "Nainital, Uttarakhand",
  "Haridwar, Uttarakhand",
  "Kharagpur, West Bengal",
  "Howrah, West Bengal",
  "Haldia, West Bengal",
  "Dibrugarh, Assam",
  "Tezpur, Assam",
  "Agartala, Tripura",
  "Dimapur, Nagaland",
  "Kohima, Nagaland",
];

/**
 * Search for cities based on partial input
 * In a production app, this would call an external API
 */
export async function searchCities(query) {
  query = query.toLowerCase();

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return POPULAR_CITIES.filter((city) =>
    city.toLowerCase().includes(query)
  ).slice(0, 5); // Return max 5 results
}

/**
 * Get distance between two coordinates
 * This would be used for proximity filtering
 */
export function getDistance(lat1, lon1, lat2, lon2) {
  // Implementation of Haversine formula
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
