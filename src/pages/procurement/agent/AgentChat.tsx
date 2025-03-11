import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageHeader } from "@/components/layout/page-header";
import { ChatWindow } from "@/components/chat/chat-window";
import { AgentHeader } from "@/components/agent/agent-header";
import { ProgressUpdates } from "@/components/chat/progress-updates";
import { getAgentById, getAgentTasks } from "@/data/agents";
import { Agent, Message, Task } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProcurementAgentChat() {
  const { id } = useParams();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const agentData = getAgentById(id);
      setAgent(agentData);
      
      // Get the agent's active task
      const tasks = getAgentTasks(id);
      const activeTask = tasks.find(task => task.status === 'in_progress');
      setCurrentTask(activeTask || null);

      if (activeTask?.messages) {
        setMessages(activeTask.messages);
      }
    }
  }, [id]);

  const handleSendMessage = async (content: string) => {
    if (!agent) return;

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
        content: `This is a response from ${agent.name} regarding: ${content}`,
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

  if (!agent) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title={`Chat with ${agent.name}`}
        description="Interact with your procurement agent"
      />
      
      <div className="flex-1 container mx-auto p-6">
        <div className="grid grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
          {/* Main Chat Section */}
          <Card className="col-span-3 flex flex-col">
            <AgentHeader agent={agent} />
            <ChatWindow
              agent={agent}
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              className="flex-1"
            />
          </Card>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <Card>
              <Tabs defaultValue="progress" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="progress" className="flex-1">Progress</TabsTrigger>
                  <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                </TabsList>
                
                <TabsContent value="progress" className="p-4">
                  {currentTask ? (
                    <ProgressUpdates updates={currentTask.progressUpdates || []} />
                  ) : (
                    <div className="text-center text-muted-foreground py-4">
                      No active task
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="details" className="p-4">
                  {currentTask ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Task</h4>
                        <p className="text-sm text-muted-foreground">{currentTask.title}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Description</h4>
                        <p className="text-sm text-muted-foreground">{currentTask.description}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Status</h4>
                        <p className="text-sm text-muted-foreground capitalize">{currentTask.status}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-4">
                      No active task
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 