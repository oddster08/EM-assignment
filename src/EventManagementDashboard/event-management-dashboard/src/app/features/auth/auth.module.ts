import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { authRoutes } from './auth.routes';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    // Auth components will be declared here
  ],
  imports: [RouterModule.forChild(authRoutes)],
})
export class AuthModule {}
