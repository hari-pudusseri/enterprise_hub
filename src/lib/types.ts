// Add debug logging to verify type definitions
console.log('Type Definitions Loaded');

export enum AgentStatus {
  AVAILABLE = "available",
  BUSY = "busy",
  OFFLINE = "offline"
}

export enum TaskStatus {
  WAITING = "WAITING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

export interface Skill {
  id: number;
  name: string;
  description: string;
}

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  description: string;
  skills: Skill[];
  rating: number;
  status: AgentStatus;
  tasksCompleted: number;
  createdAt: Date;
  community: {
    usage: number;
    rating: number;
  };
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
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
  status: TaskStatus;
  priority: TaskPriority;
  progress: number;
  agent: Agent;
  assignedAt: string;
  dueDate?: string;
  completedAt?: string;
  messages: Message[];
}

export interface ProcurementAgent extends Agent {
  specialization: string;
  certifications?: string[];
  procurementExperience: number;
}

// Log the interface structures
console.log('Agent Interface:', {
  type: 'Agent',
  structure: {
    id: 'string',
    name: 'string',
    // ... other fields
  }
});
