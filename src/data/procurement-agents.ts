export interface ProcurementAgent {
  id: string;
  name: string;
  description: string;
  status: string;
  avatar: string;
  rating: number;
  tasksCompleted: number;
  skills: { id: number; name: string; }[];
  lastActiveAt: Date;
  createdAt: Date;
  community: {
    followers: number;
    rating: number;
    reviews: number;
  };
}

export const procurementAgents: ProcurementAgent[] = [
  {
    id: 'p1',
    name: "ProcureBot Alpha",
    description: "Specialized in purchase order processing and vendor management",
    status: "online",
    avatar: "/avatars/procurement-1.png",
    rating: 4.8,
    tasksCompleted: 156,
    skills: [
      { id: 1, name: "Purchase Orders" },
      { id: 2, name: "Vendor Management" },
      { id: 3, name: "Contract Review" }
    ],
    lastActiveAt: new Date(),
    createdAt: new Date('2024-01-01'),
    community: {
      followers: 245,
      rating: 4.8,
      reviews: 89
    }
  },
  {
    id: 'p2',
    name: "Contract Management Agent",
    description: "Handles contract creation, review, and renewal processes",
    status: "available",
    avatar: "/agents/contract.png",
    rating: 4.8,
    tasksCompleted: 256,
    skills: [
      { id: 4, name: "Contract Review" },
      { id: 5, name: "Legal Compliance" },
      { id: 6, name: "Renewal Management" }
    ],
    lastActiveAt: new Date(),
    createdAt: new Date('2024-01-01'),
    community: {
      followers: 245,
      rating: 4.8,
      reviews: 89
    }
  },
  {
    id: 'p3',
    name: "Guided Buying Agent",
    description: "Assists in purchase decisions and supplier selection",
    status: "available",
    avatar: "/agents/buying.png",
    rating: 4.6,
    tasksCompleted: 192,
    skills: [
      { id: 7, name: "Supplier Selection" },
      { id: 8, name: "Price Comparison" },
      { id: 9, name: "Purchase Optimization" }
    ],
    lastActiveAt: new Date(),
    createdAt: new Date('2024-01-01'),
    community: {
      followers: 245,
      rating: 4.8,
      reviews: 89
    }
  }
]; 