import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-collector-dashboard',
  templateUrl: './collector-dashboard.component.html',
  styleUrls: ['./collector-dashboard.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule]
})
export class CollectorDashboardComponent implements OnInit {
  allRequests: any[] = [];

  ngOnInit() {
    this.allRequests = JSON.parse(localStorage.getItem('requests') || '[]');
  }

  updateRequestStatus(requestId: number, newStatus: string) {
    const requestIndex = this.allRequests.findIndex((req: any) => req.id === requestId);

    if (requestIndex !== -1) {
      this.allRequests[requestIndex].status = newStatus;

      localStorage.setItem('requests', JSON.stringify(this.allRequests));

      alert(`Request ${newStatus} successfully!`);
    }
  }
}
