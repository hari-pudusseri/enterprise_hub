import { Task } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface TaskDetailsProps {
  task: Task;
}

export function TaskDetails({ task }: TaskDetailsProps) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-1">Task</h4>
        <p className="text-sm text-muted-foreground">{task.title}</p>
      </div>

      <div>
        <h4 className="font-medium mb-1">Description</h4>
        <p className="text-sm text-muted-foreground">{task.description}</p>
      </div>

      <div>
        <h4 className="font-medium mb-1">Progress</h4>
        <Progress value={task.progress} className="h-2" />
        <p className="text-sm text-muted-foreground mt-1">{task.progress}% complete</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-1">Status</h4>
          <Badge variant="outline" className="capitalize">
            {task.status.toLowerCase()}
          </Badge>
        </div>
        <div>
          <h4 className="font-medium mb-1">Priority</h4>
          <Badge variant="outline" className="capitalize">
            {task.priority.toLowerCase()}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-1">Start Date</h4>
          <p className="text-sm text-muted-foreground">
            {format(new Date(task.assignedAt), 'MMM d, yyyy')}
          </p>
        </div>
        <div>
          <h4 className="font-medium mb-1">Due Date</h4>
          <p className="text-sm text-muted-foreground">
            {task.dueDate ? format(new Date(task.dueDate), 'MMM d, yyyy') : 'Not set'}
          </p>
        </div>
      </div>
    </div>
  );
} 