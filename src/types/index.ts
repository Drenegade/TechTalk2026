export type TrackType = 'all' | 'ai-robotics' | 'cloud-sovereign' | 'embedded-iot' | 'cpe-mastery';

export type SessionType = 'keynote' | 'workshop' | 'panel' | 'research';

export interface Speaker {
  id: string;
  name: string;
  title: string;
  organization: string;
  bio: string;
  avatar: string;
  country: string;
  specialty: string[];
  featured?: boolean;
}

export interface Session {
  id: string;
  title: string;
  abstract: string;
  track: 'ai-robotics' | 'cloud-sovereign' | 'embedded-iot' | 'cpe-mastery';
  type: SessionType;
  day: 1 | 2;
  time: string;
  duration: string;
  room: string;
  speakerIds: string[];
  cpdUnits: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  prerequisites?: string[];
  tags: string[];
}

export interface AttendeeBadge {
  id: string;
  fullName: string;
  email: string;
  organization: string;
  jobTitle: string;
  category: 'Professional CpE' | 'ICPeP Oman Member' | 'Student / Researcher' | 'Speaker / VIP' | 'Sponsor Delegate';
  icpepId?: string;
  qrCodeValue: string;
  registeredDate: string;
  cpdUnitsAccumulated: number;
  checkedIn: boolean;
}

export interface ShowcaseProject {
  id: string;
  title: string;
  leadEngineer: string;
  institution: string;
  category: 'IoT & Smart Cities' | 'AI & Machine Vision' | 'Cloud & Cybersecurity' | 'Robotics & Hardware';
  summary: string;
  techStack: string[];
  votes: number;
  featured: boolean;
  abstractSnippet: string;
}

export type CopilotMode = 'research_evaluator' | 'architectural_duel' | 'career_pathways' | 'general_query';
