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
import { Search, Filter, Plus, Receipt } from "lucide-react";

export default function Invoices() {
  return (
    <div>
      <PageHeader
        title="Invoices"
        description="Track and manage supplier invoices"
        action={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        }
      />

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search invoices..."
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
                <TableHead>Invoice Number</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV-2024-001</TableCell>
                <TableCell>Acme Supplies</TableCell>
                <TableCell>Mar 1, 2024</TableCell>
                <TableCell>Mar 31, 2024</TableCell>
                <TableCell>$1,234.56</TableCell>
                <TableCell>
                  <Badge variant="secondary">Pending</Badge>
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