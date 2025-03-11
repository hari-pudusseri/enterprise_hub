import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { AgentHeader } from "@/components/agent/agent-header";
import { getAgentById } from "@/data/agents";
import { Agent } from "@/lib/types";

export function ProcurementTaskAssignment() {
  const { id } = useParams();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (id) {
      const agentData = getAgentById(id);
      setAgent(agentData);
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle task creation
    console.log("Creating task:", { title, description });
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
        title="Assign Task"
        description={`Create a new task for ${agent.name}`}
      />

      <div className="flex-1 container mx-auto p-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <Card>
              <AgentHeader agent={agent} />
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Task Title
                  </label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the task in detail..."
                    rows={5}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Assign Task
                </Button>
              </form>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Agent Information</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Status</h4>
                <p className="text-sm text-muted-foreground capitalize">
                  {agent.status.toLowerCase()}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Tasks Completed</h4>
                <p className="text-sm text-muted-foreground">
                  {agent.tasksCompleted}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Success Rate</h4>
                <p className="text-sm text-muted-foreground">
                  {agent.rating.toFixed(1)} / 5.0
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 