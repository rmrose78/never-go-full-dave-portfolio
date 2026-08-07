export interface SpecialtyItem {
  id: string
  title: string
  description: string
  icon: 'troops' | 'heroes' | 'vehicles' | 'dioramas'
}

export interface PricingTier {
  id: string
  kicker: string
  name: string
  price: string
  priceUnit?: string
  features: string[]
  isCenterpiece?: boolean
}

export const SPECIALTY_ITEMS: SpecialtyItem[] = [
  {
    id: 'troops',
    title: 'Troops & Squads',
    description: 'Cohesive color schemes, crisp basecoats, and clean shading across full battleline squads.',
    icon: 'troops',
  },
  {
    id: 'heroes',
    title: 'Heroes & Characters',
    description: 'Multi-layer edge highlights, smooth skin tones, detailed armor glazes, and detailed faces.',
    icon: 'heroes',
  },
  {
    id: 'vehicles',
    title: 'Vehicles & Armor',
    description: 'Airbrush gradients, battle damage chipping, rust stains, mud splatter, and realistic weathering.',
    icon: 'vehicles',
  },
  {
    id: 'dioramas',
    title: 'Dioramas & Basing',
    description: 'Custom resin terrain, dynamic light effects (OSL), and display-case narrative bases.',
    icon: 'dioramas',
  },
]

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'tier-01',
    kicker: 'Standard 01',
    name: 'Tabletop Ready',
    price: '$40 - $70',
    priceUnit: '/ model avg',
    features: [
      'Three-color base scheme plus shade wash',
      'Clean edge highlights',
      'Standard battlefield basing',
      'Great for large army battleline squads',
    ],
  },
  {
    id: 'tier-02',
    kicker: 'Standard 02',
    name: 'Display Quality',
    price: '$90 - $160',
    priceUnit: '/ model avg',
    features: [
      'Multi-layer blending and acrylic glazes',
      'Freehand unit iconography & battle damage',
      'Upgraded textured basing',
      'Ideal for captains, squad leaders & characters',
    ],
  },
  {
    id: 'tier-03',
    kicker: 'Standard 03',
    name: 'Centerpiece Masterpiece',
    price: 'Custom Quote',
    isCenterpiece: true,
    features: [
      'Multi-model narrative composition',
      'Non-Metallic Metal (NMM) & OSL light FX',
      'Sculpted resin terrain base',
      'Showcase display-case centerpieces',
    ],
  },
]
