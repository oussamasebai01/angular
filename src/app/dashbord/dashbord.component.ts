import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  ngOnInit(): void {
    const loadingOverlay = document.getElementById('loading-overlay') as HTMLElement | null;

    if (loadingOverlay) {
      // Initialisation de l'animation du chargement
      setTimeout(() => {
        loadingOverlay.classList.add('hidden');
        setTimeout(() => {
          loadingOverlay.style.display = 'none';
        }, 500);

        // Initialisation du graphique des statistiques
        this.initializeStatisticsChart();
      }, 1500);
    }
  }

  private initializeStatisticsChart(): void {
    // Implémente la logique du graphique ici
    console.log('Initialisation du graphique des statistiques');
  }


}
