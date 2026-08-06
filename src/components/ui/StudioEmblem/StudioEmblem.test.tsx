import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { StudioEmblem } from './StudioEmblem'

expect.extend(toHaveNoViolations)

describe('StudioEmblem', () => {
  it('renders correctly with default props and passes accessibility audit', async () => {
    const { container } = render(<StudioEmblem />)

    const emblem = screen.getByTestId('studio-emblem')
    expect(emblem).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /never go full dave studio emblem/i })).toBeInTheDocument()

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders hero variant and custom size correctly', async () => {
    const { container } = render(<StudioEmblem variant="hero" size={100} ariaLabel="Hero emblem" />)

    const emblem = screen.getByTestId('studio-emblem')
    expect(emblem).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /hero emblem/i })).toBeInTheDocument()
    expect(emblem).toHaveStyle({ width: '100px', height: '100px' })

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
