import { Component } from '@angular/core';

@Component({
  selector: 'app-collector-dashboard',
  templateUrl: './collector-dashboard.component.html',
  styleUrls: ['./collector-dashboard.component.scss'],
  standalone: true,
  imports: [] // Add CommonModule if needed
})
export class CollectorDashboardComponent {
  allRequests: any[] = [];
  filteredRequests: any[] = [];
  filterStatus: string = 'all';
  currentUser: any;

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.allRequests = JSON.parse(localStorage.getItem('requests') || '[]')
      .filter((req: any) => req.address.includes(this.currentUser.address.split(',')[1].trim()));
    this.filteredRequests = [...this.allRequests];
  }

  applyFilter() {
    if (this.filterStatus === 'all') {
      this.filteredRequests = [...this.allRequests];
    } else {
      this.filteredRequests = this.allRequests.filter((req: any) => req.status === this.filterStatus);
    }
  }

  updateRequestStatus(requestId: string, newStatus: string) {
    const requestIndex = this.allRequests.findIndex((req: any) => req.id === requestId);

    if (requestIndex !== -1) {
      this.allRequests[requestIndex].status = newStatus;
      localStorage.setItem('requests', JSON.stringify(this.allRequests));

      if (newStatus === 'Validée') {
        this.awardPoints(this.allRequests[requestIndex]);
      }

      alert(`Request ${newStatus} successfully!`);
      this.applyFilter();
    }
  }

  awardPoints(request: any) {
    const pointsPerKg = {
      Plastic: 2,
      Glass: 1,
      Paper: 1,
      Metal: 5
    };

    let totalPoints = 0;
    if (request.wasteType in pointsPerKg) {
      totalPoints += request.quantity * pointsPerKg[request.wasteType];
    } else {
      console.error(`Invalid waste type: ${request.wasteType}`);
    }

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.email === request.email);
    if (userIndex !== -1) {
      users[userIndex].points = (users[userIndex].points || 0) + totalPoints;
      localStorage.setItem('users', JSON.stringify(users));
    }
  }
}
