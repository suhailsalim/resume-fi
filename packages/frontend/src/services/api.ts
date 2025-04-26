import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors and token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Could implement token refresh here if needed
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Handle refresh token errors - redirect to login
        localStorage.removeItem('token');
        window.location.href = '/auth';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default {
  // Auth
  login: (data: { token: string }) => {
    localStorage.setItem('token', data.token);
  },
  logout: () => {
    localStorage.removeItem('token');
  },
  
  // User
  getCurrentUser: () => apiClient.get('/users/profile'),
  updateProfile: (data: any) => apiClient.put('/users/profile', data),
  uploadResume: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/users/resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  // Jobs
  analyzeJob: (data: any) => apiClient.post('/jobs/analyze', data),
  getUserJobs: () => apiClient.get('/jobs'),
  getJobAnalysis: (jobId: string) => apiClient.get(`/jobs/analysis/${jobId}`),
  generateTailoredResume: (jobId: string) => 
    apiClient.post('/jobs/tailored-resume', { jobId }),
  generateCoverLetter: (jobId: string) => 
    apiClient.post('/jobs/cover-letter', { jobId }),
  
  // Chat
  sendChatMessage: (jobId: string, content: string) => 
    apiClient.post('/chat/message', { jobId, content }),
  getChatHistory: (jobId: string) => 
    apiClient.get(`/chat/history/${jobId}`),
};