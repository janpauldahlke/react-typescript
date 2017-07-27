declare type Coord = {
    lon: number,
    lat: number
}

declare type Weather = {
    id: number,
    main: string,
    description: string,
    icon: string
}

declare type Main = {
    temp: number,
    pressure: number,
    humidity: number,
    temp_min: number,
    temp_max: number
}

declare type Wind = {
    speed: number,
    deg: number
}

declare type Clouds = {
    all: number
}
declare type Sys = {
    type: number,
    id: number,
    message: number,
    country: string,
    sunrise: number,
    sunset: number
}

declare type WeatherResult = {
    coord: Coord,
    weather: Weather[],
    base: string,
    main: Main,
    visibility: number,
    wind: Wind,
    clouds: Clouds,
    dt: number,
    sys: Sys,
    id: number,
    name: string,
    cod: number
}

declare type WeatherResultStoreState = {
    load: boolean,
    success: boolean,
    result : WeatherResult | WeatherForeCastResult
    type: string
}

interface IWeather {
    id: number,
    main: string,
    description: string,
    icon: string
}

declare type WeatherForeCastResult = {

}