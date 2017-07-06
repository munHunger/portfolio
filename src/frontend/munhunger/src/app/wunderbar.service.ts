import {Injectable} from "@angular/core";
import {Http, Headers, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {Item} from "./item.model";
import {CookieService} from "angular2-cookie/core";
import {UserService} from "./user.service";

@Injectable()
export class WunderbarService
{
  private baseURL: string = "https://wunderbaren.se/api/wunderbaren";
  private headers: any;

  constructor(private http: Http, private cookieService:CookieService)
  {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //this.headers.append('Access-Control-Allow-Headers', '*');
  }

  public sendMessage(message: string)
  {
    var headers = new Headers();
      headers.append('Content-Type', 'application/X-www-form-urlencoded');
    headers.append('Authorization', UserService.code);
    var body = "message=" + message;
    this.http.post(this.baseURL + "/message", body, {
      headers : headers
    }).subscribe();
  }

  public buyItem(item: string)
  {
    var headers = new Headers();
    headers.append("Authorization", "Bearer " + UserService.code);
    this.http.post(this.baseURL + "/buy?item=" + item, "", {
      headers : headers
    }).subscribe();
  }

  public getCategory(category: string): Observable<any>
  {
    return this.http.get(this.baseURL + "?category=" + category).catch(this.handleError);
  }

  public getCategoryUpdate(category: string, hash: string): Observable<any>
  {
    var headers = new Headers();
    headers.append('Access-Control-Allow-Headers', '*');
    return this.http.get(this.baseURL + "/update?category=" + category + "&hash=" + hash).catch(this.handleError);
  }

  public decrease(name: string)
  {
    const body = new URLSearchParams();
    body.set("name", name);

    return this.http.put(this.baseURL + "/decrease", body.toString(), {
      headers : this.headers
    }).subscribe();
  }

  public increase(name: string)
  {
    const body = new URLSearchParams();
    body.set("name", name);

    return this.http.put(this.baseURL + "/increase", body.toString(), {
      headers : this.headers
    }).subscribe();
  }

  handleError(error:Response | any)
  {
    let errMsg:string;
    errMsg = `${error.status} - ${error.statusText || ''}`;
    if (error.status == 401)
    {
      this.cookieService.remove("token");
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
