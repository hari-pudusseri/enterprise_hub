import { useState } from 'react';
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TaskList } from "@/components/task-list";
import { AgentCard } from "@/components/agent-card";
import { 
  AlertTriangle, 
  Bell, 
  Clock, 
  DollarSign,
  FileText,
  ShoppingBag,
  TrendingUp 
} from "lucide-react";
import { getActiveProcurementTasks } from "@/data/procurement-tasks";
import { procurementAgents } from "@/data/procurement-agents";
import { Link } from "react-router-dom";

export default function ProcurementHome() {
  const activeTasks = getActiveProcurementTasks();
  const topAgents = procurementAgents.slice(0, 3); // Get top 3 agents

  return (
    <div className="space-y-8">
      <PageHeader
        title="Procurement Dashboard"
        description="Overview of procurement activities and insights"
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Spend</p>
                <h3 className="text-2xl font-bold">$24,500</h3>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-4">
              <p className="text-xs text-green-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                12% from last month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Orders</p>
                <h3 className="text-2xl font-bold">18</h3>
              </div>
              <ShoppingBag className="h-8 w-8 text-blue-500" />
            </div>
            <Progress value={75} className="mt-4" />
            <p className="text-xs text-muted-foreground mt-2">75% processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
                <h3 className="text-2xl font-bold">7</h3>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="mt-4">
              <Badge variant="secondary">3 urgent</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Contract Renewals</p>
                <h3 className="text-2xl font-bold">4</h3>
              </div>
              <FileText className="h-8 w-8 text-purple-500" />
            </div>
            <div className="mt-4">
              <Badge>Due this month</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Action Required
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium">3 purchase orders pending approval</p>
              <p className="text-sm text-muted-foreground">Requires immediate attention</p>
              <Button size="sm" variant="outline" className="mt-2">
                Review Now
              </Button>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium">2 contracts expiring soon</p>
              <p className="text-sm text-muted-foreground">Due for renewal in 15 days</p>
              <Button size="sm" variant="outline" className="mt-2">
                View Contracts
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Tasks */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold tracking-tight">Active Tasks</h2>
          <Button variant="outline" asChild>
            <Link to="/procurement/tasks">View All</Link>
          </Button>
        </div>
        <TaskList 
          tasks={activeTasks} 
          title="In Progress" 
          variant="procurement"
        />
      </section>

      {/* Available Agents */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold tracking-tight">Available Agents</h2>
          <Button variant="outline" asChild>
            <Link to="/procurement/agents">View All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topAgents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              variant="procurement"
            />
          ))}
        </div>
      </section>
    </div>
  );
} 