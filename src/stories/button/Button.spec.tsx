import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

// Extend Jest matchers to use jest-axe matchers
expect.extend(toHaveNoViolations);

const mockedClickHandler = jest.fn()

describe('Button Component', () => {

  describe('Button Rendering', () => {
    it('should render a button component on the screen', () => {
      render(<Button size="medium">Click me</Button>)
      const buttonElement = screen.queryByText(/Click me/i)
      expect(buttonElement).toBeInTheDocument()
      expect(buttonElement).toHaveClass('primary')
    })
  })

  describe('Button Secondary Variant', () => {
    it('should render a button component with secondary styles', () => {
      render(<Button size="medium" variant="secondary">Click me</Button>)
      const buttonElement = screen.getByRole('button', { name: /Click me/i })
      expect(buttonElement).toHaveClass('secondary')
    })
  })

  describe('Button onClick Handler', () => {
    it('should fire an onClick Event handler', async () => {
      render(<Button size="medium" onClick={mockedClickHandler}>Button Click</Button>)
      const buttonElement = screen.getByText(/Button Click/i)
      userEvent.click(buttonElement)
      expect(mockedClickHandler).toHaveBeenCalled()
    })
  })

  // Component accessibility violations check
  describe('Button component accessibility violations check', () => {
    it('Should have no accessibility violations', async () => {
      const { container } = render(<Button size="medium">Click me</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations()
    });
  });

});



