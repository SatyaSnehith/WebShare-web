const body = document.getElementsByTagName('body')[0]

const mainNav = new Nav(body)

const $ = q => document.getElementById(q)

const green = {
    color: 'green'
}

const red = {
    color: 'red'
}

const p2 = new P('Screen2!', {...green, ...{ fontSize: '20px' }}, { onclick: function() { mainNav.setScreen(screen2) } } )

function openScreen2() {
    mainNav.setScreen(screen2)
}

function openSettingsScreen() {
    mainNav.setScreen(settingsScreen)
}

function changeTheme() {
    const classList = body.classList
    classList.toggle('darkTheme')
    classList.toggle('lightTheme')
}

function openPopup(event) {
    mainNav.setDialog(popup)
    popup.pos(event)
}

const screen1 = new Screen(
    1,
    [
        new Column(
            [
                new Row(
                    [
                        new Button('WebShare', null, {}, { onclick: openPopup } ),
                        new HorizontalSpace('auto'),
                        new Button('Settings', null, {}, { onclick: openSettingsScreen } ),
                        new Button('Theme', null, { }, { onclick: changeTheme } ),
                        new HorizontalSpace('4px'),
                        new IconButton(SettingsIcon, {}, { onclick: openPopup }),
                    ],
                    {
                        alignItems: 'center',
                        padding: '4px'
                    }
                ),
                // new HorizontalDivider()
            ],
            {},
            {
                onclick: openPopup
            }
        ),
    ]
)

const screen2 = new Screen(
    2,
    [
        new P('Dialog!', { }, { onclick: function() { console.log('d'); mainNav.setDialog(dialog) } } ),
    ]
)

const settingsScreen = new Screen(
    2,
    [
        new Button('Theme', null, { }, { onclick: changeTheme } ),
    ]
)


const dialog = new Dialog(
    3,
    [
        new P('x', { }, { onclick: function() { mainNav.setDialog(null) } } ),
    ]
)

const popup = new Popup(
    4,
    [
        new Column(
            [
                new Button('abcd'),
                new Button('efgh'),
                new Button('ijkl'),
            
            ]
        )
    ],
)

mainNav.setScreen(
   screen1
)
