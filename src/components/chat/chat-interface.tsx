import { useState } from "react";
import { Agent } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/components/chat/chat-message";

interface ChatInterfaceProps {
  agent: Agent;
  variant: 'ai-hub' | 'procurement';
  className?: string;
}

export function ChatInterface({ agent, variant, className }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'agent', content: string }>>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    
    // Simulate agent response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'agent', 
        content: `This is a sample response from ${agent.name}` 
      }]);
    }, 1000);
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <ScrollArea className="flex-1 p-4">
        {messages.map((message, i) => (
          <ChatMessage
            key={i}
            message={message}
            agent={message.role === 'agent' ? agent : undefined}
          />
        ))}
      </ScrollArea>
      
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message ${agent.name}...`}
            className="flex-1"
            rows={1}
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </div>
    </div>
  );
} 