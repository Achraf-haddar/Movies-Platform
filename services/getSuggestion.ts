export async function fetchSuggestion(term: string) {
    try{
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
    console.log(completion.choices[0]);
  
    return completion.choices[0].message.content;
  } catch(error) {
    console.log(error)
  }

};
