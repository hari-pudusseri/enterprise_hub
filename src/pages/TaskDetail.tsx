import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AgentAvatar } from "@/components/ui-custom/agent-avatar";
import { ChatWindow } from "@/components/chat/chat-window";
import { ProgressUpdates } from "@/components/chat/progress-updates";
import { 
  ArrowLeft, 
  CheckCircle2,
  XCircle,
  MessageSquare
} from "lucide-react";
import { getTask, updateTaskMessages } from "@/data/tasks";
import { TaskStatus, TaskPriority, Message } from "@/lib/types";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const task = getTask(id?.toString() || "");
  
  useEffect(() => {
    if (task) {
      setMessages(task.messages || []);
    }
  }, [task]);
  
  if (!task) {
    return (
      <div className="container mx-auto py-6 px-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/tasks/active')}
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
      updateTaskMessages(task.id, userMessage);
      updateTaskMessages(task.id, agentMessage);
      
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
          onClick={() => navigate('/tasks/active')}
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
                <Link to={`/agent/${task.agent.id}/chat`}>
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
              <h3 className="font-medium">Chat with</h3>
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
                    description: 'Task assigned to AI agent',
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
