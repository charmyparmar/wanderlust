const sampleListings = [
  {
    title: "Cozy Beachfront Villa",
    description:
      "A stunning villa with direct access to the white sandy beaches and crystal clear waters.",
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop",
    price: 1500,
    location: "Malibu",
    country: "United States",
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "Experience the city life in this spacious industrial-style loft located in the heart of the arts district.",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
    price: 2500,
    location: "New York City",
    country: "United States",
  },
  {
    title: "Mountain Retreat Cabin",
    description:
      "Escape to the serenity of the mountains. This wooden cabin features a fireplace and breathtaking views.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
    price: 1200,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Historic Canal House",
    description:
      "A beautifully preserved 17th-century house overlooking the famous canals.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
  },
  {
    title: "Private Island Paradise",
    description:
      "The ultimate luxury experience. An entire island to yourself with a full-service staff.",
    image:
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=1973&auto=format&fit=crop",
    price: 10000,
    location: "Bora Bora",
    country: "French Polynesia",
  },
  {
    title: "Rustic Farmhouse in Tuscany",
    description:
      "Live the Italian dream in this charming farmhouse surrounded by vineyards and olive groves.",
    image:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1780&auto=format&fit=crop",
    price: 900,
    location: "Florence",
    country: "Italy",
  },
  {
    title: "Futuristic Penthouse",
    description:
      "Sky-high living with floor-to-ceiling windows offering a panoramic view of the skyline.",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop",
    price: 4500,
    location: "Dubai",
    country: "UAE",
  },
  {
    title: "Traditional Ryokan",
    description:
      "Experience authentic Japanese hospitality in this serene inn featuring tatami mats and hot springs.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
    price: 300,
    location: "Kyoto",
    country: "Japan",
  },
  {
    title: "Safari Tent Lodge",
    description:
      "Luxury camping under the stars in the heart of the savannah. Guided tours included.",
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8bef99c02?q=80&w=2070&auto=format&fit=crop",
    price: 750,
    location: "Serengeti",
    country: "Tanzania",
  },
  {
    title: "Chic Parisian Studio",
    description:
      "A small but perfectly formed studio just steps away from the Eiffel Tower.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
    price: 1100,
    location: "Paris",
    country: "France",
  },
  {
    title: "Cliffside Infinity Villa",
    description:
      "Watch the sunset from your private infinity pool overlooking the Aegean Sea.",
    image:
      "https://images.unsplash.com/photo-1515404929826-76fff9fef204?q=80&w=2070&auto=format&fit=crop",
    price: 3200,
    location: "Santorini",
    country: "Greece",
  },
  {
    title: "Eco-Friendly Treehouse",
    description:
      "A sustainable stay high in the canopy. Perfect for nature lovers and bird watchers.",
    image:
      "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?q=80&w=1944&auto=format&fit=crop",
    price: 250,
    location: "Ubud",
    country: "Indonesia",
  },
  {
    title: "Minimalist Desert Home",
    description:
      "Find peace in the desert. This architecturally designed home offers stark beauty and quiet.",
    image:
      "https://images.unsplash.com/photo-1505843513577-22bb7d21ef45?q=80&w=2038&auto=format&fit=crop",
    price: 1400,
    location: "Joshua Tree",
    country: "United States",
  },
  {
    title: "Lakeside Manor",
    description:
      "A grand estate on the shores of Lake Como with private boat docking.",
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1974&auto=format&fit=crop",
    price: 5000,
    location: "Bellagio",
    country: "Italy",
  },
  {
    title: "Arctic Glass Igloo",
    description:
      "Sleep under the Northern Lights in a heated glass dome in the heart of Lapland.",
    image:
      "https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=2070&auto=format&fit=crop",
    price: 950,
    location: "Rovaniemi",
    country: "Finland",
  },
];

module.exports = { data: sampleListings };
