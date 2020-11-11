import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule,
} from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class GetTimeService {
  constructor(private http: HttpClient) {}

  getVideoTime(url: string) {
    return this.http.get(url);
  }
}
