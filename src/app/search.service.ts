import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  searchDoctors(doctors: Account[], nameQuery: string, specialityQuery: string): Account[] {
    return doctors.filter(doctor => {
      // Check if the nameQuery is not null and doctor's name matches the query
      const nameMatch =
        !nameQuery ||
        (doctor.firstname + ' ' + doctor.lastname).toLowerCase().includes(nameQuery.toLowerCase());
      
      // Check if the specialityQuery is not null and doctor's speciality matches the query
      if (doctor.category != null) {
        const specialityMatch = !specialityQuery || doctor.category.toLowerCase().includes(specialityQuery.toLowerCase());

        // Return true only if both nameMatch and specialityMatch are true
        return nameMatch && specialityMatch;
      }
      
      return false;
    });
  }
}