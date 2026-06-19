
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { selected, theme } = body;

    console.log("NODE_ENV =", process.env.NODE_ENV);
    console.log("VERCEL =", process.env.VERCEL);

    const isVercel = !!process.env.VERCEL;

    let browser;

    if (!isVercel) {
      console.log("USING LOCAL PUPPETEER");

      const puppeteerLocal = await import("puppeteer");

      browser = await puppeteerLocal.default.launch({
        headless: true,
      });
    } else {
      console.log("USING VERCEL CHROMIUM");

      const executablePath = await chromium.executablePath();

      console.log("Chromium Path:", executablePath);

      browser = await puppeteer.launch({
        args: chromium.args,
        executablePath,
        headless: true,
      });
    }

    const page = await browser.newPage();

    const baseUrl = !isVercel
      ? "http://localhost:3000"
      : "https://resume-builder-sand-omega-38.vercel.app";

    const url = `${baseUrl}/resume-preview?selected=${selected}&theme=${theme}&data=${encodeURIComponent(
      JSON.stringify(body.data)
    )}`;

    console.log("Opening URL:", url);

    await page.goto(url, {
      waitUntil: "networkidle2",
    });

    await new Promise(resolve => setTimeout(resolve, 1500));

    const pdf = await page.pdf({
      format: "A4",
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
    console.error("PDF ERROR:", err);

    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : null,
      },
      { status: 500 }
    );
  }
}
