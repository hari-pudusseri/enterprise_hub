import React from 'react';
import { Task } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatRelativeTime } from '@/lib/utils';
import { getStatusDetails } from '@/lib/utils';
import { CalendarClock, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TaskListProps {
  tasks: Task[];
  title: string;
  variant?: 'ai-hub' | 'procurement';
}

export function TaskList({ tasks, title, variant = 'ai-hub' }: TaskListProps) {
  const getTaskDetailPath = (taskId: string) => {
    return variant === 'procurement' 
      ? `/procurement/tasks/${taskId}`
      : `/task/${taskId}`;
  };

  if (tasks.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No tasks found.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => {
          const statusDetails = getStatusDetails(task.status);
          
          return (
            <Card key={task.id} className="card-hover">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge 
                    className={`${statusDetails.bgColor} ${statusDetails.color}`}
                  >
                    {statusDetails.label}
                  </Badge>
                  <div className="flex space-x-1">
                    {task.status !== 'completed' && task.status !== 'cancelled' && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Cancel Task"
                        className="h-7 w-7"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                <h3 className="font-medium mb-1 line-clamp-1">{task.title}</h3>
                
                <div className="flex items-center text-xs text-muted-foreground mb-2">
                  <Clock className="h-3 w-3 mr-1" />
                  {task.status === 'completed' ? (
                    <span>Completed {formatRelativeTime(task.completedAt!)}</span>
                  ) : task.status === 'scheduled' ? (
                    <span>Scheduled for {formatRelativeTime(task.scheduledFor!)}</span>
                  ) : (
                    <span>Assigned {formatRelativeTime(task.assignedAt)}</span>
                  )}
                </div>
                
                <div className="flex items-center text-xs mb-3">
                  <div 
                    className="w-5 h-5 rounded-full bg-cover bg-center mr-1"
                    style={{ backgroundImage: `url(${task.agent.avatar})` }}
                  ></div>
                  <span>{task.agent.name}</span>
                </div>
                
                {task.status !== 'scheduled' && task.status !== 'completed' && (
                  <div className="progress-indicator mb-3">
                    <div 
                      className="progress-indicator-value" 
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                )}
                
                <div className="flex justify-end">
                  <Button asChild variant="outline" size="sm">
                    <Link to={getTaskDetailPath(task.id)}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
