import { v4 as uuidv4 } from 'uuid';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return Response.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!accessToken) {
      console.error('Mapbox access token is missing');
      return Response.json({ error: 'Configuration error' }, { status: 500 });
    }

    const params = new URLSearchParams({
      q: query,
      language: 'de',
      country: 'at',
      types: 'address,district,place,locality,neighborhood,city,street,poi',
      session_token: uuidv4(),
      access_token: accessToken
    });

    const url = `https://api.mapbox.com/search/searchbox/v1/suggest?${params}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Mapbox API error.', errorData);
      return Response.json({ error: 'Mapbox API error', details: errorData }, { status: response.status });
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error in suggest endpoint:', error);
    return Response.json({
      error: 'Failed to fetch suggestions',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
