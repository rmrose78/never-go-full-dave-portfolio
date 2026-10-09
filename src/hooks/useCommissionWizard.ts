import { useState, useCallback, useMemo } from 'react'
import type { CommissionQuoteSpec } from '@/types'
import { buildCommissionMailto, buildCommissionText } from '@/utils/mailtoBuilder'
import { copyToClipboard } from '@/utils/clipboard'

export const UNIT_TYPE_OPTIONS = [
  'Squad (5-10 Infantry)',
  'Single Character / Hero',
  'Vehicle / Monster',
  'Full Army (20+ Models)',
  'Custom Diorama / Centerpiece',
]

export const ASSEMBLY_OPTIONS = [
  'New on Sprue (Unassembled)',
  'Assembled & Unprimed',
  'Assembled & Primed',
  'Needs Paint Stripping',
]

export const TIER_OPTIONS = [
  'Tabletop Ready',
  'Display Quality',
  'Centerpiece Masterpiece',
]

export const DEFAULT_UNIT_TYPE = UNIT_TYPE_OPTIONS[0]
export const DEFAULT_CONDITION = ASSEMBLY_OPTIONS[0]
export const DEFAULT_TIER = TIER_OPTIONS[0]

export interface UseCommissionWizardOptions {
  initialArmy?: string
  initialUnitType?: string
  initialCondition?: string
  initialTier?: string
  initialNotes?: string
  copyFeedbackDuration?: number
}

export function useCommissionWizard(options: UseCommissionWizardOptions = {}) {
  const {
    initialArmy = '',
    initialUnitType = DEFAULT_UNIT_TYPE,
    initialCondition = DEFAULT_CONDITION,
    initialTier = DEFAULT_TIER,
    initialNotes = '',
    copyFeedbackDuration = 2500,
  } = options

  const [army, setArmy] = useState<string>(initialArmy)
  const [unitType, setUnitType] = useState<string>(initialUnitType)
  const [assemblyCondition, setAssemblyCondition] = useState<string>(initialCondition)
  const [targetTier, setTargetTier] = useState<string>(initialTier)
  const [customNotes, setCustomNotes] = useState<string>(initialNotes)
  const [hasCopied, setHasCopied] = useState<boolean>(false)

  const spec: CommissionQuoteSpec = useMemo(
    () => ({
      army,
      unitType,
      assemblyCondition,
      targetTier,
      customNotes,
    }),
    [army, unitType, assemblyCondition, targetTier, customNotes]
  )

  const mailtoUrl = useMemo(() => buildCommissionMailto(spec), [spec])
  const commissionText = useMemo(() => buildCommissionText(spec), [spec])

  const copySpecs = useCallback(async (): Promise<boolean> => {
    const success = await copyToClipboard(commissionText)
    if (success) {
      setHasCopied(true)
      setTimeout(() => {
        setHasCopied(false)
      }, copyFeedbackDuration)
    }
    return success
  }, [commissionText, copyFeedbackDuration])

  const resetForm = useCallback(() => {
    setArmy(initialArmy)
    setUnitType(initialUnitType)
    setAssemblyCondition(initialCondition)
    setTargetTier(initialTier)
    setCustomNotes(initialNotes)
    setHasCopied(false)
  }, [initialArmy, initialUnitType, initialCondition, initialTier, initialNotes])

  return {
    spec,
    army,
    unitType,
    assemblyCondition,
    targetTier,
    customNotes,
    hasCopied,
    mailtoUrl,
    commissionText,
    setArmy,
    setUnitType,
    setAssemblyCondition,
    setTargetTier,
    setCustomNotes,
    copySpecs,
    resetForm,
  }
}
