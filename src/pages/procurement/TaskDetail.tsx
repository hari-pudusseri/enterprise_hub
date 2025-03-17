import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AgentAvatar } from "@/components/ui-custom/agent-avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatWindow } from "@/components/chat/chat-window";
import { 
  ArrowLeft, 
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import { getProcurementTask } from "@/data/procurement-tasks";
import { TaskStatus, TaskPriority, Message } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import { format } from "date-fns";
import { ProgressUpdates } from "@/components/chat/progress-updates";

interface ProgressUpdate {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'blocked';
  timestamp: string;
}

export function ProcurementTaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const task = getProcurementTask(id?.toString() || "");
  
  useEffect(() => {
    console.log('Task ID:', id);
    console.log('Task Data:', task);
    console.log('Agent Data:', task?.agent);
  }, [id, task]);

  if (!task) {
    return (
      <div className="container mx-auto py-6 px-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/procurement/agents')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tasks
        </Button>
        <Card className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Task Not Found</h2>
          <p className="text-muted-foreground">The requested task could not be found.</p>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: TaskStatus) => {
    const variants = {
      [TaskStatus.COMPLETED]: "bg-green-500/10 text-green-500",
      [TaskStatus.IN_PROGRESS]: "bg-blue-500/10 text-blue-500",
      [TaskStatus.WAITING]: "bg-yellow-500/10 text-yellow-500",
      [TaskStatus.CANCELLED]: "bg-red-500/10 text-red-500"
    };
    return variants[status] || "bg-gray-500/10 text-gray-500";
  };

  const getPriorityBadge = (priority: TaskPriority) => {
    const variants = {
      [TaskPriority.HIGH]: "bg-red-500/10 text-red-500",
      [TaskPriority.MEDIUM]: "bg-yellow-500/10 text-yellow-500",
      [TaskPriority.LOW]: "bg-green-500/10 text-green-500"
    };
    return variants[priority];
  };

  const handleSendMessage = async (content: string) => {
    if (!task) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMessage]);
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I'm processing your request regarding: ${content}`,
        sender: 'agent',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, agentMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelTask = () => {
    // Add task cancellation logic here
  };

  const handleCompleteTask = () => {
    // Add task completion logic here
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'blocked':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const progressUpdates: ProgressUpdate[] = [
    {
      id: '1',
      title: 'Task Created',
      description: 'Task assigned to procurement agent',
      status: 'completed',
      timestamp: '2024-03-12T09:00:00Z'
    },
    {
      id: '2',
      title: 'Initial Assessment',
      description: 'Reviewing requirements and scope',
      status: 'completed',
      timestamp: '2024-03-12T09:30:00Z'
    },
    {
      id: '3',
      title: 'Vendor Selection',
      description: 'Evaluating potential suppliers',
      status: 'pending',
      timestamp: '2024-03-12T10:00:00Z'
    },
    {
      id: '4',
      title: 'Price Negotiation',
      description: 'Awaiting vendor response',
      status: 'blocked',
      timestamp: '2024-03-12T11:00:00Z'
    }
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/procurement/agents')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <PageHeader
          title={task.title}
          description="Task Details"
        />
      </div>

      {/* Top Summary Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AgentAvatar
                name={task.agent.name}
                avatar={task.agent.avatar}
                status={task.agent.status}
                size="sm"
                showStatus
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">{task.agent.name}</h3>
                <p className="text-xs text-muted-foreground">Assigned Agent</p>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link to={`/procurement/agent/${task.agent.id}/chat`}>
                  <MessageSquare className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardContent className="p-4">
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[150px]">
                <p className="text-xs text-muted-foreground">Status</p>
                <Badge className={getStatusBadge(task.status)}>
                  {task.status.replace('_', ' ')}
                </Badge>
              </div>
              <div className="flex-1 min-w-[150px]">
                <p className="text-xs text-muted-foreground">Priority</p>
                <Badge className={getPriorityBadge(task.priority)}>
                  {task.priority}
                </Badge>
              </div>
              <div className="flex-1 min-w-[150px]">
                <p className="text-xs text-muted-foreground">Progress</p>
                <Progress value={task.progress} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Task Details and Chat - Left Side */}
        <div className="lg:w-full lg:col-span-1">
          <Card className="h-[calc(100vh-300px)]">
            <CardHeader className="p-4 border-b">
              <h3 className="font-medium">Chat with the Agent</h3>
            </CardHeader>
            <CardContent className="p-0">
              <ChatWindow
                agent={task.agent}
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
        </div>

        {/* Progress Timeline - Right Side */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="p-4 border-b">
              <h3 className="font-medium">Task Progress & Actions</h3>
            </CardHeader>
            <CardContent className="p-0">
              <ProgressUpdates 
                updates={[
                  {
                    id: '1',
                    title: 'Task Created',
                    description: 'Task assigned to procurement agent',
                    status: 'completed',
                    timestamp: task.assignedAt,
                    details: {
                      type: 'system',
                      metadata: {
                        taskId: task.id,
                        priority: task.priority,
                        assignedTo: task.agent.name
                      }
                    }
                  },
                  {
                    id: '2',
                    title: 'Initial Assessment',
                    description: task.description,
                    status: 'completed',
                    timestamp: new Date().toISOString(),
                    details: {
                      type: 'analysis',
                      result: 'Task requirements analyzed and confirmed',
                      metadata: {
                        complexity: 'Medium',
                        estimatedDuration: '2 days'
                      }
                    }
                  },
                  // Add more progress updates based on task status and history
                ]}
                showDetails={true}
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          {task.status !== TaskStatus.COMPLETED && task.status !== TaskStatus.CANCELLED && (
            <div className="flex justify-end gap-2 mt-4">
              <Button 
                variant="outline" 
                onClick={handleCompleteTask}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Complete Task
              </Button>
              <Button 
                variant="outline"
                onClick={handleCancelTask}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Cancel Task
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 