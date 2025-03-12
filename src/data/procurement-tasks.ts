import { Task, TaskStatus, TaskPriority } from '@/lib/types';
import { procurementAgents } from './procurement-agents';

export interface ProcurementTask extends Task {
  supplierName?: string;
  purchaseOrderNumber?: string;
  budget?: number;
  category?: 'supplier-onboarding' | 'contract-review' | 'purchase-request' | 'other';
}

export const procurementTasks: ProcurementTask[] = [
  {
    id: 'pt1',
    title: 'New Supplier Onboarding - TechCorp',
    description: 'Complete supplier verification and onboarding process for TechCorp Inc.',
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    agent: procurementAgents[0], // Supplier Onboarding Agent
    assignedAt: '2024-03-15T09:00:00Z',
    dueDate: '2024-03-20T17:00:00Z',
    progress: 60,
    supplierName: 'TechCorp Inc.',
    category: 'supplier-onboarding',
    messages: [
      {
        id: 1,
        sender: 'user',
        content: 'Please start the onboarding process for TechCorp Inc.',
        timestamp: '2024-03-15T09:00:00Z',
      },
      {
        id: 2,
        sender: 'agent',
        content: 'Starting supplier verification process. I\'ll need their business registration and financial documents.',
        timestamp: '2024-03-15T09:01:00Z',
      }
    ],
    progressUpdates: [
      {
        id: 1,
        title: 'Initial Documentation Review',
        description: 'Reviewing submitted business documents',
        status: 'completed',
        timestamp: '2024-03-15T10:00:00Z'
      },
      {
        id: 2,
        title: 'Financial Assessment',
        description: 'Analyzing financial stability and credit reports',
        status: 'in-progress',
        timestamp: '2024-03-15T14:00:00Z'
      }
    ]
  },
  {
    id: 'pt2',
    title: 'Contract Review - Annual Software License',
    description: 'Review and analyze the annual software license agreement renewal',
    status: TaskStatus.WAITING,
    priority: TaskPriority.MEDIUM,
    agent: procurementAgents[1], // Contract Management Agent
    assignedAt: '2024-03-16T10:00:00Z',
    dueDate: '2024-03-22T17:00:00Z',
    progress: 30,
    category: 'contract-review',
    purchaseOrderNumber: 'PO-2024-0123',
    messages: [
      {
        id: 1,
        sender: 'user',
        content: 'Please review the updated software license agreement for compliance.',
        timestamp: '2024-03-16T10:00:00Z',
      }
    ],
    progressUpdates: [
      {
        id: 1,
        title: 'Initial Contract Review',
        description: 'Started reviewing terms and conditions',
        status: 'in-progress',
        timestamp: '2024-03-16T10:30:00Z'
      }
    ]
  },
  {
    id: 'pt3',
    title: 'Purchase Request - Office Equipment',
    description: 'Process purchase request for new office equipment',
    status: TaskStatus.SCHEDULED,
    priority: TaskPriority.LOW,
    agent: procurementAgents[2], // Guided Buying Agent
    assignedAt: '2024-03-17T11:00:00Z',
    scheduledFor: '2024-03-25T09:00:00Z',
    dueDate: '2024-03-30T17:00:00Z',
    progress: 0,
    category: 'purchase-request',
    budget: 25000,
    purchaseOrderNumber: 'PO-2024-0124',
    messages: [],
    progressUpdates: []
  },
  {
    id: 'pt4',
    title: 'Supplier Contract Renewal - CloudTech Services',
    description: 'Review and process annual contract renewal for cloud infrastructure services',
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    agent: procurementAgents[1], // Contract Management Agent
    assignedAt: '2024-03-01T09:00:00Z',
    completedAt: '2024-03-10T16:30:00Z',
    progress: 100,
    category: 'contract-review',
    supplierName: 'CloudTech Services',
    purchaseOrderNumber: 'PO-2024-0120',
    messages: [
      {
        id: 1,
        sender: 'user',
        content: 'Please review the CloudTech contract renewal terms and negotiate better pricing.',
        timestamp: '2024-03-01T09:00:00Z',
      },
      {
        id: 2,
        sender: 'agent',
        content: 'I\'ll analyze the current terms and prepare a negotiation strategy.',
        timestamp: '2024-03-01T09:05:00Z',
      },
      {
        id: 3,
        sender: 'agent',
        content: 'Successfully negotiated a 15% discount on the renewal price with improved SLA terms.',
        timestamp: '2024-03-10T16:00:00Z',
      }
    ],
    progressUpdates: [
      {
        id: 1,
        title: 'Contract Analysis',
        description: 'Reviewed current contract terms and pricing structure',
        status: 'completed',
        timestamp: '2024-03-02T11:00:00Z'
      },
      {
        id: 2,
        title: 'Negotiation Phase',
        description: 'Initiated discussions with CloudTech for better terms',
        status: 'completed',
        timestamp: '2024-03-05T15:30:00Z'
      },
      {
        id: 3,
        title: 'Terms Finalization',
        description: 'Secured 15% discount and improved SLA terms',
        status: 'completed',
        timestamp: '2024-03-10T16:30:00Z'
      }
    ]
  }
];

// Helper functions similar to the regular tasks
export function getProcurementActiveTasks() {
  return procurementTasks.filter(task => 
    task.status === TaskStatus.IN_PROGRESS || 
    task.status === TaskStatus.WAITING || 
    task.status === TaskStatus.SCHEDULED
  );
}

export function getProcurementCompletedTasks() {
  return procurementTasks.filter(task => 
    task.status === TaskStatus.COMPLETED || 
    task.status === TaskStatus.CANCELLED
  );
}

export function getProcurementTasksByAgent(agentId: string) {
  return procurementTasks.filter(task => String(task.agent.id) === agentId);
}

export function getProcurementTasksByCategory(category: ProcurementTask['category']) {
  return procurementTasks.filter(task => task.category === category);
}

// Active Procurement Tasks
export const activeProcurementTasks: Task[] = [
  {
    id: "p1",
    title: "Review Purchase Order #PO-2024-001",
    description: "Review and approve purchase order for office supplies",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    progress: 65,
    agent: procurementAgents[0],
    assignedAt: new Date("2024-03-10").toISOString(),
    dueDate: new Date("2024-03-15").toISOString(),
    metadata: {
      purchaseOrderNumber: "PO-2024-001",
      supplier: "Office Supplies Co.",
      totalAmount: "$5,432.10"
    }
  },
  {
    id: "p2",
    title: "Supplier Contract Negotiation",
    description: "Negotiate new contract terms with primary supplier",
    status: TaskStatus.WAITING,
    priority: TaskPriority.MEDIUM,
    progress: 30,
    agent: procurementAgents[1],
    assignedAt: new Date("2024-03-11").toISOString(),
    dueDate: new Date("2024-03-20").toISOString(),
    metadata: {
      supplierName: "Tech Solutions Inc.",
      contractValue: "$50,000",
      renewalPeriod: "12 months"
    }
  },
  {
    id: "p3",
    title: "Process Invoice Batch #INV-2024-Q1",
    description: "Process and approve Q1 invoice batch",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    progress: 100,
    agent: procurementAgents[2],
    assignedAt: new Date("2024-03-01").toISOString(),
    completedAt: new Date("2024-03-08").toISOString(),
    dueDate: new Date("2024-03-10").toISOString(),
    metadata: {
      batchNumber: "INV-2024-Q1",
      invoiceCount: "15",
      totalValue: "$12,345.67"
    }
  }
];

// Completed Procurement Tasks
export const completedProcurementTasks: Task[] = [
  {
    id: "p4",
    title: "Vendor Compliance Audit",
    description: "Complete annual compliance audit for top 5 vendors.",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    progress: 100,
    agent: procurementAgents[0],
    assignedAt: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
    completedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    messages: [],
    progressUpdates: [
      {
        id: "pu4",
        title: "Audit completed",
        description: "All vendor compliance checks completed successfully",
        status: "completed",
        timestamp: new Date(Date.now() - 86400000).toISOString()
      }
    ]
  },
  {
    id: "p5",
    title: "Update Supplier Database",
    description: "Update supplier information and performance metrics in the database.",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    progress: 100,
    agent: procurementAgents[1],
    assignedAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    completedAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    messages: [],
    progressUpdates: [
      {
        id: "pu5",
        title: "Database update complete",
        description: "All supplier records have been updated with latest information",
        status: "completed",
        timestamp: new Date(Date.now() - 345600000).toISOString()
      }
    ]
  },
  {
    id: "p6",
    title: "Generate Q4 Procurement Report",
    description: "Compile and analyze Q4 procurement metrics and spending.",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    progress: 100,
    agent: procurementAgents[2],
    assignedAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    completedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    messages: [],
    progressUpdates: [
      {
        id: "pu6",
        title: "Report generated",
        description: "Q4 procurement report generated with all required metrics",
        status: "completed",
        timestamp: new Date(Date.now() - 172800000).toISOString()
      }
    ]
  }
];

// Helper function to get all procurement tasks
export const getProcurementTasks = () => {
  return [...activeProcurementTasks, ...completedProcurementTasks];
};

// Helper function to get active procurement tasks
export const getActiveProcurementTasks = () => {
  return activeProcurementTasks;
};

// Helper function to get completed procurement tasks
export const getCompletedProcurementTasks = () => {
  return completedProcurementTasks;
};

export const getProcurementTask = (id: string) =>
  procurementTasks.find(task => task.id === id); 