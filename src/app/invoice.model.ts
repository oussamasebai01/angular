export interface Invoice {
  id?: string;
  invoiceNumber: string;   // Champ standard
  invictNumber?: string;   // Champ alternatif (erreur 1)
  vendorName: string;
  amount: string;
  invoiceDate: string;     // Champ standard
  invictGates?: string;    // Champ alternatif (erreur 2)
  dueDate: string;         // Champ standard
  doublet?: string;        // Champ alternatif (erreur 3)
  description: string;
  status: 'NEW' | 'VALIDATED' | 'REJECTED' | 'ARCHIVED' | 'PENDING';
  rejectionReason?: string | null;
  validatedBy?: string | null;
  validationDate?: string | null;
  archiveDate?: string | null;
  budget: string;
  depense: string;
  gainAnnuel: string;      // Champ standard
  gainAmount?: string;     // Champ alternatif (erreur 4)
  department: any;         // Peut être string ou objet
  apartment?: any;         // Champ alternatif (erreur 5)
  project: string;
  _class?: string;         // Champ supplémentaire vu dans la DB
}