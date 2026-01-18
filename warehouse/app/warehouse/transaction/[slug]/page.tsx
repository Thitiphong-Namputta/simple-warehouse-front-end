import { AppHeader } from "@/components/layouts/app-header";

async function getTransactionById(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/transaction/${id}`,
    );
    const json = await res.json();
    return json.id;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default async function TransactionDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getTransactionById(slug);

  return (
    <div>
      <AppHeader title={"Payment Details"} />
      <div className="mx-auto px-4 py-10">
        <h1>slug : {slug}</h1>
        <h1>data : {data}</h1>
      </div>
    </div>
  );
}
