import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],

  // Component-level provider:
  // Every NotificationComponent gets its own NotificationService instance.
  // This instance is NOT shared with other components.
  providers: [NotificationService],

  templateUrl: './notification.html',
  styleUrls: ['./notification.css']
})
export class NotificationComponent {

  constructor(public notificationService: NotificationService) {}

}