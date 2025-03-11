export enum AgentStatus {
  AVAILABLE = "available",
  BUSY = "busy",
  OFFLINE = "offline"
}

export enum TaskStatus {
  SCHEDULED = "scheduled",
  IN_PROGRESS = "in-progress",
  WAITING = "waiting",
  COMPLETED = "completed",
  CANCELLED = "cancelled"
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high"
}

export interface Skill {
  id: number;
  name: string;
  description: string;
}

export interface Agent {
  id: number;
  name: string;
  avatar: string;
  description: string;
  skills: Skill[];
  rating: number;
  status: AgentStatus;
  tasksCompleted: number;
  createdAt: string;
  community: {
    usage: number;
    rating: number;
  };
}

export interface Message {
  id: number;
  sender: 'user' | 'agent';
  content: string;
  timestamp: string;
}

export interface ProgressUpdate {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'in-progress' | 'pending';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'in_progress' | 'completed' | 'waiting' | 'scheduled';
  agent: Agent;
  assignedAt: string;
  completedAt?: string;
  progress: number;
  messages: Message[];
  progressUpdates: ProgressUpdate[];
}
