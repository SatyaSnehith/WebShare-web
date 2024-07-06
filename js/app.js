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

const green = {
    color: 'green'
}

const red = {
    color: 'red'
}

const p2 = new P('Screen2!', {...green, ...{ fontSize: '20px' }}, { onclick: function() { nav.setScreen(screen2) } } )

function onWebShareClick() {
    nav.setScreen(screen2)
}

const screen1 = new Screen(
    1,
    [
        new Column(
            [
                new Row(
                    [
                        new Button('WebShare', null, {}, { onclick: onWebShareClick }),
                        new HorizontalSpace('auto'),
                        new Button('Settings'),
                    ],
                    {
                        padding: '8px'
                    }
                ),
                new HorizontalDivider()
            ]
        ),
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
