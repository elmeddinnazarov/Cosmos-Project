class SolarSystem {
    constructor(solarSystemId, sunId) {
        this.solarSystem =document.querySelector('#'+ solarSystemId)
        this.sun =document.querySelector('#'+ sunId)


    }

    get center() {
        const sunPosition = this.sun.getBoundingClientRect()
        const top = sunPosition.top + sunPosition.height/2;
        const left = sunPosition.left + sunPosition.width/2;
        return {top, left}
    }


}


function rad(deg) {
    return deg * Math.PI / 180
}


class CosmosObject {
    constructor(centerObject, size, image, distance, speed=0.1) {
        this.size = size
        this.distance = distance
        this.speed = speed
        this.element = document.createElement('div');
        this.element.className = 'full-rounded';
        this.element.style.width = this.size+'px';
        this.element.style.height = this.size+'px';
        this.element.style.backgroundImage = `url(${image})`;
        this.element.style.backgroundSize = `contain`;
        this.element.style.backgroundRepeat = `no-repeat`;
        this.element.style.backgroundPosition = `center center`;
        this.centerObject = centerObject
        this.element.style.top = this.centerObject.center.top - size/2 + 'px'
        this.element.style.left = this.centerObject.center.left + distance - size/2 + 'px'
        this.start()
    }
    

    get center() {
        const rect = this.element.getBoundingClientRect()
        const top = rect.top + rect.height/2;
        const left = rect.left + rect.width/2;
        return {top, left}
    }

    start() {
        let currentDeg = 0
        let rotateDeg = 0
        const interval = setInterval(() => {
            const center = this.centerObject.center
            const xDistance = Math.cos(rad(currentDeg)) * this.distance - this.size/2
            const left = center.left + xDistance
            
            
            const yDistance = Math.sin(rad(currentDeg)) * this.distance + this.size/2
            const top = center.top - yDistance
            
            this.element.style.left = left + 'px';
            this.element.style.top = top + 'px';


            currentDeg += this.speed
            rotateDeg += 0.1


        }, 1); 
    }
}



class Planet extends CosmosObject{
    constructor(solar, size, image, distance, speed=0.1) {
        super(solar, size, image, distance, speed)
        solar.solarSystem.append(this.element)
        
    }

}


class Satellite extends CosmosObject{
    constructor(solar, planet, size, image, distance, speed){
        super(planet, size, image, distance, speed)
        solar.solarSystem.append(this.element)
    }

}
const solar = new SolarSystem('solar-system', 'sun')
const mercury = new Planet(solar, 10040/400, 'images/mercury.png', 140, 47.9/500)
const venus = new Planet(solar, 35051/400, 'images/venus.png', 190, 35/500)
const earth = new Planet(solar, 50378/400, 'images/earth.png', 320, 29.8/500)
const mars = new Planet(solar, 20397/400, 'images/mars.png', 460, 24.1/500)
const jupiter = new Planet(solar, 71492/400, 'images/jupiter.png', 690, 131/500)
const saturn = new Planet(solar, 80268/400, 'images/saturn.png', 1100, 9.6/500)
const uranus = new Planet(solar, 25559/400, 'images/uranus.png', 1360, 6.8/500)
const neptune = new Planet(solar, 24764/400, 'images/neptune.png', 1450, 5.5/500)

const moon = new Satellite(solar, earth, 30, 'images/moon.png', 80, 0.1)

const galilean = new Satellite(solar, jupiter, 40, 'images/moon.png', 170, -0.1)
const europe = new Satellite(solar, jupiter, 50, 'images/moon.png', 120, 0.1)

const enceladus = new Satellite(solar, saturn, 10, 'images/moon.png', 125, 0.05)
const enceladus2 = new Satellite(solar, saturn, 15, 'images/moon.png', 155, -0.09)
const enceladus3 = new Satellite(solar, saturn, 20, 'images/moon.png', 165, 0.11)
const enceladus4 = new Satellite(solar, saturn, 17, 'images/moon.png', 175, 0.15)
const enceladus5 = new Satellite(solar, saturn, 13, 'images/moon.png', 185, -0.18)
const enceladus6 = new Satellite(solar, saturn, 12, 'images/moon.png', 195, 0.2)




class Stars {
    constructor(starsId, starCount=200) {
        this.starCount = starCount;
        this.starsEl = document.querySelector('#'+starsId);
        this.rect = this.starsEl.getBoundingClientRect();
    }

    _createStar(top, left) {
        const star = document.createElement('div')
        star.style.width = '5px';
        star.style.height = '5px';
        star.className = 'star';
        star.style.top = top + 'px';
        star.style.left = left + 'px';
        this.starsEl.append(star);

    }

    setStars(){
        for (let i=0; i<this.starCount; i++) {
            const left =5 + Math.floor(Math.random() * this.rect.width-10);
            const top =5 + Math.floor(Math.random() * this.rect.height-10);
            this._createStar(top, left)
        }    
    }
}


const stars = new Stars('stars')
stars.setStars()