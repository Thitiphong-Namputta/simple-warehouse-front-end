import { AppHeader } from "@/components/layouts/app-header";

async function getProductById(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
    );
    const json = await res.json();
    return json.id;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getProductById(slug);
  return (
    <div>
      <AppHeader title={"Product Details"} />
      <div className="mx-auto px-4 py-10">
        <h1>{slug}</h1>
        <h1>{data}</h1>
      </div>
    </div>
  );
}
