export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function POST(req: Request) {
  let browser;

  try {
    const body = await req.json();
    const { selected, theme, data } = body;

    const isVercel = !!process.env.VERCEL;

    // =========================
    // LAUNCH BROWSER
    // =========================
    if (!isVercel) {
      const puppeteerLocal = await import("puppeteer");

      browser = await puppeteerLocal.default.launch({
        headless: true,
      });
    } else {
      const executablePath = await chromium.executablePath();

      browser = await puppeteer.launch({
        args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
        executablePath,
        headless: true,
      });
    }

    const page = await browser.newPage();

    // =========================
    // BASE URL (SAFE)
    // =========================
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const url = `${baseUrl}/resume-preview?selected=${selected}&theme=${theme}&data=${encodeURIComponent(
      JSON.stringify(data || {})
    )}`;

    console.log("Opening URL:", url);

    // =========================
    // LOAD PAGE
    // =========================
    await page.goto(url, {
      waitUntil: "networkidle2",
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    // =========================
    // GENERATE PDF
    // =========================
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
    if (browser) await browser.close();

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