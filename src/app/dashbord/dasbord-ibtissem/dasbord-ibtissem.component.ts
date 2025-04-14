import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RelasationService } from 'src/app/relasation.service';


@Component({
  selector: 'app-dasbord-ibtissem',
  templateUrl: './dasbord-ibtissem.component.html',
  styleUrls: ['./dasbord-ibtissem.component.css']
})
export class DasbordIbtissemComponent implements OnInit{
  Inducateur: any;
  currentId: string | null = null;
  currentIdInduc: string | null = null;
  curID: string | null = null;
  cuID: string | null = null;
  cID: string | null = null;
  isActive: boolean = false;
  isActiveI: boolean = false;
  isActiveADD: boolean = false;
  isActiveIND: boolean = false;
  activeEditN: boolean = false;
  processes: any;
  NonConformite: any;
  Objectifs: any;
  axe: any;
  activ: boolean = false;
  activeO: boolean = false;
  activeA: boolean = false;
  id: any;
  activeAddN:boolean = false;
  activeAddO:boolean = false;
  activeAddA:boolean = false;


  prosses= {
    code: '',
    description: '',
    objectif:  {
      code: '',
      description: ''
    }
   }
   
   ind={
    code: '',
    libelle: '',
    methode: ''
   } 

   nonconformite= {
    name: ''
  }
  objectif= {
    code: '',
    description: ''
  }
  axeStratigique= {
    axes: ''
  }
  openAddN(): void {
    this.activeAddN = true;
  }
  
  closeAddN(): void {
    this.activeAddN = false;
  }
  openAddO(): void {
    this.activeAddO = true;
  }
  
  closeAddO(): void {
    this.activeAddO = false;
  }
  openAddA(): void {
    this.activeAddA = true;
  }
  
  closeAddA(): void {
    this.activeAddA = false;  
  }
  openAddInd(): void {
    this.isActiveIND = true;
  }
  
  closeAddInd(): void {
    this.isActiveIND = false;
  }

  openDeleteDialogI(InducaterId: string): void {
    this.currentIdInduc = InducaterId;
    this.isActiveI = true;
  }
  
  closeDeleteDialogI(): void {
    this.isActiveI = false;
    this.currentIdInduc = null;
  }

  open(NonCONFId: string): void {
    this.curID = NonCONFId;
    this.activ = true;
  }
  
  close(): void {
    this.activ = false;
    this.curID = null;
  }
  openO(NonCONFId: string): void {
    this.cuID = NonCONFId;
    this.activeO = true;
  }
  
  closeO(): void {
    this.activeO = false;
    this.cuID = null;
  }
  openA(NonCONFId: string): void {
    this.cID = NonCONFId;
    this.activeA = true;
  }
  
  closeA(): void {
    this.activeA = false;
    this.cID = null;
  }
  openDeleteDialog(processId: string): void {
    this.currentId = processId;
    this.isActive = true;
  }
  
  closeDeleteDialog(): void {
    this.isActive = false;
    this.currentId = null;
  }
  openAddDialog(): void {
    this.isActiveADD = true;
  }
  
  closeAddDialog(): void {
    this.isActiveADD = false;
  }

  constructor(public _relation: RelasationService,private act: ActivatedRoute,private router: Router) {}


  ngOnInit(): void {
    this._relation.getAllIndicateurs().subscribe(
      res=>{
        this.Inducateur = res;
      },
      err=>{
        console.log(err);
      }
    );

    this._relation.getAllProcesses().subscribe(
      res => {
        this.processes = res;
    },
      err => {
        console.log(err);
      }
    );
    this._relation.getAllNonConformite().subscribe(
      res => {
        this.NonConformite = res;
      },
      err => {
        console.log(err);
      }
    );
    this._relation.getAllObjectifs().subscribe(
      res => {
        this.Objectifs = res;
      },
      err => {
        console.log(err);
      }
    );
    this._relation.getAllAxe().subscribe(
      res => {
        this.axe = res;
      },
      err => {
        console.log(err);
      }
    );
}
  

  
  deleteProcess(processId: string): void {
    this._relation.deleteProsses(processId).subscribe(
      res=>{
        console.log("supprime succes");
        this.processes= res;
        this.closeDeleteDialog();
        this.ngOnInit();
          const successMessage = document.createElement('div');
          successMessage.className = 'feedback slide-in';
          successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Prossus deleted successfully.';
          const mainContent = document.querySelector('.main-content');
          if (mainContent) {
            mainContent.prepend(successMessage);
          }
          setTimeout(() => {
            successMessage.style.opacity = '0';
            setTimeout(() => {
            successMessage.remove();
          }, 300);
        }, 3000);
      },
      err=>{
        console.log(err);
      } 
    )
  }
  
  addProcess(): void {
    this._relation.addProsses(this.prosses).subscribe(
      res => {
        console.log("add succes");
        this.closeAddDialog();
        this.ngOnInit();
        const successMessage = document.createElement('div');
        successMessage.className = 'feedback slide-in';
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Prossus add successfully.';
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
          mainContent.prepend(successMessage);
        }
       
        setTimeout(() => {
          successMessage.style.opacity = '0';
          setTimeout(() => {
          successMessage.remove();
        }, 300);
      }, 3000);
      },
      err => {
        console.log(err);
      }
    );
  }

  deletIndicateur(id: any) {
    this._relation.deleteIndicateur(id).subscribe(
      res=>{
        console.log("supprime succes");
        this.Inducateur= res;
        this.closeDeleteDialogI();
        this.ngOnInit();
          const successMessage = document.createElement('div');
          successMessage.className = 'feedback slide-in';
          successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Prossus deleted successfully.';
          const mainContent = document.querySelector('.main-content');
          if (mainContent) {
            mainContent.prepend(successMessage);
          }
          setTimeout(() => {
            successMessage.style.opacity = '0';
            setTimeout(() => {
            successMessage.remove();
          }, 300);
        }, 3000);
      },
      err=>{
        console.log(err);
      } 
    )
  } 


  addinducater(): void {
    this._relation.addInducater(this.ind).subscribe(
      res => {
        console.log("add succes");
        this.closeAddInd();
        this.ngOnInit();
        this.ind = { code: '', libelle: '', methode: '' };
        const successMessage = document.createElement('div');
        successMessage.className = 'feedback slide-in';
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Inducateur add successfully.';
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
          mainContent.prepend(successMessage);
        }
        setTimeout(() => {
          successMessage.style.opacity = '0';
          setTimeout(() => {
          successMessage.remove();
        }, 300);
      }, 3000);
      },
      err => {
        console.log(err);
      }
    );
  }


  deleteNonConformite(NonCONFId: string): void {
    this._relation.deleateNonConformite(NonCONFId).subscribe(
      res=>{
        console.log("supprime succes");
        this.NonConformite= res;
        this.close();
        this.ngOnInit();
          const successMessage = document.createElement('div');
          successMessage.className = 'feedback slide-in';
          successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Non Conformite deleted successfully.';
          const mainContent = document.querySelector('.main-content');
          if (mainContent) {
            mainContent.prepend(successMessage);
          }
          setTimeout(() => {
            successMessage.style.opacity = '0';
            setTimeout(() => {
            successMessage.remove();
          }, 300);
        }, 3000);
      },
      err=>{
        console.log(err);
      } 
    )
  }
  deleteObjectif(obId: string): void {
    this._relation.deleateObjectif(obId).subscribe(
      res=>{
        console.log("supprime succes");
        this.Objectifs= res;
        this.closeO();
        this.ngOnInit();
          const successMessage = document.createElement('div');
          successMessage.className = 'feedback slide-in';
          successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Objectif deleted successfully.';
          const mainContent = document.querySelector('.main-content');
          if (mainContent) {
            mainContent.prepend(successMessage);
          }
          setTimeout(() => {
            successMessage.style.opacity = '0';
            setTimeout(() => {
            successMessage.remove();
          }, 300);
        }, 3000);
      },
      err=>{
        console.log(err);
      } 
    )
  }
  deleteAxe(axeId: string): void {
    this._relation.deleateAxe(axeId).subscribe(
      res=>{
        console.log("supprime succes");
        this.axe= res;
        this.closeA();
        this.ngOnInit();
          const successMessage = document.createElement('div');
          successMessage.className = 'feedback slide-in';
          successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Axe deleted successfully.';
          const mainContent = document.querySelector('.main-content');
          if (mainContent) {
            mainContent.prepend(successMessage);
          }
          setTimeout(() => {
            successMessage.style.opacity = '0';
            setTimeout(() => {
            successMessage.remove();
          }, 300);
        }, 3000);
      },
      err=>{
        console.log(err);
      } 
    )
  }



  addnonconformite(): void {
    this._relation.addNonConformite(this.nonconformite).subscribe(
      res => {
        console.log("add succes");
        this.closeAddN();
        this.ngOnInit();
        this.nonconformite = { name: '' };
        const successMessage = document.createElement('div');
        successMessage.className = 'feedback slide-in';
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Non Conformite add successfully.';
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
          mainContent.prepend(successMessage);
        }
        setTimeout(() => {
          successMessage.style.opacity = '0';
          setTimeout(() => {
          successMessage.remove();
        }, 300);
      }, 3000);
      },
      err => {
        console.log(err);
      }
    );
  }
  addobjectif(): void {
    this._relation.addObjectif(this.objectif).subscribe(
      res => {
        console.log("add succes");
        this.closeAddO();
        this.ngOnInit();
        this.objectif = { code: '', description: '' };
        const successMessage = document.createElement('div');
        successMessage.className = 'feedback slide-in';
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Objectif add successfully.';
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
          mainContent.prepend(successMessage);
        }
        setTimeout(() => {
          successMessage.style.opacity = '0';
          setTimeout(() => {
          successMessage.remove();
        }, 300);
      }, 3000);
      },
      err => {
        console.log(err);
      }
    );
  }
  addaxe(): void {
    this._relation.addAxe(this.axeStratigique).subscribe(
      res => {
        console.log("add succes");
        this.closeAddA();
        this.ngOnInit();
        this.axeStratigique = { axes: '' };
        const successMessage = document.createElement('div');
        successMessage.className = 'feedback slide-in';
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Axe add successfully.';
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
          mainContent.prepend(successMessage);
        }
        setTimeout(() => {
          successMessage.style.opacity = '0';
          setTimeout(() => {
          successMessage.remove();
        }, 300);
      }, 3000);
      },
      err => {
        console.log(err);
      }
    );
  }

  openEditN(): void {
    this.activeEditN = true;
  }
}
