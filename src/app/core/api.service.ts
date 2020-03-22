import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {}

  fetchDataFromGoogle() {
    return this.http.get("/static.aoni.io/demo/user.json");
  }
}
