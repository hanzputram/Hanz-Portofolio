import { writeFile } from "fs/promises";
import { resolve } from "path";

export default defineEventHandler(async (event) => {
  // Allow GET for testing, PUT for saving
  if (event.method !== "PUT" && event.method !== "GET") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed",
    });
  }

  if (event.method === "GET") {
    return { status: "API is active" };
  }

  const body = await readBody(event);

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing body",
    });
  }

  try {
    // Ensure we are resolving relative to the workspace root
    const filePath = resolve(
      process.cwd(),
      "app/assets/data/site-content.json",
    );
    await writeFile(filePath, JSON.stringify(body, null, 2), "utf-8");
    return { success: true };
  } catch (error) {
    console.error("Error writing file:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error: Failed to write content file",
    });
  }
});
