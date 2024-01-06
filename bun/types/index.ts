import type { Browser, Page } from 'puppeteer'

export interface Article {
    title: string
    img_url?: string | undefined | null
    authors: string
    url: string
}

export interface ScrapperProps {
    page: Page
    browser: Browser
}
