import { useState } from "react";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProcurementTasks() {
  const [date, setDate] = useState<Date>();

  return (
    <>
      <PageHeader
        title="Procurement Tasks"
        description="Schedule and manage procurement tasks"
      />
      <div className="p-6">
        {/* Filters */}
        <div className="mb-6 flex items-center gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[180px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by agent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Agents</SelectItem>
              <SelectItem value="p1">Agent P1</SelectItem>
              <SelectItem value="p2">Agent P2</SelectItem>
              <SelectItem value="p3">Agent P3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tasks Grid */}
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
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Due: {format(new Date(), "MMM d, yyyy")}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="mr-2 h-4 w-4" />
                Estimated time: 2 hours
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm">View Details</Button>
              <Button size="sm" variant="outline">Reschedule</Button>
            </div>
          </Card>

          {/* Add more task cards here */}
        </div>
      </div>
    </>
  );
} 