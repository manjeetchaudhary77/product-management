import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFilterPipe } from './pipes';
import { PendingChangesGuard, AuthGuard, UpdateGuard, AddGuard } from './guards';
import { UserService } from './services/user.service';


@NgModule({
  declarations: [CustomFilterPipe],
  imports: [
    CommonModule,
  ],
  exports: [
    CustomFilterPipe, 
  ],
  providers: [
    PendingChangesGuard, AuthGuard,
    UpdateGuard, AddGuard,
    UserService]
})
export class SharedModule { }
