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

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Task Information</CardTitle>
                <div className="flex gap-2">
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
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{task.description}</p>
              </div>

              {task.status !== TaskStatus.COMPLETED && task.status !== TaskStatus.CANCELLED && (
                <div>
                  <h3 className="font-medium mb-2">Progress</h3>
                  <Progress value={task.progress} className="mb-2" />
                  <p className="text-sm text-muted-foreground">{task.progress}% complete</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Status</h3>
                  <Badge className={getStatusBadge(task.status)}>
                    {task.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Priority</h3>
                  <Badge className={getPriorityBadge(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Start Date</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatDateTime(task.assignedAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Due Date</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatDateTime(task.dueDate)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Communication</CardTitle>
            </CardHeader>
            <CardContent>
              <ChatWindow
                agent={task.agent}
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Agent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <AgentAvatar
                  name={task.agent.name}
                  avatar={task.agent.avatar}
                  status={task.agent.status}
                  size="lg"
                  showStatus
                />
                <div>
                  <h3 className="font-medium">{task.agent.name}</h3>
                  <p className="text-sm text-muted-foreground">Procurement Agent</p>
                </div>
              </div>
              <Button className="w-full" asChild>
                <a href={`/procurement/agent/${task.agent.id}/chat`}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Agent
                </a>
              </Button>
            </CardContent>
          </Card>

          {task.metadata && (
            <Card>
              <CardHeader>
                <CardTitle>Additional Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(task.metadata).map(([key, value]) => (
                  <div key={key}>
                    <h3 className="font-medium mb-1 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {value.toString()}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 