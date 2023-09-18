import { cleanup, render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe';
import { Typography } from './Typography';

// Extend Jest matchers to use jest-axe matchers
expect.extend(toHaveNoViolations);

afterEach(() => {
  cleanup()
})

describe('Typography Component', () => {
  it('renders text with the correct content', () => {
    render(<Typography>This is a Paragraph</Typography>);
    expect(screen.getByText('This is a Paragraph')).toBeInTheDocument();
  });

  describe('Variants', () => {
    it('should render Header Level 1 <h1> tag', () => {
      render(<Typography variant="h1">Heading Text H1.</Typography>)
      const el = screen.queryByRole('heading', { level: 1 })
      expect(el).toBeInTheDocument()
    })
    it('should render Header Level 2 <h2> tag', () => {
      render(<Typography variant="h2">Heading Text H2.</Typography>)
      const el = screen.queryByRole('heading', { level: 2 })
      expect(el).toBeInTheDocument()
    })
    it('should render Header Level 3 <h3> tag', () => {
      render(<Typography variant="h3">Heading Text H3.</Typography>)
      const el = screen.queryByRole('heading', { level: 3 })
      expect(el).toBeInTheDocument()
    })
    it('should render text with bodySmall Css Class', () => {
      render(<Typography className="bodySmall">Body small text</Typography>)
      const el = screen.queryByText(/Body small text/i)
      expect(el).toHaveClass('bodySmall')
    })
  })

  describe('Render text as element passed as tag prop', () => {
    it('should render the h1 as a Div Tag', () => {
      render(<Typography variant="h1" as="div">Its a text in Div Tag</Typography>)
      const el = screen.queryByText(/Its a text in Div Tag/i)
      expect(el).toHaveClass('h1')
    })
  })

  it('applies custom classes based on props', () => {
    render(<Typography variant="h1" align="center" dataTestIdPrefix="heading">Sample Text</Typography>);
    const element = screen.getByTestId('heading-h1');
    expect(element).toHaveClass('Typography');
    expect(element).toHaveClass('h1');
    expect(element).toHaveClass('center');
  });

  // Component accessibility violations check
  describe('Typography component accessibility violations check', () => {
    it('should not have any accessibility violations for default typography', async () => {
      const { container } = render(<Typography>Sample Text</Typography>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have any accessibility violations for heading', async () => {
      const { container } = render(<Typography variant="h1" ariaLabel='Heading 1'>Heading 1</Typography>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

});