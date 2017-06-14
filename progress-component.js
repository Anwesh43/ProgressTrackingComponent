const w = window.innerWidth,h = window.innerHeight
const getTotalSize = (size,gap,n) => size*(n)+gap*(n-1)
class ProgressComponent extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({mode:'open'})
        this.img = document.createElement('img')
        this.type = this.getAttribute('type')||"horizontal"
        if(this.type != "vertical" || this.type != "horizontal") {
            this.type = "horizontal"
        }
        shadow.appendChild(this.img)
        this.imgLoaded = 0
        this.objects = []
        for(var i=0;i<this.children.length;i++) {
            const child = this.children[i]
            this.objects.push(new ProgressObject(child))
        }
    }
    allImageLoaded() {
        return this.imgLoaded == this.children.length
    }

    render() {
        const canvas = document.createElement('canvas')
        var size = w/20,gap = w/12,x = size/2,y = size,ydir = 0,xdir = 1
        var wCanvas = getTotalSize(size,gap,this.objects.length),hCanvas = size*2
        if(this.type == "vertical") {
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
        const context = canvas.getContext('2d')
        context.lineWidth = 3
        this.objects.forEach((object,i)=>{
            context.strokeStyle = '#9E9E9E'
            object.draw(context,x,y,size)
            context.beginPath()
            context.moveTo(x+size/2*xdir,y+size/2*ydir)
            x += (size+gap)*xdir
            y += (size+gap)*ydir
            context.lineTo(x-size/2*xdir,y-size/2*ydir)
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
class ProgressObject {
    constructor(dom) {
        this.src = dom.getAttribute('src')
        this.text = dom.getAttribute('text')
        this.donecb = dom.getAttribute('done')

    }
    loadImage(parent) {
        this.img = new Image()
        if(!this.src) {
            parent.imgLoaded ++
            console.log(this.donecb)
            eval(this.donecb).then((state)=>{
                console.log(state)
                if(state == true) {
                    this.isdone = true
                    parent.render()
                    console.log(this.isdone)
                }
            })
            if(parent.allImageLoaded() == true) {
                parent.render()
            }
            return 0
        }
        this.img.src = this.src

        this.img.onload =() => {
            parent.imgLoaded++
            console.log(this.donecb)
            eval(this.donecb).then((state)=>{
                if(state == "true") {
                    this.isdone = true
                    parent.render()
                }
            })
            if(parent.allImageLoaded() == true) {
                parent.render()


            }
        }
    }
    draw(context,x,y,size) {
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
        context.font = context.font.replace(/\d{2}/,`${size/4}`)
        console.log(context.font)
        context.fillText(this.text,-context.measureText(this.text).width/2,size*3/4)

        context.restore()
    }
}
customElements.define('progress-component',ProgressComponent)
