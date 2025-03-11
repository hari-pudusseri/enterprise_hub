import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { SearchInput } from "@/components/search-input";
import { AgentGrid } from "@/components/agent-grid";
import { TaskList } from "@/components/task-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { procurementAgents } from "@/data/procurement-agents";
import { AgentCard } from "@/components/agent-card";

export default function ProcurementAgents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("agents");

  return (
    <>
      <PageHeader
        title="Procurement Agents"
        description="AI agents specialized in procurement tasks"
      />
      
      <div className="space-y-6">
        <SearchInput 
          placeholder="Search agents or tasks..."
          onSearch={setSearchQuery}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="agents">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {procurementAgents.filter(agent => 
                agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                agent.description.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  variant="procurement"
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="tasks">
            <TaskList 
              tasks={[]} 
              title="Active Tasks"
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
} 