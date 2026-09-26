import puppeteer from "puppeteer-core";

const target = process.env.TARGET_URL ?? "https://coral-two-blue.vercel.app/booking";
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});

try {
  const page = await browser.newPage();
  await page.goto(target, { waitUntil: "networkidle0", timeout: 60_000 });
  const before = await page.$eval(".consent-row input", (element) => {
    const input = element;
    const style = getComputedStyle(input);
    return { checked: input.checked, appearance: style.appearance, width: style.width, height: style.height };
  });
  await page.click(".consent-row input");
  const after = await page.$eval(".consent-row input", (element) => ({ checked: element.checked }));

  console.log(JSON.stringify({ target, before, after }, null, 2));
  if (before.appearance === "none") throw new Error("Consent checkbox has no native appearance, so checked state is invisible.");
  if (!after.checked) throw new Error("Consent checkbox did not toggle after click.");
} finally {
  await browser.close();
}
