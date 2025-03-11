import React, { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { procurementAgents } from '@/data/procurement-agents';
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AgentAvatar } from "@/components/ui-custom/agent-avatar";
import { TaskPriority } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function ProcurementTaskAssignment() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  
  const agent = procurementAgents.find(a => a.id === id);
  
  if (!agent) {
    return <Navigate to="/procurement/agents" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      toast({
        title: "Description required",
        description: "Please provide a task description",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Task assigned",
      description: `Task has been assigned to ${agent.name}`
    });
    
    navigate('/procurement/agents');
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <PageHeader
        title="Assign Task"
        description="Create a new task for the procurement agent"
      />
      
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Agent Card */}
        <Card>
          <CardHeader>
            <CardTitle>Selected Agent</CardTitle>
            <CardDescription>Review the agent's capabilities before assigning a task</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4">
              <AgentAvatar agent={agent} className="w-12 h-12" />
              <div className="flex-1">
                <h3 className="font-medium">{agent.name}</h3>
                <p className="text-sm text-muted-foreground">{agent.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {agent.skills.map(skill => (
                    <span 
                      key={skill.id} 
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Task Details</CardTitle>
            <CardDescription>Describe the task you want the agent to perform</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Task Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what you want the agent to do..."
                    className="mt-2"
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select
                    value={priority}
                    onValueChange={(value) => setPriority(value as TaskPriority)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={TaskPriority.LOW}>Low Priority</SelectItem>
                      <SelectItem value={TaskPriority.MEDIUM}>Medium Priority</SelectItem>
                      <SelectItem value={TaskPriority.HIGH}>High Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/procurement/agents')}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Assign Task
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 