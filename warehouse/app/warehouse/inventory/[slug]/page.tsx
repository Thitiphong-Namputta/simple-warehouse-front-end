import { AppHeader } from "@/components/layouts/app-header";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div>
      <AppHeader title={"Product Details"} />
      <div className="mx-auto px-4 py-10">
        <h1>{slug}</h1>
      </div>
    </div>
  );
}
