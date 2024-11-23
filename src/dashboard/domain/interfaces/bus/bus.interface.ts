import { Estado } from "../../enums/estado.enum";

export interface BusResponse {
  busId: number;
  busNum: string;
  busPla: string;
  busFecCre: Date;
  busCar: string;
  busMar: MarcaResponse;
  busEst: Estado;
}

export interface BusFilters {
  size?: number;
  page?: number;
  sort?: string;
  direction?: string;
}

export interface MarcaResponse {
  marId: number;
  marNom: string;
}
