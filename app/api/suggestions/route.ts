// In case we use lambda function to get AI Suggestion we expose it as a GET API
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const term = searchParams.get("term");
  
    const res = await fetch(
      `https://lambda_function_url/api/getaisuggestion?term=${term}`,
      {
        method: "GET",
        next: {
          revalidate: 60 * 60 * 24,   // Every 24 hours Caching
        },
      }
    );
  
    const message = await res.text();
  
    return Response.json({ message });
  }