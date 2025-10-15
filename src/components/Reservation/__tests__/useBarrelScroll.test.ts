import { renderHook, act } from '@testing-library/react';
import { useBarrelScroll } from '../useBarrelScroll';

describe('useBarrelScroll', () => {
  const mockOnChange = jest.fn();
  const items = [1, 2, 3, 4, 5];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() =>
      useBarrelScroll({
        items,
        onChange: mockOnChange,
      })
    );

    expect(result.current.scrollRef).toBeDefined();
    expect(result.current.isScrolling).toBe(false);
    expect(result.current.itemHeight).toBe(48);
  });

  it('should accept custom itemHeight', () => {
    const { result } = renderHook(() =>
      useBarrelScroll({
        items,
        onChange: mockOnChange,
        itemHeight: 60,
      })
    );

    expect(result.current.itemHeight).toBe(60);
  });

  it('should calculate item style correctly', () => {
    const { result } = renderHook(() =>
      useBarrelScroll({
        items,
        onChange: mockOnChange,
      })
    );

    const mockContainer = {
      scrollTop: 0,
      clientHeight: 128,
    } as HTMLDivElement;

    const style = result.current.getItemStyle(mockContainer, 0);

    expect(style).toHaveProperty('opacity');
    expect(style).toHaveProperty('scale');
    expect(style).toHaveProperty('rotateX');
    expect(style.opacity).toBeGreaterThan(0);
    expect(style.scale).toBeGreaterThan(0);
  });

  it('should return default style when container is null', () => {
    const { result } = renderHook(() =>
      useBarrelScroll({
        items,
        onChange: mockOnChange,
      })
    );

    const style = result.current.getItemStyle(null, 0);

    expect(style).toEqual({
      opacity: 0.3,
      scale: 0.8,
      rotateX: 0,
    });
  });

  it('should handle scroll events', () => {
    jest.useFakeTimers();

    const { result } = renderHook(() =>
      useBarrelScroll({
        items,
        onChange: mockOnChange,
      })
    );

    const mockEvent = {
      currentTarget: {
        scrollTop: 48,
        scrollTo: jest.fn(),
      },
    } as unknown as React.UIEvent<HTMLDivElement>;

    act(() => {
      result.current.handleScroll(mockEvent);
    });

    expect(result.current.isScrolling).toBe(true);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(mockEvent.currentTarget.scrollTo).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalledWith(items[1]);

    jest.useRealTimers();
  });
});

