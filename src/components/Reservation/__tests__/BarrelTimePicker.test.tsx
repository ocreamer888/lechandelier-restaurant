import { render, screen } from '@testing-library/react';
import { BarrelTimePicker } from '../BarrelTimePicker';

describe('BarrelTimePicker', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with Time label', () => {
    render(<BarrelTimePicker value="18:00" onChange={mockOnChange} />);
    
    expect(screen.getByText('Time')).toBeInTheDocument();
  });

  it('should render hours from 18 to 22', () => {
    render(<BarrelTimePicker value="18:00" onChange={mockOnChange} />);
    
    expect(screen.getByText('18')).toBeInTheDocument();
    expect(screen.getByText('19')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('21')).toBeInTheDocument();
    expect(screen.getByText('22')).toBeInTheDocument();
  });

  it('should render minutes in 15-minute intervals', () => {
    render(<BarrelTimePicker value="18:00" onChange={mockOnChange} />);
    
    expect(screen.getByText('00')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('should render time separator colon', () => {
    render(<BarrelTimePicker value="18:00" onChange={mockOnChange} />);
    
    const separator = screen.getByText(':');
    expect(separator).toBeInTheDocument();
    expect(separator.className).toContain('text-2xl');
  });

  it('should have two separate barrels for hours and minutes', () => {
    const { container } = render(
      <BarrelTimePicker value="18:00" onChange={mockOnChange} />
    );
    
    // Check for perspective containers (one for hours, one for minutes)
    const barrels = container.querySelectorAll('[style*="perspective"]');
    expect(barrels.length).toBe(2);
  });

  it('should call onChange with formatted time on mount', () => {
    render(<BarrelTimePicker value="18:00" onChange={mockOnChange} />);
    
    // onChange should be called with time in HH:MM format
    expect(mockOnChange).toHaveBeenCalled();
    const callArg = mockOnChange.mock.calls[0][0];
    expect(callArg).toMatch(/^\d{2}:\d{2}$/);
  });

  it('should have proper styling for time items', () => {
    const { container } = render(
      <BarrelTimePicker value="19:30" onChange={mockOnChange} />
    );
    
    const timeItems = container.querySelectorAll('.select-none');
    expect(timeItems.length).toBeGreaterThan(0);
  });

  it('should render all hour and minute options', () => {
    const { container } = render(
      <BarrelTimePicker value="20:15" onChange={mockOnChange} />
    );
    
    // 5 hours + 4 minute intervals = 9 total time elements (excluding separator)
    const timeItems = container.querySelectorAll('.text-2xl.font-light');
    // Should have 5 hours + 4 minutes = 9 items
    expect(timeItems.length).toBeGreaterThanOrEqual(9);
  });
});

