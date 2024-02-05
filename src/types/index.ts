import type { Source } from '@prisma/client'
import type { Browser, Page } from 'puppeteer'

export interface Headline {
    title: string
    url: string
    imgUrl: string
    authors?: string
    datetime?: string
    source: Source
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
