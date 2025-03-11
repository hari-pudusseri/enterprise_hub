import { ScrollArea } from "@/components/ui/scroll-area";
import { ProgressUpdate } from "@/lib/types";
import { format } from "date-fns";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

interface ProgressUpdatesProps {
  updates: ProgressUpdate[];
}

export function ProgressUpdates({ updates }: ProgressUpdatesProps) {
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

  return (
    <ScrollArea className="h-[calc(100vh-16rem)]">
      <div className="space-y-4">
        {updates.map((update) => (
          <div key={update.id} className="flex gap-3">
            <div className="mt-1">
              {getStatusIcon(update.status)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-sm">{update.title}</h4>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(update.timestamp), 'HH:mm')}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {update.description}
              </p>
            </div>
          </div>
        ))}

        {updates.length === 0 && (
          <div className="text-center text-muted-foreground text-sm">
            No updates yet
          </div>
        )}
      </div>
    </ScrollArea>
  );
} 