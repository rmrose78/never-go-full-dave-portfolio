export interface DispatchPost {
  id: string
  tag: string
  title: string
  excerpt: string
  content: string
}

export interface ModalDetail {
  kicker: string
  title: string
  body: string
}

export const DISPATCH_POSTS: DispatchPost[] = [
  {
    id: 'post1',
    tag: 'Technique',
    title: 'Getting Brass Right (Finally)',
    excerpt: 'NMM bronze recipes, highlight placement, and surviving a 3-foot table read.',
    content:
      'Non-metallic metal is one of those techniques everyone name-drops and almost nobody enjoys doing. Four highlights, one shadow glaze, and a specular hit that has to land in exactly the wrong place to look right.',
  },
  {
    id: 'post2',
    tag: 'Maintenance',
    title: 'Airbrush Maintenance Discipline',
    excerpt: 'Preventative cleaning routines and needle cap care.',
    content:
      'Field maintenance discipline transfers better to hobby gear than anyone warns you. Strip, clean, inspect, reassemble.',
  },
  {
    id: 'post3',
    tag: 'Centerpiece',
    title: 'Why the Juggernaut Took Four Months',
    excerpt: 'Navigating centerpiece project burnout and long-form gold gradients.',
    content:
      'Centerpiece models operate on their own timeline. This one had four false starts and one afternoon spent staring at NMM gold.',
  },
  {
    id: 'post4',
    tag: 'Basing',
    title: 'Basing Material Rabbit Holes',
    excerpt: 'Static grass versus flock comparison under acrylic washes.',
    content:
      'Static grass versus flock is a bigger argument than it has any right to be. Swapped over once the old bag of static grass finally ran out.',
  },
  {
    id: 'post5',
    tag: 'Gear',
    title: 'The Airbrush Compressor Finally Died',
    excerpt: 'Salvaging fittings and choosing quiet replacements for late-night sessions.',
    content:
      'Outlived three different desks and one move across state lines. No dramatic failure, just a slow drop in pressure.',
  },
]

export const RECIPE_MODAL_DATA: Record<string, ModalDetail> = {
  am1: {
    kicker: 'Astra Militarum',
    title: 'Cadian Command Squad',
    body: 'Krieg Khaki basecoat with Agrax Earthshade washes and bleached bone edge highlights.',
  },
  am2: {
    kicker: 'Astra Militarum',
    title: 'Death Korps Trench Line',
    body: 'Multi-tone green stippling with realistic resin mud texturing.',
  },
  am3: {
    kicker: 'Astra Militarum',
    title: 'Leman Russ Weathering Study',
    body: 'Chipping medium techniques with rust glazes and metallic drybrushing.',
  },
  kh1: {
    kicker: 'Khorne Chaos',
    title: 'Bloodletter Vanguard',
    body: 'Tri-layer red gradients with NMM brass metallic highlights.',
  },
  kh2: {
    kicker: 'Khorne Chaos',
    title: 'Skullreaper Warband',
    body: 'Black-to-red contrast glazing with gore blood effects.',
  },
  kh3: {
    kicker: 'Khorne Chaos',
    title: 'Khorne Lord on Juggernaut',
    body: 'Masterpiece centerpiece build featuring multi-stage NMM gold armor.',
  },
}
