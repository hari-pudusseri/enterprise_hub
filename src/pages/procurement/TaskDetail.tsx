import { useParams, useNavigate } from 'react-router-dom';
import { procurementTasks } from '@/data/procurement-tasks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AgentAvatar } from '@/components/ui-custom/agent-avatar';
import { formatDateTime, formatCurrency } from '@/lib/utils';
import { 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  XCircle,
  Building2,
  Receipt,
  DollarSign,
  Tags
} from 'lucide-react';
import { TaskStatus, TaskPriority } from '@/lib/types';

export default function ProcurementTaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const task = procurementTasks.find(t => String(t.id) === id);
  
  if (!task) {
    return <div className="container mx-auto py-6 px-4">Task not found</div>;
  }

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return 'bg-green-500/10 text-green-500';
      case TaskStatus.IN_PROGRESS:
        return 'bg-blue-500/10 text-blue-500';
      case TaskStatus.WAITING:
        return 'bg-yellow-500/10 text-yellow-500';
      case TaskStatus.CANCELLED:
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.HIGH:
        return 'bg-red-500/10 text-red-500';
      case TaskPriority.MEDIUM:
        return 'bg-yellow-500/10 text-yellow-500';
      case TaskPriority.LOW:
        return 'bg-green-500/10 text-green-500';
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 space-y-6">
          {/* Main Task Information */}
          <Card>
            <CardHeader className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-1">
                  <CardTitle>{task.title}</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    Task ID: {task.id}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(task.status)}>
                    {task.status}
                  </Badge>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority} Priority
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Assigned: {formatDateTime(task.assignedAt)}
                </div>
                {task.dueDate && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Due: {formatDateTime(task.dueDate)}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <AgentAvatar agent={task.agent} />
                <div>
                  <div className="font-medium">{task.agent.name}</div>
                  <div className="text-sm text-muted-foreground">Assigned Agent</div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 pt-0">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">{task.description}</p>
                </div>

                {/* Procurement Specific Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                  {task.supplierName && (
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Supplier</div>
                        <div className="text-sm text-muted-foreground">{task.supplierName}</div>
                      </div>
                    </div>
                  )}
                  
                  {task.purchaseOrderNumber && (
                    <div className="flex items-center gap-2">
                      <Receipt className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">PO Number</div>
                        <div className="text-sm text-muted-foreground">{task.purchaseOrderNumber}</div>
                      </div>
                    </div>
                  )}
                  
                  {task.budget && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Budget</div>
                        <div className="text-sm text-muted-foreground">{formatCurrency(task.budget)}</div>
                      </div>
                    </div>
                  )}
                  
                  {task.category && (
                    <div className="flex items-center gap-2">
                      <Tags className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Category</div>
                        <div className="text-sm text-muted-foreground">
                          {task.category.split('-').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Updates */}
          <Card>
            <CardHeader className="p-6">
              <CardTitle>Progress Updates</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-4">
                {task.progressUpdates.map((update) => (
                  <div key={update.id} className="flex gap-4">
                    <div className="mt-1">
                      {update.status === 'completed' && (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      )}
                      {update.status === 'in-progress' && (
                        <AlertCircle className="h-5 w-5 text-blue-500" />
                      )}
                      {update.status === 'blocked' && (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="font-medium">{update.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {update.description}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDateTime(update.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat History */}
        <div className="lg:w-1/3">
          <Card className="h-[calc(100vh-160px)]">
            <CardHeader className="p-6 border-b">
              <CardTitle>Communication History</CardTitle>
            </CardHeader>
            <ScrollArea className="h-[calc(100%-76px)]">
              <CardContent className="p-6">
                {task.messages.length > 0 ? (
                  <div className="space-y-4">
                    {task.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <div className="text-sm mb-1">
                            {message.sender === 'user' ? 'You' : task.agent.name}
                          </div>
                          <div className="text-sm">{message.content}</div>
                          <div className="text-xs mt-1 opacity-70">
                            {formatDateTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    No messages yet
                  </div>
                )}
              </CardContent>
            </ScrollArea>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <Button
          variant="outline"
          onClick={() => navigate('/procurement')}
        >
          Back to Procurement Hub
        </Button>
      </div>
    </div>
  );
} 