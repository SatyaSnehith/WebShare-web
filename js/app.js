const nav = {
    body: document.getElementsByTagName('body')[0],

    screen: null,

    dialog: null,

    setScreen: function (newScreen) {
        if (this.screen) {
            this.screen.onunmount()
            this.screen.node.replaceWith(newScreen.node)
        } else {
            this.body.appendChild(newScreen.node)
        }
        this.screen = newScreen
        this.screen.onmount()
    },
    
    setDialog: function (dialog) {
        if (dialog) {
            this.body.appendChild(dialog.node)
            dialog.onmount()
        } else {
            this.body.removeChild(this.dialog.node)
            this.dialog.onunmount()
        }
        this.dialog = dialog

    }
}

const $ = q => document.getElementById(q)

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


const green = {
    color: 'green'
}

const red = {
    color: 'red'
}

const p2 = new P('Screen2!', {...green, ...{ fontSize: '20px' }}, { onclick: function() { nav.setScreen(screen2) } } )

const screen1 = new Screen(
    1,
    [
        p2,
        new P('Change', { fontSize: '20px' }, { onclick: function() { p2.style(red) } } ),
        new A('s', '/js/app.js')
    ]
)

const screen2 = new Screen(
    2,
    [
        new P('Dialog!', { }, { onclick: function() { nav.setDialog(dialog) } } ),
    ]
)

const dialog = new Dialog(
    3,
    [
        new P('x', { }, { onclick: function() { nav.setDialog(null) } } ),
    ]
)

nav.setScreen(
   screen1
)
