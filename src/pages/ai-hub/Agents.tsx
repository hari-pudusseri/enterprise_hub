import { AgentCard } from "@/components/agent-card";

export function AIHubAgents() {
  const agents = getAgents(); // Your AI Hub agents data
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleToggleFavorite = (agentId: string) => {
    setFavorites(prev => 
      prev.includes(agentId) 
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {agents.map((agent) => (
        <AgentCard
          key={agent.id}
          agent={agent}
          variant="ai-hub"
          isFavorite={favorites.includes(agent.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </div>
  );
} 