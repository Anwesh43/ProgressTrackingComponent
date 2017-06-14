const w = window.innerWidth,h = window.innerHeight
const getTotalSize = (size,gap,n) => size*(n)+gap*(n-1)
class ProgressComponent extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({mode:'open'})
        this.img = document.createElement('image')
        this.type = this.getAttribute('type')||"horizontal"
        if(this.type != "vertical" || this.type != "horizontal") {
            this.type = "horizontal"
        }
        shadow.appendChild(this.img)
        this.progressObjects = children.map(())
        this.imgLoaded = 0
        this.objects = this.children.map((child)=>new ProgressObject(child))
    }
    allImageLoaded() {
        return this.imgLoaded == this.children.length
    }

    render() {
        const canvas = document.createElement('canvas')
        var size = w/20,gap = w/12,x = size/2,y = size,ydir = 0,xdir = 1
        var wCanvas = getTotalSize(size,gap,this.objects.length),hCanvas = size*2
        if(type == "vertical") {
            size = h/20
            gap = h/12
            x = size
            y = size/2
            wCanvas = 2*size
            hCanvas = getTotalSize(size,gap,this.objects.length)
            xdir = 0
            ydir = 1
        }

        canvas.width = wCanvas
        canvas.height = hCanvas
        context = canvas.getContext('2d')
        this.objects.forEach((object,i)=>{
            object.draw(context,x,y,size)
            context.strokeStyle = 'black'
            context.beginPath()
            context.moveTo(x+size/2*xdir,y+size/2*ydir)
            x += (size+gap)*xdir
            y += (size+gap)*ydir
            context.lineTo(x-size/2*xdir,y-size/2*ydit)
            context.stroke()
        })
        this.img.src = canvas.toDataURL()
    }
    connectedCallback() {
        this.objects.forEach((object)=>{
            object.loadImage(this)
        })
    }
}
customElements.define('progress-component',ProgressComponent)
class ProgressObject {
    constructor(dom) {
        this.src = dom.getAttribute('src')
        this.text = dom.getAttribute('text')
        this.donecb = dom.getAttribute('done')
        this.donecb().then((state)=>{
            this.isdone = state
        })
    }
    loadImage(parent) {
        this.img = new Image()
        if(!this.src) {
            parent.imgLoaded ++
            if(parent.allImageLoaded() == true) {
                parent.render()
            }
            return 0
        }
        this.img.src = this.src

        this.img.onload =() => {
            parent.imgLoaded++
            if(parent.allImageLoaded() == true) {
                parent.render()
            }
        }
    }
    draw(context,x,y,size) {
        context.strokeStyle = '#9E9E9E'
        context.fillStyle = 'orange'
        context.save()
        context.translate(x,y)
        context.beginPath()
        context.arc(0,0,size/2,0,2*Math.PI)
        context.stroke()
        if(this.isdone && this.isdone == true) {
            context.fill()
        }
        context.drawImage(this.img,-size/4,-size/4,size/2,size/2)
        context.fillStyle = '#9E9E9E'
        context.fillText(this.text,-context.measureText(this.text).width/2,size)
        context.font = context.font.replace(/\d{2}/,size/4)
        context.restore()
    }
}
