export async function POST(request: Request) {
  try {
    const { withinId, type, rentType, rent } = await request.json();

    console.log(withinId, type, rentType, rent);

    const response = await fetch(
      `https://api.lystio.co/tenement/search/count`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          withinId,
          type,
          rentType,
          rent,
        }),
      }
    );

    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    console.error("Error fetching popular locations:", error);
    return Response.json(
      { error: "Failed to fetch popular locations" },
      { status: 500 }
    );
  }
}
