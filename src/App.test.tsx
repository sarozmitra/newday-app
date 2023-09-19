import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('opens the modal when "Open Modal" button is clicked', async () => {
    render(<App />);
    const openModalButton = screen.getByRole('button', { name: /Open Modal/i });
    fireEvent.click(openModalButton);
    await waitFor(() => {
      expect(screen.getByText(/Helping people move forward with credit/i)).toBeInTheDocument();
    });
  });

  it('closes the modal when "Close" button is clicked', async () => {
    render(<App />);
    const openModalButton = screen.getByRole('button', { name: /Open Modal/i });
    fireEvent.click(openModalButton);
    const closeButton = screen.getByRole('button', { name: /Close modal/i });
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(screen.queryByText(/Helping people move forward with credit/i)).not.toBeInTheDocument();
    });
  });
});