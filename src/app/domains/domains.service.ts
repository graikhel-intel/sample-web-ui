/*********************************************************************
* Copyright (c) Intel Corporation 2021
* SPDX-License-Identifier: Apache-2.0
**********************************************************************/
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { Domain } from 'src/models/models'
import { AuthService } from '../auth.service'

@Injectable({
  providedIn: 'root'
})
export class DomainsService {
  private readonly url = `${environment.rpsServer}/api/v1/admin/domains`
  constructor (private readonly authService: AuthService, private readonly http: HttpClient) {

  }

  getData (): Observable<Domain[]> {
    return this.http.get<Domain[]>(this.url, this.authService.getHeaders())
      .pipe(
        catchError((err) => {
          const errorMessages = this.authService.onError(err)
          return throwError(errorMessages)
        })
      )
  }

  getRecord (name: string): Observable<Domain> {
    return this.http.get<Domain>(`${this.url}/${name}`, this.authService.getHeaders())
      .pipe(
        catchError((err) => {
          const errorMessages = this.authService.onError(err)
          return throwError(errorMessages)
        })
      )
  }

  update (domain: Domain): Observable<Domain> {
    return this.http.patch<Domain>(this.url, domain, this.authService.getHeaders())
      .pipe(
        catchError((err) => {
          const errorMessages = this.authService.onError(err)
          return throwError(errorMessages)
        })
      )
  }

  create (domain: Domain): Observable<Domain> {
    return this.http.post<Domain>(this.url, domain, this.authService.getHeaders())
      .pipe(
        catchError((err) => {
          const errorMessages = this.authService.onError(err)
          return throwError(errorMessages)
        })
      )
  }

  delete (name: string): Observable<any> {
    return this.http.delete(`${this.url}/${name}`, this.authService.getHeaders())
      .pipe(
        catchError((err) => {
          const errorMessages = this.authService.onError(err)
          return throwError(errorMessages)
        })
      )
  }
}
