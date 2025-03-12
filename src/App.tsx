import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout/main-layout';
import Home from '@/pages/Home';
import AgentsList from '@/pages/AgentsList';
import TaskDetail from '@/pages/TaskDetail';
import AgentChat from '@/pages/AgentChat';
import TaskAssignment from '@/pages/TaskAssignment';
import NotFound from '@/pages/NotFound';
import ActiveTasks from '@/pages/ActiveTasks';
import TaskHistory from '@/pages/TaskHistory';
import Settings from '@/pages/Settings';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from 'next-themes';
import ProcurementHome from '@/pages/procurement/Home';
import ProcurementAgents from '@/pages/procurement/Agents';
import ProcurementAgentChat from '@/pages/procurement/AgentChat';
import ProcurementTaskAssignment from '@/pages/procurement/TaskAssignment';
import { ProcurementTaskDetail } from '@/pages/procurement/TaskDetail';

// Work in Progress component for unfinished pages
function WorkInProgress({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">This page is under construction</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <Router>
        <MainLayout>
          <Routes>
            {/* AI Agent Hub Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/agents" element={<AgentsList />} />
            <Route path="/task/:id" element={<TaskDetail />} />
            <Route path="/agent/:id/chat" element={<AgentChat />} />
            <Route path="/agent/:id/task" element={<TaskAssignment />} />
            <Route path="/tasks/active" element={<ActiveTasks />} />
            <Route path="/tasks/history" element={<TaskHistory />} />
            <Route path="/settings" element={<Settings />} />

            {/* Procurement Routes */}
            <Route path="/procurement" element={<ProcurementHome />} />
            <Route path="/procurement/agents" element={<ProcurementAgents />} />
            <Route path="/procurement/tasks/:id" element={<ProcurementTaskDetail />} />
            <Route 
              path="/procurement/purchases" 
              element={<WorkInProgress title="Purchases" />} 
            />
            <Route 
              path="/procurement/suppliers" 
              element={<WorkInProgress title="Suppliers" />} 
            />
            <Route 
              path="/procurement/contracts" 
              element={<WorkInProgress title="Contracts" />} 
            />
            <Route 
              path="/procurement/invoices" 
              element={<WorkInProgress title="Invoices" />} 
            />
            <Route path="/procurement/agent/:id/chat" element={<ProcurementAgentChat />} />
            <Route path="/procurement/agent/:id/task" element={<ProcurementTaskAssignment />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
