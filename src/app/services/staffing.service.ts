// src/app/services/staffing.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffingService {
  private apiUrl = 'http://localhost:8070/api';

  constructor(private http: HttpClient) {}

  /**
   * Fetches all users from the backend.
   * Endpoint: GET /api/users
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/salaries`);
  }

  /**
   * Calculates the salary for a specific user.
   * Endpoint: GET /api/salaries/calculate/{userId}
   */
  calculateUserSalary(userId: string): Observable<User> {
    if (!userId || userId === '' || userId === 'undefined') {
      console.error('Invalid userId:', userId);
      return throwError(() => new Error('User ID is required and must be valid'));
    }
    return this.http.get<User>(`${this.apiUrl}/salaries/calculate/${userId}`);
  }

  /**
   * Updates a user's data (e.g., attendance fields).
   * Endpoint: PUT /api/users/{userId}
   */
  updateUser(user: User): Observable<User> {
    if (!user.id) {
      console.error('Invalid user ID:', user.id);
      return throwError(() => new Error('User ID is required'));
    }
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user);
  }

  /**
   * Fetches the salary history for a specific user.
   * Endpoint: GET /api/salaries/history/{userId}
   */
  getSalaryHistory(userId: string): Observable<SalaryHistoryEntry[]> {
    if (!userId || userId === '' || userId === 'undefined') {
      console.error('Invalid userId:', userId);
      return throwError(() => new Error('User ID is required and must be valid'));
    }
    return this.http.get<SalaryHistoryEntry[]>(`${this.apiUrl}/salaries/history/${userId}`);
  }

  /**
   * Calculates salaries for all active users.
   * Endpoint: POST /api/salaries/calculate-all
   */
  calculateAllSalaries(): Observable<string> {
    return this.http.post(`${this.apiUrl}/salaries/recalculate-all`, null, {
      responseType: 'text'
    }) as Observable<string>;
  }
  
  

  /**
   * Analyzes hiring needs across the organization.
   * Endpoint: GET /api/staffing/analysis
   */
  analyzeHiringNeeds(): Observable<HiringAnalysis> {
    return this.http.get<HiringAnalysis>(`${this.apiUrl}/staffing/analysis`);
  }

  /**
   * Analyzes hiring needs for a specific department.
   * Endpoint: GET /api/staffing/analysis/{department}
   */
  analyzeDepartmentNeeds(department: string): Observable<HiringAnalysis> {
    if (!department || department === '') {
      console.error('Invalid department:', department);
      return throwError(() => new Error('Department is required'));
    }
    return this.http.get<HiringAnalysis>(`${this.apiUrl}/staffing/analysis/${department}`);
  }
}

// Interfaces
export interface User {
salaire: string|number;
  id: string;
  identifiant: string;
  nom: string;
  prenom: string;
  email: string;
  experience: string;
  password: string;
  service: string;
  salary: Salary | null; // Allow null to match backend
  employmentStatus: string;
  projects: any[];
  documents: any[];
  sessions: any[];
  jobDescriptions: any[];
  prototypes: any[];
  tasks: any[];
  trainings: Training[];
  processes: any[];
  department: any;
  roles: string[];
  performanceScore?: number; // Optional, as it’s no longer used for salary
  daysPresent: number;
  daysAbsent: number;
  totalWorkingDays: number;
}

export interface Salary {
bonus: string|number;
  baseSalary: number;
  attendanceAdjustment: number; // Used for attendance bonus
  totalSalary: number;
  calculationDate: string;
  period: string;
}

export interface Training {
  title: string;
  status: string;
  completionDate: string;
}

export interface SalaryHistoryEntry {
salaire: string|number;
  date: string;
  baseSalary: number;
  attendanceAdjustment: number; // Updated to match Salary entity
  totalSalary: number;
}

export interface HiringAnalysis {
analysisDate: string|number|Date;
recommendedAction: any;
justification: any;
needsMoreEmployees: any;
  department?: string; // Optional, present only for department-specific analysis
  requiredRoles: string[];
  currentStaff: number;
  recommendedHires: number;
  skillsGap: string[];
}