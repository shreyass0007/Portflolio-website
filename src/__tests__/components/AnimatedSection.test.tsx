import React from 'react';
import { render, screen } from '@testing-library/react';
import { AnimatedSection } from '@/components/animated-section';
import '@testing-library/jest-dom';

// Mock the useIntersection hook
const mockIntersectionRef = jest.fn();
const mockIsIntersecting = jest.fn().mockReturnValue(true);

jest.mock('@/hooks/use-intersection', () => ({
  useIntersection: () => ({
    ref: mockIntersectionRef,
    isIntersecting: mockIsIntersecting()
  })
}));

// Mock the useErrorHandler hook
jest.mock('@/hooks/use-error-handler', () => ({
  useErrorHandler: () => ({
    hasError: false,
    error: null,
    handleError: jest.fn(),
    clearError: jest.fn(),
    withErrorHandling: jest.fn(fn => fn)
  })
}));

// Mock SectionError component
jest.mock('@/components/section-error', () => ({
  SectionError: ({ 
    error, 
    reset, 
    section 
  }: { 
    error: Error; 
    reset: () => void; 
    section: string 
  }) => (
    <div data-testid="section-error">
      {error?.message || 'Error'}
      <button onClick={reset}>Reset</button>
      <span>{section}</span>
    </div>
  )
}));

describe('AnimatedSection Component', () => {
  it('renders children correctly', () => {
    render(
      <AnimatedSection>
        <div data-testid="test-child">Test Content</div>
      </AnimatedSection>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('does not render children when isIntersecting is false', () => {
    // Set isIntersecting to false for this test
    mockIsIntersecting.mockReturnValueOnce(false);
    
    const { queryByTestId } = render(
      <AnimatedSection>
        <div data-testid="test-child">Test Content</div>
      </AnimatedSection>
    );
    
    expect(queryByTestId('test-child')).not.toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <AnimatedSection className="custom-class">
        <div>Test Content</div>
      </AnimatedSection>
    );
    
    const animatedElement = container.firstChild;
    expect(animatedElement).toHaveClass('custom-class');
  });

  it('applies custom style when provided', () => {
    const customStyle = { backgroundColor: 'red' };
    
    const { container } = render(
      <AnimatedSection style={customStyle}>
        <div>Test Content</div>
      </AnimatedSection>
    );
    
    const animatedElement = container.firstChild;
    expect(animatedElement).toHaveStyle('background-color: red');
  });
});
