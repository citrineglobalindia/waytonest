import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  featured?: boolean;
  type: string;
  description?: string;
  features?: string[];
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Skyline Penthouse",
    location: "Downtown Dubai",
    price: "AED 15,500,000",
    bedrooms: 4,
    bathrooms: 5,
    area: "5,200 sqft",
    image: property1,
    featured: true,
    type: "Penthouse",
    description: "Breathtaking views from this luxurious penthouse featuring floor-to-ceiling windows, private terrace, and world-class amenities.",
    features: ["Private Pool", "Smart Home", "24/7 Concierge", "Private Elevator"],
  },
  {
    id: "2",
    title: "Marina Heights Residence",
    location: "Dubai Marina",
    price: "AED 8,900,000",
    bedrooms: 3,
    bathrooms: 4,
    area: "3,800 sqft",
    image: property2,
    featured: true,
    type: "Apartment",
    description: "Sophisticated living space in the heart of Dubai Marina with stunning waterfront views and premium finishes.",
    features: ["Marina View", "Gym Access", "Covered Parking", "Maid's Room"],
  },
  {
    id: "3",
    title: "Palm Beachfront Villa",
    location: "Palm Jumeirah",
    price: "AED 45,000,000",
    bedrooms: 6,
    bathrooms: 7,
    area: "12,500 sqft",
    image: property3,
    featured: true,
    type: "Villa",
    description: "Exclusive beachfront villa with private beach access, infinity pool, and panoramic views of the Arabian Gulf.",
    features: ["Private Beach", "Infinity Pool", "Home Cinema", "Wine Cellar"],
  },
  {
    id: "4",
    title: "Emirates Hills Estate",
    location: "Emirates Hills",
    price: "AED 62,000,000",
    bedrooms: 7,
    bathrooms: 9,
    area: "18,000 sqft",
    image: property1,
    type: "Villa",
    description: "Magnificent estate in the prestigious Emirates Hills community with golf course views and ultimate privacy.",
    features: ["Golf Views", "Tennis Court", "Guest House", "Staff Quarters"],
  },
  {
    id: "5",
    title: "City Walk Loft",
    location: "City Walk",
    price: "AED 4,200,000",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,800 sqft",
    image: property2,
    type: "Loft",
    description: "Contemporary loft-style living in the vibrant City Walk district with rooftop access and urban views.",
    features: ["Rooftop Access", "High Ceilings", "Designer Finishes", "Pet Friendly"],
  },
  {
    id: "6",
    title: "Jumeirah Bay Mansion",
    location: "Jumeirah Bay Island",
    price: "AED 85,000,000",
    bedrooms: 8,
    bathrooms: 10,
    area: "25,000 sqft",
    image: property3,
    type: "Mansion",
    description: "Ultra-luxury mansion on the exclusive Jumeirah Bay Island with 360-degree views and private marina berth.",
    features: ["Private Marina", "Helipad", "Spa & Wellness", "Smart Security"],
  },
];

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Srinivas Prabhu",
    role: "Co-Founder & Director",
    image: "/src/assets/team/srinivas-prabhu.jpeg",
    bio: "Srinivas Prabhu is the Co-Founder and Director of Way to Nest Pvt. Ltd. An MBA graduate with over 20 years of experience in the financial markets, he possesses deep expertise in share market trading, investment strategies, and wealth creation. His strong analytical approach and financial acumen enable him to provide clients with valuable insights for making informed investment decisions. With more than five years of experience in the real estate industry, Prabhu has developed an in-depth understanding of market trends, property valuation, pricing strategies, and customer requirements. He plays a key role in guiding clients through every stage of the buying and selling process by providing accurate market intelligence and strategic advice. Known for his integrity, professionalism, and commitment to excellence, Prabhu has earned the trust of clients and industry partners alike. His exceptional communication skills, client-centric approach, and unwavering dedication ensure every client receives a seamless and rewarding real estate experience. His passion for delivering value and building long-term relationships continues to drive the success and growth of Way to Nest.",
  },
  {
    id: "2",
    name: "Sevanth Kumar",
    role: "Co-Founder & Director",
    image: "/src/assets/team/sevanth.jpeg",
    bio: "Sevanth Kumar is the Co-Founder and Director of Way to Nest Pvt. Ltd., a leading real estate advisory firm based in Bengaluru. Recognised for his integrity, market expertise, and client-first approach, Sevanth has established himself as a trusted name in the real estate industry. Over the years, he has successfully represented clients from India and across the globe, facilitating more than 1,000 real estate transactions with professionalism and transparency. With over 10 years of experience in real estate, Sevanth brings extensive knowledge of residential investments, luxury homes, and strategic property advisory. Before entering the real estate sector, he built a strong foundation in the hospitality industry, where he developed exceptional customer service, relationship management, and communication skills—qualities that continue to define his approach today. Sevanth has earned the trust of a diverse clientele by consistently delivering personalised guidance, honest advice, and seamless transaction experiences. His expertise in market analysis, pricing strategies, negotiation, and investment planning enables clients to make confident and informed real estate decisions. His dedication and commitment have helped more than 100 families find their dream homes while assisting numerous investors in building successful property portfolios. Clients value Sevanth for his patience, approachable nature, and ability to truly understand their goals. His low-pressure yet results-driven approach, combined with his unwavering commitment from the initial consultation through post-sale support, has led to long-lasting relationships and an outstanding reputation in the industry. Driven by a passion for excellence and a vision to redefine the home-buying experience, Sevanth continues to lead Way to Nest with innovation, integrity, and an uncompromising focus on customer satisfaction.",
  },
];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "James Morrison",
    role: "Business Owner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    content: "Way to Nest exceeded all expectations. Their attention to detail and understanding of luxury living is unmatched. Found my dream penthouse within weeks.",
    rating: 5,
  },
  {
    id: "2",
    name: "Amira Hassan",
    role: "Investment Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    content: "Professional, discrete, and incredibly knowledgeable. The team made purchasing my investment property a seamless experience.",
    rating: 5,
  },
  {
    id: "3",
    name: "Robert Chen",
    role: "CEO, Tech Ventures",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    content: "From viewing to closing, Way to Nest provided white-glove service. Their portfolio of exclusive listings is truly exceptional.",
    rating: 5,
  },
];
