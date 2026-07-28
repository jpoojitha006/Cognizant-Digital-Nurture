import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private message = '';

  setMessage(msg: string): void {
    this.message = msg;
  }

  getMessage(): string {
    return this.message;
  }

}