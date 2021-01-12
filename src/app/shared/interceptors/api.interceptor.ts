import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { HandleErrorService } from "../services/handle-error.service";

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    constructor(public handleErrorService: HandleErrorService) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        var token = localStorage.getItem("access_token");
        let request;
        if (req.url.split("/")[0] === "assets") {
            request = req.clone({
                url: `${req.url}`,
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
        } else {
            request = req.clone({
                url: `${environment.API_URL}/${req.url}`,
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
        }

        return next
            .handle(request)
            .pipe(catchError(this.handleErrorService.handleError));
    }
}
