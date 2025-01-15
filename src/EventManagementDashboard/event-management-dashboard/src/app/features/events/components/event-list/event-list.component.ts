import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../core/services/event.service'; // Event service to fetch data
import {
  Event,
  GetAllEventsResponse,
  Pagination,
} from '../../../../core/models/event.interface'; // Event interface for type safety
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
import { ErrorResponse } from '../../../../core/models/error.model';
import * as XLSX from 'xlsx';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  searchTerm: string = '';
  filterStatus: string = '';
  currentPage: number = 1;
  isLoading: boolean = false;
  paginationData: Pagination = {
    total: 0,
    page: 0,
    limit: 0,
    totalPages: 0,
  };

  constructor(
    private router: Router,
    private eventService: EventService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    const params = {
      page: 1,
      limit: 10,
      sortBy: 'dateTime',
      sortOrder: 'desc',
    };
    this.eventService.getAllEvents(params).subscribe((response) => {
      if ((response as GetAllEventsResponse).data) {
        this.events = (response as GetAllEventsResponse).data.events;
        this.filteredEvents = this.events;
        this.paginationData = (
          response as GetAllEventsResponse
        ).data.pagination;
        this.isLoading = false;
      } else {
        const error = (response as ErrorResponse).message;
        console.error('Failed to load events', error);
      }
    });
  }

  onSearch(): void {
    this.filterEvents();
  }

  onFilter(): void {
    this.filterEvents();
  }

  sortBy(key: keyof Event): void {
    this.filteredEvents.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      // Handle undefined values
      if (valueA === undefined || valueB === undefined) {
        return 0;
      }

      // String fields
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB);
      }

      // Number fields
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return valueA - valueB;
      }

      return 0; // Default case for unhandled types
    });
  }

  filterEvents(): void {
    console.log('Events', this.events);
    this.filteredEvents = this.events.filter(
      (event) =>
        (event.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          event.location
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())) &&
        (this.filterStatus ? event.status === this.filterStatus : true)
    );
  }

  createEvent(): void {
    console.log('Create new event');
    this.router.navigate(['/events/create']);
  }

  editEvent(id: string): void {
    console.log(`Edit event with id: ${id}`);
    this.router.navigate([`/events/edit/${id}`]);
  }

  deleteEvent(id: string): void {
    console.log(`Delete event with id: ${id}`);
    if (confirm('Are you sure you want to delete this event?')) {
      console.log(`Deleting event with id: ${id}`);
      this.eventService.deleteEvent(id).subscribe({
        next: () => {
          this.events = this.events.filter((event) => event._id !== id);
          this.filteredEvents = this.events;
        },
        error: (err) => console.error('Failed to delete event', err),
      });
    }
  }
  navigateToAnalytics(): void {
    this.router.navigate(['dashboard/analytics']); // Navigate to the Analytics page
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.events);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Events');
    XLSX.writeFile(wb, 'events.xlsx');
  }

  // Export to CSV
  exportToCSV(): void {
    const csvData = this.convertToCSV(this.events);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'events.csv';
    link.click();
  }

  // Convert JSON to CSV
  private convertToCSV(data: any[]): string {
    const header = Object.keys(data[0]);
    const rows = data.map((row) => header.map((field) => row[field]).join(','));
    return [header.join(','), ...rows].join('\n');
  }
}
