import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  // e.g. Query a database for payment with ID `id`

  return Response.json({
    id: id,
  });
}
