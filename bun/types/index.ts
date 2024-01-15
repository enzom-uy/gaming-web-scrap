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

export type SiteUrl =
    | 'https://ign.com/pc'
    | 'https://ign.com/playstation'
    | 'https://ign.com/xbox'
    | 'https://ign.com/nintendo'
    | 'https://polygon.com/gaming'
    | 'https://rockpapershotgun.com/news'
    | 'https://eurogamer.net/archive/news'
