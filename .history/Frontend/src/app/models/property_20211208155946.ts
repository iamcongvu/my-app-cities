import { IPropertyBase } from './ipropertybase';
export class Property implements IPropertyBase {
  Id: number;
  SellRent: number;
  Name: string;
  PType: string; // property type
  BHK: number;
  FType: string; // furnishing type
  Price: number;
  BuiltArea: number | undefined;
  CarpetArea?: number;
  Address: string;
  Address2?: string;
  City: string;
  FloorNo?: string;
  TotalFloor?: string;
  RTM: number; // ready to move
  AOP?: string; // age of property
  MainEntrance?: string;
  Security?: number;
  Gated?: number;
  Maintenance?: number;
  Possession?: string;
  Image?: string;
  Description?: string;
  PostedOn: string;
  PostedBy: number;
}
