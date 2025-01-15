import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../../core/services/event.service';
import {
  Event,
  EventResponse,
  EventStatus,
} from '../../../../core/models/event.interface';
import { CommonModule } from '@angular/common';
import { ErrorResponse } from '../../../../core/models/error.model';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent implements OnInit {
  isEditMode: boolean = false;
  isDeleteMode: boolean = false;
  eventId: string | null = null;
  eventForm: FormGroup;

  // Event statuses for the dropdown
  eventStatuses: EventStatus[] = [
    EventStatus.UPCOMING,
    EventStatus.ONGOING,
    EventStatus.COMPLETED,
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService
  ) {
    // Initialize the form with default values
    this.eventForm = this.fb.group({
      id: [''], // Add id as a form control
      name: ['', Validators.required],
      dateTime: ['', Validators.required],
      location: ['', Validators.required],
      status: [EventStatus.UPCOMING, Validators.required],
    });
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId) {
      this.isEditMode = true;
      this.eventService.getEventById(this.eventId).subscribe((response) => {
        const eventData = (response as EventResponse).data;
        if (eventData) {
          this.eventForm.patchValue({
            id: eventData._id,
            name: eventData.name,
            date: eventData.dateTime,
            location: eventData.location,
            status: eventData.status,
          });
        } else {
          alert('Event not found!');
          this.router.navigate(['/events']);
        }
      });
    }
  }

  submitForm(): void {
    if (this.isEditMode) {
      this.updateEvent();
    } else {
      this.createEvent();
    }
  }

  // Create a new event
  createEvent(): void {
    if (this.eventForm.valid) {
      this.eventService.createEvent(this.eventForm.value).subscribe({
        next: (response: EventResponse | ErrorResponse) => {
          if (response.success) {
            alert('Event created successfully!');
            this.router.navigate(['/events']);
          } else {
            alert(`Error: ${response.message}`);
          }
        },
        error: (err) => {
          alert(
            'An error occurred while creating the event. Please try again.'
          );
          console.error('Event creation failed', err);
        },
        complete: () => {
          console.log('Event creation process completed.');
        },
      });
    } else {
      alert('Please fill out all required fields correctly to create events.');
    }
  }

  // Update an existing event
  updateEvent(): void {
    if (this.eventForm.valid && this.eventId) {
      this.eventService
        .updateEvent(this.eventId, this.eventForm.value)
        .subscribe(() => {
          alert('Event updated successfully!');
          this.router.navigate(['/events']);
        });
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }

  // Delete event
  deleteEvent(): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.isDeleteMode = true;
      if (this.eventId) {
        this.eventService.deleteEvent(this.eventId).subscribe(() => {
          alert('Event deleted successfully!');
          this.router.navigate(['/events']);
        });
      }
    }
  }
  cancelDelete(): void {
    this.isDeleteMode = false;
  }
}
