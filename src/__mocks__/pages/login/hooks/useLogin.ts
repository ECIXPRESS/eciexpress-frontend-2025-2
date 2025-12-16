import { vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

// Mock the API client
vi.mock('@/lib/interceptors/apiClient', () => ({
  default: {
    post: vi.fn()
  }
}));

// Mock toast
vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn()
  }
}));

// Mock useAuth
const mockLogin = vi.fn();
vi.mock('@/pages/login/hooks/useAuth', () => ({
  useAuth: () => ({
    login: mockLogin
  })
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Import the actual implementation to be mocked
const actualModule = await vi.importActual('@/pages/login/hooks/useLogin');
const actualUseLogin = actualModule.useLogin;

// Test data
export const mockUser = {
  userId: '123',
  email: 'test@example.com',
  role: 'CUSTOMER',
  pfpURL: 'https://example.com/avatar.jpg'
};

export const mockTokenResponse = {
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token',
  userInfo: mockUser
};

// Mock implementations
export const mockUseLogin = {
  success: () => {
    const { result } = renderHook(() => actualUseLogin());
    
    // Mock successful API response
    const { post } = require('@/lib/interceptors/apiClient').default;
    post.mockResolvedValueOnce({ data: mockTokenResponse });
    
    return {
      ...result.current,
      email: 'test@example.com',
      password: 'password123',
      mockLogin,
      mockNavigate
    };
  },
  
  error: (errorType = 'invalid_credentials') => {
    const { result } = renderHook(() => actualUseLogin());
    
    // Mock error response
    const { post } = require('@/lib/interceptors/apiClient').default;
    
    if (errorType === 'network') {
      post.mockRejectedValueOnce({ 
        message: 'Network Error' 
      });
    } else {
      post.mockRejectedValueOnce({
        response: {
          status: 401,
          statusText: 'Unauthorized',
          data: {
            message: 'Invalid credentials',
            error: 'Authentication failed'
          }
        }
      });
    }
    
    return {
      ...result.current,
      email: 'error@example.com',
      password: 'wrongpass',
      mockLogin,
      mockNavigate
    };
  },
  
  validationError: () => {
    const { result } = renderHook(() => actualUseLogin());
    return {
      ...result.current,
      email: '',
      password: '',
      mockLogin,
      mockNavigate
    };
  }
};

// Default mock export
const useLogin = vi.fn().mockImplementation(actualUseLogin);

export default useLogin;
