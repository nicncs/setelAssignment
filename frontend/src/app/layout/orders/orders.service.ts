import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from './interface/order.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.apiUrl;
    }

    async getOrders(): Promise<Order[]> {
        return this.http.get<Order[]>(`${this.baseUrl}/orders`).toPromise();
    }

    getOrder(id: string | number): Observable<Order> {
        return this.http.get<Order>(`${this.baseUrl}/orders/${id}`);
    }

    async addDummyOrder(): Promise<Order> {
        return this.http
            .post<Order>(`${this.baseUrl}/orders`, {
                article: Math.random()
                    .toString(36)
                    .substring(7),
                quantity: Math.floor(Math.random() * 100) + 1,
                price: Math.random() * 100,
                options: Math.random()
                    .toString(36)
                    .substring(7)
            })
            .toPromise();
    }

    async cancelOrder(id: string | number): Promise<Order> {
        return this.http
            .delete<Order>(`${this.baseUrl}/orders/${id}`)
            .toPromise();
    }
}
