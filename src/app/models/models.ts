// To parse this data:
//
//   import { Convert, Welcome } from "./file";
//
//   const welcome = Convert.toWelcome(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface ApiPrueba {
  format: string;
  version: string;
  result: Result;
}

export interface Result {
  _about: string;
  definition: string;
  extendedMetadataVersion: string;
  first: string;
  hasPart: string;
  isPartOf: string;
  items: Item[];
  itemsPerPage: number;
  next: string;
  page: number;
  startIndex: number;
  type: string[];
}

export interface Item {
  _about: string;
  accessURL: string;
  byteSize?: number;
  format: string;
  title: string[] | string;
  type: string;
}

export interface ModelItemDB {
  pk: number;
  item: Item;
}

