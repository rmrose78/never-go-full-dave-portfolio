import { render, screen, fireEvent } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Dispatches } from './Dispatches'
import { DISPATCH_POSTS } from '@/data/dispatches'

expect.extend(toHaveNoViolations)

describe('Dispatches Section Component', () => {
  it('renders section title, kicker, post cards, and archive button', () => {
    render(<Dispatches />)

    expect(screen.getByText('Dispatches')).toBeInTheDocument()
    expect(screen.getByText('Hobby Desk Logs')).toBeInTheDocument()

    expect(screen.getByText('Getting Brass Right (Finally)')).toBeInTheDocument()
    expect(screen.getByText('Airbrush Maintenance Discipline')).toBeInTheDocument()
    expect(screen.getByText('Why the Juggernaut Took Four Months')).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /View Full Dispatches Archive/i })
    ).toBeInTheDocument()
  })

  it('triggers onSelectPost when a post card is clicked', () => {
    const onSelectMock = jest.fn()
    render(<Dispatches onSelectPost={onSelectMock} />)

    fireEvent.click(screen.getByTestId('dispatch-card-post1'))
    expect(onSelectMock).toHaveBeenCalledWith(DISPATCH_POSTS[0])
  })

  it('triggers onOpenArchive when the archive button is clicked', () => {
    const onOpenArchiveMock = jest.fn()
    render(<Dispatches onOpenArchive={onOpenArchiveMock} />)

    fireEvent.click(screen.getByTestId('open-archive-btn'))
    expect(onOpenArchiveMock).toHaveBeenCalledTimes(1)
  })

  it('has zero accessibility violations per jest-axe', async () => {
    const { container } = render(<Dispatches />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
