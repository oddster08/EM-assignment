import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';

export const dashboardRoutes: Routes = [
  { path: '', component: DashboardComponent }, // Default route for events
  { path: 'analytics', component: AnalyticsComponent }, // Route for analytics
];
