import { Agent, AgentStatus, Task, TaskStatus } from '@/lib/types';

export const agentUtils = {
  // Get agent status with proper formatting
  getStatusDisplay: (status: AgentStatus) => {
    const statusMap = {
      [AgentStatus.AVAILABLE]: {
        label: 'Available',
        color: 'green',
      },
      [AgentStatus.BUSY]: {
        label: 'Busy',
        color: 'yellow',
      },
      [AgentStatus.OFFLINE]: {
        label: 'Offline',
        color: 'gray',
      },
      [AgentStatus.ERROR]: {
        label: 'Error',
        color: 'red',
      },
    };
    return statusMap[status] || { label: status, color: 'gray' };
  },

  // Calculate agent efficiency
  calculateEfficiency: (agent: Agent) => {
    const tasksCompleted = agent.tasksCompleted || 0;
    const rating = agent.rating || 0;
    return ((tasksCompleted * rating) / 5).toFixed(1);
  },

  // Format last active time
  formatLastActive: (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  },

  // Get agent workload percentage
  getWorkload: (agent: Agent, tasks: Task[]) => {
    const activeTasks = tasks.filter(task => 
      task.agent.id === agent.id && 
      task.status === TaskStatus.IN_PROGRESS
    ).length;
    
    const maxTasks = 5; // Assuming max 5 concurrent tasks
    return Math.min((activeTasks / maxTasks) * 100, 100);
  },

  // Sort agents by different criteria
  sortAgents: (agents: Agent[], criteria: 'rating' | 'tasks' | 'efficiency') => {
    return [...agents].sort((a, b) => {
      switch (criteria) {
        case 'rating':
          return b.rating - a.rating;
        case 'tasks':
          return b.tasksCompleted - a.tasksCompleted;
        case 'efficiency':
          return Number(agentUtils.calculateEfficiency(b)) - Number(agentUtils.calculateEfficiency(a));
        default:
          return 0;
      }
    });
  },

  // Filter agents by skills
  filterBySkills: (agents: Agent[], skillIds: number[]) => {
    if (!skillIds.length) return agents;
    return agents.filter(agent =>
      agent.skills.some(skill => skillIds.includes(skill.id))
    );
  },

  // Search agents by name or description
  searchAgents: (agents: Agent[], query: string) => {
    const searchTerm = query.toLowerCase();
    return agents.filter(agent =>
      agent.name.toLowerCase().includes(searchTerm) ||
      agent.description.toLowerCase().includes(searchTerm) ||
      agent.skills.some(skill => skill.name.toLowerCase().includes(searchTerm))
    );
  },

  // Get agent performance metrics
  getPerformanceMetrics: (agent: Agent, tasks: Task[]) => {
    const agentTasks = tasks.filter(task => task.agent.id === agent.id);
    const completedTasks = agentTasks.filter(task => task.status === TaskStatus.COMPLETED);
    
    return {
      successRate: completedTasks.length / agentTasks.length * 100 || 0,
      averageTime: completedTasks.reduce((acc, task) => {
        const start = new Date(task.assignedAt).getTime();
        const end = new Date(task.completedAt!).getTime();
        return acc + (end - start);
      }, 0) / completedTasks.length || 0,
      totalTasks: agentTasks.length,
      completedTasks: completedTasks.length,
    };
  }
}; 