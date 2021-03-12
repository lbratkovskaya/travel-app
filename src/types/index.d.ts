export interface Country {
  id: string,
  name: string,
  pictureURL: string,
  capitalLatLng: [number, number],
}

export interface URLParamTypes {
  countryId: string,
}
