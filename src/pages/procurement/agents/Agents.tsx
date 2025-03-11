import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import {
  Users,
  MessageSquare,
  ClipboardList,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
} from "lucide-react";

export function ProcurementAgents() {
  return (
    <>
      <PageHeader
        title="Procurement Agents"
        description="Manage agents and monitor task progress"
      />
      <div className="p-6 space-y-8">
        {/* Agents Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Agents</h2>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium">Agent P1</h3>
                  <p className="text-sm text-gray-500">Procurement Specialist</p>
                </div>
                <span className="ml-auto inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Available
                </span>
              </div>
              <div className="flex gap-2">
                <Button size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat
                </Button>
                <Button size="sm" variant="outline">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Assign Task
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Active Tasks Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Active Tasks</h2>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="p1">Agent P1</SelectItem>
                <SelectItem value="p2">Agent P2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-medium">Review Purchase Order #1234</h3>
                  <p className="text-sm text-gray-500">Assigned to Agent P1</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                  In Progress
                </span>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Due: {format(new Date(), "MMM d, yyyy")}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-2 h-4 w-4" />
                  Started: {format(new Date(), "MMM d, h:mm a")}
                </div>
              </div>
              <Button size="sm" className="w-full">View Details</Button>
            </Card>
          </div>
        </section>

        {/* Task History Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Task History</h2>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="p1">Agent P1</SelectItem>
                <SelectItem value="p2">Agent P2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-medium">Contract Review #789</h3>
                  <p className="text-sm text-gray-500">Completed by Agent P2</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Completed
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Completed: {format(new Date(), "MMM d, yyyy")}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-2 h-4 w-4" />
                  Duration: 1.5 hours
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
} 