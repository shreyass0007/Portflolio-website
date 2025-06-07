import React from 'react';
import { renderHook } from '@testing-library/react';
import { useIntersection } from '@/hooks/use-intersection';
import '@testing-library/jest-dom';

// Create mock implementation of IntersectionObserver
class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  options: IntersectionObserverInit;
  elements: Element[] = [];
  
  constructor(callback: IntersectionObserverCallback, options: IntersectionObserverInit) {
    this.callback = callback;
    this.options = options;
  }
  
  observe = jest.fn((element: Element) => {
    this.elements.push(element);
  });
  
  disconnect = jest.fn();
  unobserve = jest.fn();
  takeRecords = jest.fn();
  
  // Helper to trigger intersection
  triggerIntersection(isIntersecting: boolean) {
    const entries = this.elements.map(element => ({
      isIntersecting,
      target: element,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRatio: isIntersecting ? 1 : 0,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: null,
      time: Date.now(),
    }));
    
    this.callback(entries as IntersectionObserverEntry[], this as unknown as IntersectionObserver);
  }
}

// Replace IntersectionObserver with our mock version
const originalIntersectionObserver = window.IntersectionObserver;
window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

describe('useIntersection Hook', () => {
  let mockObserver: MockIntersectionObserver;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });
  
  afterAll(() => {
    // Restore original IntersectionObserver
    window.IntersectionObserver = originalIntersectionObserver;
  });

  it('should initialize with isIntersecting as false', () => {
    const { result } = renderHook(() => useIntersection());
    
    expect(result.current.isIntersecting).toBe(false);
    expect(result.current.ref).toBeDefined();
  });

  it('should create an IntersectionObserver with correct options', () => {
    const threshold = 0.5;
    const rootMargin = '10px';
    
    const hookResult = renderHook(() => useIntersection({ threshold, rootMargin }));
    
    // Get the last constructed IntersectionObserver instance
    const constructorCalls = (window.IntersectionObserver as jest.Mock).mock.calls;
    const lastCallArgs = constructorCalls[constructorCalls.length - 1];
    
    // Verify the options passed to the constructor
    expect(lastCallArgs[1]).toEqual({ threshold, rootMargin });
  });

  it('should disconnect observer on cleanup', () => {
    // Get a reference to the disconnect method for verification
    const originalDisconnect = MockIntersectionObserver.prototype.disconnect;
    const mockDisconnect = jest.spyOn(MockIntersectionObserver.prototype, 'disconnect');
    
    const { unmount } = renderHook(() => useIntersection());
    unmount();
    
    expect(mockDisconnect).toHaveBeenCalled();
    
    // Restore original method
    mockDisconnect.mockRestore();
  });

  it('should set isIntersecting to true when entry is intersecting', () => {
    // Create a reference element for the intersection observer
    const mockRefElement = document.createElement('div');
    const refCallback = jest.fn();
    
    // Use a ref for the hook result so we can access it in our mock
    let hookResult: { isIntersecting: boolean, ref: any } | null = null;
    
    // Mock the ref callback to capture the observer instance
    jest.spyOn(React, 'useRef').mockImplementation(() => ({ current: mockRefElement }));
    
    // Render the hook
    const { result } = renderHook(() => {
      hookResult = useIntersection();
      return hookResult;
    });
    
    // Get the instance of the IntersectionObserver
    const instances = (window.IntersectionObserver as unknown as jest.Mock).mock.instances;
    mockObserver = instances[instances.length - 1] as unknown as MockIntersectionObserver;
    
    // Trigger an intersection
    mockObserver.triggerIntersection(true);
    
    // The isIntersecting value should now be true
    expect(result.current.isIntersecting).toBe(true);
  });

  it('should disconnect observer when entry is intersecting and once is true', () => {
    // Spy on the disconnect method
    const mockDisconnect = jest.spyOn(MockIntersectionObserver.prototype, 'disconnect');
    
    // Render the hook with once: true
    renderHook(() => useIntersection({ once: true }));
    
    // Get the instance of the IntersectionObserver
    const instances = (window.IntersectionObserver as unknown as jest.Mock).mock.instances;
    mockObserver = instances[instances.length - 1] as unknown as MockIntersectionObserver;
    
    // Trigger an intersection
    mockObserver.triggerIntersection(true);
    
    // The observer should be disconnected when once is true
    expect(mockDisconnect).toHaveBeenCalled();
    
    // Clean up
    mockDisconnect.mockRestore();
  });

  it('should not disconnect observer when once is false', () => {
    // Spy on the disconnect method
    const mockDisconnect = jest.spyOn(MockIntersectionObserver.prototype, 'disconnect');
    
    // Render the hook with once: false
    renderHook(() => useIntersection({ once: false }));
    
    // Get the instance of the IntersectionObserver
    const instances = (window.IntersectionObserver as unknown as jest.Mock).mock.instances;
    mockObserver = instances[instances.length - 1] as unknown as MockIntersectionObserver;
    
    // Reset call history before our test
    mockDisconnect.mockClear();
    
    // Trigger an intersection
    mockObserver.triggerIntersection(true);
    
    // The observer should NOT be disconnected when once is false
    expect(mockDisconnect).not.toHaveBeenCalled();
    
    // Clean up
    mockDisconnect.mockRestore();
  });
});
