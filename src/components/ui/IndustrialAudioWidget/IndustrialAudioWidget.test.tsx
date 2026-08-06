import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { IndustrialAudioWidget } from './IndustrialAudioWidget'

expect.extend(toHaveNoViolations)

describe('IndustrialAudioWidget', () => {
  it('renders fixed industrial audio widget in OFF state by default', () => {
    render(<IndustrialAudioWidget isPlaying={false} />)

    const widget = screen.getByTestId('industrial-audio-widget')
    expect(widget).toBeInTheDocument()

    const toggleBtn = screen.getByRole('button', {
      name: /toggle industrial techno audio feed/i,
    })
    expect(toggleBtn).toBeInTheDocument()
    expect(toggleBtn).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByText('OFF')).toBeInTheDocument()
  })

  it('renders ON state with aria-pressed true when isPlaying is true', () => {
    render(<IndustrialAudioWidget isPlaying={true} />)

    const toggleBtn = screen.getByRole('button', {
      name: /toggle industrial techno audio feed/i,
    })
    expect(toggleBtn).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('ON')).toBeInTheDocument()
  })

  it('triggers onToggle callback when clicked', async () => {
    const user = userEvent.setup()
    const handleToggle = jest.fn()
    render(<IndustrialAudioWidget isPlaying={false} onToggle={handleToggle} />)

    const toggleBtn = screen.getByRole('button', {
      name: /toggle industrial techno audio feed/i,
    })
    await user.click(toggleBtn)

    expect(handleToggle).toHaveBeenCalledTimes(1)
  })

  it('passes jest-axe accessibility audit on OFF state', async () => {
    const { container } = render(<IndustrialAudioWidget isPlaying={false} />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('passes jest-axe accessibility audit on ON state', async () => {
    const { container } = render(<IndustrialAudioWidget isPlaying={true} />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
