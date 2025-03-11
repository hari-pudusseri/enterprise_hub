import { agentUtils } from '@/lib/agent-utils';

export function AgentList({ agents, tasks, variant }: AgentListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'tasks' | 'efficiency'>('rating');
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);

  // Apply filters and sorting
  const filteredAgents = agentUtils.searchAgents(agents, searchQuery);
  const skillFilteredAgents = agentUtils.filterBySkills(filteredAgents, selectedSkills);
  const sortedAgents = agentUtils.sortAgents(skillFilteredAgents, sortBy);

  return (
    <div>
      {/* Search and filter controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedAgents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            variant={variant}
            metrics={agentUtils.getPerformanceMetrics(agent, tasks)}
          />
        ))}
      </div>
    </div>
  );
} 