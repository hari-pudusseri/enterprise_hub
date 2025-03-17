import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { procurementAgents } from '@/data/procurement-agents';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AgentAvatar } from "@/components/ui-custom/agent-avatar";
import { Avatar } from "@/components/ui/avatar";
import { Send, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProgressUpdates } from "@/components/chat/progress-updates";

export default function ProcurementAgentChat() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  
  const agent = procurementAgents.find(a => a.id === id);
  
  if (!agent) {
    return <Navigate to="/procurement/agents" replace />;
  }

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    toast({
      title: "Message sent",
      description: `Message sent to ${agent.name}`,
    });
    
    setMessage('');
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
          <Card className="h-[calc(100vh-160px)]">
            <CardHeader className="p-4 border-b">
              <div className="flex items-center">
                <AgentAvatar agent={agent} className="mr-3" />
                <div>
                  <h3 className="font-medium">{agent.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    {agent.status}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <div className="flex flex-col h-[calc(100%-140px)]">
              <ScrollArea className="flex-1 p-4">
                <div className="text-center text-muted-foreground py-8">
                  Start a conversation with {agent.name}
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder={`Message ${agent.name}...`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage} disabled={!message.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="lg:w-2/3">
          <Card>
            <CardHeader className="p-4 border-b">
              <h3 className="font-medium">Task Progress & Actions</h3>
            </CardHeader>
            <CardContent className="p-0">
              <ProgressUpdates 
                updates={[
                  {
                    id: '1',
                    title: 'Conversation Started',
                    description: 'Agent initialized and ready for task discussion',
                    status: 'completed',
                    timestamp: new Date().toISOString(),
                    details: {
                      type: 'system',
                      metadata: {
                        sessionId: 'session-123',
                        agentVersion: '1.0'
                      }
                    }
                  },
                  // Add more detailed progress updates based on chat interactions
                ]}
                showDetails={true}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 