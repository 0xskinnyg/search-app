export async function GET() {
  try {
    const response = await fetch(`https://api.lystio.co/geo/search/recent`);

    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch recent searches" }, { status: 500 });
  }
}