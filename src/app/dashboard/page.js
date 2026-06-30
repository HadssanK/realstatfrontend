import AgentDashboard from "@/components/dashboard/AgentDashboard";

export const metadata = {
  title: "Dashboard — PropFind",
  description: "Manage your listings, inquiries and profile on PropFind.",
};

export default function DashboardRoute() {
  return <AgentDashboard />;
}
