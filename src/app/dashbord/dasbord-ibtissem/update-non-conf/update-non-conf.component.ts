import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RelasationService } from 'src/app/relasation.service';

@Component({
  selector: 'app-update-non-conf',
  templateUrl: './update-non-conf.component.html',
  styleUrls: ['./update-non-conf.component.css']
})
export class UpdateNonConfComponent implements OnInit {
  constructor(public _relation: RelasationService, private act: ActivatedRoute,private router: Router) {}
    
  currentProcessId: string | null = null;
  activeEditN: boolean = false;
  processes: any;
  prosses: any;
  NonConformite: any;
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
    this.activeEditN = true;
    this.id = this.act.snapshot.paramMap.get('id');
    this._relation.getNonConformiteById(this.id).subscribe(
      res => {
        this.NonConformite = res;
      },
      err => {
        console.log(err);
      }
    );
  }
openAddDialog(): void {
  this.activeEditN = true;
}

UppdateNonConf(){
  this._relation.updateNonConformite(this.id, this.NonConformite).subscribe(
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
