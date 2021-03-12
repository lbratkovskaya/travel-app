export interface Country {
  id: string,
  pictureURL: string,
  capitalLatLng?: [number, number] | undefined,
  nameEN: string,
  nameRU: string,
  nameDE: string,
  capitalEN: string,
  capitalRU: string,
  capitalDE: string,
  infoEN: string,
  infoRU: string,
  infoDE: string,
  currency: string,
  videoURL: string
}

export interface URLParamTypes {
  countryId: string,
}
