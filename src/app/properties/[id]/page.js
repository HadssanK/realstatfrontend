import PropertyDetailPage from "@/components/detail/PropertyDetailPage";

export function generateMetadata({ params }) {
  return {
    title: `Property #${params.id} — PropFind`,
    description: "View full property details, photos, specs, amenities and contact the agent on PropFind.",
  };
}

export default function PropertyDetailRoute() {
  return <PropertyDetailPage />;
}
