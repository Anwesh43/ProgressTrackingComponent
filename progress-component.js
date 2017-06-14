class ProgressComponent extends HTMLElement {
    constructor() {
        super()
        const children = this.children
        const shadow = this.attachShadow({mode:'open'})
        this.img = document.createElement('image')
        this.type = this.getAttribute('type')
        shadow.appendChild(this.img)
        this.progressObjects = children.map(())
        this.imgLoaded = 0

    }
    allImageLoaded() {
        return this.imgLoaded ==
    }
    render() {

    }
    connectedCallback() {
        this.objects = children.map((child)=>new ProgressObject(child,parent))
    }
}
customElements.define('progress-component',ProgressComponent)
class ProgressObject {
    constructor(dom,parent) {
        const src = dom.getAttribute('src')
        this.text = dom.getAttribute('text')
        this.donecb = dom.getAttribute('done')
        this.donecb().then((state)=>{
            this.isdone = state
        })
        this.img = new Image()
        this.img.src = src
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
