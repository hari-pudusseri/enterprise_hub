import { Agent, Message } from "@/lib/types";
import { AgentAvatar } from "@/components/ui-custom/agent-avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ChatMessageProps {
  message: Message;
  agent?: Agent;
}

export function ChatMessage({ message, agent }: ChatMessageProps) {
  const isAgent = message.sender === 'agent';

  return (
    <div className={cn(
      "flex gap-3 mb-4",
      isAgent ? "flex-row" : "flex-row-reverse"
    )}>
      {isAgent ? (
        <AgentAvatar
          name={agent?.name || ""}
          avatar={agent?.avatar}
          size="sm"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-xs font-medium">You</span>
        </div>
      )}
      
      <div className={cn(
        "flex flex-col max-w-[80%]",
        isAgent ? "items-start" : "items-end"
      )}>
        <div className={cn(
          "rounded-lg px-4 py-2",
          isAgent ? "bg-secondary" : "bg-primary text-primary-foreground"
        )}>
          {message.content}
        </div>
        <span className="text-xs text-muted-foreground mt-1">
          {format(new Date(message.timestamp), 'HH:mm')}
        </span>
      </div>
    </div>
  );
} 