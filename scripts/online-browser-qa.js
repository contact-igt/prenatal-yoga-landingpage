// Run with playwright-cli run-code --filename scripts/online-browser-qa.js.
/* eslint-disable @typescript-eslint/no-unused-expressions -- The CLI evaluates this function expression. */
async page => {
  const checks=[],errors=[],mutations=[];
  const check=(ok,label)=>{if(!ok)throw new Error(label);checks.push(label);};
  const onError=e=>errors.push(e.message);
  const onRequest=r=>{if(!['GET','HEAD'].includes(r.method()))mutations.push(r.url());};
  page.on('pageerror',onError);page.on('request',onRequest);
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto('http://127.0.0.1:3000');
  await page.evaluate(()=>document.fonts.ready);
  await page.locator('#hero-enquiry button[type=submit]').waitFor({state:'visible'});
  await page.waitForFunction(()=>[...document.querySelectorAll('.submit-button')].length===2&&[...document.querySelectorAll('.submit-button')].every(button=>!button.disabled));
  const order=['top','prenatal-yoga','benefits','class-experience','online-classes','who-can-join','our-approach','yoga-specialist','getting-started','class-fees','faqs','enquiry','contact'];
  check(JSON.stringify(await page.locator('main section').evaluateAll(es=>es.map(e=>e.id)))===JSON.stringify(order),'All 13 PDF sections follow the required order');
  check(await page.locator('h1').count()===1,'One semantic H1');
  check(JSON.stringify(await page.locator('.desktop-nav a').allTextContents())===JSON.stringify(['Prenatal Yoga','Benefits','How It Works','Our Approach','FAQs','Contact']),'Six exact header navigation labels');
  check(await page.locator('.header-actions').getByRole('link',{name:'Enquire About Classes',exact:true}).count()===1,'Exact header CTA');
  check(!/Conscious Pregnancy|in-clinic|in development|Explore Postpartum Care/i.test(await page.locator('body').innerText()),'Outdated programme, postpartum bridge and mixed-format promotion removed');
  check(decodeURIComponent(await page.locator('#yoga-specialist img').getAttribute('src')).includes('EXP01361 copy.webp'),'Specialist uses the authentic Dr. Amudha Varshini photograph');
  check(await page.locator('.hero-highlights li').count()===4,'Four hero highlights');
  check(await page.locator('.benefits-composition .benefit').count()===4,'Four revised benefits');
  check(await page.locator('#online-classes .online-point').count()===4,'Four online-class pathway points');
  check(await page.locator('.eligibility-points li').count()===5,'Five eligibility points');
  check(await page.locator('.approach-points > div').count()===4,'Four approach points');
  check(await page.locator('.journey-steps > li').count()===4,'Four enrolment steps');
  check(await page.locator('.faq-item').count()===10,'Ten revised FAQs');
  check(await page.locator('#class-fees .price-display').innerText()==='₹4,500\nper month','Monthly fee remains ₹4,500');
  const badAnchors=await page.locator('a[href^="#"]').evaluateAll(as=>as.map(a=>a.getAttribute('href')).filter(h=>!document.getElementById(h.slice(1))));
  check(badAnchors.length===0,'All internal anchors resolve');
  const ids=await page.locator('[id]').evaluateAll(es=>es.map(e=>e.id));
  check(new Set(ids).size===ids.length,'Unique IDs for repeated forms and disclosures');

  for(let i=0;i<10;i++) {
    const button=page.locator('.faq-item h3 button').nth(i);
    if(await button.getAttribute('aria-expanded')!=='true')await button.click();
    check(await page.locator(`#faq-answer-${i}`).isVisible(),`FAQ ${i+1} expands`);
    check(await page.locator('.faq-item.is-open').count()===1,`FAQ ${i+1} retains single-open behaviour`);
    await button.click();
    check(await button.getAttribute('aria-expanded')==='false',`FAQ ${i+1} closes`);
  }
  const activity=page.locator('.activity').first(),activityButton=activity.locator('button');
  await page.mouse.move(0,0);await activity.hover();
  check(await activityButton.getAttribute('aria-expanded')==='true','Class description opens on hover');
  await page.mouse.move(0,0);await page.locator('#benefits .journey-cta a').focus();await page.keyboard.press('Tab');
  check(await activityButton.getAttribute('aria-expanded')==='true','Class description opens on keyboard focus');
  await page.keyboard.press('Enter');
  check(await activityButton.getAttribute('aria-expanded')==='false','Class description toggles by keyboard');

  for(const placement of ['hero','final']) {
    const form=page.locator(`#${placement}-enquiry form`),submit=form.getByRole('button',{name:'Get Online Yoga Class Details',exact:true});
    check(JSON.stringify(await form.locator('input,textarea,select').evaluateAll(es=>es.map(e=>e.name)))===JSON.stringify(['fullName','mobile','email','pregnancyWeeks','question','contactConsent']),`${placement}: exact revised field arrangement`);
    check(await form.locator('select').count()===0,`${placement}: no old interest, mode or trimester selects`);
    check(!(await form.locator('[name=contactConsent]').isChecked()),`${placement}: consent starts unchecked`);
    await submit.click();
    check(await form.locator('[aria-invalid=true]').count()===3,`${placement}: required name, phone and consent validate`);
    await form.locator('[name=fullName]').fill('QA Visitor');
    await form.locator('[name=mobile]').fill('+91 98765 43210');
    await form.locator('[name=contactConsent]').check();
    await form.locator('[name=email]').fill('invalid-email');
    await submit.click();
    check(await form.locator('[name=email]').getAttribute('aria-invalid')==='true',`${placement}: optional email validates when supplied`);
    await form.locator('[name=email]').fill('');
    await form.locator('[name=pregnancyWeeks]').fill('-2');
    await submit.click();
    check(await form.locator('[name=pregnancyWeeks]').getAttribute('aria-invalid')==='true',`${placement}: invalid weeks rejected`);
    await form.locator('[name=pregnancyWeeks]').fill('24');
    await submit.click();
    check(await form.getByRole('alert').filter({hasText:'Enquiries cannot be sent'}).isVisible(),`${placement}: missing backend gives an honest recoverable error`);
    check(await page.locator('dialog[open]').count()===0,`${placement}: no false receipt confirmation`);
    check(await form.locator('[name=fullName]').inputValue()==='QA Visitor',`${placement}: failed submission preserves input for retry`);
    check(!(await submit.isDisabled()),`${placement}: submission lock releases after failure`);
    await form.locator('[name=pregnancyWeeks]').fill('');await submit.click();
    check(await form.locator('[name=pregnancyWeeks]').getAttribute('aria-invalid')==='false',`${placement}: pregnancy weeks remain optional`);
    const dialog=page.locator('dialog').nth(placement==='hero'?0:1);
    check(await dialog.locator('h2').textContent()==='Thank you for reaching out!',`${placement}: exact success heading is wired`);
    check((await dialog.locator('div[id] p').allTextContents()).join(' ')==="We've received your enquiry about The BirthWave's online prenatal yoga classes. Our team will contact you to help with the next steps.",`${placement}: complete success copy is wired`);
    // Presentation-only check. No live lead delivery is simulated or claimed.
    await dialog.evaluate(e=>e.showModal());await page.keyboard.press('Tab');
    check(await dialog.getByRole('button',{name:'Done'}).evaluate(e=>e===document.activeElement),`${placement}: dialog traps keyboard focus`);
    await dialog.getByRole('button',{name:'Done'}).click();
  }
  check(mutations.length===0,'No unconfigured lead transmission or analytics requests');
  check(await page.evaluate(()=>localStorage.length===0&&sessionStorage.length===0),'No personal data persisted in browser storage');
  await page.goto('http://127.0.0.1:3000');
  for(const link of await page.locator('a[href="#enquiry"],a[href="#hero-enquiry"]').all()) {
    const target=(await link.getAttribute('href'))==='#hero-enquiry'?'hero':'final';
    await link.click();
    check(await page.locator(`#${target}-fullName`).evaluate(e=>e===document.activeElement),`Enquiry CTA focuses the correct form: ${await link.innerText()}`);
  }
  await page.locator('.hero-ctas a[href="#online-classes"]').click();
  check(new URL(page.url()).hash==='#online-classes','Primary hero CTA opens online class information');
  await page.goto('http://127.0.0.1:3000');
  const layouts=[];
  for(const width of [360,390,600,601,768,900,901,1024,1150,1280,1440,1920]) {
    await page.setViewportSize({width,height:1000});await page.evaluate(()=>scrollTo(0,0));
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    const layout=await page.evaluate(()=>{
      const r=s=>document.querySelector(s).getBoundingClientRect(),a=r('#hero-enquiry'),b=r('#final-enquiry'),photo=r('.hero-background');
      const sections=[...document.querySelectorAll('main>section')].map(e=>e.getBoundingClientRect());
      return {overflow:document.documentElement.scrollWidth>innerWidth,formsMatch:Math.abs(a.width-b.width)<1&&Math.abs(a.height-b.height)<1,photoBottomDelta:photo.bottom-a.bottom,sectionGaps:sections.slice(1).map((r,i)=>r.top-sections[i].bottom),wave:getComputedStyle(document.querySelector('main'),'::before').maskImage,finalMask:getComputedStyle(document.querySelector('.final-background')).maskImage,overlay:getComputedStyle(document.querySelector('.final-background'),'::after').backgroundImage};
    });
    check(!layout.overflow,`${width}px: no horizontal overflow`);
    check(layout.formsMatch,`${width}px: both forms retain identical dimensions`);
    check(layout.sectionGaps.every(n=>Math.abs(n)<1),`${width}px: no gaps at section boundaries`);
    if(width>900)check(Math.abs(layout.photoBottomDelta)<1,`${width}px: hero photo ends at actual form bottom`);
    check(layout.wave.includes('soft-peach-waves.png')&&layout.finalMask==='none'&&layout.overlay==='none',`${width}px: waves and clean photographic section boundaries preserved`);
    layouts.push({width,...layout});
  }
  await page.setViewportSize({width:390,height:844});
  await page.getByRole('button',{name:'Open navigation',exact:true}).click();
  check(await page.locator('#mobile-nav').isVisible(),'Mobile navigation opens');
  await page.locator('#mobile-nav a').first().click();
  check(!(await page.locator('#mobile-nav').isVisible()),'Mobile navigation closes after navigation');
  const browser=page.context().browser();
  const touch=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,reducedMotion:'reduce'});
  const mobile=await touch.newPage();await mobile.goto('http://127.0.0.1:3000');
  const tapButton=mobile.locator('.activity button').first();await tapButton.tap();
  check(await tapButton.getAttribute('aria-expanded')==='true','Class description opens on touch');
  await tapButton.tap();check(await tapButton.getAttribute('aria-expanded')==='false','Class description closes on touch');await touch.close();
  await page.setViewportSize({width:1440,height:1000});await page.goto('http://127.0.0.1:3000');
  for(const image of await page.locator('img').all()) {await image.scrollIntoViewIfNeeded();await image.evaluate(i=>i.decode());}
  check(await page.locator('img').evaluateAll(es=>es.every(i=>i.complete&&i.naturalWidth>0)),'All rendered photographs load');
  check(errors.length===0,'No browser runtime errors');
  await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:'output/content-update/final-desktop.png'});
  page.off('pageerror',onError);page.off('request',onRequest);
  return {passed:checks.length,checks,layouts,backend:'Not configured; no lead sent'};
}
