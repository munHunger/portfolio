import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {CookieService} from "angular2-cookie/core";

@Injectable()
export class UserService
{
  public isLoggedIn: boolean = false;
  public requestLogin: boolean = false;
  public static code: string;

  private baseURL: string = "http://localhost/api";
  private headers: any;

  public static cookieService:CookieService;

  public userData: any;

  public inRole(role:string):boolean
  {
    if(this.userData && this.userData.roles)
      for(let i = 0; i < this.userData.roles.length; i++)
        if(role === this.userData.roles[i])
          return true;
    return false;
  }

  constructor(private http: Http, public cookieService:CookieService)
  {
    UserService.cookieService = cookieService;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //this.headers.append('Access-Control-Allow-Headers', '*');
  }

  public getBalance()
  {
    let url = this.baseURL + "/wunderbaren/balance";
    if(this.userData && this.userData.balance)
      url += "?balance=" + this.userData.balance;
    this.http.get(url, {
      headers : this.headers
    }).subscribe(res => {
      if(this.userData)
        this.userData.balance = res.json().balance;
      this.getBalance();
    });
  }

  public setCode(code: string)
  {
    UserService.code = code;
    this.headers.append("Authorization", "Bearer " + UserService.code);
    this.http.get(this.baseURL + "/oauth/user", {
      headers : this.headers
    }).map(res => res.json()).catch(this.handleError).subscribe(res => {
      this.userData = res;
      this.getBalance();
    });
  }

  handleError(error:Response | any)
  {
    let errMsg:string;
    errMsg = `${error.status} - ${error.statusText || ''}`;
    if (error.status == 401)
    {
      console.log("removing token as user is unauthorized");
      UserService.cookieService.removeAll();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
