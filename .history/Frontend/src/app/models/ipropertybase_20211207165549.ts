export interface IPropertyBase {
  Id?: number,
  SellRent?: number,
  Name?: string,
  PType: string,
  FType: string,
  Price?: number,
  BHK?: number,
  BuiltArea: number | undefined,
  City: string,
  RTM?: number,
  Image?: string
}
