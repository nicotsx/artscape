export const exhibitions = [
  {
    id: 1,
    title: 'Neo-Expressionism: Beyond Boundaries',
    artist: 'Maria Rodriguez',
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80&w=2940',
    location: 'Modern Art Gallery',
    date: 'Mar 15 - Apr 30',
    category: 'Contemporary',
    shortDescription: 'Discover the bold and vibrant world of neo-expressionism through the eyes of Maria Rodriguez.',
    description:
      'Neo-expressionism is a style of painting and sculpture developed in the late 1970s and early 1980s. It is characterized by intense subjectivity and rough handling of materials. Neo-expressionism is a style of painting and sculpture developed in the late 1970s and early 1980s. It is characterized by intense subjectivity and rough handling of materials.',
  },
  {
    id: 2,
    title: 'Digital Renaissance',
    artist: 'James Chen',
    image: 'https://images.unsplash.com/photo-1545989253-02cc26577f88?auto=format&fit=crop&q=80&w=2940',
    location: 'Digital Arts Center',
    date: 'Mar 20 - May 15',
    category: 'Digital Art',
    shortDescription: 'Explore the intersection of art and technology in this groundbreaking digital art exhibition.',
    description:
      'Digital art is an artistic work or practice that uses digital technology as an essential part of the creative or presentation process. Digital art is an artistic work or practice that uses digital technology as an essential part of the creative or presentation process.',
  },
  {
    id: 3,
    title: 'Abstract Perspectives',
    artist: 'Sophie Laurent',
    image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=2940',
    location: 'Contemporary Museum',
    date: 'Mar 25 - Apr 25',
    category: 'Abstract',
    shortDescription: 'Dive into the world of abstract art and discover new perspectives with Sophie Laurent.',
    description:
      'Abstract art uses a visual language of shape, form, color and line to create a composition which may exist with a degree of independence from visual references in the world. Abstract art uses a visual language of shape, form, color and line to create a composition which may exist with a degree of independence from visual references in the world.',
  },
  {
    id: 4,
    title: 'Light & Shadow',
    artist: 'David Kim',
    image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=2940',
    location: 'Photography Gallery',
    date: 'Apr 1 - May 30',
    category: 'Photography',
    shortDescription: 'Experience the beauty of light and shadow in this stunning photography exhibition by David Kim.',
    description:
      'Photography is the art, application, and practice of creating durable images by recording light, either electronically by means of an image sensor, or chemically by means of a light-sensitive material such as photographic film. Photography is the art, application, and practice of creating durable images by recording light, either electronically by means of an image sensor, or chemically by means of a light-sensitive material such as photographic film',
  },
  {
    id: 5,
    title: 'Form in Motion',
    artist: 'Elena Petrova',
    image: 'https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&q=80&w=2940',
    location: 'Sculpture Garden',
    date: 'Apr 5 - Jun 15',
    category: 'Sculpture',
    shortDescription: 'Discover the beauty of form and motion in this captivating sculpture exhibition by Elena Petrova.',
    description:
      'Sculpture is the branch of the visual arts that operates in three dimensions. It is one of the plastic arts. Durable sculptural processes originally used carving and modelling, in stone, metal, ceramics, wood and other materials but, since Modernism, there has been an almost complete freedom of materials and process',
  },
  {
    id: 6,
    title: 'Urban Fragments',
    artist: 'Marcus Wong',
    image: 'https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?auto=format&fit=crop&q=80&w=2940',
    location: 'City Gallery',
    date: 'Apr 10 - May 20',
    category: 'Contemporary',
    shortDescription: 'Explore the hidden beauty of urban life through the lens of Marcus Wong.',
    description:
      'Urban art is a style of art that relates to cities and city life often done by artists who live in or have a passion for city life. Urban art is a style of art that relates to cities and city life often done by artists who live in or have a passion for city life',
  },
];

export type Exhibition = (typeof exhibitions)[number];
