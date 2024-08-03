export type TWeatherData = {
  location?: TLocation
  current?: TWeather
}

export type TLocation = {
  name: string
  country: string
  localtime: string
}

export type TWeather = {
  temp_c: number
  condition: TCondition
  wind_mph: number
  humidity: number
}

export type TCondition = {
  text: string
  icon: string
}
