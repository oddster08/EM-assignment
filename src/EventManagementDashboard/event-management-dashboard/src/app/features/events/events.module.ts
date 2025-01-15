import { NgModule } from '@angular/core';
import { eventsRoutes } from './events.routes';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(eventsRoutes)],
})
export class EventsModule {}
