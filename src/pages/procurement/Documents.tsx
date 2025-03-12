import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag,
  Building,
  FileText,
  Receipt 
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Documents() {
  const documentTypes = [
    {
      title: "Purchase Orders",
      icon: ShoppingBag,
      href: "/procurement/documents/purchase-orders",
      description: "Manage and track purchase orders"
    },
    {
      title: "Suppliers",
      icon: Building,
      href: "/procurement/documents/suppliers",
      description: "Manage your supplier relationships"
    },
    {
      title: "Contracts",
      icon: FileText,
      href: "/procurement/documents/contracts",
      description: "Manage supplier contracts and agreements"
    },
    {
      title: "Invoices",
      icon: Receipt,
      href: "/procurement/documents/invoices",
      description: "Track and manage supplier invoices"
    }
  ];

  return (
    <div>
      <PageHeader
        title="Documents"
        description="Manage all procurement related documents"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {documentTypes.map((doc) => (
          <Card key={doc.href} className="p-4">
            <doc.icon className="h-6 w-6 mb-2" />
            <h3 className="font-medium mb-1">{doc.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{doc.description}</p>
            <Button asChild className="w-full">
              <Link to={doc.href}>View {doc.title}</Link>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
} 