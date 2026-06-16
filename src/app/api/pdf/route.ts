import { NextResponse } from "next/server";

import playwright from "playwright-core";
import chromiumPack from "@sparticuz/chromium";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { selected, theme } = body;

    console.log("NODE_ENV =", process.env.NODE_ENV);
    console.log("VERCEL =", process.env.VERCEL);

    let browser;

    // LOCAL MACHINE
    if (!process.env.VERCEL) {
      console.log("USING LOCAL PLAYWRIGHT");

      const { chromium } = await import("playwright");

      browser = await chromium.launch({
        headless: true,
      });
    }

    // VERCEL
    else {
      console.log("USING VERCEL CHROMIUM");

      const exePath = await chromiumPack.executablePath();

      console.log("exePath =", exePath);

      browser = await playwright.chromium.launch({
        args: chromiumPack.args,
        executablePath: exePath,
        headless: true,
      });
    }

    const page = await browser.newPage();

    const baseUrl = !process.env.VERCEL
      ? "http://localhost:3000"
      : "resume-builder-git-main-wamiqwebs-projects.vercel.app";

    const url = `${baseUrl}/resume-preview?selected=${selected}&theme=${theme}&data=${encodeURIComponent(
      JSON.stringify(body.data)
    )}`;

    console.log("Opening URL:", url);

    await page.goto(url, {
      waitUntil: "networkidle",
    });

    await page.waitForTimeout(2000);

    const pdf = await page.pdf({
      width: "794px",
      height: "1122px",
      printBackground: true,
    });

    await browser.close();

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=CV.pdf",
      },
    });
  } catch (err) {
  console.error("PDF ERROR FULL:", err);

  return NextResponse.json(
    {
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : null,
    },
    { status: 500 }
  );
}
}