import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { mkdir } from 'node:fs/promises';
import puppeteer from 'puppeteer-core';

if (process.env.ALLOW_APPOINTMENT_TESTS !== '1' || !process.env.TARGET_URL) throw new Error('Use an isolated test server with ALLOW_APPOINTMENT_TESTS=1 and TARGET_URL.');
const base = process.env.TARGET_URL.replace(/\/$/, '');
const credentials = { email: 'calendar-admin@example.test', password: 'Calendar Test Password #2026' };
async function request(path, method = 'GET', payload, cookie) {
  const response = await fetch(base + path, { method, headers: { Origin: base, ...(payload ? { 'Content-Type': 'application/json' } : {}), ...(cookie ? { Cookie: cookie } : {}) }, body: payload ? JSON.stringify(payload) : undefined });
  return { status: response.status, data: await response.json(), cookie: response.headers.get('set-cookie') };
}
const auth = await request('/api/admin/auth');
if (auth.data.setupRequired) assert.equal((await request('/api/admin/setup', 'POST', { ...credentials, setupToken: process.env.E2E_SETUP_TOKEN })).status, 201);
const login = await request('/api/admin/auth', 'POST', credentials);
assert.equal(login.status, 200);
const cookie = login.cookie.split(';')[0];
const date = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);
assert.equal((await request('/api/admin/slots', 'POST', { date, times: ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30'] }, cookie)).status, 201);
const slots = (await request('/api/booking-slots')).data.slots;
const existingBookings = (await request('/api/admin/bookings', 'GET', undefined, cookie)).data.bookings;
const body = { name: 'Khách thử calendar', contact: '0900000000', email: '', service: 'Tarot 1 câu hỏi', note: '', consent: true };
for (const time of ['09:30', '11:00']) {
 if (existingBookings.some(b => b.date === date && b.time === time && ['pending', 'confirmed'].includes(b.status))) continue;
 const result = await request('/api/bookings', 'POST', { ...body, requestKey: randomUUID(), mode: 'slot', slotId: slots.find(s => s.date === date && s.time === time).id });
 assert.equal(result.status, 201);
}
assert.equal((await request('/api/bookings', 'POST', { ...body, mode: 'proposal', date, time: '12:30', requestKey: randomUUID() })).status, 201);
const data = (await request('/api/admin/bookings', 'GET', undefined, cookie)).data;
const chosen = data.bookings.find(b => b.date === date && b.time === '09:30');
assert.equal((await request('/api/admin/bookings/' + chosen.id, 'PATCH', { status: 'confirmed', version: chosen.version }, cookie)).status, 200);
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--no-sandbox', '--disable-gpu'] });
try {
 const page = await browser.newPage();
 const errors = [];
 page.on('pageerror', e => errors.push(e.message));
 await page.setCookie({ name: cookie.split('=')[0], value: cookie.slice(cookie.indexOf('=')+1), url: base, httpOnly: true, sameSite: 'Strict' });
 await page.setViewport({ width: 1440, height: 1100 });
 await page.goto(base + '/admin', { waitUntil: 'networkidle0' });
 await page.waitForSelector('.admin-calendar-grid.week');
 await page.$eval('input[name="scheduleDate"]', (el, value) => { Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,value); el.dispatchEvent(new Event('input',{bubbles:true})); el.dispatchEvent(new Event('change',{bubbles:true})); }, date);
 await page.waitForSelector(`[data-schedule-booking="${chosen.id}"]`);
 const geometry = await page.$eval(`[data-schedule-booking="${chosen.id}"]`, el => ({ height: el.getBoundingClientRect().height, row: el.style.gridRow, text: el.textContent }));
 assert.equal(geometry.height, 84);
 assert.equal(geometry.row, '5 / span 2');
 assert(geometry.text.includes('09:30–10:30'));
 assert.equal(await page.$$eval('.admin-calendar-day', els => els.length), 7);
 assert.equal(await page.$eval(`.admin-calendar-cell[aria-label="Mở khung giờ 10:00 ngày ${date}, 60 phút"]`, el => el.disabled), true);
 await mkdir('.playwright-mcp', { recursive: true });
 await page.screenshot({ path: '.playwright-mcp/calendar-week-desktop.png', fullPage: true });
 await page.click(`[data-schedule-booking="${chosen.id}"]`);
 await page.waitForSelector('dialog[open]');
 await page.click('dialog button[aria-label="Đóng chi tiết lịch hẹn"]');
 await page.click('button[aria-label="Tuần sau"]');
 await page.waitForFunction(id => !document.querySelector(`[data-schedule-booking="${id}"]`), {}, chosen.id);
 await page.click('button[aria-label="Tuần trước"]');
 await page.waitForSelector(`[data-schedule-booking="${chosen.id}"]`);
 await page.select('select[aria-label="Chế độ xem lịch"]', 'day');
 assert.equal(await page.$$eval('.admin-calendar-day', els => els.length), 1);
 await page.click(`button[aria-label="Mở khung giờ 15:00 ngày ${date}, 60 phút"]`);
 await page.waitForSelector('.admin-slot-form');
 assert.equal(await page.$eval('input[name="availabilityDate"]', el => el.value), date);
 assert.equal(await page.$eval('.admin-hour-grid input[value="15:00"]', el => el.checked), true);
 await page.click('[data-admin-tab="schedule"]');
 await page.setViewport({ width: 390, height: 844 });
 await page.waitForSelector('.admin-calendar-grid.day');
 assert.equal(await page.$eval('select[aria-label="Chế độ xem lịch"]', el => el.value), 'day');
 assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
 await page.screenshot({ path: '.playwright-mcp/calendar-day-mobile.png', fullPage: true });
 await page.setViewport({ width: 360, height: 800 });
 assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
 assert.deepEqual(errors, []);
 console.log('PASS: week/day calendar, 09:30–10:30 geometry, blocked overlap, event editor, week navigation, selected opening hour, mobile default, responsive width and no browser errors.');
} finally { await browser.close(); }
