import { Injectable } from '@angular/core';
import firebase from "firebase/compat/app";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {
  collection,
  Firestore,
  addDoc,
  setDoc,
  doc,
  collectionData,
  getDocs,
  getFirestore, writeBatch
} from "@angular/fire/firestore";
import {Puntos} from "../common/user";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Componente} from "../common/Componente";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private ngFireAuth: AngularFireAuth,
              private firestoree: Firestore,
              private http: HttpClient,
              private ngFirestoree: AngularFirestore) { }

  obtenerEjercicios(muscle: string): Observable<any> {
    const apiKey = 'JezKDd58IhrbxlmVdPKFuA==ei9QO9fAQr63mBoy';
    const url = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;
    return this.http.get(url, { headers: { 'X-Api-Key': apiKey } });
  }

  obtenerCaloriasComida(food: string): Observable<any> {
    const apiKey = 'JezKDd58IhrbxlmVdPKFuA==ei9QO9fAQr63mBoy';
    const url = `https://api.api-ninjas.com/v1/nutrition?query=${food}`;
    return this.http.get(url, { headers: { 'X-Api-Key': apiKey } });
  }

  obtenerCaloriasQuemadas(deporte: string): Observable<any> {
    const apiKey = 'JezKDd58IhrbxlmVdPKFuA==ei9QO9fAQr63mBoy';
    const url = `https://api.api-ninjas.com/v1/caloriesburned?activity=${deporte}`;
    return this.http.get(url, { headers: { 'X-Api-Key': apiKey } });
  }

   getComponentesMenu():Observable<Componente[]>{
    return this.http.get<Componente[]>('/assets/data/menu.json');
  }

  async registerUser(email: string, password: string){
    return await this.ngFireAuth.createUserWithEmailAndPassword(email, password)
  }

  async loginUser(email: string, password: string){
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password)
  }

  async resetPassword(email: string){
    return await this.ngFireAuth.sendPasswordResetEmail(email)
  }

  async signOut(){
    return await this.ngFireAuth.signOut()
  }

  async getProfile(){
    return await this.ngFireAuth.currentUser
  }

  async masPuntos(puntos: Puntos) {
    const usuario = collection(this.firestoree, 'puntosPositivos');
    return addDoc(usuario, puntos)
  }

  async menosPuntos(puntos: Puntos) {
    const usuario = collection(this.firestoree, 'puntosNegativos');
    return addDoc(usuario, puntos)
  }

   getCantidadDocumentosEnColeccion(coleccion: string): Observable<number> {
    return new Observable<number>(observer => {
      getDocs(collection(this.firestoree, coleccion)).then(querySnapshot => {
        observer.next(querySnapshot.size);
        observer.complete();
      });
    });
  }

  async eliminarTodosDocumentos(coleccion: string): Promise<void> {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, coleccion));

      const batch = writeBatch(db);
      querySnapshot.forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit();
  }

  async obtenerUIDUsuario(): Promise<string | null> {
    const usuario = await this.ngFireAuth.currentUser;
    if (usuario) {
      return usuario.uid; // Retorna el UID del usuario actual si está autenticado
    } else {
      return null; // Retorna null si no hay usuario autenticado
    }
  }

  // async registroAgua(agua: any) {
  //   const usuario = collection(this.firestoree, 'registroAgua');
  //   return addDoc(usuario, agua)
  // }

  async registroAgua(agua: number) {
    const registro = { cantidad: agua }; // Crear un objeto con la cantidad de agua
    const usuario = collection(this.firestoree, 'registroAgua');
    return addDoc(usuario, registro);
  }

}
