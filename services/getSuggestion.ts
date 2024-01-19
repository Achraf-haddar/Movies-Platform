// import { LRUCache } from "lru-cache";

// Initialize a cache with a maximum size
// const cache = new LRUCache({ max: 100, ttl: 1000 * 60 * 5 });

export async function fetchSuggestion(term: string) {
    try{
      // Server Side Caching won't work since the fetch is done in a client side component
      // Check if the result is already in the cache
      // const cachedResult = cache.get(term);
      // if (cachedResult) {
      //   console.log("Result fetched from cache");
      //   return cachedResult;
      // }
      // >>> We proceed with client side caching using local storage
      // Check if the result is already in local storage
      const cachedResult = localStorage.getItem(term);
      if (cachedResult) {
        console.log("Result fetched from local storage");
        return cachedResult;
      }

      const { OpenAI } = await import("openai");
  
      const apiKey = `${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`;
  
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a digital video assistant working for services such as Netflix, Disney Plus & Amazon Prime Video. Your job is to provide suggestions based on the videos the user specifies. Provide an quirky breakdown of what the user should watch next! It should only list the names of the films after the introduction. Keep the response short and sweet! Always list at least 3 films as suggestions. If the user mentions a genre, you should provide a suggestion based on that genre.`,
        },
        {
          role: "user",
          content: `I like: ${term}`,
        },
      ],
      model: "gpt-3.5-turbo",
    });  

    const result: any = completion.choices[0].message.content;

    // Cache the result for future use
    // cache.set(term, result);

    // Cache the result in local storage
    localStorage.setItem(term, result);

  
    return result;
  } catch(error) {
    console.log(error)
  }

};
