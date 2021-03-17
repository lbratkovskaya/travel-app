export interface Country {
  id: string,
  pictureURL: string,
  capitalLatLng?: [number, number],
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
  capitalTimeZone: string,
}

export interface URLParamTypes {
  countryId: string,
}

export interface Sight {
  _id: string,
  countryId: string,
  rate: number,
  titleEN: string,
  titleRU: string,
  titleDE: string,
  infoEN: string,
  infoRU: string,
  infoDE: string,
  pictureURL: string,
}

export interface Review {
  user: string,
  rate: number,
  sightId: string,
  review?: string,
}
