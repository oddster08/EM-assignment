import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Event,
  EventResponse,
  GetAllEventsResponse,
} from '../../core/models/event.interface';
import { ErrorResponse } from '../models/error.model';
import { EventAnalyticsResponse } from '../models/analytics.interface';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = 'http://localhost:3000/api/event';

  constructor(private http: HttpClient) {}

  getAllEvents(params: any): Observable<GetAllEventsResponse | ErrorResponse> {
    return this.http.get<GetAllEventsResponse | ErrorResponse>(
      `${this.baseUrl}`,
      {
        params,
      }
    );
  }

  getEventById(id: string): Observable<EventResponse | ErrorResponse> {
    return this.http.get<EventResponse | ErrorResponse>(
      `${this.baseUrl}/${id}`
    );
  }

  createEvent(event: Event): Observable<EventResponse | ErrorResponse> {
    return this.http.post<EventResponse | ErrorResponse>(this.baseUrl, event);
  }

  updateEvent(
    id: string,
    event: Event
  ): Observable<EventResponse | ErrorResponse> {
    return this.http.put<EventResponse | ErrorResponse>(
      `${this.baseUrl}/${id}`,
      event
    );
  }

  deleteEvent(id: string): Observable<EventResponse | ErrorResponse> {
    return this.http.delete<EventResponse | ErrorResponse>(
      `${this.baseUrl}/${id}`
    );
  }

  getAnalytics(): Observable<EventAnalyticsResponse | ErrorResponse> {
    return this.http.get<EventAnalyticsResponse | ErrorResponse>(
      `${this.baseUrl}/analytics`
    );
  }
}
