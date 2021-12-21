import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http: HttpClient) {
   }
   getServices() {
     return this.http.get("data/properties.json").pipe(
      map(data => {
        const propertiesArray: Array<any> = [];
        for(const id in data)
        {
          if(data.hasOwnProperty(id))
          {
            if(Array.isArray(data))
            {
              propertiesArray.push((data[parseInt(id)]))
            }
          }
        }
        return propertiesArray;
      })

     );
   }
}
