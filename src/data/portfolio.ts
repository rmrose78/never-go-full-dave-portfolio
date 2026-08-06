export type FactionId = 'all' | 'am' | 'kh'

export interface PortfolioItem {
  id: string
  title: string
  factionId: 'am' | 'kh'
  factionName: string
  badge: string
  aspectRatio: 'landscape' | 'portrait'
  cardVariant: 'am1' | 'am2' | 'am3' | 'kh1' | 'kh2' | 'kh3'
  recipeModalId: string
}

export interface FactionFilterTab {
  id: FactionId
  label: string
  count: number
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'am1',
    title: 'Cadian Command Squad',
    factionId: 'am',
    factionName: 'Astra Militarum',
    badge: 'Cadian Regiment',
    aspectRatio: 'landscape',
    cardVariant: 'am1',
    recipeModalId: 'am1',
  },
  {
    id: 'am2',
    title: 'Death Korps Trench Line',
    factionId: 'am',
    factionName: 'Astra Militarum',
    badge: 'Trench Line',
    aspectRatio: 'portrait',
    cardVariant: 'am2',
    recipeModalId: 'am2',
  },
  {
    id: 'am3',
    title: 'Leman Russ Weathering Study',
    factionId: 'am',
    factionName: 'Astra Militarum',
    badge: 'Armored Vehicle',
    aspectRatio: 'landscape',
    cardVariant: 'am3',
    recipeModalId: 'am3',
  },
  {
    id: 'kh1',
    title: 'Bloodletter Vanguard',
    factionId: 'kh',
    factionName: 'Khorne',
    badge: 'Daemon Vanguard',
    aspectRatio: 'portrait',
    cardVariant: 'kh1',
    recipeModalId: 'kh1',
  },
  {
    id: 'kh2',
    title: 'Skullreaper Warband',
    factionId: 'kh',
    factionName: 'Khorne',
    badge: 'Bloodbound',
    aspectRatio: 'landscape',
    cardVariant: 'kh2',
    recipeModalId: 'kh2',
  },
  {
    id: 'kh3',
    title: 'Khorne Lord on Juggernaut',
    factionId: 'kh',
    factionName: 'Khorne',
    badge: 'Centerpiece',
    aspectRatio: 'portrait',
    cardVariant: 'kh3',
    recipeModalId: 'kh3',
  },
]
