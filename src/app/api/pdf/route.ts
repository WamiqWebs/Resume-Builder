export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function POST(req: Request) {
  let browser;

  try {
    console.log("STEP 1 - Request received");

    const body = await req.json();
    console.log("STEP 2 - Body parsed");

    const { selected, theme, data } = body;

    const isVercel = !!process.env.VERCEL;
    console.log("STEP 3 - isVercel:", isVercel);

    // =========================
    // LAUNCH BROWSER
    // =========================
    if (!isVercel) {
      console.log("STEP 4 - Using Local Puppeteer");

      const puppeteerLocal = await import("puppeteer");

      browser = await puppeteerLocal.default.launch({
        headless: true,
      });

      console.log("STEP 5 - Local browser launched");
    } else {
      console.log("STEP 4 - Using Vercel Chromium");

      const executablePath = await chromium.executablePath();
      console.log("STEP 5 - Executable Path:", executablePath);

      browser = await puppeteer.launch({
        args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
        executablePath,
        headless: true,
      });

      console.log("STEP 6 - Vercel browser launched");
    }

    const page = await browser.newPage();
    console.log("STEP 7 - New page created");

    // =========================
    // BASE URL
    // =========================
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const url = `${baseUrl}/resume-preview?selected=${selected}&theme=${theme}&data=${encodeURIComponent(
      JSON.stringify(data || {})
    )}`;

    console.log("STEP 8 - Opening URL:", url);

    // =========================
    // LOAD PAGE
    // =========================
    await page.goto(url, {
      waitUntil: "networkidle2",
    });

    console.log("STEP 9 - Page loaded");

    await new Promise((resolve) => setTimeout(resolve, 1500));

    // =========================
    // GENERATE PDF
    // =========================
    console.log("STEP 10 - Generating PDF");

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    console.log("STEP 11 - PDF generated");

    await browser.close();
    console.log("STEP 12 - Browser closed");

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=CV.pdf",
      },
    });
  } catch (err) {
    if (browser) {
      await browser.close();
    }

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