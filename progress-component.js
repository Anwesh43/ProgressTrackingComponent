class ProgressComponent extends HTMLElement {
    constructor() {
        super()
        const children = this.children
        const shadow = this.attachShadow({mode:'open'})
        this.img = document.createElement('image')
        this.type = this.getAttribute('type')
        shadow.appendChild(this.img)
    }
    render() {

    }
    connectedCallback() {

    }
}
customElements.define('progress-component',ProgressComponent)
