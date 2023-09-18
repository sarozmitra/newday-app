
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Modal } from './Modal';

// Extend Jest matchers to use jest-axe matchers
expect.extend(toHaveNoViolations);

const mockedClickHandler = jest.fn()

describe('Modal Component', () => {

  it('renders modal when isOpen is true', () => {
    render(<Modal isOpen={true} onClose={mockedClickHandler}>Modal Content</Modal>);
    expect(screen.getByText(/Modal Content/i)).toBeInTheDocument();
  });

  it('does not render modal when isOpen is false', () => {
    render(<Modal isOpen={false} onClose={mockedClickHandler}>Modal Content</Modal>);
    expect(screen.queryByText(/Modal Content/i)).not.toBeInTheDocument();
  });

  it('renders close button when showCloseButton is true', () => {
    render(<Modal isOpen={true} onClose={mockedClickHandler} showCloseButton={true}>Modal Content</Modal>);
    expect(screen.getByLabelText(/Close modal/i)).toBeInTheDocument();
  });

  it('does not render close button when showCloseButton is false', () => {
    render(<Modal isOpen={true} onClose={mockedClickHandler} showCloseButton={false}>Modal Content</Modal>);
    expect(screen.queryByLabelText(/Close modal/i)).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<Modal isOpen={true} onClose={mockedClickHandler} showCloseButton={true}>Modal Content</Modal>);
    fireEvent.click(screen.getByLabelText(/Close modal/i));
    expect(mockedClickHandler).toHaveBeenCalledTimes(1);
  });


  it('traps focus inside the modal', () => {
    render(
      <Modal isOpen={true} onClose={mockedClickHandler}>
        <button aria-label="first-button">First Button</button>
        <button aria-label="second-button">Second Button</button>
      </Modal>
    );

    const firstButton = screen.getByLabelText('first-button');
    const secondButton = screen.getByLabelText('second-button');
    const closeButton = screen.getByLabelText('Close modal');

    userEvent.tab();
    expect(firstButton).toHaveFocus();

    userEvent.tab();
    expect(secondButton).toHaveFocus();

    userEvent.tab();
    expect(closeButton).toHaveFocus();
  });

  it('closes the modal on outside click', () => {
    render(<Modal isOpen={true} onClose={mockedClickHandler}>Modal Content</Modal>);
    const modalOverlay = screen.getByTestId('modal-overlay');
    fireEvent.click(modalOverlay);
    expect(mockedClickHandler).toHaveBeenCalledTimes(1);
  });

  it('does not close the modal on inside click', () => {
    render(<Modal isOpen={true} onClose={mockedClickHandler}>Modal Content</Modal>);
    fireEvent.click(screen.getByText(/Modal Content/i));
    expect(mockedClickHandler).not.toHaveBeenCalled();
  });

  it('applies correct aria attributes', () => {
    render(<Modal isOpen={true} onClose={mockedClickHandler} ariaLabelledBy="modalTitle" ariaDescribedBy="modalDesc">Modal Content</Modal>);
    const modalContent = screen.getByText(/Modal Content/i);
    expect(modalContent).toHaveAttribute('aria-labelledby', 'modalTitle');
    expect(modalContent).toHaveAttribute('aria-describedby', 'modalDesc');
  });

  it('renders with the correct size class', () => {
    render(<Modal isOpen={true} onClose={mockedClickHandler} size="large">Modal Content</Modal>);
    const modalContent = screen.getByText(/Modal Content/i);
    expect(modalContent).toHaveClass('large');
  });


  // Component accessibility violations check
  describe('Modal component accessibility violations check', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Modal isOpen={true} onClose={mockedClickHandler}>Modal Content</Modal>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

});