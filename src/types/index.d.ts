export interface Country {
  id: string,
  name: string,
  pictureURL: string,
  capitalLatLng?: [number, number] | undefined,
}

export interface URLParamTypes {
  countryId: string,
}
