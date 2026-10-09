import { buildCommissionMailto, buildCommissionText, RECIPIENT_EMAIL } from './mailtoBuilder'
import type { CommissionQuoteSpec } from '@/types'

describe('mailtoBuilder', () => {
  const fullSpec: CommissionQuoteSpec = {
    army: 'Space Marines - Dark Angels',
    unitType: 'Squad (5-10 Infantry)',
    assemblyCondition: 'New on Sprue (Unassembled)',
    targetTier: 'Display Quality',
    customNotes: 'Prefer grimdark weathering on armor with emerald highlights.',
  }

  it('builds formatted plain text with all fields populated', () => {
    const text = buildCommissionText(fullSpec)

    expect(text).toContain('COMMISSION INQUIRY DETAILS')
    expect(text).toContain('1. Army/Faction: Space Marines - Dark Angels')
    expect(text).toContain('2. Unit Type/Quantity: Squad (5-10 Infantry)')
    expect(text).toContain('3. Assembly Condition: New on Sprue (Unassembled)')
    expect(text).toContain('4. Target Quality Standard: Display Quality')
    expect(text).toContain('5. Additional Notes & Links:')
    expect(text).toContain('Prefer grimdark weathering on armor with emerald highlights.')
  })

  it('uses clean fallback values when fields are empty or whitespace', () => {
    const emptySpec: CommissionQuoteSpec = {
      army: '   ',
      unitType: '',
      assemblyCondition: '',
      targetTier: '',
      customNotes: '',
    }
    const text = buildCommissionText(emptySpec)

    expect(text).toContain('1. Army/Faction: Not specified')
    expect(text).toContain('2. Unit Type/Quantity: Not specified')
    expect(text).toContain('3. Assembly Condition: Not specified')
    expect(text).toContain('4. Target Quality Standard: Not specified')
    expect(text).toContain('None provided')
  })

  it('builds a mailto URL directed to RECIPIENT_EMAIL with URL-encoded parameters', () => {
    const mailto = buildCommissionMailto(fullSpec)

    expect(mailto.startsWith(`mailto:${RECIPIENT_EMAIL}?`)).toBe(true)
    expect(mailto).toContain('subject=' + encodeURIComponent('Commission Inquiry: Space Marines - Dark Angels (Squad (5-10 Infantry))'))
    expect(mailto).toContain('body=' + encodeURIComponent(buildCommissionText(fullSpec)))
  })
})
