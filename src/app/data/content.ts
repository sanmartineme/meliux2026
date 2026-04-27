export interface Content {
  id: string;
  title: string;
  classification: string;
  genre: string;
  duration: string;
  year: number;
  rating: number;
  votes: number;
  description: string;
  summary: string;
  image: string;
  heroImage: string;
  isNew?: boolean;
  category: 'serie' | 'pelicula' | 'infantil';
  type: 'Serie' | 'Película' | 'Infantil';
  episodes?: number;
  friends?: { name: string; avatar: string; comment: string }[];
}

export interface Profile {
  id: string;
  name: string;
  avatar: string;
  isKids?: boolean;
}

export const PROFILES: Profile[] = [
  { id: '1', name: 'Carlos', avatar: 'C' },
  { id: '2', name: 'María', avatar: 'M' },
  { id: '3', name: 'Diego', avatar: 'D' },
  { id: '4', name: 'Sofía (Niños)', avatar: 'S', isKids: true },
];

export const CONTENTS: Content[] = [
  {
    id: '1',
    title: 'El Último Horizonte',
    classification: 'ATP',
    genre: 'Acción',
    duration: '2h 18min',
    year: 2024,
    rating: 4.8,
    votes: 2340,
    description: 'Un grupo de exploradores descubre un portal interdimensional que amenaza con cambiar el curso de la historia humana para siempre.',
    summary: 'Cuando el ingeniero Marcos Vidal encuentra una señal de origen desconocido en los Andes, una aventura épica comienza. Con el apoyo de su equipo, deberá enfrentar fuerzas que desafían la física y el tiempo mismo.',
    image: 'https://images.unsplash.com/photo-1632770592064-5a98f5b1e66c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1632770592064-5a98f5b1e66c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80',
    isNew: true,
    category: 'pelicula',
    type: 'Película',
    friends: [
      { name: 'Ana García', avatar: 'A', comment: '¡Increíble película! Los efectos visuales son alucinantes.' },
      { name: 'Luis Moreno', avatar: 'L', comment: 'La vi el fin de semana, no para de sorprender.' },
    ],
  },
  {
    id: '2',
    title: 'Sombras del Pasado',
    classification: '+16',
    genre: 'Drama',
    duration: '45min/ep',
    year: 2024,
    rating: 4.6,
    votes: 1890,
    description: 'Una familia que regresa a su ciudad natal debe enfrentar los secretos que dejó atrás hace veinte años.',
    summary: 'La serie sigue a los hermanos Reyes cuando regresan a Mendoza tras la muerte de su padre. Lo que descubren sobre su pasado familiar sacudirá los cimientos de todo lo que creyeron conocer.',
    image: 'https://images.unsplash.com/photo-1759576865612-365f4c5a7c77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1759576865612-365f4c5a7c77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80',
    isNew: true,
    category: 'serie',
    type: 'Serie',
    episodes: 8,
    friends: [
      { name: 'Paula Soto', avatar: 'P', comment: 'No pude parar de verla. ¡Qué final de temporada!' },
    ],
  },
  {
    id: '3',
    title: 'La Última Señal',
    classification: '+18',
    genre: 'Thriller',
    duration: '1h 52min',
    year: 2023,
    rating: 4.5,
    votes: 3120,
    description: 'Una detective recibe mensajes de alguien que dice saber dónde está el asesino que buscó durante años.',
    summary: 'La Comisaria Valeria Montes creía haber cerrado el caso Fantasma. Cinco años después, una llamada anónima reabre heridas y la lanza a una persecución que podría costarle la vida.',
    image: 'https://images.unsplash.com/photo-1770150511119-ec6b93d26de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1770150511119-ec6b93d26de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80',
    category: 'pelicula',
    type: 'Película',
  },
  {
    id: '4',
    title: '¡Qué Locura de Familia!',
    classification: 'ATP',
    genre: 'Comedia',
    duration: '30min/ep',
    year: 2024,
    rating: 4.3,
    votes: 5670,
    description: 'Una familia disfuncional intenta sobrevivir a la llegada de los suegros durante las vacaciones de verano.',
    summary: 'Roberto y Claudia pensaban que las vacaciones serían tranquilas, hasta que los padres de ambos decidieron visitarlos el mismo fin de semana. Una comedia caótica y entrañable sobre el amor familiar.',
    image: 'https://images.unsplash.com/photo-1562123126-97d4be34679d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1562123126-97d4be34679d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80',
    isNew: true,
    category: 'serie',
    type: 'Serie',
    episodes: 12,
  },
  {
    id: '5',
    title: 'Mundo Mágico',
    classification: 'ATP',
    genre: 'Animación',
    duration: '22min/ep',
    year: 2024,
    rating: 4.9,
    votes: 8900,
    description: 'Luna y sus amigos exploran un universo mágico lleno de criaturas fantásticas y aventuras increíbles.',
    summary: 'En el Reino de Cristal, la pequeña Luna descubre que tiene poderes especiales. Con sus amigos Topo, Estrellita y el dragón Chispa, emprenden misiones para proteger la paz del mundo mágico.',
    image: 'https://images.unsplash.com/photo-1593538573197-4e3ee8a864d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1593538573197-4e3ee8a864d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80',
    isNew: true,
    category: 'infantil',
    type: 'Infantil',
    episodes: 20,
  },
  {
    id: '6',
    title: 'Galaxia X',
    classification: '+13',
    genre: 'Ciencia Ficción',
    duration: '2h 5min',
    year: 2024,
    rating: 4.7,
    votes: 4210,
    description: 'En el año 2387, la humanidad recibe la primera señal de vida extraterrestre y debe decidir si responder.',
    summary: 'La doctora Elena Voss encabeza el equipo de respuesta de primera humanidad ante el contacto extraterrestre. Pero la señal no es solo un saludo: es una advertencia.',
    image: 'https://images.unsplash.com/photo-1688407832489-cc9db90773f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1688407832489-cc9db90773f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80',
    category: 'pelicula',
    type: 'Película',
    friends: [
      { name: 'Jorge Pérez', avatar: 'J', comment: 'La mejor película de ciencia ficción en años. ¡Imperdible!' },
      { name: 'Carla Vega', avatar: 'C', comment: 'Los efectos especiales son perfectos, muy recomendada.' },
    ],
  },
  {
    id: '7',
    title: 'Amor Sin Fronteras',
    classification: '+13',
    genre: 'Romance',
    duration: '40min/ep',
    year: 2023,
    rating: 4.4,
    votes: 6780,
    description: 'Dos jóvenes de mundos completamente distintos se enamoran durante un intercambio cultural en Buenos Aires.',
    summary: 'Sofía, una diseñadora porteña, y Julián, un músico mexicano, se conocen durante un festival de arte. A pesar de las distancias y diferencias, el amor encuentra su camino.',
    image: 'https://images.unsplash.com/photo-1627964464837-6328f5931576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1627964464837-6328f5931576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80',
    category: 'serie',
    type: 'Serie',
    episodes: 10,
  },
  {
    id: '8',
    title: 'Tierra Viva',
    classification: 'ATP',
    genre: 'Documental',
    duration: '50min/ep',
    year: 2024,
    rating: 4.8,
    votes: 3400,
    description: 'Una exploración visual única por los ecosistemas más extremos y hermosos del planeta.',
    summary: 'En cuatro episodios épicos, cámaras de alta tecnología capturan la vida salvaje en los rincones más remotos de la Tierra: desde las profundidades del océano hasta las cimas más altas.',
    image: 'https://images.unsplash.com/photo-1584911171360-055a3612f6fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1584911171360-055a3612f6fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80',
    isNew: true,
    category: 'serie',
    type: 'Serie',
    episodes: 4,
  },
  {
    id: '9',
    title: 'La Casa del Fin del Mundo',
    classification: '+16',
    genre: 'Terror',
    duration: '1h 45min',
    year: 2023,
    rating: 4.2,
    votes: 2100,
    description: 'Cuatro amigos alquilan una casa en la Patagonia sin saber que sus paredes guardan un oscuro secreto.',
    summary: 'Lo que parecía ser un retiro de fin de semana perfecto se convierte en una pesadilla cuando los protagonistas descubren que la casa tiene una historia de desapariciones inexplicables.',
    image: 'https://images.unsplash.com/photo-1614201842267-206a09286c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1614201842267-206a09286c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80',
    category: 'pelicula',
    type: 'Película',
  },
  {
    id: '10',
    title: 'Imperios',
    classification: '+16',
    genre: 'Histórico',
    duration: '55min/ep',
    year: 2023,
    rating: 4.6,
    votes: 1760,
    description: 'La historia épica del ascenso y caída de los grandes imperios de la América precolombina.',
    summary: 'Desde los Aztecas hasta los Incas, esta serie de producción latinoamericana narra las guerras, alianzas y tradiciones que forjaron civilizaciones que asombraron al mundo.',
    image: 'https://images.unsplash.com/photo-1770820986355-fdf6406f669c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1770820986355-fdf6406f669c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80',
    category: 'serie',
    type: 'Serie',
    episodes: 6,
  },
  {
    id: '11',
    title: 'Héroes del Mañana',
    classification: '+13',
    genre: 'Acción',
    duration: '2h 10min',
    year: 2024,
    rating: 4.5,
    votes: 7890,
    description: 'Un grupo de jóvenes con habilidades especiales deben unirse para salvar la ciudad de una amenaza sobrenatural.',
    summary: 'Cinco adolescentes descubren que tienen poderes únicos cuando una energía oscura comienza a destruir su ciudad. Para sobrevivir, deben aprender a trabajar juntos y convertirse en los héroes que el mundo necesita.',
    image: 'https://images.unsplash.com/photo-1761053378569-21b1bec4bded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1761053378569-21b1bec4bded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80',
    isNew: true,
    category: 'pelicula',
    type: 'Película',
    friends: [
      { name: 'Tomás Díaz', avatar: 'T', comment: '¡Mi familia entera la vio y amó! 100% recomendada.' },
    ],
  },
  {
    id: '12',
    title: 'Cumbres Eternas',
    classification: 'ATP',
    genre: 'Documental',
    duration: '1h 30min',
    year: 2024,
    rating: 4.9,
    votes: 1230,
    description: 'Un viaje visual por las montañas más imponentes de Sudamérica y las comunidades que las habitan.',
    summary: 'El documentalista Manuel Ruiz pasa un año entre las comunidades andinas de Argentina, Chile y Perú, explorando la relación espiritual y cotidiana que tienen con sus majestuosas montañas.',
    image: 'https://images.unsplash.com/photo-1763829943639-b47fee99bc3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1763829943639-b47fee99bc3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80',
    isNew: true,
    category: 'pelicula',
    type: 'Película',
  },
];

export const getContentById = (id: string): Content | undefined =>
  CONTENTS.find((c) => c.id === id);

export const getContentByCategory = (category: 'serie' | 'pelicula' | 'infantil'): Content[] =>
  CONTENTS.filter((c) => c.category === category);

export const HERO_CONTENTS = [CONTENTS[0], CONTENTS[5], CONTENTS[10], CONTENTS[7]];
export const TOP_RECOMMENDED = CONTENTS.slice(0, 5);
export const NEW_SERIES = CONTENTS.filter((c) => c.category === 'serie').slice(0, 5);
export const DESTACADOS = [CONTENTS[1], CONTENTS[6], CONTENTS[9], CONTENTS[11]];
