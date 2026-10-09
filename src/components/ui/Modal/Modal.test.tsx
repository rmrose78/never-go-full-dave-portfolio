import { render, screen, fireEvent } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Modal } from './Modal'

expect.extend(toHaveNoViolations)

describe('Modal UI Component', () => {
  beforeAll(() => {
    // Polyfill HTMLDialogElement methods for JSDOM
    HTMLDialogElement.prototype.showModal = jest.fn(function (this: HTMLDialogElement) {
      this.open = true
    })
    HTMLDialogElement.prototype.close = jest.fn(function (this: HTMLDialogElement) {
      this.open = false
    })
  })

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={jest.fn()} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    )

    expect(container.firstChild).toBeNull()
  })

  it('renders title, kicker, and content when isOpen is true', () => {
    render(
      <Modal
        isOpen={true}
        onClose={jest.fn()}
        title="Recipe Details"
        kicker="Astra Militarum"
      >
        <p>Layered olive glazes and chipped metal.</p>
      </Modal>
    )

    expect(screen.getByText('Recipe Details')).toBeInTheDocument()
    expect(screen.getByText('Astra Militarum')).toBeInTheDocument()
    expect(
      screen.getByText('Layered olive glazes and chipped metal.')
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Close dialog/i })).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onCloseMock = jest.fn()
    render(
      <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
        <p>Content</p>
      </Modal>
    )

    fireEvent.click(screen.getByRole('button', { name: /Close dialog/i }))
    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })

  it('calls onClose on escape key press', () => {
    const onCloseMock = jest.fn()
    render(
      <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
        <p>Content</p>
      </Modal>
    )

    const dialog = screen.getByTestId('accessible-modal')
    fireEvent.keyDown(dialog, { key: 'Escape' })
    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when clicking outside modal content (backdrop)', () => {
    const onCloseMock = jest.fn()
    render(
      <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
        <p>Content</p>
      </Modal>
    )

    const dialog = screen.getByTestId('accessible-modal')
    fireEvent.click(dialog)
    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })

  it('has zero accessibility violations per jest-axe when open', async () => {
    const { container } = render(
      <Modal
        isOpen={true}
        onClose={jest.fn()}
        title="Accessible Modal"
        kicker="Dataslate"
      >
        <p>Accessible modal dialog content body.</p>
      </Modal>
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
