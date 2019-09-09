class airport {
    constructor(airportID, name, city,
        country, IATA, ICAO, latitude, longitude) {
        this.airportID = airportID
        this.name = name
        this.city = city
        this.country = country
        this.IATA = IATA
        this.ICAO = ICAO
        this.latitude = latitude
        this.longitude = longitude
    }
}

module.exports = airport