async function fetchWithRetry(url: string, maxRetries: number = 5, delay: number = 2000): Promise<Response> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        // Add timeout and other fetch options for better reliability
        signal: AbortSignal.timeout(10000), // 10 second timeout
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; AnimeQuoteBot/1.0)',
        },
      });
      return response;
    } catch (error) {
      lastError = error as Error;
      console.warn(`Fetch attempt ${attempt} failed:`, error);
      
      // If this isn't the last attempt, wait before retrying
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay));
        // Increase delay for next attempt (exponential backoff)
        delay *= 1.5;
      }
    }
  }
  
  throw lastError!;
}

export async function GET() {
  try {
    const response = await fetchWithRetry('https://animechan.vercel.app/api/quotes/random', 5, 2000);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Check if the response is actually JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON response but received: ${contentType || 'unknown content type'}`);
    }
    
    const data = await response.json();
    
    return Response.json(data);
  } catch (error) {
    console.warn('External quote API unavailable, using fallback quote:', error);
    
    // Return a fallback quote if the external API fails
    const fallbackQuote = {
      anime: 'Anime Universe',
      character: 'Wise Sage',
      quote: 'The journey of a thousand anime begins with a single episode.'
    };
    
    return Response.json(fallbackQuote);
  }
}