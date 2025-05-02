import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RelasationService {

  private url = 'http://localhost:8070';
  constructor(private http: HttpClient) { }

  getAllProcesses() {
    return this.http.get(this.url + '/processes')
  }
  // DELETE PROCESS
  deleteProsses(id: any) {
    return this.http.delete(this.url + '/processes/' + id);
  }
  // ADD PROCESS
  addProsses(processes: any) {
    return this.http.post(this.url + '/processes', processes); 
  }
  // GET PROCESS BY ID
  getProcessById(id: any) {
    return this.http.get(this.url + '/processes/' + id);
  }
  // UPDATE PROCESS
  updateProsses(id: any, processes: any) {
    return this.http.put(this.url + '/processes/' + id, processes);
  }
  getAllIndicateurs(){
    return this.http.get(this.url + '/inducateur');
  }
  deleteIndicateur(id: any) {
    return this.http.delete(this.url + '/inducateur/' + id);
  }
  addInducater(indicateur: any) {
    return this.http.post(this.url + '/inducateur', indicateur); 
  }
  getInducateurById(id: any) {
    return this.http.get(this.url + '/inducateur/' + id);
  }
  updateInducateur(id: any, indicateur: any) {
    return this.http.put(this.url + '/inducateur/' + id, indicateur);
  }
  getAllObjectifs(){
    return this.http.get(this.url + '/objectif');
  }
  getAllNonConformite(){
    return this.http.get(this.url + '/nonconformece');
  }
  getAllAxe(){
    return this.http.get(this.url + '/axe_stratigique');
  }
  getNonConformiteById(id: any) {
    return this.http.get(this.url + '/nonconformece/' + id);
  }
  getObjectifById(id: any) {
    return this.http.get(this.url + '/objectif/' + id);
  }
  getAxeById(id: any) {
    return this.http.get(this.url + '/axe_stratigique/' + id);
  }
  deleateNonConformite(id: any) {
    return this.http.delete(this.url + '/nonconformece/' + id);
  }
  deleateObjectif(id: any) {
    return this.http.delete(this.url + '/objectif/' + id);
  }
  deleateAxe(id: any) {
    return this.http.delete(this.url + '/axe_stratigique/' + id);
  }
  addNonConformite(nonConformite: any) {
    return this.http.post(this.url + '/nonconformece', nonConformite); 
  }
  addObjectif(objectif: any) {
    return this.http.post(this.url + '/objectif', objectif); 
  }
  addAxe(axe: any) {
    return this.http.post(this.url + '/axe_stratigique', axe); 
  }
  updateNonConformite(id: any, nonConformite: any) {
    return this.http.put(this.url + '/nonconformece/' + id, nonConformite);
  }
  updateObjectif(id: any, objectif: any) {
    return this.http.put(this.url + '/objectif/' + id, objectif);
  }
  updateAxe(id: any, axe: any) {
    return this.http.put(this.url + '/axe_stratigique/' + id, axe);
  }
}
