import { render, screen } from '@testing-library/react';
import { BarrelContainer, ScrollableBarrel } from '../BarrelContainer';
import { createRef } from 'react';

describe('BarrelContainer', () => {
  it('should render with label and children', () => {
    render(
      <BarrelContainer label="Test Label">
        <div>Test Content</div>
      </BarrelContainer>
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <BarrelContainer label="Test" className="custom-class">
        <div>Content</div>
      </BarrelContainer>
    );

    const barrelContainer = container.firstChild as HTMLElement;
    expect(barrelContainer.className).toContain('custom-class');
  });

  it('should have correct structure with label positioning', () => {
    render(
      <BarrelContainer label="Test Label">
        <div>Content</div>
      </BarrelContainer>
    );

    const label = screen.getByText('Test Label');
    expect(label.className).toContain('absolute');
    expect(label.className).toContain('top-2');
    expect(label.className).toContain('left-6');
  });
});

describe('ScrollableBarrel', () => {
  it('should render with scrollRef and children', () => {
    const scrollRef = createRef<HTMLDivElement>();
    const mockOnScroll = jest.fn();

    render(
      <ScrollableBarrel scrollRef={scrollRef} onScroll={mockOnScroll}>
        <div>Scrollable Content</div>
      </ScrollableBarrel>
    );

    expect(screen.getByText('Scrollable Content')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const scrollRef = createRef<HTMLDivElement>();
    const mockOnScroll = jest.fn();

    const { container } = render(
      <ScrollableBarrel
        scrollRef={scrollRef}
        onScroll={mockOnScroll}
        className="w-full"
      >
        <div>Content</div>
      </ScrollableBarrel>
    );

    const barrel = container.querySelector('.w-full');
    expect(barrel).toBeInTheDocument();
  });

  it('should have gradient overlays', () => {
    const scrollRef = createRef<HTMLDivElement>();
    const mockOnScroll = jest.fn();

    const { container } = render(
      <ScrollableBarrel scrollRef={scrollRef} onScroll={mockOnScroll}>
        <div>Content</div>
      </ScrollableBarrel>
    );

    const gradients = container.querySelectorAll('.bg-gradient-to-b, .bg-gradient-to-t');
    expect(gradients.length).toBeGreaterThan(0);
  });

  it('should have selection highlight', () => {
    const scrollRef = createRef<HTMLDivElement>();
    const mockOnScroll = jest.fn();

    const { container } = render(
      <ScrollableBarrel scrollRef={scrollRef} onScroll={mockOnScroll}>
        <div>Content</div>
      </ScrollableBarrel>
    );

    const highlights = container.querySelectorAll('.top-1\\/2');
    expect(highlights.length).toBeGreaterThan(0);
  });
});

