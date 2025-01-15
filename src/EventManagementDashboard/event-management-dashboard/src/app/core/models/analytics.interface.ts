import { Event } from './event.interface';

export interface EventAnalyticsData {
  totalEvents: number;
  statusBreakdown: StatusBreakdown;
  nextUpcoming: Event;
}

export interface StatusBreakdown {
  Completed: number;
  Ongoing: number;
  Upcoming: number;
}
export interface EventAnalyticsResponse {
  success: boolean;
  message: string;
  data: EventAnalyticsData;
}
