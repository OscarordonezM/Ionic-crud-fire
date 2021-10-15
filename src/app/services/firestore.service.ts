import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public Firestone: AngularFirestore) { }

  createReference<tipo>(data: tipo, enlace: string){
      const ref = this.Firestone.collection<tipo>(enlace);
      return ref.add(data);
  }

  deleteReference(){

  }

  getReference(){

  }

  editReference(){

  }

}
