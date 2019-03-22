var lg = console.log;

let favoriteCityId = 'rome';
lg(favoriteCityId);
favoriteCityId ='paris';
lg(favoriteCityId);

const citiesId = [ 'paris', 'nyc', 'rome','rio-de-janeiro'];
lg(citiesId);

// citiesId = [];
citiesId.push('tokyo');
lg(citiesId);
function getWeather(cityId) {
    let city = cityId.toUpperCase();
    let temperature = 20;
    return { city, temperature};
}
var weather = getWeather(favoriteCityId);
lg(weather);

const { city: city } = weather;
const { temperature: temperature } = weather;

lg(city);
lg(temperature);
let [parisId, nycId, ...othersCitiesId] = citiesId;
lg(parisId);
lg(nycId);
lg(othersCitiesId.length);

class Trip{
    constructor(id, name, imageUrl){
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    } 
    toString() {
     return this;
    }
    get_price(){
        return this.price;
    }
    set_price(price){
        this.price = price;
    } 
    static getDefaultTrip(){
        return new Trip('rio-de-janeiro', 'Rio-de-janeiro','img/rio-de-janeiro.jpg');
    } 
}

let parisTrip = new Trip('paris','Paris', 'img/paris.jpg');
parisTrip.set_price(100);
lg(parisTrip.toString());
let defaultTrip = Trip.getDefaultTrip();
lg(defaultTrip.toString());

class FreeTrip extends Trip{
    constructor(id, name, imageUrl) {
        super(id, name, imageUrl);
        this.price = 0;
    } 
    toString() {
        return `${this.id} 
${this.name} 
${this.price} 
${this.imageUrl}`;
    }
}

let freeTrip = new FreeTrip('nantes', 'Nantes','img/nantes.jpg');
lg(freeTrip.toString());


class TripService {

    constructor() {
        this.trips = new Set();
        this.trips.add(new Trip('paris', 'Paris', 'img/paris.jpg'));
        this.trips.add(new Trip('rio de janeiro', 'Rio de janeiro', 'img/montpellier.jpg'));
        this.trips.add(new Trip('lorient', 'Lorient', 'img/lorient.jpg'));
 
    }

    findByName(tripName) {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                let tripTrouve = Array.from(this.trips).find(t => t.name === tripName);
                if (tripTrouve){
                    resolve(tripTrouve);
                } else { reject('No trip with name ' + tripName )}
    
            }, 2000)
        });
    }
}

class PriceService {

    constructor() {
        this.prices = new Map();
        this.prices.set('paris',200);
        this.prices.set('rio de janeiro', 800);
    }

    findPriceByTripId(tripId) {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                let prixTrouve = this.prices.get(tripId);
                if (prixTrouve) {
                    resolve('Price found : ' + prixTrouve);
                } else { reject('No trip with name ' + tripId) }

            }, 2000)
        });
    }
}

let tripService = new TripService();
/* tripService.findByName('Paris').then(e => console.log(e));
tripService.findByName('Toulouse').then(e => console.log(e)).catch(function (reject) {
    console.log(reject)
}) */


let priceService = new PriceService();
/* priceService.findPriceByTripId('paris').then(e => console.log(e)).catch(function (reject) {
    console.log(reject)
}) */

// chainer



tripService.findByName('Lorient').then(e => priceService.findPriceByTripId(e.id).then(prix => console.log(prix)).catch(err => console.log(err))).catch(err => console.log(err))
