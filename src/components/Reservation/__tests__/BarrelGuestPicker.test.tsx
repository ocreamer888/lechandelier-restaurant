import { render, screen } from '@testing-library/react';
import { BarrelGuestPicker } from '../BarrelGuestPicker';

describe('BarrelGuestPicker', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with Guests label', () => {
    render(<BarrelGuestPicker value={2} onChange={mockOnChange} />);
    
    expect(screen.getByText('Guests')).toBeInTheDocument();
  });

  it('should render guest numbers from 1 to 20', () => {
    render(<BarrelGuestPicker value={2} onChange={mockOnChange} />);
    
    // Check for first and last guest numbers
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    
    // Check for some middle values
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('should render all 20 guest options', () => {
    const { container } = render(
      <BarrelGuestPicker value={2} onChange={mockOnChange} />
    );
    
    // Count the number of guest items (excluding padding divs)
    const guestItems = container.querySelectorAll('.text-2xl');
    expect(guestItems.length).toBe(20);
  });

  it('should have proper styling classes', () => {
    const { container } = render(
      <BarrelGuestPicker value={5} onChange={mockOnChange} />
    );
    
    const guestItems = container.querySelectorAll('.select-none');
    expect(guestItems.length).toBeGreaterThan(0);
  });

  it('should accept different initial values', () => {
    const { rerender } = render(
      <BarrelGuestPicker value={1} onChange={mockOnChange} />
    );
    
    expect(screen.getByText('1')).toBeInTheDocument();
    
    rerender(<BarrelGuestPicker value={10} onChange={mockOnChange} />);
    
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});

