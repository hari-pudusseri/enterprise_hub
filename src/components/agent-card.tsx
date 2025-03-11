import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui-custom/star-rating";
import { SkillBadge } from "@/components/ui-custom/skill-badge";
import { StatusBadge } from "@/components/ui-custom/status-badge";
import { AgentAvatar } from "@/components/ui-custom/agent-avatar";
import { Agent } from "@/lib/types";
import { MessageSquare, PlayCircle, Star } from "lucide-react";
import { cn, truncateText } from "@/lib/utils";
import { Link } from "react-router-dom";
import { agentUtils } from '@/lib/agent-utils';

interface AgentCardProps {
  agent: Agent;
  className?: string;
  isFavorite?: boolean;
  onToggleFavorite?: (agentId: string) => void;
  variant: 'ai-hub' | 'procurement'; // Add variant prop to determine the context
}

export function AgentCard({ 
  agent, 
  className,
  isFavorite = false,
  onToggleFavorite,
  variant = 'ai-hub'
}: AgentCardProps) {
  // Determine the base route based on variant
  const baseRoute = variant === 'procurement' ? '/procurement' : '';

  const efficiency = agentUtils.calculateEfficiency(agent);
  const lastActive = agentUtils.formatLastActive(agent.lastActiveAt);
  const status = agentUtils.getStatusDisplay(agent.status);

  return (
    <Card className={cn("overflow-hidden border transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]", className)}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AgentAvatar 
            name={agent.name} 
            avatar={agent.avatar} 
            status={agent.status}
            size="lg"
            showStatus
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-medium text-base line-clamp-1">{agent.name}</h3>
              <div className="flex items-center gap-2">
                {variant === 'ai-hub' && ( // Only show favorite button for AI Hub
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onToggleFavorite?.(agent.id)}
                  >
                    <Star 
                      className={cn(
                        "h-4 w-4",
                        isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      )} 
                    />
                    <span className="sr-only">
                      {isFavorite ? "Remove from favorites" : "Add to favorites"}
                    </span>
                  </Button>
                )}
                <StatusBadge 
                  status={agent.status} 
                  type="agent"
                />
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {truncateText(agent.description, 100)}
            </p>
            
            <div className="flex flex-wrap gap-1.5 mb-3">
              {agent.skills.slice(0, 3).map((skill) => (
                <SkillBadge key={skill.id} name={skill.name} />
              ))}
              {agent.skills.length > 3 && (
                <SkillBadge name={`+${agent.skills.length - 3}`} variant="outline" />
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <StarRating rating={agent.rating} size="sm" />
                <span className="text-xs text-muted-foreground ml-2">
                  {agent.tasksCompleted} tasks
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Efficiency: {efficiency}</span>
              <span>{lastActive}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex p-4 pt-0 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          asChild
        >
          <Link to={`${baseRoute}/agent/${agent.id}/chat`}>
            <MessageSquare className="mr-1 h-4 w-4" />
            Chat
          </Link>
        </Button>
        <Button 
          size="sm" 
          className="flex-1"
          asChild
        >
          <Link to={`${baseRoute}/agent/${agent.id}/task`}>
            <PlayCircle className="mr-1 h-4 w-4" />
            Assign Task
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
