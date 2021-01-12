import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PatientService {

    constructor(
        private http: HttpClient
    ) { }

    getDetailPatient(patientId: number) {
        return this.http
            .get(`api/patient?PatientId=${patientId}`)
            .pipe(map((res: any) => res.Payload));
    }
}
