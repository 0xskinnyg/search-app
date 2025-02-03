export async function POST(request: Request) {
  try {
    const { withinId, type, rentType } = await request.json();

    const histogram = await fetch(
      "https://api.lystio.co/tenement/search/histogram",
      {
        method: "POST",
        body: JSON.stringify({ withinId, type, rentType }),
      }
    );

    const data = await histogram.json();

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

