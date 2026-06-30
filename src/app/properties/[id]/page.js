import PropertyDetailPage from "@/components/detail/PropertyDetailPage";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Property #${id} — PropFind`,
    description: "View full property details, photos, specs, amenities and contact the agent on PropFind.",
  };
}

export default function PropertyDetailRoute() {
  return <PropertyDetailPage />;
}
