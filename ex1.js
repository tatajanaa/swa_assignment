//EVENT
function event(options) {
    function time() {
        console.log(`weather was measured at ${options.times} time`)
    }

    function place() {
        console.log(`weather was measured in ${options.places}`)
    }

    return {time, place}
}

//DATE TYPE
function dataType(options) {
    function type() {
        console.log(` there is ${options.value} of ${options.types} ${options.units} `)
    }

    function unit() {
        console.log(`the unit is ${options.units}`)
    }

    return {type, unit}
}

//WEATHER DATA
function weatherData(value, places, times, types, units) {
    const options = {value, places, times, types, units}
    Object.assign(options, event(options), dataType(options), precipitation(options), wind(options), temperature(options))
    return options
}

//WEATHER PREDICTION
function weatherPrediction(to, from,weatherData) {
    const options = {matches, to, from, weatherData}

    function matches(weatherData){
        let isMatch = false
        if(weatherData.value.value <= this.to && weatherData.value.value >= this.from) {
            isMatch = true;
        }
        return isMatch
    }

    Object.assign(options, event(options), dataType(options), precipitation(options), wind(options), temperature(options))
    return options
}

//WEATHER HISTORY
function weatherHistory(currentPeriod, currentPlace, currentType) {

    let _weatherHistory = []

    const setCurrentPlace = (place) => currentPlace = place
    const clearCurrentPlace = () => currentPlace = ''
    const getCurrentPlace = () => currentPlace

    const setCurrentType = (type) => currentType = type
    const clearCurrentType = () => currentType = ''
    const getCurrentType = () => currentType

    const setCurrentPeriod = (start, end) => {
        currentPeriod.start = start;
        currentPeriod.end = end
    }
    const clearCurrentPeriod = () => {
        currentPeriod.start = null;
        currentPeriod.end = null
    }
    const getCurrentPeriod = () => currentPeriod

    const getAllData = () => _weatherHistory

    function data() {
        let weatherDataForPlace = _weatherHistory.filter(item => item.places === currentPlace);
        if (weatherDataForPlace.length !== 0) {
            return weatherDataForPlace
        } else {
            console.log('place not set')
        }
    }

    function add({data: weatherData}) {
        if (weatherData) {
            _weatherHistory.push(weatherData)
        }
    }

    function convert(element) {

        switch (element.types) {
            case 'temp':
                element.types === 'INT' ? element.convertToC() : element.convertToF()
                break;
            case 'precipitation':
                element.types === 'INT' ? element.convertToMM() : element.convertToInches()
                break;
            case 'wind':
                element.types === 'INT' ? element.convertToMS() : element.convertToMPH()
                break;
        }
    }

    const convertToUSUnits = () => {
        let internationalUnits = _weatherHistory.filter(item => item.units === 'INT');
        internationalUnits.forEach(element => convert(element))
    }

    const convertToINTUnits = () => {
        let internationalUnits = _weatherHistory.filter(item => item.units === 'US');
        internationalUnits.forEach(element => convert(element))
    }

    return {
        add,
        getCurrentPlace, setCurrentPlace, clearCurrentPlace,
        getCurrentType, setCurrentType, clearCurrentType,
        getCurrentPeriod, setCurrentPeriod, clearCurrentPeriod,
        getAllData,
        data,
        convertToUSUnits, convertToINTUnits
    }
}

//TEMPERATURE
function temperature(options) {

    function convertToF() {
        let fahrenheit = Math.round((options.value.value * (9 / 5)) + 32);
        options.value.value = fahrenheit
        options.units = 'US'
        return fahrenheit
    }

    function convertToC() {
        let celsius = Math.round((options.value.value - 32 * (9 / 5)));
        options.value.value = celsius
        options.units = 'INT'
        return celsius
    }

    return {convertToF, convertToC}
}

//precipitation
function precipitation(options) {

    function precipitationType() {
        console.log('precitipation type ' + options.value.subtype)
    }

    function convertToInches() {
        let inches = value / 25.4;
        options.value.value = inches
        options.units = 'US'
        return inches
    }

    function convertToMM() {
        let mm = options.value.value * 25.4;
        options.value.value = mm
        options.units = 'INT'
        return mm
    }

    return {convertToMM, convertToInches, precipitationType}
}

//WIND
function wind(options) {

    function direction() {
        console.log('direction of the wind is ' + options.value.subtype)
    }

    function convertToMPH() {
        let mph = options.value.value  * 2.2369362920544
        options.value.value = mph
        options.units = 'US'
        return mph

    }

    function convertToMS() {
        let ms = options.value.value * 0.44704
        options.value.value = ms
        options.units = 'INT'
        return ms
    }

    return {direction, convertToMPH, convertToMS}
}




//creating weather history object
let myWeatherHistory = weatherHistory()

//creating weather data object
let weatherData1 = weatherData({value: 12, subtype: 'North-west'}, 'Horsens', '15:00', 'wind', 'US');
let weatherData2 = weatherData({value: 15, subtype: 'East-west'}, 'Horsens', '16:00', 'wind', 'INT');
let weatherData3 = weatherData({value: 85, subtype: 'North-west'}, 'Horsens', '15:00', 'wind', 'US');
let weatherData4 = weatherData({value: 45, subtype: 'East-west'}, 'Horsens', '16:00', 'wind', 'INT');

let weatherPrediction1 = weatherPrediction(12, 10, weatherData1 )

console.log(weatherPrediction1.matches(weatherData1))

myWeatherHistory.setCurrentPlace('Horsens')
//console.log(myWeatherHistory.getCurrentPlace())
//console.log(myWeatherHistory.data())

//adding weather data to weather history
myWeatherHistory.add({data: weatherData1});
myWeatherHistory.add({data: weatherData2});
myWeatherHistory.add({data: weatherData3});
myWeatherHistory.add({data: weatherData4});

myWeatherHistory.convertToUSUnits();

console.log(myWeatherHistory.data())





