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

class Planet {
    constructor(solar, size, image, distance, speed=0.1) {
        this.solar = solar
        this.size = size
        this.distance = distance
        this.speed = speed
        this.planetEl = document.createElement('div');
        this.planetEl.className = 'full-rounded';
        this.planetEl.style.width = this.size+'px';
        this.planetEl.style.height = this.size+'px';
        this.planetEl.style.backgroundImage = `url(${image})`;
        this.planetEl.style.backgroundSize = `contain`;
        this.planetEl.style.backgroundRepeat = `no-repeat`;
        this.planetEl.style.backgroundPosition = `center center`;
        this.planetEl.style.marginTop = -(size/2)
        this.planetEl.style.marginLeft = -(size/2)
        this.planetEl.style.top = this.solar.center.top - size/2 + 'px'
        this.planetEl.style.left = this.solar.center.left + distance - size/2 + 'px'
        this.solar.solarSystem.append(this.planetEl)
        this.start()
        
    }
    


    start() {
        let currentDeg = 0
        let rotateDeg = 0
        const center = this.solar.center
        const interval = setInterval(() => {
            const xDistance = Math.cos(rad(currentDeg)) * this.distance - this.size/2
            const left = center.left + xDistance
            
            
            const yDistance = Math.sin(rad(currentDeg)) * this.distance + this.size/2
            const top = center.top - yDistance
            
            this.planetEl.style.left = left + 'px';
            this.planetEl.style.top = top + 'px';

            sun.style.rotate = rotateDeg + 'deg'
            this.planetEl.style.rotate = rotateDeg + 'deg'

            currentDeg += this.speed
            rotateDeg += 0.1


        }, 1); 
    }
}



const solar = new SolarSystem('solar-system', 'sun')
const mercury = new Planet(solar, 10040/400, 'images/mercury.png', 140, 47.9/500)
const venus = new Planet(solar, 35051/400, 'images/venus.png', 190, 35/500)
const earth = new Planet(solar, 50378/400, 'images/earth.png', 310, 29.8/500)
const mars = new Planet(solar, 20397/400, 'images/mars.png', 430, 24.1/500)
const jupiter = new Planet(solar, 71492/400, 'images/jupiter.png', 590, 131/500)
const saturn = new Planet(solar, 80268/400, 'images/saturn.png', 840, 9.6/500)
const uranus = new Planet(solar, 25559/400, 'images/uranus.png', 999, 6.8/500)
const neptune = new Planet(solar, 24764/400, 'images/neptune.png', 1100, 5.5/500)