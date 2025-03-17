import { Task, TaskStatus, TaskPriority, Message } from "@/lib/types";
import { agents } from "./agents";

// Sample messages for tasks
const sampleMessages: Record<string, Message[]> = {
  "task-1": [
    {
      id: "msg-1",
      content: "I've started reviewing the contract proposal.",
      sender: "agent",
      timestamp: "2024-03-10T09:15:00Z",
    },
    {
      id: "msg-2",
      content: "Please let me know if you need any specific sections reviewed in detail.",
      sender: "agent",
      timestamp: "2024-03-10T09:16:00Z",
    },
  ],
  // Add more sample messages for other tasks
};

// Sample tasks data
export const tasks: Task[] = [
  {
    id: "1",
    title: "Review Contract Proposal",
    description: "Review and analyze the contract proposal from Vendor A",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    progress: 60,
    agent: agents[0], // Reference to the first agent
    assignedAt: "2024-03-10T09:00:00Z",
    dueDate: "2024-03-15T17:00:00Z",
    messages: sampleMessages["task-1"] || [],
  },
  {
    id: "3",
    title: "Supplier Evaluation",
    description: "Evaluate potential suppliers for office equipment",
    status: TaskStatus.WAITING,
    priority: TaskPriority.MEDIUM,
    progress: 0,
    agent: agents[1], // Reference to the second agent
    assignedAt: "2024-03-11T14:00:00Z",
    dueDate: "2024-03-18T17:00:00Z",
  },
  
  // Add more sample tasks as needed
];

export function getTask(id: string): Task | null {
  try {
    const task = tasks.find(t => t.id === id);
    if (task) {
      // Ensure messages are included
      task.messages = sampleMessages[task.id] || [];
    }
    return task || null;
  } catch (error) {
    console.error('Error fetching task:', error);
    return null;
  }
}

export function getUserActiveTasks(): Task[] {
  return tasks.filter(task => 
    task.status === TaskStatus.IN_PROGRESS || 
    task.status === TaskStatus.WAITING
  );
}

export function getUserCompletedTasks(): Task[] {
  return tasks.filter(task => 
    task.status === TaskStatus.COMPLETED || 
    task.status === TaskStatus.CANCELLED
  );
}

export function searchTasks(query: string): Task[] {
  const lowercaseQuery = query.toLowerCase();
  return tasks.filter(task =>
    task.title.toLowerCase().includes(lowercaseQuery) ||
    task.description.toLowerCase().includes(lowercaseQuery) ||
    task.agent.name.toLowerCase().includes(lowercaseQuery)
  );
}

// Add function to update task messages
export function updateTaskMessages(taskId: string, newMessage: Message): void {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    if (!sampleMessages[taskId]) {
      sampleMessages[taskId] = [];
    }
    sampleMessages[taskId].push(newMessage);
  }
} 