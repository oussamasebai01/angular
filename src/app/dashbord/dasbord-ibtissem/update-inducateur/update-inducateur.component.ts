import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RelasationService } from 'src/app/relasation.service';

@Component({
  selector: 'app-update-inducateur',
  templateUrl: './update-inducateur.component.html',
  styleUrls: ['./update-inducateur.component.css']
})
export class UpdateInducateurComponent implements OnInit {

  Inducateur: any;
  currentProcessId: string | null = null;
  currentIdInduc: string | null = null;
  isActiveADD: boolean = false;
  isActiveIND: boolean = false;
  processes: any;
  prosses: any;
  ind: any;
  id: any;
  Objectifs: any;

      constructor(public _relation: RelasationService, private act: ActivatedRoute,private router: Router) {}
      

      ngOnInit() {
        this._relation.getAllIndicateurs().subscribe(
          res=>{
            this.Inducateur = res;
          },
          err=>{
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
        this._relation.getAllProcesses().subscribe(
          res => {
            this.processes = res;
        },
          err => {
            console.log(err);
          }
        );
        this.isActiveIND = true;
        this.id = this.act.snapshot.paramMap.get('id');
        this._relation.getInducateurById(this.id).subscribe(
          res => {
            this.ind = res;
          },
          err => {
            console.log(err);
          }
        );
      }
    
    UppdateInducateur(){
      this._relation.updateInducateur(this.id, this.ind).subscribe(
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
