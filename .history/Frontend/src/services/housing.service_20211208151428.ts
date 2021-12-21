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
  getNumber(id: number){
    return 0;
  }

  getAllProperties(SellRent: number): Observable<IPropertyBase[]> {
    return this.http.get("data/properties.json").pipe(
      map(data => {
        const propertiesArray: Array<IPropertyBase> = [];
        const localProperties = JSON.parse(localStorage.getItem("newProperty")!)
        if(localProperties)
        {
          for(const id in localProperties)
          {
            if(SellRent){
              if(Array.isArray(localProperties))
            {
              if(localProperties.hasOwnProperty(id) && localProperties[parseInt(id)].SellRent === SellRent)
              {
                propertiesArray.push((localProperties[parseInt(id)]))
              }
            }
            }
          }
        }
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
    //   let  properties = [];
    //   if(localStorage.getItem('newProperty'))
    //   {
    //     properties = JSON.parse(localStorage.getItem('newProperty') || '{}');
    //     properties = [property, ...properties]
    //   }else {
    //     properties = [property];
    //   }
    //   localStorage.setItem("newProperty", JSON.stringify(properties))
    // }
    let newProp = [property];
    if(localStorage.getItem('newProperty')){
      newProp = [property, ...JSON.parse(localStorage.getItem('newProperty')!)]
    }
    localStorage.setItem('newProperty', JSON.stringify(newProp))
  }

  newPropId() {
    if(localStorage.getItem('PID')){
      localStorage.setItem('PID', ((localStorage.getItem('PID'))! + 1).toString());
      return +localStorage.getItem('PID')!;
    }else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
}
