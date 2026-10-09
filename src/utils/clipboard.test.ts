import { copyToClipboard } from './clipboard'

describe('copyToClipboard', () => {
  const originalClipboard = navigator.clipboard

  afterEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      writable: true,
      configurable: true,
    })
    jest.restoreAllMocks()
  })

  it('copies using navigator.clipboard when available', async () => {
    const writeTextMock = jest.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })

    const result = await copyToClipboard('Test specs')

    expect(writeTextMock).toHaveBeenCalledWith('Test specs')
    expect(result).toBe(true)
  })

  it('falls back to document.execCommand when navigator.clipboard throws', async () => {
    const writeTextMock = jest.fn().mockRejectedValue(new Error('Permission denied'))
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })

    const execCommandMock = jest.fn().mockReturnValue(true)
    document.execCommand = execCommandMock

    const result = await copyToClipboard('Fallback specs')

    expect(writeTextMock).toHaveBeenCalledWith('Fallback specs')
    expect(execCommandMock).toHaveBeenCalledWith('copy')
    expect(result).toBe(true)
  })

  it('falls back to document.execCommand when navigator.clipboard is undefined', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
      configurable: true,
    })

    const execCommandMock = jest.fn().mockReturnValue(true)
    document.execCommand = execCommandMock

    const result = await copyToClipboard('Direct fallback specs')

    expect(execCommandMock).toHaveBeenCalledWith('copy')
    expect(result).toBe(true)
  })

  it('returns false if both clipboard and execCommand fail', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
      configurable: true,
    })

    const execCommandMock = jest.fn().mockImplementation(() => {
      throw new Error('Command failed')
    })
    document.execCommand = execCommandMock

    const result = await copyToClipboard('Fail specs')

    expect(result).toBe(false)
  })
})
