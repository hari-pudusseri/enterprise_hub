import { Agent, Task, TaskStatus } from "@/lib/types";
import { AgentAvatar } from "@/components/ui-custom/agent-avatar";
import { StatusBadge } from "@/components/ui-custom/status-badge";
import { StarRating } from "@/components/ui-custom/star-rating";
import { agentUtils } from "@/lib/agent-utils";
import { Button } from "@/components/ui/button";
import { PlayCircle, PauseCircle, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentHeaderProps {
  agent: Agent;
  task?: Task | null;
  onTaskAction?: (action: 'start' | 'pause' | 'complete' | 'cancel') => void;
  className?: string;
}

export function AgentHeader({ 
  agent, 
  task, 
  onTaskAction,
  className 
}: AgentHeaderProps) {
  const efficiency = agentUtils.calculateEfficiency(agent);
  const lastActive = agentUtils.formatLastActive(agent.lastActiveAt);

  return (
    <div className={cn("p-4 border-b", className)}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <AgentAvatar
            name={agent.name}
            avatar={agent.avatar}
            status={agent.status}
            size="lg"
            showStatus
          />
          
          <div>
            <h2 className="text-xl font-semibold">{agent.name}</h2>
            <p className="text-sm text-muted-foreground">{agent.description}</p>
          </div>
        </div>

        {task && onTaskAction && (
          <div className="flex items-center gap-2">
            {task.status === TaskStatus.WAITING && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onTaskAction('start')}
              >
                <PlayCircle className="h-4 w-4 mr-1" />
                Start
              </Button>
            )}
            {task.status === TaskStatus.IN_PROGRESS && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onTaskAction('pause')}
                >
                  <PauseCircle className="h-4 w-4 mr-1" />
                  Pause
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onTaskAction('complete')}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Complete
                </Button>
              </>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => onTaskAction('cancel')}
            >
              <XCircle className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 