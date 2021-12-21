import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IProperty } from 'src/app/property/IProperty.interface';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http: HttpClient) {
   }
   getAllProperties(SellRent: number) {
     return this.http.get("data/properties.json").pipe(
      map(data => {
        const propertiesArray: Array<IProperty> = [];
        for(const a in data)
        {
          console.log(typeof a)
          if(data.hasOwnProperty(a) && data[parseInt(a)].SellRent == SellRent)
          {
              propertiesArray.push((data[a]))
          }
        }
        return propertiesArray;
      })
     );
   }
}
