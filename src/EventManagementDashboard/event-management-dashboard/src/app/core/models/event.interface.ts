export interface Event {
  _id: string;
  name: string;
  dateTime: string;
  location: string;
  status: EventStatus;
  createdAt: string;
  updatedAt: string;
}

export enum EventStatus {
  UPCOMING = 'Upcoming',
  ONGOING = 'Ongoing',
  COMPLETED = 'Completed',
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface EventResponse {
  success: boolean;
  message: string;
  data: Event;
}

export interface GetAllEventsResponse {
  success: boolean;
  message: string;
  data: GetAllEventsData;
}

export interface GetAllEventsData {
  events: Event[];
  pagination: Pagination;
}
