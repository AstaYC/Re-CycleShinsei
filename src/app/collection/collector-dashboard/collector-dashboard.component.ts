import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-collector-dashboard',
  templateUrl: './collector-dashboard.component.html',
  styleUrls: ['./collector-dashboard.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class CollectorDashboardComponent implements OnInit {
  allRequests: any[] = [];

  ngOnInit() {
    this.allRequests = JSON.parse(localStorage.getItem('requests') || '[]');
  }

  updateRequestStatus(requestId: number, newStatus: string) {
    const requestIndex = this.allRequests.findIndex((req: any) => req.id === requestId);

    if (requestIndex !== -1) {
      // Update the status of the request
      this.allRequests[requestIndex].status = newStatus;

      // Save updated requests back to localStorage
      localStorage.setItem('requests', JSON.stringify(this.allRequests));

      alert(`Request ${newStatus} successfully!`);
    }
  }
}
