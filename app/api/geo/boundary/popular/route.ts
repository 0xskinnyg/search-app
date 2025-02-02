export async function GET() {
  try {
    const response = await fetch(
      "https://api.lystio.co/geo/boundary/popular"
    );
    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    console.error("Error fetching popular locations:", error);
    return Response.json({ error: "Failed to fetch popular locations" }, { status: 500 });
  }
}
