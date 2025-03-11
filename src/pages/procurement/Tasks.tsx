import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

export function Tasks() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Procurement Tasks</h1>
          <p className="text-gray-500">Monitor and manage procurement tasks</p>
        </div>
        <Button>Create New Task</Button>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task ID</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Assigned Agent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>TASK-001</TableCell>
              <TableCell>Review supplier contracts</TableCell>
              <TableCell>ProcureBot-01</TableCell>
              <TableCell><Badge className="bg-blue-100 text-blue-800">In Progress</Badge></TableCell>
              <TableCell><Badge className="bg-red-100 text-red-800">High</Badge></TableCell>
              <TableCell>2024-03-20</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">View Details</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TASK-002</TableCell>
              <TableCell>Process purchase orders</TableCell>
              <TableCell>ProcureBot-02</TableCell>
              <TableCell><Badge className="bg-green-100 text-green-800">Completed</Badge></TableCell>
              <TableCell><Badge className="bg-yellow-100 text-yellow-800">Medium</Badge></TableCell>
              <TableCell>2024-03-19</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">View Details</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 