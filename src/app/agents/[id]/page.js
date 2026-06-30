import AgentProfilePage from "@/components/AgentProfilePage";
import { AGENTS } from "@/data/agents";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const agent = AGENTS.find(a => a.id === parseInt(id));
  if (!agent) return { title: "Agent Not Found — PropFind" };
  return {
    title: `${agent.name} — PropFind Agent`,
    description: `View ${agent.name}'s listings and contact details on PropFind.`,
  };
}

export default async function AgentProfileRoute({ params }) {
  const { id } = await params;
  const agent = AGENTS.find(a => a.id === parseInt(id));
  if (!agent) notFound();
  return <AgentProfilePage agent={agent} />;
}
