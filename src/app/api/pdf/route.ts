import { NextResponse } from "next/server";

import { chromium } from "playwright-core";
import chromiumPack from "@sparticuz/chromium";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { selected, theme } = body;

    let browser;

    // ✅ LOCAL DEVELOPMENT
    if (process.env.NODE_ENV === "development") {
      const { chromium: localChromium } =
        await import("playwright");

      browser = await localChromium.launch({
        headless: true,
      });
    }

    // ✅ VERCEL PRODUCTION
    else {
      browser = await chromium.launch({
        args: chromiumPack.args,
        executablePath:
          await chromiumPack.executablePath(),
        headless: true,
      });
    }

    const page = await browser.newPage();

    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://resume-builder-git-main-wamiqwebs-projects.vercel.app";

    const url = `${baseUrl}/resume-preview?selected=${selected}&theme=${theme}`;

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
        "Content-Disposition":
          "attachment; filename=CV.pdf",
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