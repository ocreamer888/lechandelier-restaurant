import { render, screen, fireEvent } from '@testing-library/react';
import { ReservationForm } from '../ReservationForm';
import type { ReservationFormData } from '../types';

describe('ReservationForm', () => {
  const mockFormData: ReservationFormData = {
    name: 'John Doe',
    phone: '1234567890',
    email: 'john@example.com',
    guests: 2,
    date: '2025-10-15',
    time: '18:00',
  };

  const mockHandlers = {
    onSubmit: jest.fn((e) => e.preventDefault()),
    onInputChange: jest.fn(),
    onGuestChange: jest.fn(),
    onDateChange: jest.fn(),
    onTimeChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all form inputs', () => {
    render(<ReservationForm formData={mockFormData} {...mockHandlers} />);
    
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  });

  it('should render barrel pickers', () => {
    render(<ReservationForm formData={mockFormData} {...mockHandlers} />);
    
    expect(screen.getByText('Guests')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Time')).toBeInTheDocument();
  });

  it('should render submit button', () => {
    render(<ReservationForm formData={mockFormData} {...mockHandlers} />);
    
    const submitButton = screen.getByRole('button', { name: /reserve/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('should display form data values', () => {
    render(<ReservationForm formData={mockFormData} {...mockHandlers} />);
    
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
  });

  it('should call onInputChange when text inputs change', () => {
    render(<ReservationForm formData={mockFormData} {...mockHandlers} />);
    
    const nameInput = screen.getByPlaceholderText('Name');
    fireEvent.change(nameInput, { target: { value: 'Jane Doe', name: 'name' } });
    
    expect(mockHandlers.onInputChange).toHaveBeenCalled();
  });

  it('should call onSubmit when form is submitted', () => {
    render(<ReservationForm formData={mockFormData} {...mockHandlers} />);
    
    const form = screen.getByRole('button', { name: /reserve/i }).closest('form');
    if (form) {
      fireEvent.submit(form);
      expect(mockHandlers.onSubmit).toHaveBeenCalled();
    }
  });

  it('should have required attributes on inputs', () => {
    render(<ReservationForm formData={mockFormData} {...mockHandlers} />);
    
    expect(screen.getByPlaceholderText('Name')).toBeRequired();
    expect(screen.getByPlaceholderText('Phone Number')).toBeRequired();
    expect(screen.getByPlaceholderText('Email')).toBeRequired();
  });

  it('should have correct input types', () => {
    render(<ReservationForm formData={mockFormData} {...mockHandlers} />);
    
    expect(screen.getByPlaceholderText('Name')).toHaveAttribute('type', 'text');
    expect(screen.getByPlaceholderText('Phone Number')).toHaveAttribute('type', 'tel');
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email');
  });

  it('should have proper grid layout for barrel pickers', () => {
    const { container } = render(
      <ReservationForm formData={mockFormData} {...mockHandlers} />
    );
    
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer?.className).toContain('sm:grid-cols-3');
  });

  it('should render with empty form data', () => {
    const emptyFormData: ReservationFormData = {
      name: '',
      phone: '',
      email: '',
      guests: 2,
      date: '2025-10-15',
      time: '18:00',
    };

    render(<ReservationForm formData={emptyFormData} {...mockHandlers} />);
    
    expect(screen.getByPlaceholderText('Name')).toHaveValue('');
    expect(screen.getByPlaceholderText('Phone Number')).toHaveValue('');
    expect(screen.getByPlaceholderText('Email')).toHaveValue('');
  });
});

