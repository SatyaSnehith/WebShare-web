const body = {
    el: document.getElementsByTagName('body')[0],

    screen: null,

    setScreen: function (newScreen) {
        if (this.screen) {
            this.screen.onunmount()
            this.screen.node.replaceWith(newScreen.node)
        } else {
            this.el.appendChild(newScreen.node)
        }
        this.screen = newScreen
        this.screen.onmount()
    }
}

body.el.style.margin = '0px'

const $ = q => document.getElementById(q)

class Element {

    constructor(tag, styles, attrs) {
        this.node = document.createElement(tag)
        this.style(styles)
        this.attr(attrs)
    }


    style(style) {
        if (style) {
            for (const [key, value] of Object.entries(style)) {
                this.node.style[key] = value
            }
        }
    }

    attr(attrs) {
        if (attrs) {
            for (const [key, value] of Object.entries(attrs)) {
                this.node[key] = value
            }
        }
    }

    onClick(onclick) {
        this.node.onclick = onclick
    }
}

class P extends Element {

    constructor(text, style, attrs) {
        super('p', style, attrs)
        this.style({
            margin: '0px'
        })
        this.node.innerHTML = text
    }
    
}

class A extends Element {

    constructor(text, style, attrs) {
        super('a', style, attrs)
        this.node.innerHTML = text
    }
    
}

function row(
    els
) {
    const div = Element('div', {
        display: 'flex',
        flexDirection: 'row'
    })
    for(e of els) {
        div.appendChild(e)
    }
    return div
}

class Screen extends Element {

    constructor(id, els) {
        super(
            'div', 
            {
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                position: 'absolute'
            },
            {
    
            }
        )
        this.id = id
        for(const e of els) {
            this.node.appendChild(e.node)
        }
        
    }

    onmount() {
        console.log('onmount ' + this.id);
    }

    onunmount() {
        console.log('onunmount ' + this.id);
    }
}

const green = {
    color: 'green'
}

const red = {
    color: 'red'
}

const p2 = new P('Screen2!', {...green, ...{ fontSize: '20px' }}, { onclick: function() { body.setScreen(screen2) } } )

const screen1 = new Screen(
    1,
    [
        p2,
        new P('Change', { fontSize: '20px' }, { onclick: function() { p2.style(red) } } ),
    ]
)

const screen2 = new Screen(
    2,
    [
        new P('Screen1!', { }, { onclick: function() { body.setScreen(screen1) } } ),
    ]
)

body.setScreen(
   screen1
)
