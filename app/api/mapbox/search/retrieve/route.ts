export async function POST(request: Request) {
  try {
    const { suggestion_id, session_token } = await request.json();

    const params = new URLSearchParams({
      suggestion_id,
      session_token,
      access_token: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '',
    });

    const response = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/retrieve?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error in retrieve endpoint:', error);
    return Response.json({ error: 'Failed to retrieve location details' }, { status: 500 });
  }
}