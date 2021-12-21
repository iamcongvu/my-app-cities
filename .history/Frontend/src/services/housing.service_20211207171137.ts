import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPropertyBase } from 'src/app/models/ipropertybase';
import { Property } from 'src/app/models/property';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http: HttpClient) {
   }
  getAllProperties(SellRent: number): Observable<IPropertyBase[]> {
    return this.http.get("data/properties.json").pipe(
      map(data => {
        const propertiesArray: Array<IPropertyBase> = [];
        for(const id in data)
        {
          if(Array.isArray(data))
          {
            if(data.hasOwnProperty(id) && data[parseInt(id)].SellRent === SellRent)
            {
              propertiesArray.push((data[parseInt(id)]))
            }
          }
        }
        return propertiesArray;
      })
    );
   }
   addProperty(property: Property){
     localStorage.setItem("newProperty", JSON.stringify(property))
   }
}
