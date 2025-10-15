import { render, screen, fireEvent } from '@testing-library/react';
import ReservationSection from '../../ReservationSection';

describe('ReservationSection', () => {
  beforeEach(() => {
    // Mock console.log to avoid cluttering test output
    jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render the section with heading', () => {
    render(<ReservationSection />);
    
    expect(screen.getByText('RESERVATION')).toBeInTheDocument();
  });

  it('should render the subtitle', () => {
    render(<ReservationSection />);
    
    expect(
      screen.getByText(/Secure your spot at Le Chandelier/i)
    ).toBeInTheDocument();
  });

  it('should render ReservationForm component', () => {
    render(<ReservationSection />);
    
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  });

  it('should render all barrel pickers', () => {
    render(<ReservationSection />);
    
    expect(screen.getByText('Guests')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Time')).toBeInTheDocument();
  });

  it('should render submit button', () => {
    render(<ReservationSection />);
    
    const submitButton = screen.getByRole('button', { name: /reserve/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('should have decorative lines around heading', () => {
    const { container } = render(<ReservationSection />);
    
    const gradientLines = container.querySelectorAll('.bg-gradient-to-r, .bg-gradient-to-l');
    expect(gradientLines.length).toBeGreaterThanOrEqual(2);
  });

  it('should handle form submission', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    render(<ReservationSection />);
    
    const nameInput = screen.getByPlaceholderText('Name');
    const phoneInput = screen.getByPlaceholderText('Phone Number');
    const emailInput = screen.getByPlaceholderText('Email');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe', name: 'name' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890', name: 'phone' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com', name: 'email' } });
    
    const form = screen.getByRole('button', { name: /reserve/i }).closest('form');
    if (form) {
      fireEvent.submit(form);
      
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Reservation submitted:',
        expect.objectContaining({
          name: 'John Doe',
          phone: '1234567890',
          email: 'john@example.com',
        })
      );
    }
  });

  it('should initialize with default values', () => {
    render(<ReservationSection />);
    
    const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
    const phoneInput = screen.getByPlaceholderText('Phone Number') as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
    
    expect(nameInput.value).toBe('');
    expect(phoneInput.value).toBe('');
    expect(emailInput.value).toBe('');
  });

  it('should update form data when inputs change', () => {
    render(<ReservationSection />);
    
    const nameInput = screen.getByPlaceholderText('Name');
    
    fireEvent.change(nameInput, { target: { value: 'Test Name', name: 'name' } });
    
    expect(nameInput).toHaveValue('Test Name');
  });

  it('should have proper section styling', () => {
    const { container } = render(<ReservationSection />);
    
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section?.className).toContain('relative');
    expect(section?.className).toContain('flex');
  });

  it('should have background gradient', () => {
    const { container } = render(<ReservationSection />);
    
    const background = container.querySelector('.bg-gradient-to-b');
    expect(background).toBeInTheDocument();
  });

  it('should have content container with max width', () => {
    const { container } = render(<ReservationSection />);
    
    const contentContainer = container.querySelector('.max-w-2xl');
    expect(contentContainer).toBeInTheDocument();
  });
});

