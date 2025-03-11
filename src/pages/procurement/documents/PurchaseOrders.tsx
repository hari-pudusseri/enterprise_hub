import { useState } from 'react';
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
import { Search, Filter, Plus } from "lucide-react";

export function PurchaseOrders() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Purchase Orders</h1>
      <div className="bg-white rounded-lg border p-4">
        <h2 className="text-lg font-semibold mb-2">PO List</h2>
        <p className="text-gray-600">Purchase order management interface coming soon...</p>
      </div>
    </div>
  );
} 