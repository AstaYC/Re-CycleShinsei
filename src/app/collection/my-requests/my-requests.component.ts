import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MyRequestsComponent implements OnInit {
  currentUser: any;
  userRequests: any[] = [];

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    const allRequests = JSON.parse(localStorage.getItem('requests') || '[]');

    this.userRequests = allRequests.filter((request: any) => request.email === this.currentUser.email);
  }
}
