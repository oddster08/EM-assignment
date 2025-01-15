import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dashboardRoutes } from './dashboard.routes';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(dashboardRoutes)],
})
export class DashboardModule {}
