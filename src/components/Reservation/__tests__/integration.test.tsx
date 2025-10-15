import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReservationSection from '../../ReservationSection';

describe('Reservation Integration Tests', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should complete full reservation flow', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    render(<ReservationSection />);

    // Step 1: Fill in name
    const nameInput = screen.getByPlaceholderText('Name');
    fireEvent.change(nameInput, { target: { value: 'Jean-Pierre', name: 'name' } });
    expect(nameInput).toHaveValue('Jean-Pierre');

    // Step 2: Fill in phone
    const phoneInput = screen.getByPlaceholderText('Phone Number');
    fireEvent.change(phoneInput, { target: { value: '+33 1 23 45 67 89', name: 'phone' } });
    expect(phoneInput).toHaveValue('+33 1 23 45 67 89');

    // Step 3: Fill in email
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'jean.pierre@example.fr', name: 'email' } });
    expect(emailInput).toHaveValue('jean.pierre@example.fr');

    // Step 4: Verify pickers are present
    expect(screen.getByText('Guests')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Time')).toBeInTheDocument();

    // Step 5: Submit form
    const submitButton = screen.getByRole('button', { name: /reserve/i });
    expect(submitButton).toBeInTheDocument();
    
    const form = submitButton.closest('form');
    expect(form).toBeInTheDocument();

    if (form) {
      fireEvent.submit(form);

      // Step 6: Verify submission logged
      await waitFor(() => {
        expect(consoleLogSpy).toHaveBeenCalledWith(
          'Reservation submitted:',
          expect.objectContaining({
            name: 'Jean-Pierre',
            phone: '+33 1 23 45 67 89',
            email: 'jean.pierre@example.fr',
            guests: expect.any(Number),
            date: expect.any(String),
            time: expect.any(String),
          })
        );
      });
    }
  });

  it('should render complete reservation UI', () => {
    render(<ReservationSection />);

    // Header
    expect(screen.getByText('RESERVATION')).toBeInTheDocument();

    // Subtitle
    expect(
      screen.getByText(/Secure your spot at Le Chandelier/i)
    ).toBeInTheDocument();

    // Form fields
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();

    // Barrel pickers
    expect(screen.getByText('Guests')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Time')).toBeInTheDocument();

    // Submit button
    expect(screen.getByRole('button', { name: /reserve/i })).toBeInTheDocument();
  });

  it('should maintain form state across field changes', () => {
    render(<ReservationSection />);

    // Fill all fields
    const nameInput = screen.getByPlaceholderText('Name');
    const phoneInput = screen.getByPlaceholderText('Phone Number');
    const emailInput = screen.getByPlaceholderText('Email');

    fireEvent.change(nameInput, { target: { value: 'Marie', name: 'name' } });
    fireEvent.change(phoneInput, { target: { value: '0123456789', name: 'phone' } });
    fireEvent.change(emailInput, { target: { value: 'marie@test.com', name: 'email' } });

    // Verify all fields maintain their values
    expect(nameInput).toHaveValue('Marie');
    expect(phoneInput).toHaveValue('0123456789');
    expect(emailInput).toHaveValue('marie@test.com');

    // Change one field and verify others remain
    fireEvent.change(nameInput, { target: { value: 'Marie Curie', name: 'name' } });
    
    expect(nameInput).toHaveValue('Marie Curie');
    expect(phoneInput).toHaveValue('0123456789');
    expect(emailInput).toHaveValue('marie@test.com');
  });

  it('should prevent submission with empty required fields', () => {
    render(<ReservationSection />);

    const nameInput = screen.getByPlaceholderText('Name');
    const phoneInput = screen.getByPlaceholderText('Phone Number');
    const emailInput = screen.getByPlaceholderText('Email');

    // All fields should be required
    expect(nameInput).toBeRequired();
    expect(phoneInput).toBeRequired();
    expect(emailInput).toBeRequired();

    // Verify form has proper validation
    expect(nameInput).toHaveAttribute('required');
    expect(phoneInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('required');
  });

  it('should have proper responsive layout structure', () => {
    const { container } = render(<ReservationSection />);

    // Check for responsive section
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section?.className).toContain('mt-8');
    expect(section?.className).toContain('md:mt-0');

    // Check for max-width container
    const contentContainer = container.querySelector('.max-w-2xl');
    expect(contentContainer).toBeInTheDocument();

    // Check for responsive grid
    const gridContainer = container.querySelector('.sm\\:grid-cols-3');
    expect(gridContainer).toBeInTheDocument();
  });

  it('should display guest options correctly', () => {
    render(<ReservationSection />);

    // Verify Guests label exists
    expect(screen.getByText('Guests')).toBeInTheDocument();
    
    // Verify guest numbers are visible (use getAllByText since numbers may appear in multiple places)
    expect(screen.getAllByText('1').length).toBeGreaterThan(0);
    expect(screen.getAllByText('10').length).toBeGreaterThan(0);
    expect(screen.getAllByText('20').length).toBeGreaterThan(0);
  });

  it('should display time options correctly', () => {
    render(<ReservationSection />);

    // Verify Time label exists
    expect(screen.getByText('Time')).toBeInTheDocument();

    // Verify time separator colon
    expect(screen.getByText(':')).toBeInTheDocument();

    // Verify hours (use getAllByText since numbers may appear in multiple places)
    expect(screen.getAllByText('18').length).toBeGreaterThan(0);
    expect(screen.getAllByText('19').length).toBeGreaterThan(0);
    expect(screen.getAllByText('20').length).toBeGreaterThan(0);
    expect(screen.getAllByText('21').length).toBeGreaterThan(0);
    expect(screen.getAllByText('22').length).toBeGreaterThan(0);

    // Verify minutes
    expect(screen.getAllByText('00').length).toBeGreaterThan(0);
    expect(screen.getAllByText('15').length).toBeGreaterThan(0);
    expect(screen.getAllByText('30').length).toBeGreaterThan(0);
    expect(screen.getAllByText('45').length).toBeGreaterThan(0);
  });

  it('should have accessible form structure', () => {
    const { container } = render(<ReservationSection />);

    // Check for form element
    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();

    // Check for button
    const button = screen.getByRole('button', { name: /reserve/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'submit');

    // Check for inputs
    const inputs = container.querySelectorAll('input');
    expect(inputs.length).toBeGreaterThanOrEqual(3);

    inputs.forEach((input) => {
      expect(input).toHaveAttribute('placeholder');
    });
  });
});

