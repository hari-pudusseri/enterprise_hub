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