import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { 
  CheckCircle2, 
  Clock, 
  XCircle,
  MessageSquare,
  Bot,
  FileText,
  AlertTriangle,
  Activity
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProgressUpdateDetails {
  type: 'system' | 'chat' | 'action' | 'analysis' | 'warning';
  metadata?: Record<string, any>;
  result?: string;
}

interface ProgressUpdate {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'blocked';
  timestamp: string;
  details?: ProgressUpdateDetails;
}

interface ProgressUpdatesProps {
  updates: ProgressUpdate[];
  showDetails?: boolean;
}

export function ProgressUpdates({ updates, showDetails = false }: ProgressUpdatesProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'blocked':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'chat':
        return <MessageSquare className="h-4 w-4" />;
      case 'action':
        return <Activity className="h-4 w-4" />;
      case 'analysis':
        return <FileText className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Bot className="h-4 w-4" />;
    }
  };

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-4 p-4">
        {updates.map((update) => (
          <div key={update.id} className="flex gap-3 p-4 border rounded-lg hover:bg-accent/5">
            <div className="mt-1">
              {getStatusIcon(update.status)}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    {update.title}
                    {update.details && (
                      <Badge variant="secondary" className="text-xs">
                        {update.details.type}
                      </Badge>
                    )}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {update.description}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(update.timestamp), 'HH:mm:ss')}
                </span>
              </div>

              {showDetails && update.details && (
                <div className="mt-2 text-sm">
                  <div className="bg-muted p-2 rounded-md">
                    {update.details.type === 'analysis' && (
                      <div className="space-y-1">
                        <p className="font-medium">Analysis Results:</p>
                        <p className="text-muted-foreground">{update.details.result}</p>
                      </div>
                    )}
                    {update.details.metadata && (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {Object.entries(update.details.metadata).map(([key, value]) => (
                          <div key={key} className="text-xs">
                            <span className="text-muted-foreground">{key}:</span>{' '}
                            <span className="font-mono">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {updates.length === 0 && (
          <div className="text-center text-muted-foreground text-sm p-8">
            No updates yet
          </div>
        )}
      </div>
    </ScrollArea>
  );
} 