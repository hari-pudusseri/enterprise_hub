import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { SearchInput } from "@/components/search-input";
import { procurementAgents } from "@/data/procurement-agents";
import { AgentCard } from "@/components/agent-card";
import { TaskList } from "@/components/task-list";
import { Card } from "@/components/ui/card";
import { getActiveProcurementTasks, getCompletedProcurementTasks } from "@/data/procurement-tasks";

export default function ProcurementAgents() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get tasks data
  const activeTasks = getActiveProcurementTasks();
  const completedTasks = getCompletedProcurementTasks();

  const filteredAgents = procurementAgents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Procurement Agents"
        description="AI agents specialized in procurement tasks"
      />
      
      {/* Agents Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Available Agents</h2>
        <SearchInput 
          placeholder="Search agents..."
          onSearch={setSearchQuery}
          className="max-w-xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAgents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              variant="procurement"
            />
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-12 border rounded-lg bg-card">
            <h3 className="text-lg font-medium mb-2">No agents found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </section>

      {/* Active Tasks Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Active Tasks</h2>
        {activeTasks.length > 0 ? (
          <TaskList tasks={activeTasks} title="In Progress" />
        ) : (
          <Card>
            <div className="p-8 text-center">
              <h3 className="text-lg font-medium mb-2">No active tasks</h3>
              <p className="text-muted-foreground">
                When you assign tasks to procurement agents, they will appear here
              </p>
            </div>
          </Card>
        )}
      </section>

      {/* Task History Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Task History</h2>
        {completedTasks.length > 0 ? (
          <TaskList tasks={completedTasks} title="Completed Tasks" />
        ) : (
          <Card>
            <div className="p-8 text-center">
              <h3 className="text-lg font-medium mb-2">No task history</h3>
              <p className="text-muted-foreground">
                Completed procurement tasks will appear here
              </p>
            </div>
          </Card>
        )}
      </section>
    </div>
  );
} 