export interface Content {
  id: string
  title: string
  genre: string
  year: number
  duration: string
  rating: 'ATP' | 'TE' | '+7' | '+13' | '+16' | '+18'
  synopsis: string
  emoji: string
  gradient: string
  isNew?: boolean
  isLastDays?: boolean
  isFree?: boolean
  isExclusive?: boolean
  networkRating?: number
  networkRatingCount?: number
  recommendation?: { from: string; avatar: string; color: string; message: string }
  progress?: number
}

export interface Group {
  id: string
  name: string
  type: 'family' | 'friends' | 'work' | 'other'
  members: Contact[]
}

export interface Contact {
  id: string
  name: string
  initial: string
  color: string
  groupId: string
  groupName: string
}

export const catalog: Content[] = [
  {
    id: 'toy-story-3',
    title: 'Toy Story 3',
    genre: 'Animación',
    year: 2010,
    duration: '1h 43min',
    rating: 'ATP',
    synopsis: 'Woody, Buzz y sus amigos son donados a una guardería. Juntos deben encontrar el camino a casa antes de que Andy parta a la universidad.',
    emoji: '🧸',
    gradient: 'from-blue-900 to-indigo-950',
    isNew: true,
    networkRating: 4.8,
    networkRatingCount: 3,
    recommendation: { from: 'Andrés', avatar: 'A', color: '#FFE600', message: '¡Te va a encantar, papá!' },
  },
  {
    id: 'el-rey-leon',
    title: 'El Rey León',
    genre: 'Animación',
    year: 1994,
    duration: '1h 28min',
    rating: 'ATP',
    synopsis: 'Un joven príncipe es traicionado y exiliado. Debe enfrentar su pasado y reclamar su lugar en el Ciclo de la Vida.',
    emoji: '🦁',
    gradient: 'from-amber-900 to-orange-950',
    networkRating: 4.9,
    networkRatingCount: 4,
    recommendation: { from: 'Mamá', avatar: 'M', color: '#1565C0', message: '' },
  },
  {
    id: 'interestelar',
    title: 'Interestelar',
    genre: 'Ciencia Ficción',
    year: 2014,
    duration: '2h 49min',
    rating: '+13',
    synopsis: 'Un equipo de astronautas viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad.',
    emoji: '🚀',
    gradient: 'from-slate-900 to-gray-950',
    networkRating: 3.5,
    networkRatingCount: 2,
    recommendation: { from: 'Virginia', avatar: 'V', color: '#2E7D32', message: 'Imperdible, en serio' },
  },
  {
    id: 'encanto',
    title: 'Encanto',
    genre: 'Animación',
    year: 2021,
    duration: '1h 39min',
    rating: 'ATP',
    synopsis: 'Una joven de una familia mágica descubre que ella es la única sin poderes, pero debe salvar a su familia.',
    emoji: '🎭',
    gradient: 'from-emerald-900 to-teal-950',
    isLastDays: true,
    networkRating: 4.1,
    networkRatingCount: 2,
  },
  {
    id: 'coco',
    title: 'Coco',
    genre: 'Animación',
    year: 2017,
    duration: '1h 45min',
    rating: 'ATP',
    synopsis: 'Miguel viaja al mundo de los muertos para encontrar a su tatarabuelo músico y descubrir la verdad sobre su familia.',
    emoji: '💀',
    gradient: 'from-orange-900 to-red-950',
    isFree: true,
    networkRating: 4.6,
    networkRatingCount: 3,
  },
  {
    id: 'ratatouille',
    title: 'Ratatouille',
    genre: 'Animación',
    year: 2007,
    duration: '1h 51min',
    rating: 'ATP',
    synopsis: 'Remy es una rata con un gran talento culinario que sueña con convertirse en chef de un restaurante parisino.',
    emoji: '🐀',
    gradient: 'from-red-900 to-rose-950',
    progress: 45,
  },
  {
    id: 'los-increibles',
    title: 'Los Increíbles',
    genre: 'Animación · Acción',
    year: 2004,
    duration: '1h 55min',
    rating: '+7',
    synopsis: 'Una familia de superhéroes enmascarados se ve forzada a abandonar su vida secreta para salvar al mundo.',
    emoji: '🦸',
    gradient: 'from-red-900 to-yellow-950',
    isExclusive: true,
    progress: 70,
  },
  {
    id: 'avengers-endgame',
    title: 'Avengers: Endgame',
    genre: 'Acción · Aventura',
    year: 2019,
    duration: '3h 1min',
    rating: '+13',
    synopsis: 'Los Vengadores sobrevivientes se reúnen para revertir las acciones de Thanos y restaurar el equilibrio del universo.',
    emoji: '⚡',
    gradient: 'from-purple-900 to-indigo-950',
    networkRating: 4.7,
    networkRatingCount: 2,
    progress: 20,
  },
  {
    id: 'inside-out-2',
    title: 'Del Revés 2',
    genre: 'Animación',
    year: 2024,
    duration: '1h 40min',
    rating: 'ATP',
    synopsis: 'Riley entra a la adolescencia y nuevas emociones llegan a su cabeza, desafiando el equilibrio que Alegría había construido.',
    emoji: '😮',
    gradient: 'from-yellow-900 to-orange-950',
    isNew: true,
    networkRating: 4.3,
    networkRatingCount: 2,
  },
  {
    id: 'moana',
    title: 'Moana: Un Mar de Aventuras',
    genre: 'Animación · Aventura',
    year: 2016,
    duration: '1h 53min',
    rating: 'ATP',
    synopsis: 'Una joven navegante polinesia emprende un viaje épico con el semidiós Maui para salvar a su pueblo.',
    emoji: '🌊',
    gradient: 'from-cyan-900 to-blue-950',
  },
]

export const paraVos: Content[] = catalog.filter(c => c.recommendation)

export const sigueViendo: Content[] = catalog.filter(c => c.progress)

export const top10: Content[] = [
  catalog[0], catalog[1], catalog[4], catalog[8], catalog[2],
  catalog[3], catalog[5], catalog[6], catalog[7], catalog[9],
]

export const groups: Group[] = [
  {
    id: 'familia',
    name: 'Familia',
    type: 'family',
    members: [
      { id: 'a', name: 'Andrés', initial: 'A', color: '#FFE600', groupId: 'familia', groupName: 'Familia' },
      { id: 'm', name: 'Mamá', initial: 'M', color: '#1565C0', groupId: 'familia', groupName: 'Familia' },
      { id: 'p', name: 'Papá', initial: 'P', color: '#2E7D32', groupId: 'familia', groupName: 'Familia' },
    ]
  },
  {
    id: 'amigos',
    name: 'Amigos del trabajo',
    type: 'friends',
    members: [
      { id: 'v', name: 'Virginia', initial: 'V', color: '#FF6B35', groupId: 'amigos', groupName: 'Amigos del trabajo' },
      { id: 'c', name: 'Carla', initial: 'C', color: '#9C27B0', groupId: 'amigos', groupName: 'Amigos del trabajo' },
    ]
  }
]

export const allContacts: Contact[] = groups.flatMap(g => g.members)
