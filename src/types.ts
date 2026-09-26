export interface CraftItem {
  id: string;
  number: string;
  title: string;
  description: string;
  iconTag: string;
  previewImage?: string;
  details: {
    subtitle: string;
    highlights: string[];
    techStack: string[];
    deliverables: string[];
  };
}

export interface ProjectItem {
  id: string;
  type: 'project' | 'graphic';
  number?: string;
  tag?: string;
  title: string;
  repoName?: string;
  repoUrl?: string;
  stars?: number;
  language?: string;
  category: string;
  description: string;
  highlights?: string[];
}

export interface SocialLink {
  name: string;
  handle: string;
  url: string;
  label: string;
}
