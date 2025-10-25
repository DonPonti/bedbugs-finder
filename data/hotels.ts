
import type { Hotel } from '../types';

export const hotels: Hotel[] = [
  {
    "id": "sunrise-inn-delhi",
    "name": "Sunrise Inn",
    "city": "Delhi",
    "status": "Clean",
    "lastUpdated": "2024-07-10",
    "description": "A comfortable and affordable hotel in the heart of Delhi. Rooms start at $50/night. Enjoy our complimentary breakfast and free Wi-Fi.",
    "reports": [],
    "image": "https://picsum.photos/seed/sunrise-inn/800/600",
    "avgRating": 4.2,
    "priceRange": "$$"
  },
  {
    "id": "palm-residency-mumbai",
    "name": "Palm Residency",
    "city": "Mumbai",
    "status": "Pest Reported",
    "lastUpdated": "2024-06-22",
    "description": "Luxury suites with a view of the city skyline. Average price: $120/night. Features a rooftop pool and a 24-hour fitness center.",
    "reports": [
      {
        "type": "Bedbugs",
        "date": "2024-06-20",
        "notes": "Found in room 203. Management was notified and promised to take action."
      }
    ],
    "image": "https://picsum.photos/seed/palm-residency/800/600",
    "avgRating": 3.8,
    "priceRange": "$$$"
  },
  {
    "id": "grand-plaza-new-york",
    "name": "Grand Plaza",
    "city": "New York",
    "status": "Pest Reported",
    "lastUpdated": "2024-07-15",
    "description": "Located near Times Square, the Grand Plaza offers premium rooms from $250/night. Ideal for business and leisure travelers.",
    "reports": [
      {
        "type": "Cockroaches",
        "date": "2024-07-14",
        "notes": "Spotted cockroaches in the bathroom near the sink area. Room 1101."
      },
      {
        "type": "Bedbugs",
        "date": "2024-05-02",
        "notes": "Woke up with bites. Found evidence of bedbugs on the mattress seams."
      }
    ],
    "image": "https://picsum.photos/seed/grand-plaza/800/600",
    "avgRating": 2.5,
    "priceRange": "$$$$"
  },
  {
    "id": "ocean-view-resort-miami",
    "name": "Ocean View Resort",
    "city": "Miami",
    "status": "Clean",
    "lastUpdated": "2024-07-01",
    "description": "Beachfront property with private balconies. All-inclusive packages available starting at $300/night. Perfect for a sunny getaway.",
    "reports": [],
    "image": "https://picsum.photos/seed/ocean-view/800/600",
    "avgRating": 4.8,
    "priceRange": "$$$$"
  },
  {
    "id": "city-center-hotel-london",
    "name": "City Center Hotel",
    "city": "London",
    "status": "Clean",
    "lastUpdated": "2024-06-28",
    "description": "A modern hotel in Central London, just steps away from major attractions. Standard rooms from £150. Family rooms available.",
    "reports": [],
    "image": "https://picsum.photos/seed/city-center/800/600",
    "avgRating": 4.5,
    "priceRange": "$$$"
  },
  {
    "id": "le-parisien-paris",
    "name": "Le Parisien",
    "city": "Paris",
    "status": "Pest Reported",
    "lastUpdated": "2024-05-30",
    "description": "Charming boutique hotel in the Montmartre district. Experience authentic Parisian life. Rates from €180 per night.",
    "reports": [
      {
        "type": "Bedbugs",
        "date": "2024-05-29",
        "notes": "Minor issue reported in room 404, but hotel claims it was resolved immediately."
      }
    ],
    "image": "https://picsum.photos/seed/le-parisien/800/600",
    "avgRating": 3.9,
    "priceRange": "$$$"
  },
   {
    "id": "tokyo-grand-tokyo",
    "name": "Tokyo Grand",
    "city": "Tokyo",
    "status": "Clean",
    "lastUpdated": "2024-07-20",
    "description": "Experience unparalleled Japanese hospitality. Located in Shinjuku, with rooms starting at ¥25,000. Features an on-site spa and Michelin-starred restaurant.",
    "reports": [],
    "image": "https://picsum.photos/seed/tokyo-grand/800/600",
    "avgRating": 4.9,
    "priceRange": "$$$$$"
  },
  {
    "id": "sydney-harbour-hotel-sydney",
    "name": "Sydney Harbour Hotel",
    "city": "Sydney",
    "status": "Pest Reported",
    "lastUpdated": "2024-07-18",
    "description": "Stunning views of the Opera House and Harbour Bridge. Prices start at AUD 400. Includes access to our infinity pool.",
    "reports": [
       {
        "type": "Ants",
        "date": "2024-07-17",
        "notes": "Ants found in the kitchenette area."
      }
    ],
    "image": "https://picsum.photos/seed/sydney-harbour/800/600",
    "avgRating": 4.1,
    "priceRange": "$$$$"
  }
];