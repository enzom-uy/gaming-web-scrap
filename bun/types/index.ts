import type { Browser, Page } from 'puppeteer'

export interface Article {
    title: string
    imgUrl?: string | undefined | null
    authors?: string
    url: string
}

export interface ScrapperProps {
    page: Page
    browser: Browser
}
