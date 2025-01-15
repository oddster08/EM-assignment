import { Routes } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventFormComponent } from './components/event-form/event-form.component';

export const eventsRoutes: Routes = [
  { path: '', component: EventListComponent }, // Default route for events
  { path: 'create', component: EventFormComponent }, // Create a new event
  { path: 'edit/:id', component: EventFormComponent }, // Edit an existing event
];
