export async function POST(request: Request) {
  try {
    const body = await request.json();

    // ✅ VALIDATE REQUEST BODY
    if (!body) {
      return new Response(
        JSON.stringify({
          error: "Missing request body",
        }),
        { status: 400 }
      );
    }

    // ✅ CHECK API KEY
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "Missing GEMINI_API_KEY",
        }),
        { status: 500 }
      );
    }

    // ✅ BETTER PROMPT
    const prompt = `
Return ONLY valid JSON in this exact format:

{
  "personal_statement": "",
  "experience": "",
  "skills": "",
  "education": ""
}

Rules:
- Do NOT add markdown
- Do NOT add explanation
- Do NOT wrap response in backticks
- Improve the content professionally
- Do NOT add fake information
- experience, skills, education should remain comma separated strings

User Data:

Name: ${body.name || ""}
Personal Statement: ${body.personal_statement || ""}
Experience: ${body.experience || ""}
Education: ${body.education || ""}
Skills: ${body.skill || ""}
`;

    // ✅ GEMINI REQUEST
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    // ✅ RESPONSE JSON
    const data = await response.json();

    console.log("GEMINI RESPONSE:", data);

    // ✅ HANDLE GEMINI API ERRORS
    if (data.error) {
      return new Response(
        JSON.stringify({
          error: data.error.message,
          raw: data,
        }),
        { status: 500 }
      );
    }

    // ✅ GET AI TEXT
    const aiText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    console.log("RAW AI TEXT:", aiText);

    // ✅ NO RESPONSE
    if (!aiText) {
      return new Response(
        JSON.stringify({
          error: "No AI response received",
          raw: data,
        }),
        { status: 500 }
      );
    }

    // ✅ CLEAN RESPONSE
    const cleaned = aiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("CLEANED AI:", cleaned);

    let parsed;

    // ✅ SAFE JSON PARSE
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseError) {
      console.error("JSON PARSE ERROR:", parseError);

      return new Response(
        JSON.stringify({
          error: "Invalid JSON returned from Gemini",
          raw: cleaned,
        }),
        { status: 500 }
      );
    }

    // ✅ FINAL VALIDATION
    if (
      !parsed.personal_statement ||
      !parsed.experience ||
      !parsed.skills ||
      !parsed.education
    ) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields",
          raw: parsed,
        }),
        { status: 500 }
      );
    }

    // ✅ SUCCESS RESPONSE
    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (error) {
    console.error("SERVER CRASH:", error);

    return new Response(
      JSON.stringify({
        error: String(error),
      }),
      { status: 500 }
    );
  }
}