import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RelasationService } from 'src/app/relasation.service';

@Component({
  selector: 'app-update-axe',
  templateUrl: './update-axe.component.html',
  styleUrls: ['./update-axe.component.css']
})
export class UpdateAxeComponent implements OnInit{
  constructor(public _relation: RelasationService, private act: ActivatedRoute,private router: Router) {}
    
  currentProcessId: string | null = null;
  isActiveA: boolean = false;
  processes: any;
  prosses: any;
  axes: any;
  Objectifs: any;
  id: any;
  ngOnInit() {
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
    this.isActiveA = true;
    this.id = this.act.snapshot.paramMap.get('id');
    this._relation.getAxeById(this.id).subscribe(
      res => {
        this.axes = res;
      },
      err => {
        console.log(err);
      }
    );
  }
openEditA(): void {
  this.isActiveA = true;
}

UppdateAxes(){
  this._relation.updateAxe(this.id, this.axes).subscribe(
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