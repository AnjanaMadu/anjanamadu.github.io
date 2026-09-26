import { CraftItem, ProjectItem, SocialLink } from './types';

export const PROFILE_DATA = {
  name: 'Anjana Madu',
  fullName: 'Anjana Madushanka',
  japaneseName: 'アンジャナ・マドゥ',
  handle: '@AnjanaMadu',
  role: 'Full-Stack & DevOps Engineer',
  avatarUrl: '/images/anjana_avatar.png',
  location: 'Colombo, Sri Lanka',
  blog: 'anjanamadu.net',
  email: 'hello@anjanamadu.net',
  motto: 'Build, break, learn, repeat.',
  shortQuote: "It's not impossible, it's just hard.",
  bio: 'Full-stack developer, DevOps enthusiast, and open-source fanatic. Specializing in high-performance web systems, cloud infrastructure, container automation, and network security. Driven by turning intricate engineering challenges into clean, resilient software.',
  philosophy: 'Code. Coffee. Chaos. • Building open-source solutions with relentless curiosity.',
  currentFocus: 'Architecting distributed backends, containerized cloud automation, and cross-platform desktop & mobile utilities.',
  stats: {
    repos: 44,
    followers: 234,
    status: 'Available for Opportunities'
  },
  techStack: [
    'Python', 'Go', 'TypeScript', 'Node.js', 'Dart & Flutter',
    'React', 'Next.js', 'Tailwind CSS', 'Docker', 'Linux (Arch/Ubuntu)',
    'PostgreSQL', 'Redis', 'Caddy & Nginx', 'Reverse Proxies'
  ],
  creator: 'Engineering Portfolio',
  year: '2026'
};

export const CRAFT_DATA: CraftItem[] = [
  {
    id: 'fullstack',
    number: '(01)',
    title: 'Full-Stack Engineering',
    description: 'Architecting fast, responsive React, Next.js, TypeScript and Python web applications with rock-solid APIs.',
    iconTag: 'REACT · NEXT.JS · PYTHON · NODE',
    details: {
      subtitle: 'Modern Web Architectures & Interactive Client Surfaces',
      highlights: [
        'Component-driven architectures built with React 19, TypeScript & Tailwind',
        'High-concurrency backend services using Go, Python FastAPI, and Express',
        'Scalable data schemas using PostgreSQL, MongoDB, and Redis caching',
        'State management, optimistic updates, and clean modular codebases'
      ],
      techStack: ['React', 'Next.js', 'TypeScript', 'Python', 'Node.js', 'PostgreSQL'],
      deliverables: ['Production Web Apps', 'REST & GraphQL APIs', 'Real-time WebSocket Dashboards']
    }
  },
  {
    id: 'devops',
    number: '(02)',
    title: 'DevOps & Cloud Infra',
    description: 'Automating zero-downtime deployment pipelines, container virtualization, reverse proxies, and server provisioning.',
    iconTag: 'DOCKER · CADDY · NGINX · CI/CD',
    details: {
      subtitle: 'Resilient Infrastructure, Automated Pipelines & Container Orchestration',
      highlights: [
        'Containerization with Docker & Docker Compose for reproducible runtimes',
        'Automatic TLS / HTTPS reverse-proxy architectures using Caddy and Nginx',
        'Automated CI/CD pipelines for linting, testing, and cloud deployment',
        'Linux system tuning, shell automation, and environment management (Arch/Ubuntu)'
      ],
      techStack: ['Docker', 'Caddy', 'Nginx', 'GitHub Actions', 'Linux SysAdmin', 'Shell Scripting'],
      deliverables: ['Automated CI/CD', 'Reverse Proxy Clusters', 'Reproducible Docker Images']
    }
  },
  {
    id: 'security',
    number: '(03)',
    title: 'Network & Systems',
    description: 'Developing high-throughput bots, MTProto protocol integrations, WebSocket pipelines, and network tools.',
    iconTag: 'TELEGRAM BOTS · MTPROTO · WEBSOCKET · TLS',
    details: {
      subtitle: 'Protocol Engineering, Real-Time Messaging & Security Tooling',
      highlights: [
        'Scalable Telegram bot engines processing tens of thousands of requests',
        'MTProto network implementations and WebSocket communication layers',
        'Xray WebSocket proxy deployment with automated TLS security headers',
        'Local NAS file-serving network protocols for peer-to-peer data distribution'
      ],
      techStack: ['Python', 'Dart/Flutter', 'Go', 'WebSocket', 'MTProto', 'TLS/SSL'],
      deliverables: ['Mass-Scale Telegram Bots', 'Local NAS Servers', 'Encrypted Proxy Tunnels']
    }
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-01',
    type: 'project',
    number: 'NO. 01',
    tag: 'NETWORKING',
    title: 'WLAN-File-Share',
    repoName: 'AnjanaMadu/WLAN-File-Share',
    repoUrl: 'https://github.com/AnjanaMadu/WLAN-File-Share',
    stars: 10,
    language: 'Dart',
    category: 'Local NAS & Network Share',
    description: 'High-performance local NAS file-serving engine that turns Android devices into an ultra-fast local network file share without cables or 3rd-party clouds.',
    highlights: [
      'High-speed local network transfer without cloud dependency',
      'Minimal latency peer-to-peer file serving',
      'Clean intuitive cross-device browser UI'
    ]
  },
  {
    id: 'proj-02',
    type: 'graphic',
    title: 'Graphic Card',
    category: 'Engineering Philosophy',
    description: 'Engineering Philosophy Card — Code · Coffee · Chaos · Open Source.'
  },
  {
    id: 'proj-03',
    type: 'project',
    number: 'NO. 02',
    tag: 'TELEGRAM BOT',
    title: 'MentionAllBot',
    repoName: 'AnjanaMadu/MentionAllBot',
    repoUrl: 'https://github.com/AnjanaMadu/MentionAllBot',
    stars: 50,
    language: 'Python',
    category: 'High-Scale Bot Engine',
    description: 'Ultra-popular Telegram bot capable of mentioning up to 10,000 members in groups and 200 in channels, engineered with asynchronous Python.',
    highlights: [
      'Over 50 stars and 139+ forks in the open-source community',
      'Batched mentions with rate-limit evasion algorithms',
      'High uptime and fault-tolerant message dispatching'
    ]
  },
  {
    id: 'proj-04',
    type: 'project',
    number: 'NO. 03',
    tag: 'FLUTTER DESKTOP',
    title: 'ADB-Explorer',
    repoName: 'AnjanaMadu/ADB-Explorer',
    repoUrl: 'https://github.com/AnjanaMadu/ADB-Explorer',
    stars: 1,
    language: 'Dart & Flutter',
    category: 'Desktop System Utility',
    description: 'Flutter desktop app for exploring and managing files on your Android phone via ADB with a sleek graphical file manager.',
    highlights: [
      'Native desktop experience for Windows, macOS & Linux',
      'Direct ADB shell socket integration',
      'Drag-and-drop file push/pull with transfer progress'
    ]
  },
  {
    id: 'proj-05',
    type: 'project',
    number: 'NO. 04',
    tag: 'TORRENT CLIENT',
    title: 'seedr.app',
    repoName: 'AnjanaMadu/seedr.app',
    repoUrl: 'https://github.com/AnjanaMadu/seedr.app',
    stars: 3,
    language: 'Dart & Flutter',
    category: 'Cross-Platform Streaming',
    description: 'A cross-platform Flutter application for streaming and downloading torrents efficiently across Android and iOS platforms.',
    highlights: [
      'Seamless multi-platform mobile build',
      'Instant media stream buffering',
      'Minimal battery & memory footprint'
    ]
  },
  {
    id: 'proj-06',
    type: 'project',
    number: 'NO. 05',
    tag: 'DEVOPS & TLS',
    title: 'xray-docker-tls',
    repoName: 'AnjanaMadu/xray-docker-tls',
    repoUrl: 'https://github.com/AnjanaMadu/xray-docker-tls',
    stars: 1,
    language: 'Shell & Docker',
    category: 'Automated Proxy Pipeline',
    description: 'Containerized deployment pipeline configuring an Xray WebSocket proxy reverse-proxied through Caddy with automated HTTPS / TLS certificates.',
    highlights: [
      'Single-command docker-compose orchestration',
      'Automated Let’s Encrypt SSL/TLS renewal via Caddy',
      'Secure WebSocket reverse-proxy routing'
    ]
  },
  {
    id: 'proj-07',
    type: 'project',
    number: 'NO. 06',
    tag: 'VIDEO UTILITY',
    title: 'shrinkit',
    repoName: 'AnjanaMadu/shrinkit',
    repoUrl: 'https://github.com/AnjanaMadu/shrinkit',
    stars: 1,
    language: 'Python',
    category: 'Desktop Optimization GUI',
    description: 'A lightweight GUI application for compressing videos, optimizing storage usage, and reducing file sizes without visual degradation.',
    highlights: [
      'Hardware-accelerated video transcoding',
      'Smart bitrate calculation algorithm',
      'Batch video queue processing'
    ]
  },
  {
    id: 'proj-08',
    type: 'project',
    number: 'NO. 07',
    tag: 'TELEGRAM PIPELINE',
    title: 'TGForward',
    repoName: 'AnjanaMadu/TGForward',
    repoUrl: 'https://github.com/AnjanaMadu/TGForward',
    stars: 22,
    language: 'Python',
    category: 'Message Router & Relay',
    description: 'Reliable Python message forwarding and sync automation engine with 22+ stars and 26+ forks across Telegram channels and groups.',
    highlights: [
      'Multi-channel synchronous relaying',
      'Filter and custom regex message rewrites',
      'Persistent SQLite state for message tracking'
    ]
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    handle: '@AnjanaMadu',
    url: 'https://github.com/AnjanaMadu',
    label: 'Explore Repositories'
  },
  {
    name: 'Website',
    handle: 'anjanamadu.net',
    url: 'https://anjanamadu.net',
    label: 'Official Domain'
  },
  {
    name: 'Telegram',
    handle: '@Anjana_Ma',
    url: 'https://telegram.me/Anjana_Ma',
    label: 'Direct Chat'
  },
  {
    name: 'Email',
    handle: 'hello@anjanamadu.net',
    url: 'mailto:hello@anjanamadu.net',
    label: 'Get in Touch'
  }
];
