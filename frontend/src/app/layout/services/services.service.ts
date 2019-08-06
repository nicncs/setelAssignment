import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ServicesService {
    baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.apiUrl;
    }

    getGatewayStatus(): Observable<any> {
        return this.http.get(`${this.baseUrl}`).pipe(
            map(x => x),
            catchError(() => of(false))
        );
    }

    getOrderServiceStatus(): Observable<any> {
        return this.http.get(`${this.baseUrl}/order-service-status`).pipe(
            map(x => x),
            catchError(() => of(false))
        );
    }

    getPaymentServiceStatus(): Observable<any> {
        return this.http.get(`${this.baseUrl}/payment-service-status`).pipe(
            map(x => x),
            catchError(() => of(false))
        );
    }
}
