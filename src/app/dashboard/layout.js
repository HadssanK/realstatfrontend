import PrivateRoute from "@/components/guards/PrivateRoute";
import AgentDashboardLayout from "@/components/dashboard/AgentDashboardLayout";

export default function DashboardLayout({ children }) {
  return (
    <PrivateRoute>
      <AgentDashboardLayout>
        {children}
      </AgentDashboardLayout>
    </PrivateRoute>
  );
}
