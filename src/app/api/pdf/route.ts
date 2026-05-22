import { NextResponse } from "next/server";
import { chromium } from "playwright-core";
import chromiumPack from "@sparticuz/chromium";


export async function POST(req: Request) {
  try {
    // ✅ SAFE JSON PARSE (prevents crash)
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const { selected, theme } = body || {};

    if (!selected) {
      return NextResponse.json({ error: "Missing template" }, { status: 400 });
    }

    const browser = await chromium.launch({
  args: chromiumPack.args,
  executablePath: await chromiumPack.executablePath(),
  headless: true,
});
    const page = await browser.newPage();

    // ✅ OPEN PREVIEW PAGE
  const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://resume-builder-git-main-wamiqwebs-projects.vercel.app";

const url = `${baseUrl}/resume-preview?selected=${selected}&theme=${theme}&data=${encodeURIComponent(
  JSON.stringify(body?.data)
)}`;
    await page.goto(url, { waitUntil: "networkidle" });

// ✅ WAIT FOR UI TO RENDER
await page.waitForTimeout(4000);

// ✅ DEBUG SCREENSHOT
await page.screenshot({
  path: "/tmp/debug.png",
});

// ✅ GENERATE PDF
const pdf = await page.pdf({
  width: "794px",
  height: "1122px",
  printBackground: true,
  margin: { top: "0", bottom: "0", left: "0", right: "0" },
});

    await browser.close();

    // ✅ BUFFER → UINT8ARRAY FIX
    const uint8Array = new Uint8Array(pdf);

    return new NextResponse(uint8Array, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=CV.pdf",
      },
    });

 } catch (err) {
  console.error("PDF ERROR:", err);

  return NextResponse.json(
    {
      error: String(err),
    },
    { status: 500 }
  );
}
}