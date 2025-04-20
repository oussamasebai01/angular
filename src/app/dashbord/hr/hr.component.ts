import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { DashboardData } from 'src/app/services/dashboard.service';
import { DashboardService } from '../../services/dashboard.service';
import { StaffingService } from '../../services/staffing.service';

// Define interfaces
interface Role {
  id?: string;
  name: string;
  users?: any[];
}

interface User {
  userId: string;
  identifiant: string;
  nom: string;
  prenom: string;
  email: string;
  experience: string;
  department: string;
  employmentStatus: string;
  hireDate: string;
  terminationDate: string | null;
  salary: Salary | null;
  trainings: Training[];
  performanceScore: number;
  roles: any[];
}

interface Salary {
  baseSalary: number;
  bonus: number;
  totalSalary: number;
  calculationDate: string;
  period: string;
}

interface Training {
  title: string;
  status: string;
  completionDate: string;
}

interface SalaryHistoryEntry {
  date: string;
  baseSalary: number;
  bonus: number;
}

@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.css']
})
export class HrComponent implements OnInit {
  [x: string]: any;
  dashboardData: DashboardData | null = null;
  startDate = '2023-01-01';
  endDate = '2023-12-31';
  hiringDecision: any;
  isLoading = false;
  error: string | null = null;
  selectedDepartment = '';
  departments = ['IT', 'HR', 'Finance', 'Sales'];
  showMetrics = false;
  salaryData: User | null = null;
  salaryHistory: SalaryHistoryEntry[] = [];
  activeTab: string = 'staffing';
  selectedUserId: string = '';
  users: User[] = [];
  salaryLoading: boolean = false;
  salaryError: string | null = null;  

  // Chart configurations
  barChartType: ChartType = 'bar';
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  turnoverChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  trainingChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  performanceChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  roles: Role[] = [];
  currentRole: Role = { name: '' };
  editMode: boolean = false;
  private apiUrl = 'http://localhost:8070/api/roles';

  constructor(
    private http: HttpClient,
    private dashboardService: DashboardService,
    private staffingService: StaffingService
  ) {}

  ngOnInit(): void {
    this.loadRoles();
    this.loadDashboardData();
    this.loadAnalysis();
    this.loadUsers();
  }

  // Load users for the dropdown
  loadUsers(): void {
    this.staffingService.loadUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des utilisateurs', err);
        this.salaryError = 'Erreur lors du chargement des utilisateurs';
      }
    });
  }

  // Load salary data for the selected user
  loadSalaryData(): void {
    if (!this.selectedUserId) {
      this.salaryData = null;
      this.salaryHistory = [];
      return;
    }

    this.salaryLoading = true;
    this.salaryError = null;

    this.staffingService.calculateUserSalary(this.selectedUserId).subscribe({
      next: (data: User) => {
        this.salaryData = data;
        this.salaryLoading = false;
      },
      error: (err: any) => {
        console.error('Erreur lors du calcul du salaire', err);
        this.salaryError = err.error?.message || 'Erreur lors du calcul du salaire';
        this.salaryLoading = false;
      }
    });

    this.staffingService.getSalaryHistory(this.selectedUserId).subscribe({
      next: (history: SalaryHistoryEntry[]) => {
        this.salaryHistory = history;
        this.salaryLoading = false;
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement de l\'historique', err);
        this.salaryError = 'Erreur lors du chargement de l\'historique';
        this.salaryLoading = false;
      }
    });
  }

  // Recalculate all salaries
  calculateAllSalaries(): void {
    this.salaryLoading = true;
    this.salaryError = null;

    this.staffingService.calculateAllSalaries().subscribe({
      next: (results: string) => {
        console.log('Salaires calculés:', results);
        this.salaryLoading = false;
        if (this.selectedUserId) {
          this.loadSalaryData();
        }
      },
      error: (err: any) => {
        console.error('Erreur lors du calcul des salaires', err);
        this.salaryError = 'Erreur lors du calcul des salaires';
        this.salaryLoading = false;
      }
    });
  }

  // Role management
  loadRoles(): void {
    this.http.get<Role[]>(this.apiUrl).subscribe(
      (data: Role[]) => (this.roles = data),
      (error: any) => console.error('Erreur lors du chargement des rôles', error)
    );
  }

  onSubmit(): void {
    if (this.editMode) {
      this.updateRole();
    } else {
      this.createRole();
    }
  }

  createRole(): void {
    this.http.post<Role>(this.apiUrl, this.currentRole).subscribe(
      (role: any) => {
        this.roles.push(role);
        this.resetForm();
      },
      (error: any) => console.error('Erreur lors de la création du rôle', error)
    );
  }

  updateRole(): void {
    if (this.currentRole.id) {
      this.http.put<Role>(`${this.apiUrl}/${this.currentRole.id}`, this.currentRole).subscribe(
        (updatedRole) => {
          const index = this.roles.findIndex((r) => r.id === updatedRole.id);
          if (index !== -1) this.roles[index] = updatedRole;
          this.resetForm();
        },
        (error) => console.error('Erreur lors de la mise à jour du rôle', error)
      );
    }
  }

  deleteRole(id: string): void {
    if (confirm('Voulez-vous vraiment supprimer ce rôle ?')) {
      this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe(
        () => (this.roles = this.roles.filter((role) => role.id !== id)),
        (error) => console.error('Erreur lors de la suppression du rôle', error)
      );
    }
  }

  editRole(role: Role): void {
    this.currentRole = { ...role };
    this.editMode = true;
  }

  resetForm(): void {
    this.currentRole = { name: '' };
    this.editMode = false;
  }

  // Analysis
  loadAnalysis(): void {
    this.isLoading = true;
    this.error = null;
    this.selectedDepartment = '';

    this.staffingService.analyzeHiringNeeds().subscribe({
      next: (data) => {
        this.hiringDecision = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement de l\'analyse';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  analyzeDepartment(department: string): void {
    if (!department) {
      this.loadAnalysis();
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.staffingService.analyzeDepartmentNeeds(department).subscribe({
      next: (data) => {
        this.hiringDecision = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = `Erreur pour le département ${department}`;
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  getMetrics(metrics: any): { key: string; value: any }[] {
    return Object.keys(metrics).map((key) => ({
      key: this.formatMetricName(key),
      value: metrics[key]
    }));
  }

  private formatMetricName(key: string): string {
    return key
      .replace(/_/g, ' ')
      .replace(/\bdept\b/, 'Département')
      .replace(/\bavg\b/, 'Moyenne')
      .replace(/\bperf\b/, 'Performance')
      .replace(/\bstaff\b/, 'Effectif')
      .replace(/\bcount\b/, 'Nombre');
  }

  // Dashboard
  loadDashboardData(): void {
    this.dashboardService.getDashboardData(this.startDate, this.endDate).subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.updateCharts();
      },
      error: (err) => {
        console.error('Error fetching dashboard data:', err);
      }
    });
  }

  updateCharts(): void {
    if (!this.dashboardData) return;

    const departments = Object.keys(this.dashboardData.departments);

    this.turnoverChartData = {
      labels: departments,
      datasets: [
        {
          label: 'Turnover Rate (%)',
          data: departments.map((dept) => this.dashboardData!.departments[dept].turnoverRate),
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }
      ]
    };

    this.trainingChartData = {
      labels: departments,
      datasets: [
        {
          label: 'Training Completion Rate (%)',
          data: departments.map((dept) => this.dashboardData!.departments[dept].trainingCompletionRate),
          backgroundColor: 'rgba(54, 162, 235, 0.5)'
        }
      ]
    };

    this.performanceChartData = {
      labels: departments,
      datasets: [
        {
          label: 'Average Performance Score',
          data: departments.map((dept) => {
            const metrics = this.dashboardData!.departments[dept].performanceMetrics;
            const scores = Object.values(metrics) as number[];
            return scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
        }),
          backgroundColor: 'rgba(75, 192, 192, 0.5)'
        }
      ]
    };
  }
}