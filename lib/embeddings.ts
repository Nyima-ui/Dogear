const NOMIC_API_KEY = process.env.NOMIC_API_KEY;

export const getBatchEmbeddingsWithNomicAPI = async (
  texts: string[],
): Promise<number[][]> => {
  if (!NOMIC_API_KEY) {
    throw new Error("NOMIC_API_KEY is not set in environment variables");
  }

  if (!texts || texts.length === 0) {
    throw new Error("No texts provided for embedding");
  }

  try {
    const response = await fetch(
      "https://api-atlas.nomic.ai/v1/embedding/text",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${NOMIC_API_KEY}`,
        },
        body: JSON.stringify({
          model: "nomic-embed-text-v1.5",
          texts: texts,
          task_type: "search_document",
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Nomic API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    if (!data.embeddings || !Array.isArray(data.embeddings)) {
      throw new Error(
        "Invalid response format from Nomic API - missing embeddings array",
      );
    }

    if (data.embeddings.length !== texts.length) {
      throw new Error(
        `Nomic API returned ${data.embeddings.length} embeddings but expected ${texts.length}`,
      );
    }

    return data.embeddings;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    console.error(`Error embedding with Nomic hosted API: ${errorMessage}`, e);
    throw new Error(`Failed to get embeddings: ${errorMessage}`);
  }
};
