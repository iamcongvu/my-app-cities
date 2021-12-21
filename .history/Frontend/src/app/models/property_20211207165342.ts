import { IPropertyBase } from "src/app/models/ipropertybase";

export class Property implements IPropertyBase {
  Id?: number | undefined;
  SellRent?: number | undefined;
  Name?: string | undefined;
  PType: string;
  FType: string;
  Price?: number | undefined;
  BHK?: number | undefined;
  BuiltArea: number;
  City: string;
  RTM?: number | undefined;
  Image?: string | undefined;
}
