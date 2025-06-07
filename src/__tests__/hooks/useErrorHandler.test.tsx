import { renderHook, act } from '@testing-library/react';
import { useErrorHandler } from '@/hooks/use-error-handler';

// Mock the toast function
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn()
  })
}));

// Mock console.error to avoid polluting test output
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe('useErrorHandler Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with no error', () => {
    const { result } = renderHook(() => useErrorHandler());
    
    expect(result.current.hasError).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle errors correctly', () => {
    const { result } = renderHook(() => useErrorHandler());
    const testError = new Error('Test error');
    
    act(() => {
      result.current.handleError(testError);
    });
    
    expect(result.current.hasError).toBe(true);
    expect(result.current.error).toBe(testError);
    expect(console.error).toHaveBeenCalled();
  });

  it('should handle string errors by converting them to Error objects', () => {
    const { result } = renderHook(() => useErrorHandler());
    const errorMessage = 'String error';
    
    act(() => {
      result.current.handleError(errorMessage);
    });
    
    expect(result.current.hasError).toBe(true);
    expect(result.current.error?.message).toBe(errorMessage);
  });

  it('should clear errors correctly', () => {
    const { result } = renderHook(() => useErrorHandler());
    
    act(() => {
      result.current.handleError(new Error('Test error'));
    });
    
    expect(result.current.hasError).toBe(true);
    
    act(() => {
      result.current.clearError();
    });
    
    expect(result.current.hasError).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should not log errors when logError is false', () => {
    const { result } = renderHook(() => useErrorHandler({ logError: false }));
    
    act(() => {
      result.current.handleError(new Error('Test error'));
    });
    
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should wrap async functions with error handling', async () => {
    const { result } = renderHook(() => useErrorHandler());
    
    const successFn = jest.fn().mockResolvedValue('success');
    const wrappedSuccessFn = result.current.withErrorHandling(successFn);
    
    let response;
    await act(async () => {
      response = await wrappedSuccessFn();
    });
    
    expect(response).toBe('success');
    expect(result.current.hasError).toBe(false);
    
    const errorFn = jest.fn().mockRejectedValue(new Error('Async error'));
    const wrappedErrorFn = result.current.withErrorHandling(errorFn);
    
    await act(async () => {
      try {
        await wrappedErrorFn();
      } catch (error) {
        // Expected to throw
      }
    });
    
    expect(result.current.hasError).toBe(true);
    expect(result.current.error?.message).toBe('Async error');
  });
});
