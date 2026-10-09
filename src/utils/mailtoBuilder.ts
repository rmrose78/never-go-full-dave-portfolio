import type { CommissionQuoteSpec } from '@/types'

export const RECIPIENT_EMAIL = 'westphds@gmail.com'

/**
 * Generates human-readable plain text representing the commission quote request,
 * suitable for the email body or copying to clipboard.
 */
export function buildCommissionText(spec: CommissionQuoteSpec): string {
  const army = spec.army?.trim() || 'Not specified'
  const unit = spec.unitType?.trim() || 'Not specified'
  const condition = spec.assemblyCondition?.trim() || 'Not specified'
  const tier = spec.targetTier?.trim() || 'Not specified'
  const notes = spec.customNotes?.trim() || 'None provided'

  return [
    'COMMISSION INQUIRY DETAILS',
    '--------------------------',
    `1. Army/Faction: ${army}`,
    `2. Unit Type/Quantity: ${unit}`,
    `3. Assembly Condition: ${condition}`,
    `4. Target Quality Standard: ${tier}`,
    '5. Additional Notes & Links:',
    notes,
  ].join('\n')
}

/**
 * Builds a valid mailto: URL pre-filling the inquiry details.
 */
export function buildCommissionMailto(spec: CommissionQuoteSpec): string {
  const army = spec.army?.trim() || 'Not specified'
  const unit = spec.unitType?.trim() || 'Not specified'
  const subject = `Commission Inquiry: ${army} (${unit})`
  const body = buildCommissionText(spec)

  return `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
