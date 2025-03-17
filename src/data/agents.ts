import { Agent, AgentStatus, Skill, Task, TaskPriority, TaskStatus } from '@/lib/types';

export const skills: Skill[] = [
  { id: 1, name: 'Data Analysis', description: 'Ability to analyze and interpret complex data sets' },
  { id: 2, name: 'Content Creation', description: 'Creates high-quality written content for various purposes' },
  { id: 3, name: 'Research', description: 'Conducts in-depth research on various topics' },
  { id: 4, name: 'Code Generation', description: 'Writes and reviews code in multiple programming languages' },
  { id: 5, name: 'Image Analysis', description: 'Analyzes and interprets images and visual content' },
  { id: 6, name: 'Translation', description: 'Translates content between multiple languages' },
  { id: 7, name: 'Summarization', description: 'Condenses long content into concise summaries' },
  { id: 8, name: 'Sentiment Analysis', description: 'Analyzes the sentiment or emotional tone of content' },
  { id: 9, name: 'Creative Writing', description: 'Generates creative and engaging written content' },
  { id: 10, name: 'Data Visualization', description: 'Creates visual representations of data' },
  { id: 11, name: 'Speech Recognition', description: 'Transcribes and processes spoken language' },
  { id: 12, name: 'Natural Language Processing', description: 'Processes and analyzes natural language text' },
];

export const agents: Agent[] = [
  {
    id: 1,
    name: 'DataMind',
    avatar: '/placeholder.svg',
    description: 'Specialized in data analysis and visualization with exceptional pattern recognition abilities.',
    skills: [skills[0], skills[9], skills[7]],
    rating: 4.9,
    status: AgentStatus.AVAILABLE,
    tasksCompleted: 547,
    createdAt: '2023-01-15T08:30:00Z',
    community: {
      usage: 1247,
      rating: 4.8
    }
  },
  {
    id: 2,
    name: 'ContentCraft',
    avatar: '/placeholder.svg',
    description: 'Expert in generating high-quality written content optimized for engagement and clarity.',
    skills: [skills[1], skills[8], skills[6]],
    rating: 4.7,
    status: AgentStatus.AVAILABLE,
    tasksCompleted: 832,
    createdAt: '2023-02-20T14:15:00Z',
    community: {
      usage: 2156,
      rating: 4.6
    }
  },
  {
    id: 3,
    name: 'CodeGenius',
    avatar: '/placeholder.svg',
    description: 'Specialized in writing, reviewing, and optimizing code across multiple programming languages.',
    skills: [skills[3], skills[0], skills[11]],
    rating: 4.8,
    status: AgentStatus.BUSY,
    tasksCompleted: 726,
    createdAt: '2023-03-10T11:45:00Z',
    community: {
      usage: 1893,
      rating: 4.9
    }
  },
  {
    id: 4,
    name: 'ResearchPro',
    avatar: '/placeholder.svg',
    description: 'Conducts thorough research with critical analysis and comprehensive reporting capabilities.',
    skills: [skills[2], skills[6], skills[7]],
    rating: 4.6,
    status: AgentStatus.AVAILABLE,
    tasksCompleted: 419,
    createdAt: '2023-04-05T09:20:00Z',
    community: {
      usage: 978,
      rating: 4.5
    }
  },
  {
    id: 5,
    name: 'LinguaLink',
    avatar: '/placeholder.svg',
    description: 'Specialized in translation and language processing across multiple languages and dialects.',
    skills: [skills[5], skills[11], skills[10]],
    rating: 4.9,
    status: AgentStatus.AVAILABLE,
    tasksCompleted: 651,
    createdAt: '2023-05-12T16:40:00Z',
    community: {
      usage: 1532,
      rating: 4.7
    }
  },
  {
    id: 6,
    name: 'CreativeVision',
    avatar: '/placeholder.svg',
    description: 'Expert in creative content generation with a focus on originality and audience engagement.',
    skills: [skills[8], skills[1], skills[4]],
    rating: 4.7,
    status: AgentStatus.BUSY,
    tasksCompleted: 578,
    createdAt: '2023-06-30T13:10:00Z',
    community: {
      usage: 1378,
      rating: 4.6
    }
  },
  {
    id: 7,
    name: 'AnalyticInsight',
    avatar: '/placeholder.svg',
    description: 'Specialized in data analysis with advanced statistical modeling and predictive capabilities.',
    skills: [skills[0], skills[9], skills[11]],
    rating: 4.8,
    status: AgentStatus.AVAILABLE,
    tasksCompleted: 483,
    createdAt: '2023-07-25T10:50:00Z',
    community: {
      usage: 1124,
      rating: 4.8
    }
  },
  {
    id: 8,
    name: 'SynthSummary',
    avatar: '/placeholder.svg',
    description: 'Expert in condensing complex information into clear, concise summaries without losing context.',
    skills: [skills[6], skills[2], skills[1]],
    rating: 4.5,
    status: AgentStatus.AVAILABLE,
    tasksCompleted: 392,
    createdAt: '2023-08-18T15:30:00Z',
    community: {
      usage: 856,
      rating: 4.4
    }
  },
];

export const tasks: Task[] = [
  {
    id: 1,
    title: 'Analyze Q2 Financial Data',
    description: 'Perform a detailed analysis of Q2 financial data to identify trends and anomalies.',
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    agent: agents[0],
    assignedAt: '2024-04-10T09:15:00Z',
    dueDate: '2024-04-12T17:00:00Z',
    progress: 68,
    messages: [
      {
        id: 1,
        sender: 'user',
        content: 'Can you analyze our Q2 financial data and identify any significant trends?',
        timestamp: '2024-04-10T09:15:00Z',
      },
      {
        id: 2,
        sender: 'agent',
        content: "I'll analyze the Q2 financial data for you. Do you have specific metrics you'd like me to focus on?",
        timestamp: '2024-04-10T09:16:12Z',
      },
      {
        id: 3,
        sender: 'user',
        content: 'Please focus on revenue growth, expense patterns, and profit margins compared to Q1.',
        timestamp: '2024-04-10T09:18:45Z',
      },
      {
        id: 4,
        sender: 'agent',
        content: "Got it. I'll analyze those metrics and compare them to Q1 performance. I'll also look for any unusual patterns that might need attention.",
        timestamp: '2024-04-10T09:19:30Z',
      },
    ],
    progressUpdates: [
      {
        id: 1,
        title: 'Started Data Collection',
        description: 'Gathering all relevant financial data from Q1 and Q2.',
        timestamp: '2024-04-10T09:25:00Z',
        status: 'completed',
      },
      {
        id: 2,
        title: 'Initial Analysis',
        description: 'Performing preliminary analysis of revenue growth trends.',
        timestamp: '2024-04-10T10:45:00Z',
        status: 'completed',
      },
      {
        id: 3,
        title: 'Expense Pattern Analysis',
        description: 'Analyzing expense patterns and identifying anomalies.',
        timestamp: '2024-04-10T13:30:00Z',
        status: 'completed',
      },
      {
        id: 4,
        title: 'Profit Margin Comparison',
        description: 'Comparing Q1 and Q2 profit margins across departments.',
        timestamp: '2024-04-10T15:20:00Z',
        status: 'in-progress',
      },
      {
        id: 5,
        title: 'Final Report Preparation',
        description: 'Compiling findings into a comprehensive report with visualizations.',
        timestamp: '2024-04-11T09:00:00Z',
        status: 'pending',
      },
    ],
  },
  {
    id: 2,
    title: 'Generate Monthly Newsletter Content',
    description: 'Create engaging content for the May newsletter focusing on product updates and industry trends.',
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    agent: agents[1],
    assignedAt: '2024-04-05T11:30:00Z',
    completedAt: '2024-04-07T14:45:00Z',
    progress: 100,
    messages: [
      {
        id: 1,
        sender: 'user',
        content: 'I need content for our May newsletter. Can you help with that?',
        timestamp: '2024-04-05T11:30:00Z',
      },
      {
        id: 2,
        sender: 'agent',
        content: "I'd be happy to help with your May newsletter. What topics would you like to include?",
        timestamp: '2024-04-05T11:31:15Z',
      },
      {
        id: 3,
        sender: 'user',
        content: 'We need to cover our recent product updates, highlight customer success stories, and include some industry trends.',
        timestamp: '2024-04-05T11:33:40Z',
      },
      {
        id: 4,
        sender: 'agent',
        content: "Great! I'll create engaging content for each of those sections. What's your word count target for the newsletter?",
        timestamp: '2024-04-05T11:34:25Z',
      },
      {
        id: 5,
        sender: 'user',
        content: 'Around 1200 words total, with the most focus on the product updates section.',
        timestamp: '2024-04-05T11:36:10Z',
      },
      {
        id: 6,
        sender: 'agent',
        content: "Perfect. I'll draft the content with approximately 1200 words, emphasizing the product updates. I'll have this ready for you soon.",
        timestamp: '2024-04-05T11:37:05Z',
      },
    ],
    progressUpdates: [
      {
        id: 1,
        title: 'Content Planning',
        description: 'Outlining the newsletter structure and key points for each section.',
        timestamp: '2024-04-05T12:00:00Z',
        status: 'completed',
      },
      {
        id: 2,
        title: 'Product Updates Section',
        description: 'Writing detailed content about recent product releases and improvements.',
        timestamp: '2024-04-05T14:30:00Z',
        status: 'completed',
      },
      {
        id: 3,
        title: 'Customer Success Stories',
        description: 'Creating engaging narratives based on customer testimonials and case studies.',
        timestamp: '2024-04-06T09:45:00Z',
        status: 'completed',
      },
      {
        id: 4,
        title: 'Industry Trends Section',
        description: 'Researching and writing about current industry developments and forecasts.',
        timestamp: '2024-04-06T13:20:00Z',
        status: 'completed',
      },
      {
        id: 5,
        title: 'Final Review and Editing',
        description: 'Polishing the content and ensuring consistency throughout the newsletter.',
        timestamp: '2024-04-07T10:15:00Z',
        status: 'completed',
      },
    ],
  },
  {
    id: 3,
    title: 'Optimize Website Landing Page Code',
    description: 'Review and optimize the landing page code to improve load time and performance.',
    status: TaskStatus.WAITING,
    priority: TaskPriority.HIGH,
    agent: agents[2],
    assignedAt: '2024-04-12T08:45:00Z',
    dueDate: '2024-04-15T17:00:00Z',
    progress: 15,
    messages: [
      {
        id: 1,
        sender: 'user',
        content: 'Our landing page is loading slowly. Can you optimize the code to improve performance?',
        timestamp: '2024-04-12T08:45:00Z',
      },
      {
        id: 2,
        sender: 'agent',
        content: "I'll help optimize your landing page code. Could you provide me access to the current codebase?",
        timestamp: '2024-04-12T08:46:30Z',
      },
      {
        id: 3,
        sender: 'user',
        content: "I've shared the repository access with you. The landing page is in the /src/pages/home directory.",
        timestamp: '2024-04-12T08:50:15Z',
      },
      {
        id: 4,
        sender: 'agent',
        content: "Thank you. I'll review the code and identify performance bottlenecks. I'll focus on image optimization, code minification, and reducing unnecessary JavaScript.",
        timestamp: '2024-04-12T08:52:00Z',
      },
      {
        id: 5,
        sender: 'agent',
        content: "I'm waiting for repository access confirmation. Could you check if the invitation was sent correctly?",
        timestamp: '2024-04-12T09:15:00Z',
      },
    ],
    progressUpdates: [
      {
        id: 1,
        title: 'Initial Code Review',
        description: 'Reviewing the current landing page code structure and dependencies.',
        timestamp: '2024-04-12T09:00:00Z',
        status: 'completed',
      },
      {
        id: 2,
        title: 'Repository Access',
        description: 'Waiting for repository access to be granted.',
        timestamp: '2024-04-12T09:15:00Z',
        status: 'blocked',
      },
    ],
  },
  {
    id: 4,
    title: 'Research Emerging Market Trends',
    description: 'Conduct comprehensive research on emerging trends in the Asian and Latin American markets.',
    status: TaskStatus.SCHEDULED,
    priority: TaskPriority.MEDIUM,
    agent: agents[3],
    assignedAt: '2024-04-11T16:20:00Z',
    scheduledFor: '2024-04-14T09:00:00Z',
    dueDate: '2024-04-18T17:00:00Z',
    progress: 0,
    messages: [
      {
        id: 1,
        sender: 'user',
        content: 'I need comprehensive research on emerging market trends in Asia and Latin America for an upcoming presentation.',
        timestamp: '2024-04-11T16:20:00Z',
      },
      {
        id: 2,
        sender: 'agent',
        content: "I'd be happy to research emerging market trends in Asia and Latin America. When do you need this by?",
        timestamp: '2024-04-11T16:21:45Z',
      },
      {
        id: 3,
        sender: 'user',
        content: "The presentation is on April 20th, so I'd need the research by April 18th at the latest.",
        timestamp: '2024-04-11T16:23:30Z',
      },
      {
        id: 4,
        sender: 'agent',
        content: "That works. Would you like me to start right away or schedule this for a specific time?",
        timestamp: '2024-04-11T16:24:15Z',
      },
      {
        id: 5,
        sender: 'user',
        content: "Please schedule it to start on April 14th, as we might have updated market data available by then.",
        timestamp: '2024-04-11T16:26:00Z',
      },
      {
        id: 6,
        sender: 'agent',
        content: "I've scheduled the research to begin on April 14th at 9:00 AM. I'll deliver the findings by April 18th as requested.",
        timestamp: '2024-04-11T16:27:20Z',
      },
    ],
    progressUpdates: [],
  },
  {
    id: 101,
    title: "Market Analysis Report",
    description: "Generated comprehensive market analysis report for Q1 2024, including competitor analysis and growth opportunities.",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    progress: 100,
    agent: agents[0],
    assignedAt: new Date('2024-03-01T10:00:00'),
    completedAt: new Date('2024-03-02T15:30:00'),
    messages: [],
    progressUpdates: [
      {
        id: 1,
        title: "Data Collection Started",
        description: "Gathering market data from primary sources",
        status: "completed",
        timestamp: new Date('2024-03-01T10:15:00')
      },
      {
        id: 2,
        title: "Competitor Analysis",
        description: "Analyzing top 5 competitors in the market",
        status: "completed",
        timestamp: new Date('2024-03-01T13:45:00')
      },
      {
        id: 3,
        title: "Growth Opportunities Identified",
        description: "Identified 3 key growth areas based on market gaps",
        status: "completed",
        timestamp: new Date('2024-03-02T11:20:00')
      },
      {
        id: 4,
        title: "Report Generation",
        description: "Final report compiled with all findings",
        status: "completed",
        timestamp: new Date('2024-03-02T15:30:00')
      }
    ]
  },
  {
    id: 102,
    title: "Content Optimization",
    description: "Optimized website content for better SEO performance and user engagement.",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    progress: 100,
    agent: agents[1],
    assignedAt: new Date('2024-03-05T09:00:00'),
    completedAt: new Date('2024-03-06T16:45:00'),
    messages: [],
    progressUpdates: [
      {
        id: 1,
        title: "Content Audit",
        description: "Analyzing current website content and performance metrics",
        status: "completed",
        timestamp: new Date('2024-03-05T09:30:00')
      },
      {
        id: 2,
        title: "Keyword Research",
        description: "Identified high-value keywords and optimization opportunities",
        status: "completed",
        timestamp: new Date('2024-03-05T14:15:00')
      },
      {
        id: 3,
        title: "Content Updates",
        description: "Implementing optimizations across all pages",
        status: "completed",
        timestamp: new Date('2024-03-06T12:00:00')
      },
      {
        id: 4,
        title: "Final Review",
        description: "Quality check and performance verification complete",
        status: "completed",
        timestamp: new Date('2024-03-06T16:45:00')
      }
    ]
  },
  {
    id: 103,
    title: "Customer Support Analysis",
    description: "Analyzed customer support tickets to identify common issues and improvement areas.",
    status: TaskStatus.CANCELLED,
    priority: TaskPriority.LOW,
    progress: 45,
    agent: agents[2],
    assignedAt: new Date('2024-03-07T11:00:00'),
    cancelledAt: new Date('2024-03-07T15:30:00'),
    messages: [],
    progressUpdates: [
      {
        id: 1,
        title: "Data Collection",
        description: "Gathering support tickets from the last 3 months",
        status: "completed",
        timestamp: new Date('2024-03-07T11:30:00')
      },
      {
        id: 2,
        title: "Initial Analysis",
        description: "Categorizing tickets by issue type",
        status: "completed",
        timestamp: new Date('2024-03-07T13:45:00')
      },
      {
        id: 3,
        title: "Task Cancelled",
        description: "Analysis cancelled due to data access issues",
        status: "blocked",
        timestamp: new Date('2024-03-07T15:30:00')
      }
    ]
  }
];

// Helper function to get user's active tasks
export function getUserActiveTasks() {
  return tasks.filter(task => 
    task.status === TaskStatus.IN_PROGRESS || 
    task.status === TaskStatus.WAITING || 
    task.status === TaskStatus.SCHEDULED
  );
}

// Helper function to get user's completed tasks
export function getUserCompletedTasks() {
  return tasks.filter(task => 
    task.status === TaskStatus.COMPLETED || 
    task.status === TaskStatus.CANCELLED
  );
}

// Helper function to get top-rated agents
export function getTopRatedAgents() {
  return [...agents].sort((a, b) => b.rating - a.rating).slice(0, 4);
}

// Helper function to get most used agents by community
export function getMostUsedAgents() {
  return [...agents].sort((a, b) => b.community.usage - a.community.usage).slice(0, 4);
}

// Helper function to get agents by skill
export function getAgentsBySkill(skillId: number) {
  return agents.filter(agent => 
    agent.skills.some(skill => skill.id === skillId)
  );
}

// Helper function to search agents
export function searchAgents(query: string) {
  const lowercaseQuery = query.toLowerCase();
  return agents.filter(agent => 
    agent.name.toLowerCase().includes(lowercaseQuery) ||
    agent.description.toLowerCase().includes(lowercaseQuery) ||
    agent.skills.some(skill => skill.name.toLowerCase().includes(lowercaseQuery))
  );
}

// Helper function to search tasks
export function searchTasks(query: string) {
  const lowercaseQuery = query.toLowerCase();
  return tasks.filter(task => 
    task.title.toLowerCase().includes(lowercaseQuery) ||
    task.description.toLowerCase().includes(lowercaseQuery) ||
    task.agent.name.toLowerCase().includes(lowercaseQuery)
  );
}


export function getTask(id: string): Task | null {
  try {
    const task = tasks.find(t => t.id === id);
    console.log('Fetching task:', id, task);
    return task || null;
  } catch (error) {
    console.error('Error fetching task:', error);
    return null;
  }
}
   