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
    temp_max: number,
    grnd_level? : number,
    sea_level?: number,
    temp_kf?: number
}

declare type Wind = {
    speed: number,
    deg: number
}

declare type Clouds = {
    all: number
}
declare type Sys = {
    type?: number,
    id?: number,
    message?: number,
    country?: string,
    sunrise?: number,
    sunset?: number,

    pod?: string
}

declare type City= {
    coord: Coord,
    country: string,
    id: number,
    name: string
}

declare type Rain = {
    '3h': number
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

declare type WeatherForeCastResultItem = {
    clouds: Clouds,
    dt: number,
    dt_txt: string,
    main: Main,
    rain?: Rain,
    sys: Sys,
    weather: Weather,
    wind: Wind
}


declare type WeatherResultStoreState = {
    load: boolean,
    success: boolean,
    result : (WeatherResult | WeatherForeCastResult),
    type: string
}


declare type WeatherForeCastResult = {
    city: City,
    cnt: number,
    cod: string,
    list: WeatherForeCastResultItem[],
    message: number,
}

