export const exhibitions = [
  {
    id: 1,
    title: "Neo-Expressionism: Beyond Boundaries",
    artist: "Maria Rodriguez",
    image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80&w=2940",
    location: "Modern Art Gallery",
    date: "Mar 15 - Apr 30",
    category: "Contemporary"
  },
  {
    id: 2,
    title: "Digital Renaissance",
    artist: "James Chen",
    image: "https://images.unsplash.com/photo-1545989253-02cc26577f88?auto=format&fit=crop&q=80&w=2940",
    location: "Digital Arts Center",
    date: "Mar 20 - May 15",
    category: "Digital Art"
  },
  {
    id: 3,
    title: "Abstract Perspectives",
    artist: "Sophie Laurent",
    image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=2940",
    location: "Contemporary Museum",
    date: "Mar 25 - Apr 25",
    category: "Abstract"
  },
  {
    id: 4,
    title: "Light & Shadow",
    artist: "David Kim",
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=2940",
    location: "Photography Gallery",
    date: "Apr 1 - May 30",
    category: "Photography"
  },
  {
    id: 5,
    title: "Form in Motion",
    artist: "Elena Petrova",
    image: "https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&q=80&w=2940",
    location: "Sculpture Garden",
    date: "Apr 5 - Jun 15",
    category: "Sculpture"
  },
  {
    id: 6,
    title: "Urban Fragments",
    artist: "Marcus Wong",
    image: "https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?auto=format&fit=crop&q=80&w=2940",
    location: "City Gallery",
    date: "Apr 10 - May 20",
    category: "Contemporary"
  }
];

export type Exhibition = typeof exhibitions[number];
