// src/app/dashbord/hr/hr.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { DashboardData, DashboardService } from '../../services/dashboard.service';
import { StaffingService, User, Salary, Training, SalaryHistoryEntry, HiringAnalysis } from '../../services/staffing.service';
import { InvoiceService } from '../../services/invoice.service';

// Define interfaces
interface Role {
  id?: string;
  name: string;
  users?: any[];
}

interface Department {
  id?: string;
  name: string;
}

@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.css']
})
export class HrComponent implements OnInit {
  dashboardData: DashboardData | null = null;
  startDate = '2023-01-01';
  endDate = '2023-12-31';
  hiringDecision: HiringAnalysis | null = null;
  isLoading = false;
  error: string | null = null;
  selectedDepartment = '';
  departmentsListe: Department[] = [];
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
    private staffingService: StaffingService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.loadRoles();
    this.loadAnalysis();
    this.loadUsers();
    this.loadDepartments();
  }

  // Load users for the dropdown
  loadUsers(): void {
    this.staffingService.getUsers().subscribe({
      next: (users) => {
        this.users = users.map(user => ({
          ...user,
          id: user.id || ''
        }));
      },
      error: (err: Error) => {
        console.error('Error loading users:', err);
        this.salaryError = 'Erreur lors du chargement des utilisateurs';
      }
    });
  }

  // Load departments
  loadDepartments(): void {
    this.invoiceService.getDepartments().subscribe({
      next: (departments: Department[]) => {
        this.departmentsListe = departments;
      },
      error: (err: Error) => {
        console.error('Erreur lors du chargement des départements:', err);
        this.error = 'Erreur lors du chargement des départements';
      }
    });
  }

  // Load salary data for the selected user
  loadSalaryData(): void {
    console.log('Selected userId:', this.selectedUserId);
    if (!this.selectedUserId || this.selectedUserId === '') {
      this.salaryData = null;
      this.salaryHistory = [];
      return;
    }

    this.salaryLoading = true;
    this.salaryError = null;

    this.staffingService.calculateUserSalary(this.selectedUserId).subscribe({
      next: (data) => {
        this.salaryData = data;
        this.salaryLoading = false;
      },
      error: (err: Error) => {
        console.error('Erreur lors du calcul du salaire:', err);
        this.salaryError = err.message || 'Erreur lors du calcul du salaire';
        this.salaryLoading = false;
      }
    });
  }

  

  // Calculate salaries for all users
  calculateAllSalaries(): void {
    this.salaryLoading = true;
    this.salaryError = null;

    this.staffingService.calculateAllSalaries().subscribe({
      next: (message) => {
        console.log('Salaries calculated:', message);
        this.salaryLoading = false;
        console.log('Salaries calculated successfully');
      },
      error: (err: Error) => {
        console.error('Error calculating all salaries:', err);
        this.salaryError = 'Erreur lors du calcul des salaires';
        this.salaryLoading = false;
      }
    });
  }

  

  // Role management
  loadRoles(): void {
    this.http.get<Role[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (err: Error) => {
        console.error('Erreur lors du chargement des rôles:', err);
        this.error = 'Erreur lors du chargement des rôles';
      }
    });
  }

  onSubmit(): void {
    if (this.editMode) {
      this.updateRole();
    } else {
      this.createRole();
    }
  }

  createRole(): void {
    this.http.post<Role>(this.apiUrl, this.currentRole).subscribe({
      next: (role) => {
        this.roles.push(role);
        this.resetForm();
      },
      error: (err: Error) => {
        console.error('Erreur lors de la création du rôle:', err);
        this.error = 'Erreur lors de la création du rôle';
      }
    });
  }

  updateRole(): void {
    if (!this.currentRole.id) return;

    this.http.put<Role>(`${this.apiUrl}/${this.currentRole.id}`, this.currentRole).subscribe({
      next: (updatedRole) => {
        const index = this.roles.findIndex((r) => r.id === updatedRole.id);
        if (index !== -1) this.roles[index] = updatedRole;
        this.resetForm();
      },
      error: (err: Error) => {
        console.error('Erreur lors de la mise à jour du rôle:', err);
        this.error = 'Erreur lors de la mise à jour du rôle';
      }
    });
  }

  deleteRole(id: string): void {
    if (confirm('Voulez-vous vraiment supprimer ce rôle ?')) {
      this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe({
        next: () => {
          this.roles = this.roles.filter((role) => role.id !== id);
        },
        error: (err: Error) => {
          console.error('Erreur lors de la suppression du rôle:', err);
          this.error = 'Erreur lors de la suppression du rôle';
        }
      });
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
      error: (err: Error) => {
        this.error = 'Erreur lors du chargement de l\'analyse';
        this.isLoading = false;
        console.error('Error loading analysis:', err);
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
      error: (err: Error) => {
        this.error = `Erreur pour le département ${department}`;
        this.isLoading = false;
        console.error('Error analyzing department:', err);
      }
    });
  }

  getMetrics(metrics: Record<string, any>): { key: string; value: any }[] {
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
      error: (err: Error) => {
        console.error('Error fetching dashboard data:', err);
        this.error = 'Erreur lors du chargement des données du tableau de bord';
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
          label: 'Taux de Rotation (%)',
          data: departments.map((dept) => this.dashboardData!.departments[dept].turnoverRate),
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }
      ]
    };

    this.trainingChartData = {
      labels: departments,
      datasets: [
        {
          label: 'Taux de Complétion des Formations (%)',
          data: departments.map((dept) => this.dashboardData!.departments[dept].trainingCompletionRate),
          backgroundColor: 'rgba(54, 162, 235, 0.5)'
        }
      ]
    };

    this.performanceChartData = {
      labels: departments,
      datasets: [
        {
          label: 'Score de Performance Moyen',
          data: departments.map((dept) => {
            const metrics = this.dashboardData!.departments[dept].performanceMetrics as Record<string, number>;
            const scores = Object.values(metrics);
            return scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
          }),
          backgroundColor: 'rgba(75, 192, 192, 0.5)'
        }
      ]
    };
  }
}