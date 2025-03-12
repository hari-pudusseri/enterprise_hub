import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui-custom/status-badge";
import { AgentAvatar } from "@/components/ui-custom/agent-avatar";
import { Task, TaskStatus } from "@/lib/types";
import { Calendar, Clock, ExternalLink, XCircle } from "lucide-react";
import { cn, formatDate, formatRelativeTime } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

interface TaskCardProps {
  task: Task;
  className?: string;
  variant?: 'ai-hub' | 'procurement';
}

export function TaskCard({ task, className, variant = 'ai-hub' }: TaskCardProps) {
  const isCompletable = task.status === TaskStatus.IN_PROGRESS || task.status === TaskStatus.WAITING;
  const isCancellable = task.status !== TaskStatus.COMPLETED && task.status !== TaskStatus.CANCELLED;
  
  const getTaskDetailPath = (taskId: string) => {
    return variant === 'procurement' 
      ? `/procurement/tasks/${taskId.toString()}`
      : `/task/${taskId.toString()}`;
  };

  return (
    <Card className={cn("overflow-hidden border transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]", className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center">
            <AgentAvatar 
              name={task.agent.name} 
              avatar={task.agent.avatar} 
              size="sm"
              className="mr-2"
            />
            <span className="text-sm font-medium">{task.agent.name}</span>
          </div>
          
          <StatusBadge 
            status={task.status} 
            type="task"
          />
        </div>
        
        <h3 className="font-medium text-base mb-1 line-clamp-1">{task.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{task.description}</p>
        
        {task.status !== TaskStatus.COMPLETED && task.status !== TaskStatus.CANCELLED && (
          <div className="space-y-3 mb-3">
            <Progress value={task.progress} className="h-1.5" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress: {task.progress}%</span>
              {task.dueDate && (
                <span className="flex items-center">
                  <Calendar className="inline-block h-3 w-3 mr-1" />
                  Due: {formatDate(task.dueDate)}
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="inline-block h-3 w-3 mr-1" />
          {task.status === TaskStatus.COMPLETED && task.completedAt 
            ? `Completed ${formatRelativeTime(task.completedAt)}`
            : task.status === TaskStatus.SCHEDULED && task.scheduledFor
            ? `Scheduled for ${formatDate(task.scheduledFor)}`
            : `Assigned ${formatRelativeTime(task.assignedAt)}`
          }
        </div>
      </CardContent>
      
      <CardFooter className="flex p-4 pt-0 gap-2">
        <Button 
          size="sm" 
          variant="outline"
          className="flex-1"
          asChild
        >
          <Link to={getTaskDetailPath(task.id)}>
            <ExternalLink className="mr-1 h-4 w-4" />
            View Details
          </Link>
        </Button>
        
        {isCancellable && (
          <Button 
            size="sm" 
            variant="destructive"
            className="w-9 px-0"
          >
            <XCircle className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
