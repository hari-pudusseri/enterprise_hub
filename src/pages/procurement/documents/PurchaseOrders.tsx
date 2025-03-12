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
import { Search, Filter, Plus, ShoppingBag } from "lucide-react";

export default function PurchaseOrders() {
  return (
    <div>
      <PageHeader
        title="Purchase Orders"
        description="Manage and track purchase orders"
        action={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Purchase Order
          </Button>
        }
      />

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search purchase orders..."
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
                <TableHead>PO Number</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">PO-2024-001</TableCell>
                <TableCell>Acme Supplies</TableCell>
                <TableCell>Mar 12, 2024</TableCell>
                <TableCell>
                  <Badge>Pending</Badge>
                </TableCell>
                <TableCell>$1,234.56</TableCell>
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