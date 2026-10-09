import { renderHook, act } from '@testing-library/react'
import { useCommissionWizard } from './useCommissionWizard'
import * as clipboardModule from '@/utils/clipboard'

jest.mock('@/utils/clipboard', () => ({
  copyToClipboard: jest.fn(),
}))

describe('useCommissionWizard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('initializes with default options and generates valid mailtoUrl', () => {
    const { result } = renderHook(() => useCommissionWizard())

    expect(result.current.army).toBe('')
    expect(result.current.unitType).toBe('Squad (5-10 Infantry)')
    expect(result.current.assemblyCondition).toBe('New on Sprue (Unassembled)')
    expect(result.current.targetTier).toBe('Tabletop Ready')
    expect(result.current.customNotes).toBe('')
    expect(result.current.hasCopied).toBe(false)
    expect(result.current.mailtoUrl).toContain('mailto:westphds@gmail.com')
  })

  it('updates form fields and updates mailtoUrl and commissionText', () => {
    const { result } = renderHook(() => useCommissionWizard())

    act(() => {
      result.current.setArmy('Khorne World Eaters')
      result.current.setUnitType('Vehicle / Monster')
      result.current.setAssemblyCondition('Assembled & Primed')
      result.current.setTargetTier('Display Quality')
      result.current.setCustomNotes('Heavy brass weathering and gore splatters.')
    })

    expect(result.current.army).toBe('Khorne World Eaters')
    expect(result.current.unitType).toBe('Vehicle / Monster')
    expect(result.current.assemblyCondition).toBe('Assembled & Primed')
    expect(result.current.targetTier).toBe('Display Quality')
    expect(result.current.customNotes).toBe('Heavy brass weathering and gore splatters.')

    expect(result.current.mailtoUrl).toContain(encodeURIComponent('Khorne World Eaters'))
    expect(result.current.commissionText).toContain('1. Army/Faction: Khorne World Eaters')
  })

  it('handles copySpecs successfully and triggers temporary hasCopied state', async () => {
    const copyMock = jest.spyOn(clipboardModule, 'copyToClipboard').mockResolvedValue(true)
    const { result } = renderHook(() => useCommissionWizard({ copyFeedbackDuration: 1000 }))

    let copyResult: boolean = false
    await act(async () => {
      copyResult = await result.current.copySpecs()
    })

    expect(copyResult).toBe(true)
    expect(copyMock).toHaveBeenCalled()
    expect(result.current.hasCopied).toBe(true)

    // Fast forward timer
    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(result.current.hasCopied).toBe(false)
  })

  it('handles copySpecs failure without setting hasCopied', async () => {
    jest.spyOn(clipboardModule, 'copyToClipboard').mockResolvedValue(false)
    const { result } = renderHook(() => useCommissionWizard())

    let copyResult: boolean = true
    await act(async () => {
      copyResult = await result.current.copySpecs()
    })

    expect(copyResult).toBe(false)
    expect(result.current.hasCopied).toBe(false)
  })

  it('resets form fields back to initial values', () => {
    const { result } = renderHook(() =>
      useCommissionWizard({ initialArmy: 'Ultramarines' })
    )

    act(() => {
      result.current.setArmy('Blood Angels')
      result.current.setCustomNotes('Custom paint scheme')
    })

    expect(result.current.army).toBe('Blood Angels')

    act(() => {
      result.current.resetForm()
    })

    expect(result.current.army).toBe('Ultramarines')
    expect(result.current.customNotes).toBe('')
  })
})
