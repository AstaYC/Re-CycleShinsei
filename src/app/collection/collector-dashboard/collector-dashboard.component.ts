import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collector-dashboard',
  templateUrl: './collector-dashboard.component.html',
  styleUrls: ['./collector-dashboard.component.scss'],
  standalone: true,
  imports: []
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

  onSubmit() {
    if (this.requestForm.valid) {
      const request = {
        id: Date.now(), // Assign a unique ID using timestamp
        name: `${this.currentUser.firstName} ${this.currentUser.lastName}`,
        email: this.currentUser.email,
        phone: this.currentUser.phone,
        ...this.requestForm.value,
        status: 'pending'
      };

      // Save request to localStorage
      let requests = JSON.parse(localStorage.getItem('requests') || '[]');
      requests.push(request);
      localStorage.setItem('requests', JSON.stringify(requests));

      alert('Your collection request has been submitted successfully!');
      this.requestForm.reset(); // Clear the form after submission
    }
  }
}
