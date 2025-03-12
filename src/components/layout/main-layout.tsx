import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  History,
  Settings,
  Menu,
  X,
  ChevronDown,
  Bot,
  Building,
  ShoppingBag,
  FileText,
  Receipt,
  Home
} from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const procurementNavItems = [
  {
    title: "Home",
    href: "/procurement",
    icon: Home
  },
  {
    title: "Agents",
    href: "/procurement/agents",
    icon: Bot
  },
  {
    title: "Documents",
    icon: FileText,
    items: [
      {
        title: "Purchases",
        href: "/procurement/documents/purchase-orders",
        icon: ShoppingBag
      },
      {
        title: "Suppliers",
        href: "/procurement/documents/suppliers",
        icon: Building
      },
      {
        title: "Contracts",
        href: "/procurement/documents/contracts",
        icon: FileText
      },
      {
        title: "Invoices",
        href: "/procurement/documents/invoices",
        icon: Receipt
      }
    ]
  }
];

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [agentHubOpen, setAgentHubOpen] = useState(true);
  const [procurementOpen, setProcurementOpen] = useState(true);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const agentHubItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Agents",
      path: "/agents",
      icon: Users,
    },
    {
      name: "Active Tasks",
      path: "/tasks/active",
      icon: CheckSquare,
    },
    {
      name: "Task History",
      path: "/tasks/history",
      icon: History,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  const procurementItems = [
    {
      name: "Home",
      path: "/procurement",
      icon: Home,
    },
    {
      name: "Agents",
      path: "/procurement/agents",
      icon: Bot,
    },
    {
      name: "Purchases",
      path: "/procurement/purchases",
      icon: ShoppingBag,
    },
    {
      name: "Suppliers",
      path: "/procurement/suppliers",
      icon: Building,
    },
    {
      name: "Contracts",
      path: "/procurement/contracts",
      icon: FileText,
    },
    {
      name: "Invoices",
      path: "/procurement/invoices",
      icon: Receipt,
    },
  ];

  const renderNavItem = (item: any, isNested = false) => {
    // If the item has subitems, render a collapsible section
    if (item.items) {
      return (
        <div key={item.title} className="space-y-1">
          <div
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              "cursor-pointer"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {item.icon && <item.icon className="h-4 w-4" />}
            <span>{item.title}</span>
            <ChevronDown 
              className={cn(
                "ml-auto h-4 w-4 transition-transform",
                isOpen && "rotate-180"
              )} 
            />
          </div>
          {isOpen && (
            <div className="ml-4 space-y-1">
              {item.items.map((subItem: any) => renderNavItem(subItem, true))}
            </div>
          )}
        </div>
      );
    }

    // Otherwise render a regular nav link
    return (
      <Link
        key={item.href}
        to={item.href}
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          location.pathname === item.href && "bg-accent text-accent-foreground",
          isNested && "ml-4"
        )}
      >
        {item.icon && <item.icon className="h-4 w-4" />}
        <span>{item.title}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile nav toggle */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b lg:hidden">
        <div className="flex items-center justify-between px-4 h-14">
          <Link to="/" className="font-semibold text-lg">
            Enterprise Hub
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-card transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            <div className="hidden lg:flex items-center h-14 px-6 border-b">
              <Link to="/" className="font-semibold text-lg">
                Enterprise Hub
              </Link>
            </div>

            <nav className="flex-1 overflow-y-auto p-3">
              <div className="space-y-3">
                {/* AI Agent Hub Section */}
                <div>
                  <Button
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={() => setAgentHubOpen(!agentHubOpen)}
                  >
                    <div className="flex items-center">
                      <Bot className="h-5 w-5 mr-2" />
                      <span className="font-medium">AI Agent Hub</span>
                    </div>
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform",
                      agentHubOpen ? "transform rotate-180" : ""
                    )} />
                  </Button>
                  
                  {agentHubOpen && (
                    <ul className="mt-1 space-y-1 pl-7">
                      {agentHubItems.map((item) => (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary",
                              location.pathname === item.path
                                ? "bg-secondary text-accent"
                                : "text-foreground"
                            )}
                            onClick={() => setSidebarOpen(false)}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Procurement Section */}
                <div>
                  <Button
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={() => setProcurementOpen(!procurementOpen)}
                  >
                    <div className="flex items-center">
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      <span className="font-medium">Procurement</span>
                    </div>
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform",
                      procurementOpen ? "transform rotate-180" : ""
                    )} />
                  </Button>
                  
                  {procurementOpen && (
                    <ul className="mt-1 space-y-1 pl-7">
                      {procurementNavItems.map(item => renderNavItem(item))}
                    </ul>
                  )}
                </div>
              </div>
            </nav>

            <div className="p-3 border-t">
              <div className="rounded-md bg-secondary p-3">
                <h4 className="font-medium text-sm mb-1">Need Help?</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  Learn how to get the most out of your AI agents.
                </p>
                <Button size="sm" variant="outline" className="w-full text-xs">
                  View Documentation
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 relative">
          {/* Backdrop for mobile sidebar */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-background/80 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          <div className="container py-6 px-4 sm:px-6 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
      
      <Toaster />
    </div>
  );
}
