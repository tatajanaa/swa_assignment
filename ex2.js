// Modern JavaScript - class
class Event {
    constructor(time, place, type, unit) {
        this.time = time
        this.place = place
        this.type = type
        this.unit = unit
    }
}

class WeatherData extends Event {
    constructor(value, time, place, type, unit) {
        super(time, place, type, unit)
        this.value = value
    }

}

class Temperature extends WeatherData {
    constructor(value) {
        super(value);
    }
}

Temperature.prototype.convertToF = function () {
    return ` ${this.value} celsius is : ${Math.round((this.value * (9 / 5)) + 32)} fahrenheits`
}
Temperature.prototype.convertToC = function () {
    return ` ${this.value} fahrenheits is : ${Math.round((this.value - 32) * (9 / 5))} celsius`
}

class WeatherHistory {
    constructor({currentPeriod, currentPlace, currentType, data}) {
        this.currentPeriod = currentPeriod
        this.currentPlace = currentPlace
        this.currentType = currentType
        this.data = data
    }
}

WeatherHistory.prototype.add = function (data) {
    this.data.push(data)
}


e = new WeatherData(12, '15:00', 'Horsens', 'temp', 'US')
t = new Temperature(e.value)
h = new WeatherHistory({data: []})
console.log(h.data)
h.add(e)
h.add(e)
h.add(e)

console.log(t.convertToC())
