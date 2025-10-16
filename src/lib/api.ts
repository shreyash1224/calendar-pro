import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export interface Event {
  id?: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  status: 'UPCOMING' | 'COMPLETED';
  description?: string;
}

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async request<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, data?: any): Promise<T> {
    try {
      const response = await this.axiosInstance.request<T>({
        method,
        url,
        data,
      });

      console.log('Request payload:', data); // <-- prints JSON for POST/PUT
      console.log('Response data:', response.data); // <-- prints response

      return response.data;
      
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('API request failed:', error.response?.data || error.message);
      throw error;
    }
  }

  // Events endpoints
  getEvents(): Promise<Event[]> {
    return this.request<Event[]>('GET', '/events');
  }

  getEvent(id: number): Promise<Event> {
    return this.request<Event>('GET', `/events/${id}`);
  }

  createEvent(event: Omit<Event, 'id'>): Promise<Event> {
    return this.request<Event>('POST', '/events', event);
  }

  updateEvent(id: number, event: Partial<Event>): Promise<Event> {
    return this.request<Event>('PUT', `/events/${id}`, event);
  }

  deleteEvent(id: number): Promise<void> {
    return this.request<void>('DELETE', `/events/${id}`);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
