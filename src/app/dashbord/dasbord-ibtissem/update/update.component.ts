import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RelasationService } from 'src/app/relasation.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  constructor(public _relation: RelasationService, private act: ActivatedRoute,private router: Router) {}
    
  currentProcessId: string | null = null;
  isActiveADD: boolean = false;
  processes: any;
  prosses: any;
  Objectifs: any;
  id: any;
  ngOnInit() {
    
    this._relation.getAllProcesses().subscribe(
      res => {
        this.processes = res;
    },
      err => {
        console.log(err);
      }
    );
    this.isActiveADD = true;
    this.id = this.act.snapshot.paramMap.get('id');
    this._relation.getProcessById(this.id).subscribe(
      res => {
        this.prosses = res;
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
  }
openAddDialog(): void {
  this.isActiveADD = true;
}

UppdateProcess(){
  this._relation.updateProsses(this.id, this.prosses).subscribe(
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
