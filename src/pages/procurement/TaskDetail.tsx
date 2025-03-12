import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
                <a href={`/procurement/agent/${task.agent.id}/chat`}>
                  <MessageSquare className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {task.metadata && (
          <Card className="col-span-2">
            <CardContent className="p-4">
              <div className="flex gap-4 flex-wrap">
                {Object.entries(task.metadata).map(([key, value]) => (
                  <div key={key} className="flex-1 min-w-[150px]">
                    <p className="text-xs text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="font-medium text-sm truncate">
                      {value.toString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Task Info and Communication - Left Side */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              {/* Action Buttons */}
              <div className="flex justify-end gap-2 mb-6">
                {task.status !== TaskStatus.COMPLETED && task.status !== TaskStatus.CANCELLED && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleCompleteTask}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Complete
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleCancelTask}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                )}
              </div>

              {/* Task Details Section */}
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Description</p>
                  <p>{task.description}</p>
                </div>

                {task.status !== TaskStatus.COMPLETED && task.status !== TaskStatus.CANCELLED && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Progress</p>
                    <Progress value={task.progress} className="mb-2" />
                    <p className="text-sm text-muted-foreground">{task.progress}% complete</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Status</p>
                    <Badge className={getStatusBadge(task.status)}>
                      {task.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Priority</p>
                    <Badge className={getPriorityBadge(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="text-sm">
                        {formatDateTime(task.assignedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Due Date</p>
                      <p className="text-sm">
                        {formatDateTime(task.dueDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-border my-6" />

              {/* Chat Section */}
              <div>
                <p className="text-sm text-muted-foreground mb-4">Communication with Agent</p>
                <ChatWindow
                  agent={task.agent}
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Timeline - Right Side */}
        <div>
          <Card className="sticky top-6">
            <CardHeader className="pb-3">
              <p className="text-sm text-muted-foreground">Progress Timeline</p>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                <div className="space-y-4">
                  {progressUpdates.map((update) => (
                    <div key={update.id} className="flex gap-3">
                      <div className="mt-1">
                        {getStatusIcon(update.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm">{update.title}</h4>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(update.timestamp), 'HH:mm')}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {update.description}
                        </p>
                      </div>
                    </div>
                  ))}

                  {progressUpdates.length === 0 && (
                    <div className="text-center text-muted-foreground text-sm">
                      No updates yet
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 