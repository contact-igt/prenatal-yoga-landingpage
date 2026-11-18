from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('http://127.0.0.1:3000', wait_until='networkidle')
    
    sections = page.locator('main > section').all()
    print('Found sections:', len(sections))
    
    for i in range(len(sections) - 1):
        s1 = sections[i]
        s2 = sections[i+1]
        id1 = s1.get_attribute('id')
        id2 = s2.get_attribute('id')
        
        box1 = s1.bounding_box()
        box2 = s2.bounding_box()
        boundary_y = box2['y']
        
        page.evaluate(f'window.scrollTo(0, {boundary_y - 450})')
        page.wait_for_timeout(200)
        page.screenshot(path=f'output/current_review/boundary_{id1}_to_{id2}.png')
    browser.close()
print('Boundary screenshots taken!')
