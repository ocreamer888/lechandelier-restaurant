import { render, screen } from '@testing-library/react';
import { BarrelDatePicker } from '../BarrelDatePicker';

describe('BarrelDatePicker', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with Date label', () => {
    render(<BarrelDatePicker value="2025-10-15" onChange={mockOnChange} />);
    
    expect(screen.getByText('Date')).toBeInTheDocument();
  });

  it('should render dates in correct format', () => {
    render(<BarrelDatePicker value="2025-10-15" onChange={mockOnChange} />);
    
    // Check for date format "Day, Month Date"
    const dateElements = screen.getAllByText(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{1,2}$/);
    expect(dateElements.length).toBeGreaterThan(0);
  });

  it('should render 60 date options', () => {
    const { container } = render(
      <BarrelDatePicker value="2025-10-15" onChange={mockOnChange} />
    );
    
    // Count date items (excluding padding divs)
    const dateItems = container.querySelectorAll('.text-lg.text-white');
    expect(dateItems.length).toBe(60);
  });

  it('should include today as first date', () => {
    render(<BarrelDatePicker value="2025-10-15" onChange={mockOnChange} />);
    
    const today = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const expectedFormat = `${days[today.getDay()]}, ${months[today.getMonth()]} ${today.getDate()}`;
    
    expect(screen.getByText(expectedFormat)).toBeInTheDocument();
  });

  it('should have proper styling for date items', () => {
    const { container } = render(
      <BarrelDatePicker value="2025-10-15" onChange={mockOnChange} />
    );
    
    const dateItems = container.querySelectorAll('.font-light.select-none');
    expect(dateItems.length).toBeGreaterThan(0);
  });

  it('should call onChange when component mounts', () => {
    render(<BarrelDatePicker value="2025-10-15" onChange={mockOnChange} />);
    
    // onChange should be called with formatted date
    expect(mockOnChange).toHaveBeenCalled();
    const callArg = mockOnChange.mock.calls[0][0];
    expect(callArg).toMatch(/^\d{4}-\d{2}-\d{2}$/); // YYYY-MM-DD format
  });
});

