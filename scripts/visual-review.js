async (page) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("http://127.0.0.1:3000");
  for (const section of await page.locator("main > section").all()) {
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
    await section.screenshot({ path: `output/playwright/section-${await section.getAttribute("id")}.png` });
  }
  console.log("Saved desktop screenshots of all ten sections.");
}
