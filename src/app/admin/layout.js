import { AdminRoute } from "@/components/guards/PrivateRoute";

export default function AdminLayout({ children }) {
  return <AdminRoute>{children}</AdminRoute>;
}
