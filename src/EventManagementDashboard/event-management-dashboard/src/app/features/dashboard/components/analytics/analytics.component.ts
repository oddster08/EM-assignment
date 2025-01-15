import { Component } from '@angular/core';
import { Event, EventStatus } from '../../../../core/models/event.interface';
import {
  Chart,
  ChartConfiguration,
  ChartData,
  ChartOptions,
  registerables,
} from 'chart.js';
import { EventService } from '../../../../core/services/event.service';
import { CommonModule } from '@angular/common';
import {
  EventAnalyticsResponse,
  StatusBreakdown,
} from '../../../../core/models/analytics.interface';

@Component({
  selector: 'app-analytics',
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent {
  totalEvents: number = 0;
  upcomingEvent: Event | undefined;
  eventStatusCounts: StatusBreakdown = {
    Completed: 0,
    Ongoing: 0,
    Upcoming: 0,
  };
  events: Event[] = [];

  constructor(private eventService: EventService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.fetchEventAnalytics();
  }

  createChart(): void {
    const chartConfig: ChartConfiguration = {
      type: 'pie',
      data: {
        labels: ['Upcoming', 'Ongoing', 'Completed'],
        datasets: [
          {
            label: 'Event Status Count',
            data: [
              this.eventStatusCounts[EventStatus.UPCOMING],
              this.eventStatusCounts[EventStatus.ONGOING],
              this.eventStatusCounts[EventStatus.COMPLETED],
            ],
            backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
            borderColor: ['#388e3c', '#f57c00', '#d32f2f'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    };

    // Destroy existing chart instance if it exists
    const chartElement = document.getElementById(
      'eventStatusChart'
    ) as HTMLCanvasElement;
    if (Chart.getChart(chartElement)) {
      Chart.getChart(chartElement)?.destroy();
    }

    new Chart(chartElement, chartConfig);
  }

  fetchEventAnalytics(): void {
    this.eventService.getAnalytics().subscribe((response) => {
      const eventsResponse = response as EventAnalyticsResponse;
      if (eventsResponse) {
        this.totalEvents = eventsResponse.data.totalEvents;
        this.eventStatusCounts = eventsResponse.data.statusBreakdown;
        this.upcomingEvent = eventsResponse.data.nextUpcoming;
        this.createChart();
      } else {
        console.error('Failed to fetch event analytics');
      }
    });
  }
}
