export async function POST(request: Request) {
  try {
    const body = await request.json();

    const prompt = `
You are a professional resume writer.

Your job is to IMPROVE the given user data and rewrite it in a highly professional way using keys, dont add any new information on your own!.:
personal_statement, experience, skills, education.

Rules:
- Return ONLY valid JSON
- personal_statement should be a string
- experience, skills, education must be comma separated strings

Data:
Name: ${body.name}
Personal_Statement: ${body.personal_statement}
Experience: ${body.experience}
Education: ${body.education}
Skills: ${body.skill}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    console.log("GEMINI RESPONSE:", data);

    // 🔴 API ERROR HANDLE
    if (data.error) {
      return new Response(
        JSON.stringify({
          error: data.error.message,
          raw: data,
        }),
        { status: 500 }
      );
    }

    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiText) {
      return new Response(
        JSON.stringify({ error: "No AI response", raw: data }),
        { status: 500 }
      );
      
    }

    // 🔥 CLEAN TEXT
    const cleaned = aiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(cleaned);
    } catch {
      return new Response(
        JSON.stringify({
          error: "Invalid JSON from AI",
          raw: cleaned,
        }),
        { status: 500 }
      );
    }

    // 🔴 FINAL VALIDATION
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

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Server crashed" }),
      { status: 500 }
    );
  }
}