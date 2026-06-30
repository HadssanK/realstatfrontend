import ManagePropertiesPage from "@/components/admin/ManagePropertiesPage";

export const metadata = {
  title: "Manage Properties — PropFind Admin",
  description: "Review, approve and manage all property listings on PropFind.",
};

export default function AdminPropertiesRoute() {
  return <ManagePropertiesPage />;
}
