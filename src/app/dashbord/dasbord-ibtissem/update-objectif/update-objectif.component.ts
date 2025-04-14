import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RelasationService } from 'src/app/relasation.service';

@Component({
  selector: 'app-update-objectif',
  templateUrl: './update-objectif.component.html',
  styleUrls: ['./update-objectif.component.css']
})
export class UpdateObjectifComponent implements OnInit {
  constructor(public _relation: RelasationService, private act: ActivatedRoute,private router: Router) {}
    
  currentProcessId: string | null = null;
  isActiveO: boolean = false;
  processes: any;
  prosses: any;
  objectif: any;
  Inducateur: any;
  axe: any;
  id: any;
  ngOnInit() {
    this._relation.getAllIndicateurs().subscribe(
      res=>{
        this.Inducateur = res;
      },
      err=>{
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
    
    this._relation.getAllProcesses().subscribe(
      res => {
        this.processes = res;
    },
      err => {
        console.log(err);
      }
    );
    this.isActiveO = true;
    this.id = this.act.snapshot.paramMap.get('id');
    this._relation.getObjectifById(this.id).subscribe(
      res => {
        this.objectif = res;
      },
      err => {
        console.log(err);
      }
    );
  }
openEditO(): void {
  this.isActiveO = true;
}

UppdateObjectif(){
  this._relation.updateObjectif(this.id, this.objectif).subscribe(
    res=>{
      console.log(res);
      this.router.navigate(['/dashbordIb']);
    },
    err=>{
      console.log(err);
    }
  );
}

}
