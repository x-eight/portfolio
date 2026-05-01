import { streamText, convertToModelMessages } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response("Unauthorized: Missing or invalid Bearer token", { status: 401 });
    }
    const apiKey = authHeader.split(" ")[1];

    const { messages, provider } = await req.json();

    if (!apiKey) {
      return new Response("API Key is required", { status: 400 });
    }

    let model;
    if (provider === "openai") {
      const openai = createOpenAI({ apiKey });
      model = openai("gpt-4o-mini");
    } else if (provider === "gemini") {
      const google = createGoogleGenerativeAI({ apiKey });
      model = google("gemini-2.5-flash");
    } else {
      return new Response("Invalid provider", { status: 400 });
    }

    const messageAi = await convertToModelMessages(messages)

    const result = streamText({
      model,
      messages: messageAi,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process chat request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
