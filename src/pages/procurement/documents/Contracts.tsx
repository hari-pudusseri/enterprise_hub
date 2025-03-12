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
import { Search, Filter, Plus, FileText } from "lucide-react";

export default function Contracts() {
  return (
    <div>
      <PageHeader
        title="Contracts"
        description="Manage supplier contracts and agreements"
        action={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Contract
          </Button>
        }
      />

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search contracts..."
            className="max-w-sm"
            type="search"
          />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contract ID</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">CTR-2024-001</TableCell>
                <TableCell>Acme Supplies</TableCell>
                <TableCell>Jan 1, 2024</TableCell>
                <TableCell>Dec 31, 2024</TableCell>
                <TableCell>
                  <Badge>Active</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">View</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
} 