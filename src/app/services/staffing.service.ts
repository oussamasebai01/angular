import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffingService {
  private apiUrl = 'http://localhost:8070/api';

  constructor(private http: HttpClient) {}

  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/salaries`);
  }

  calculateUserSalary(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/salaries/calculate/${userId}`);
  }

  getSalaryHistory(userId: string): Observable<SalaryHistoryEntry[]> {
    return this.http.get<SalaryHistoryEntry[]>(`${this.apiUrl}/salary-history/${userId}`);
  }

  calculateAllSalaries(): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/recalculate-all`, {});
  }

  analyzeHiringNeeds(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/staffing/analysis`);
  }

  analyzeDepartmentNeeds(department: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/staffing/analysis/${department}`);
  }
}

// Interfaces (if not in HrComponent.ts)
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