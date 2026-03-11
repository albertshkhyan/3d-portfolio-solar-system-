import type { Planet, Project, Skill, Experience } from '../types'

export const DEVELOPER = {
  name: 'Albert Shkhyan',
  title: 'Software Engineer',
  subtitle: 'Building high-performance web and mobile applications using React, Next.js, and React Native.',
}

/**
 * Planet textures are loaded from public/textures/ (same-origin, no CORS).
 * Download from https://www.solarsystemscope.com/textures/ and place in public/textures/
 * with the filenames below. If a file is missing, the app falls back to solid colors.
 */
const TEXTURES_BASE = '/textures/'

export const TEXTURES = {
  sun: `${TEXTURES_BASE}2k_sun.jpg`,
  mercury: `${TEXTURES_BASE}2k_mercury.jpg`,
  venus: `${TEXTURES_BASE}2k_venus_surface.jpg`,
  earth: `${TEXTURES_BASE}2k_earth_daymap.jpg`,
  earthClouds: `${TEXTURES_BASE}2k_earth_clouds.jpg`,
  mars: `${TEXTURES_BASE}2k_mars.jpg`,
  jupiter: `${TEXTURES_BASE}2k_jupiter.jpg`,
  saturn: `${TEXTURES_BASE}2k_saturn.jpg`,
  saturnRing: `${TEXTURES_BASE}2k_saturn_ring_alpha.png`,
  neptune: `${TEXTURES_BASE}2k_neptune.jpg`,
  moon: `${TEXTURES_BASE}2k_moon.jpg`,
  stars: `${TEXTURES_BASE}2k_stars_milky_way.jpg`,
}

export const PLANETS: Planet[] = [
  {
    id: 'about',
    name: 'Mercury',
    label: 'About Me',
    distance: 4,
    size: 0.4,
    color: '#8c8c8c',
    orbitSpeed: 0.4,
    rotationSpeed: 0.01,
    initialAngle: 0,
    cameraOffset: [2, 1, 2],
    texture: TEXTURES.mercury,
  },
  {
    id: 'skills',
    name: 'Venus',
    label: 'Skills',
    distance: 6,
    size: 0.6,
    color: '#e6b800',
    emissive: '#ff9500',
    orbitSpeed: 0.3,
    rotationSpeed: 0.008,
    initialAngle: Math.PI / 3,
    cameraOffset: [3, 1.5, 3],
    texture: TEXTURES.venus,
  },
  {
    id: 'experience',
    name: 'Earth',
    label: 'Experience',
    distance: 8,
    size: 0.65,
    color: '#4a90d9',
    emissive: '#2d5a87',
    orbitSpeed: 0.25,
    rotationSpeed: 0.012,
    initialAngle: Math.PI / 2,
    cameraOffset: [3, 1.5, 3],
    texture: TEXTURES.earth,
  },
  {
    id: 'projects',
    name: 'Mars',
    label: 'Projects',
    distance: 10,
    size: 0.5,
    color: '#c1440e',
    emissive: '#8b0000',
    orbitSpeed: 0.2,
    rotationSpeed: 0.011,
    initialAngle: Math.PI,
    cameraOffset: [4, 2, 4],
    texture: TEXTURES.mars,
  },
  {
    id: 'architecture',
    name: 'Jupiter',
    label: 'Architecture',
    distance: 14,
    size: 1.2,
    color: '#d4a574',
    emissive: '#8b6914',
    orbitSpeed: 0.1,
    rotationSpeed: 0.02,
    initialAngle: (4 * Math.PI) / 3,
    cameraOffset: [5, 2.5, 5],
    texture: TEXTURES.jupiter,
  },
  {
    id: 'devops',
    name: 'Saturn',
    label: 'DevOps',
    distance: 18,
    size: 1.0,
    color: '#c9b896',
    emissive: '#8b7355',
    orbitSpeed: 0.07,
    rotationSpeed: 0.018,
    initialAngle: (5 * Math.PI) / 3,
    hasRings: true,
    cameraOffset: [6, 3, 6],
    texture: TEXTURES.saturn,
    ringTexture: TEXTURES.saturnRing,
  },
  {
    id: 'contact',
    name: 'Neptune',
    label: 'Contact',
    distance: 22,
    size: 0.8,
    color: '#4169e1',
    emissive: '#191970',
    orbitSpeed: 0.05,
    rotationSpeed: 0.015,
    initialAngle: (7 * Math.PI) / 4,
    cameraOffset: [4, 2, 4],
    texture: TEXTURES.neptune,
  },
]

export const PROJECTS: Project[] = [
  {
    id: 'myfits',
    name: 'MyFits',
    description: 'A fitness tracking application that helps users monitor their workouts, nutrition, and progress with personalized recommendations.',
    technologies: ['React Native', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis'],
    github: 'https://github.com/albertshkhyan/myfits',
    demo: 'https://myfits.app',
    orbitDistance: 1.2,
    size: 0.15,
  },
  {
    id: 'teesheet',
    name: 'TeeSheet',
    description: 'Golf course management and tee time booking platform with real-time availability and seamless payment integration.',
    technologies: ['Next.js', 'TypeScript', 'Nest.js', 'PostgreSQL', 'Stripe'],
    github: 'https://github.com/albertshkhyan/teesheet',
    demo: 'https://teesheet.io',
    orbitDistance: 1.6,
    size: 0.18,
  },
  {
    id: 'mementix',
    name: 'Mementix',
    description: 'Digital memory preservation platform allowing users to create, share, and preserve meaningful moments and stories.',
    technologies: ['React', 'TypeScript', 'AWS', 'DynamoDB', 'S3'],
    github: 'https://github.com/albertshkhyan/mementix',
    demo: 'https://mementix.com',
    orbitDistance: 2.0,
    size: 0.14,
  },
  {
    id: 'sneaker-builder',
    name: 'Sneaker Builder',
    description: '3D sneaker customization tool with real-time preview, allowing users to design unique footwear combinations.',
    technologies: ['Three.js', 'React', 'WebGL', 'Node.js', 'MongoDB'],
    github: 'https://github.com/albertshkhyan/sneaker-builder',
    demo: 'https://sneaker-builder.dev',
    orbitDistance: 2.4,
    size: 0.16,
  },
]

export const SKILLS: Skill[] = [
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'React Native', category: 'mobile' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Nest.js', category: 'backend' },
  { name: 'Docker', category: 'devops' },
  { name: 'AWS', category: 'devops' },
  { name: 'PostgreSQL', category: 'database' },
  { name: 'MongoDB', category: 'database' },
  { name: 'Redis', category: 'database' },
  { name: 'GraphQL', category: 'backend' },
  { name: 'Tailwind', category: 'frontend' },
  { name: 'Three.js', category: 'frontend' },
  { name: 'Git', category: 'devops' },
  { name: 'CI/CD', category: 'devops' },
]

export const EXPERIENCES: Experience[] = [
  {
    title: 'Software Engineer',
    company: 'Brainstorm Technologies',
    period: '2021 – Present',
    description: [
      'Lead development of React and React Native applications serving 100K+ users',
      'Architected microservices infrastructure using Node.js, Nest.js, and PostgreSQL',
      'Implemented CI/CD pipelines reducing deployment time by 60%',
      'Mentored junior developers and conducted code reviews',
    ],
  },
  {
    title: 'Frontend Developer',
    company: 'Digital Innovations',
    period: '2019 – 2021',
    description: [
      'Built responsive web applications using React and TypeScript',
      'Collaborated with UX team to implement pixel-perfect designs',
      'Optimized application performance achieving 95+ Lighthouse scores',
      'Integrated third-party APIs and payment gateways',
    ],
  },
  {
    title: 'Junior Developer',
    company: 'StartUp Labs',
    period: '2018 – 2019',
    description: [
      'Developed features for e-commerce platform using React',
      'Created RESTful APIs with Node.js and Express',
      'Participated in agile development processes',
      'Wrote unit and integration tests improving code coverage',
    ],
  },
]

export const ABOUT_CONTENT = {
  bio: `I'm a passionate Software Engineer with expertise in building scalable web and mobile applications. 
  With a strong foundation in modern JavaScript frameworks and cloud technologies, I transform complex 
  requirements into elegant, user-centric solutions.`,
  highlights: [
    'Full-stack development expertise',
    'Mobile-first approach',
    'Performance optimization specialist',
    'Clean code advocate',
  ],
  location: 'Available for remote work worldwide',
}

export const ARCHITECTURE_CONTENT = {
  title: 'System Architecture & Engineering',
  topics: [
    {
      name: 'Microservices',
      description: 'Designing loosely coupled, independently deployable services',
    },
    {
      name: 'Event-Driven Architecture',
      description: 'Building reactive systems with message queues and event sourcing',
    },
    {
      name: 'API Design',
      description: 'RESTful APIs, GraphQL schemas, and API versioning strategies',
    },
    {
      name: 'Database Design',
      description: 'Schema optimization, indexing strategies, and data modeling',
    },
    {
      name: 'Caching Strategies',
      description: 'Multi-layer caching with Redis, CDN, and browser caching',
    },
    {
      name: 'Security',
      description: 'Authentication, authorization, and secure coding practices',
    },
  ],
}

export const DEVOPS_CONTENT = {
  title: 'DevOps & Infrastructure',
  tools: [
    { name: 'Docker', description: 'Containerization and multi-stage builds' },
    { name: 'Kubernetes', description: 'Container orchestration and scaling' },
    { name: 'AWS', description: 'EC2, ECS, Lambda, S3, RDS, CloudFront' },
    { name: 'CI/CD', description: 'GitHub Actions, Jenkins, automated testing' },
    { name: 'Monitoring', description: 'Prometheus, Grafana, ELK Stack' },
    { name: 'IaC', description: 'Terraform, CloudFormation' },
  ],
}

export const CONTACT_CONTENT = {
  email: 'albert.shkhyan@example.com',
  github: 'https://github.com/albertshkhyan',
  linkedin: 'https://linkedin.com/in/albertshkhyan',
  twitter: 'https://twitter.com/albertshkhyan',
}
