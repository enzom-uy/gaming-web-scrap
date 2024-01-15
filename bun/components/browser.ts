import puppeteer from 'puppeteer'
import type { Browser, Page } from 'puppeteer'

export const initBrowser = async (): Promise<{
    browser: Browser
    page: Page
}> => {
    console.log('Launching Chromium headless instance...')
    const browser = await puppeteer
        .launch({
            executablePath: '/usr/bin/chromium-browser',
            headless: 'new',
        })
        .then((res) => {
            console.log('Chromium instance launched succesfuly.')
            return res
        })

    console.log('Creating new tab.')
    const page = await browser.newPage().then((res) => {
        console.log('Tab created')
        return res
    })

    return { browser, page }
}
