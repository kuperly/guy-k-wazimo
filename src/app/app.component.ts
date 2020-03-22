import { Component, OnInit } from "@angular/core";
import { catchError, finalize, mergeMap } from "rxjs/operators";
import { of, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiService } from "./core/api.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public tableData;
  public tableDataFiltered;
  public loading = false;

  public filters = {
    first_name: "",
    last_name: "",
    email: "",
    gender: ""
  };
  public fnModule = "";
  public lnModule = "";
  public emailModule = "";
  public genderModule = "";

  constructor(private http: HttpClient, private apiService: ApiService) {}

  ngOnInit(): void {
    this.loading = true;

    this.apiService
      .fetchDataFromGoogle()
      .pipe(
        mergeMap(res => {
          this.tableData = this.tableDataFiltered = res;
          return of(res);
        }),
        catchError(err => {
          return throwError(err);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(res => {});
  }

  onColFilterChanged() {
    this.tableDataFiltered = this.tableData.filter(row => {
      return (
        (!this.filters.first_name ||
          row["first_name"].toLowerCase().indexOf(this.filters.first_name) !==
            -1) &&
        (!this.filters.last_name ||
          row["last_name"].toLowerCase().indexOf(this.filters.last_name) !==
            -1) &&
        (!this.filters.email ||
          row["email"].toLowerCase().indexOf(this.filters.email) !== -1) &&
        (!this.filters.gender ||
          row["gender"].toLowerCase().indexOf(this.filters.gender) !== -1)
      );
    });
  }
}
