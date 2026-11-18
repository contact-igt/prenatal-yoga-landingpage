// Run with playwright-cli run-code --filename scripts/browser-qa.js
async (page) => {
  const results = [];
  const pageErrors = [];
  const onPageError = (error) => pageErrors.push(error.message);
  page.on("pageerror", onPageError);
  function check(condition, description) {
    if (!condition) throw new Error(description);
    results.push(description);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("http://127.0.0.1:3000");
  await page.evaluate(() => document.fonts.ready);
  check(await page.locator("main > section").count() === 10, "Exactly ten main sections");
  check(await page.locator("h1").count() === 1, "Single semantic H1");
  check(await page.locator("main hr").count() === 0, "No horizontal section separators");
  const expectedOrder = ["top", "your-support", "why-prenatal-yoga", "prenatal-yoga", "getting-started", "conscious-pregnancy", "our-approach", "faqs", "postpartum-care", "enquiry"];
  const actualOrder = await page.locator("main > section").evaluateAll((sections) => sections.map((section) => section.id));
  check(JSON.stringify(expectedOrder) === JSON.stringify(actualOrder), "All ten sections in the prescribed order");
  const visibleCounters = await page.locator("main").evaluate((main) => {
    const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
    const found = [];
    while (walker.nextNode()) {
      const value = walker.currentNode.textContent.trim();
      if (/^(?:0[1-9]|10)(?:\s*\/\s*10)?$/.test(value)) found.push(value);
    }
    return found;
  });
  check(visibleCounters.length === 0, "No decorative section, photo, benefit, activity or FAQ counters");
  check(await page.locator(".hero-photo img").getAttribute("alt") !== "An expectant mother resting her hands and tiny knitted booties on her belly", "Hero uses the replacement group photograph");
  check(await page.locator(".hero-photo").innerText() === "", "Hero image has no text overlays");
  check(await page.locator("#final-enquiry .form-privacy").count() === 0, "Final form has no verbose support paragraph below its submit button");
  check(await page.locator(".faq-photo img").count() === 1, "FAQ includes the supplied consultation notebook photograph");
  check(await page.locator(".offer-features li").count() === 6, "Both offers highlight their key features");
  check(await page.locator(".faq-item").count() === 8, "All eight FAQ questions present");
  check(await page.locator(".floating-action").count() === 5, "Floating contact toolbar has five actions");
  check(JSON.stringify(await page.locator(".floating-action").evaluateAll((items) => items.map((item) => item.getAttribute("href")))) === JSON.stringify(["https://wa.me/917904251378", "tel:+919363031925", "https://www.instagram.com/thebirthwave", "https://www.thebirthwave.in/contact#contact-form", "https://www.youtube.com/@thebirthwaveclinic"]), "Floating contact destinations match the official configuration");
  check(await page.locator(".contact-box").count() === 2, "Final contact details use two clickable contact boxes");
  check(await page.locator(".hero-ctas a.button").count() === 2, "Hero uses two proper CTA buttons");
  check(await page.locator("#postpartum-care a.button, #our-approach a.button, #faqs a.button").count() === 3, "Section conversion CTAs use proper buttons");
  check(!/Programme|programme/.test(await page.locator("body").innerText()), "Landing page uses Program spelling consistently");
  const duplicateIDs = await page.evaluate(() => {
    const ids = [...document.querySelectorAll("[id]")].map((el) => el.id);
    return ids.filter((id, index) => ids.indexOf(id) !== index);
  });
  check(duplicateIDs.length === 0, "Unique IDs across both forms and the page");
  const fields = ["fullName", "mobile", "interest", "mode", "pregnancyStage", "preferredContact", "source", "question", "contactConsent", "promotionalConsent"];
  for (const placement of ["hero", "final"]) {
    const form = page.locator(`#${placement}-enquiry form`);
    for (const field of fields) check(await form.locator(`[name="${field}"]`).count() === 1, `${placement}: ${field} present`);
    check(await form.locator('input[type="checkbox"]:checked').count() === 0, `${placement}: consent unchecked by default`);
    check(await form.locator('[name="source"] option').count() === 9, `${placement}: all eight referral sources plus empty choice`);
    await form.getByRole("button", { name: "Request Details", exact: true }).click();
    check(await form.locator('[aria-invalid="true"]').count() === 4, `${placement}: required fields validate`);
    check(await page.locator("dialog[open]").count() === 0, `${placement}: invalid form cannot open success modal`);
    await form.locator('[name="fullName"]').fill("QA Visitor");
    await form.locator('[name="mobile"]').fill("123");
    await form.locator('[name="interest"]').selectOption("Both");
    await form.locator('[name="contactConsent"]').check();
    await form.getByRole("button", { name: "Request Details", exact: true }).click();
    check(await form.locator('[name="mobile"]').getAttribute("aria-invalid") === "true", `${placement}: invalid international telephone rejected`);
    await form.locator('[name="mobile"]').fill(placement === "hero" ? "+91 98765 43210" : "+44 7700 900123");
    const mutations = [];
    const listener = (request) => { if (["POST", "PUT", "PATCH"].includes(request.method())) mutations.push(request.url()); };
    page.on("request", listener);
    await form.getByRole("button", { name: "Request Details", exact: true }).click();
    const modal = page.getByRole("dialog");
    await modal.waitFor({ state: "visible" });
    check(await modal.getByRole("heading", { name: "Thank you for your interest!", exact: true }).count() === 1, `${placement}: exact thank-you heading`);
    check((await modal.locator("p").innerText()) === "Thank you for taking the first step towards a more connected pregnancy journey with The BirthWave.", `${placement}: exact thank-you description`);
    check(mutations.length === 0, `${placement}: no form network transmission`);
    page.off("request", listener);
    check(await page.evaluate(() => document.activeElement?.textContent) === "Done", `${placement}: modal focus moves to Done`);
    await page.keyboard.press("Tab");
    check(await modal.evaluate((dialog) => dialog.contains(document.activeElement)), `${placement}: native modal keeps focus contained`);
    if (placement === "hero") await page.keyboard.press("Escape");
    else await modal.getByRole("button", { name: "Done", exact: true }).click();
    check(await page.locator("dialog[open]").count() === 0, `${placement}: modal dismisses`);
    check(await form.locator('[name="fullName"]').inputValue() === "", `${placement}: ephemeral data clears`);
  }
  const ctas = [
    ["Enquire About Prenatal Yoga", "hero", "Prenatal Yoga"],
    ["Ask About Yoga Batches", "final", "Prenatal Yoga"],
    ["Register Your Interest", "final", "Conscious Pregnancy updates"],
    ["Get Batch & Enrolment Details", "final", "Prenatal Yoga"],
    ["Ask the Team About Joining", "final", "Prenatal Yoga"],
    ["Keep Me Updated About the Program", "final", "Conscious Pregnancy updates"],
  ];
  for (const [label, placement, value] of ctas) {
    await page.getByRole("link", { name: label, exact: true }).click();
    check(await page.locator(`#${placement}-interest`).inputValue() === value, `CTA preselects interest: ${label}`);
    check(await page.locator(`#${placement}-fullName`).evaluate((input) => document.activeElement === input), `CTA focuses the form: ${label}`);
  }
  for (let index = 0; index < 8; index++) {
    const button = page.locator(`#faq-question-${index}`);
    if (await button.getAttribute("aria-expanded") !== "true") await button.click();
    check(await button.getAttribute("aria-expanded") === "true", `FAQ ${index + 1} expands`);
    check((await page.locator(`#faq-answer-${index} p`).innerText()).length > 60, `FAQ ${index + 1} retains complete answer`);
    await button.focus();
    await page.keyboard.press("Enter");
    check(await button.getAttribute("aria-expanded") === "false", `FAQ ${index + 1} closes by keyboard`);
  }
  const invalidAnchors = await page.evaluate(() => [...document.querySelectorAll('a[href^="#"]')].filter((a) => !document.getElementById(a.getAttribute("href").slice(1))).map((a) => a.getAttribute("href")));
  check(invalidAnchors.length === 0, "Every local navigation anchor resolves");
  check(await page.locator('meta[name="robots"]').getAttribute("content") === "noindex, nofollow", "Review is non-indexable");
  const storage = await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length, cookies: document.cookie }));
  check(storage.local === 0 && storage.session === 0 && storage.cookies === "", "No browser storage or cookies used");
  const visible = await page.locator("body").innerText();
  check(!/preview demonstration|test submission|pending client approval|needs verification|placeholder content|backend integration pending|development version|appointment booked/i.test(visible), "No visible internal messages or false booking claims");
  const viewportResults = [];
  for (const width of [360, 390, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(() => window.scrollTo(0, 0));
    const layout = await page.evaluate(() => {
      const sections = [...document.querySelectorAll("main > section")].map((section) => section.getBoundingClientRect());
      const heroContent = document.querySelector(".hero-content").getBoundingClientRect();
      const heroForm = document.querySelector(".hero-form-wrap").getBoundingClientRect();
      return {
        viewport: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        sequential: sections.every((rect, index) => !index || rect.top >= sections[index - 1].bottom - 1),
        heroSideBySide: heroForm.left > heroContent.right && Math.abs(heroContent.top - heroForm.top) < 2,
        stacked: heroForm.top >= heroContent.bottom,
        heroSequence: (() => {
          const elements = ["h1", ".hero-description", ".hero-photo", ".hero-photo-caption", ".hero-ctas"].map((selector) => document.querySelector(selector).getBoundingClientRect());
          return elements.every((rect, index) => !index || rect.top >= elements[index - 1].bottom - 1);
        })(),
        contactSequence: (() => {
          const elements = [".final-copy > h2", ".final-copy > p:not(.eyebrow)", ".clinic-photo", ".clinic-contact address", ".clinic-contact .contact-actions"].map((selector) => document.querySelector(selector).getBoundingClientRect());
          return elements.every((rect, index) => !index || rect.top >= elements[index - 1].bottom - 1);
        })(),
      };
    });
    check(layout.scrollWidth <= width + 1, `No horizontal overflow at ${width}px`);
    check(layout.sequential, `Independent sections stack vertically at ${width}px`);
    check(width > 900 ? layout.heroSideBySide : layout.stacked, `Correct hero/form composition at ${width}px`);
    check(layout.heroSequence, `Hero content follows heading, description, image, caption, CTAs at ${width}px`);
    check(layout.contactSequence, `Contact content follows description, image, address, actions at ${width}px`);
    viewportResults.push({ width, ...layout });
    if ([390, 768, 1440].includes(width)) {
      for (const section of await page.locator("main > section").all()) {
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(80);
      }
      await page.evaluate(async () => {
        await Promise.all([...document.images].filter((img) => img.complete).map((img) => img.decode().catch(() => {})));
        window.scrollTo(0, 0);
      });
      await page.screenshot({ path: `output/playwright/full-${width}.png`, fullPage: true });
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation", exact: true }).click();
  check(await page.getByRole("button", { name: "Close navigation" }).getAttribute("aria-expanded") === "true", "Mobile navigation opens accessibly");
  await page.locator("#mobile-nav").getByRole("link", { name: "FAQs", exact: true }).click();
  check(await page.locator("#mobile-nav").isHidden(), "Mobile navigation closes after anchor selection");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "output/playwright/desktop-hero.png" });
  check(await page.locator(".hero-enter").first().evaluate((element) => getComputedStyle(element).animationName) === "none", "Reduced motion disables entrance animations");
  await page.addScriptTag({ path: "node_modules/axe-core/axe.min.js" });
  const accessibility = await page.evaluate(async () => {
    const report = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } });
    return report.violations.map((item) => ({ id: item.id, impact: item.impact, description: item.description, elements: item.nodes.map((node) => node.target) }));
  });
  check(accessibility.length === 0, `No automated WCAG A/AA violations: ${JSON.stringify(accessibility)}`);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.reload();
  check(await page.locator(".hero-enter").first().evaluate((element) => getComputedStyle(element).animationName) === "hero-enter", "Normal motion enables the hero entrance sequence");
  check(pageErrors.length === 0, `No browser runtime errors (${pageErrors.length})`);
  page.off("pageerror", onPageError);
  return { passed: results.length, checks: results, viewports: viewportResults };
}
