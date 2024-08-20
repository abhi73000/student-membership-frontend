import { Injectable } from '@angular/core';

const USER = "User";
const TOKEN = "Token";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


  public saveUser(user: any) {
    localStorage.removeItem(USER);
    localStorage.setItem(USER, JSON.stringify(user));
  }


  public saveToken(token: string) {
    localStorage.removeItem(TOKEN);
    localStorage.setItem(TOKEN, token);

  }

  static getToken(): any {
    if (typeof window !== 'undefined')
      return localStorage.getItem(TOKEN);
    // return window.localStorage.getItem(TOKEN);
  }

  static getUser(): any {
    if (typeof window !== 'undefined')
      return JSON.parse(localStorage.getItem(USER));
    // return JSON.parse(localStorage.getItem(USER));
  }

  static getUserId() {
    const user = this.getUser();
    if (user == null) {
      return "";
    } else {
      return user.userId;
    }
  }

  static getUserRole(): string {
    const user = this.getUser();
    if (user == null) {
      return "";
    }
    return user.role;
  }

  static isAdminLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == "ADMIN";
  }

  static isStudentLoggedIn(): boolean {
    if (this.getToken() == null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == "STUDENT";
  }

  static hasToken(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    return true;
  }

  static logout(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
