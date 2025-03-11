import { useState } from 'react';
import { PageHeader } from "@/components/layout/page-header";
import { SearchInput } from "@/components/search-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bell, AlertTriangle, Clock } from "lucide-react";

export default function ProcurementHome() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <PageHeader
        title="Procurement"
        description="Overview of procurement activities and actions"
      />
      
      <div className="space-y-6">
        {/* Search Section */}
        <Card>
          <CardContent className="p-6">
            <SearchInput 
              placeholder="Search suppliers, purchases, contracts..."
              onSearch={setSearchQuery}
              className="max-w-2xl"
            />
          </CardContent>
        </Card>

        {/* Alerts Section */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Action Required</AlertTitle>
            <AlertDescription>
              3 purchases pending approval
            </AlertDescription>
          </Alert>
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertTitle>Upcoming Renewals</AlertTitle>
            <AlertDescription>
              2 contracts due for renewal this month
            </AlertDescription>
          </Alert>
        </div>

        {/* Recent Activity Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Latest Purchases */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Latest Purchases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Sample purchases - replace with real data */}
                {[1,2,3].map((i) => (
                  <div key={i} className="flex justify-between items-start border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium">Purchase #{i}</p>
                      <p className="text-sm text-muted-foreground">Office Supplies</p>
                    </div>
                    <Badge>Pending</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Contracts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Contracts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1,2,3].map((i) => (
                  <div key={i} className="flex justify-between items-start border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium">Contract #{i}</p>
                      <p className="text-sm text-muted-foreground">Supplier Name</p>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Invoices */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1,2,3].map((i) => (
                  <div key={i} className="flex justify-between items-start border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium">INV-{i}</p>
                      <p className="text-sm text-muted-foreground">$1,234.00</p>
                    </div>
                    <Badge variant="secondary">Paid</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
} 