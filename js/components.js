function fromHTML(html, trim = true) {
    html = trim ? html.trim() : html;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.children[0];
}

class Element {

    constructor(tag, styles, attrs) {
        this.createElement(tag)
        this.style(styles)
        this.attr(attrs)
    }

    createElement(tag) {
        if (tag) {
            this.node = document.createElement(tag)
        }
    }

    content(c) {
        this.node.innerHTML = c
    }


    style(...styles) {
        if (styles) {
            for (let i = 0; i < styles.length; ++i) {
                const style = styles[i]
                if (style) {
                    for (const [key, value] of Object.entries(style)) {
                        this.node.style[key] = value
                    }
                }
            }
        }
    }

    attr(...attrs) {
        if (attrs) {
            for (let i = 0; i < attrs.length; ++i) {
                const attr = attrs[i]
                if (attr) {
                    for (const [key, value] of Object.entries(attr)) {
                        this.node[key] = value
                    }
                }
            }
        }
    }

    add(element) {
        this.node.appendChild(element.node)
    }

    onClick(onclick) {
        this.node.onclick = onclick
    }

    onMouse(over, out) {
        this.node.onmouseover = over
        this.node.onmouseout = out
    }

    hoverStyle(overStyle, outStyle) {
        this.onMouse(
            () => this.style(overStyle),
            () => this.style(outStyle)
        )
    }

    static fromNode(node) {
        const element = new Element()
        element.node = node
        return element
    }
}


class Row extends Element {
    
    constructor(els, style, attr) {
        super('div', style, attr)
        this.style(
            {
                display: 'flex',
                flexDirection: 'row'
            }
        )
        for(const e of els) {
            this.add(e)
        }
    }

}

class Column extends Element {
    
    constructor(els, style, attr) {
        super('div', style, attr)
        this.style(
            {
                display: 'flex',
                flexDirection: 'column'
            }
        )
        for(const e of els) {
            this.add(e)
        }
    }

}

class HorizontalSpace extends Element {
    constructor(margin) {
        super('div', { marginLeft: margin })
    }
}

class VerticalSpace extends Element {
    constructor(margin) {
        super('div', { marginTop: margin })
    }
}

class HorizontalDivider extends Element {
    constructor() {
        super(
            'div',
            { 
                height: '1px',
                backgroundColor: Color.BorderColor
            }
        )
    }
}

class P extends Element {

    constructor(text, style, attr) {
        super('p', style, attr)
        this.style({
            margin: '0px',
            color: Color.TextColor,
        })
        this.content(text)
    }
    
}

class A extends Element {

    constructor(text, href, style, attr) {
        super('a', style, attr)
        this.style({
            margin: '0px',
            color: Color.TextColor,
        })
        this.content(text)
        if (href) {
            this.href(href)
        }
    }

    href(ref) {
        this.node.href = ref
    }
    
}

class SvgIcon extends Element {

    constructor(svg, style, attr) {
        super()
        this.node = fromHTML(svg)
        this.style(style)
        this.style({
            verticalAlign: 'top'
        })
        this.attr(attr)
    }
}

class IconButton extends Element {

    constructor(svg, style, attr) {
        super('div', style, attr)
        this.style({
            display: 'flex',
            padding: '8px',
            borderRadius: '6px'
        })
        this.svg = new SvgIcon(svg)
        this.svg.style(Style.Size('18px'), { pointerEvents: 'none' } )
        this.add(this.svg)
        this.hoverStyle(Style.CardBg, Style.EmptyBg)
    }

    svgStyle(...styles) {
        this.svg.style(styles)
    }

}

class Button extends Element {

    constructor(text, href, style, attr) {
        super('a', style, attr)
        this.style({
            margin: '0px',
            color: Color.TextColor,
        })
        this.hoverStyle(Style.CardBg, Style.EmptyBg)
        this.style(
            Style.BorderRadius('4px'),
            Style.Padding('4px 8px'),
            Style.Pointer
        )
        this.content(text)
        if (href) {
            this.href(href)
        }
    }

    href(ref) {
        this.node.href = ref
    }
    
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
                position: 'absolute',
                backgroundColor: Color.BgColor
            },
            {
    
            }
        )
        this.id = id
        for(const e of els) {
            this.add(e)
        }
        
    }

    onmount() {
        console.log('onmount ' + this.id);
    }

    onunmount() {
        console.log('onunmount ' + this.id);
    }
}

class Popup extends Element {

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
                onclick: (e) => {
                    if(e.target == this.node) {
                        mainNav.setDialog(null)
                    }
                }
            }
        )
        this.id = id

        this.dialogNode = new Element(
            'div',
            {
                width: 'auto',
                padding: '4px',
                backgroundColor: Color.BgColor,
                position: 'absolute',
                borderRadius: '6px',
                ...Style.Border
            },
        )

        this.add(this.dialogNode)

        for(const e of els) {
            this.dialogNode.add(e)
        }

    }

    pos(event) {
        this.clientX = event.clientX
        this.clientY = event.target.getBoundingClientRect().bottom

        const absX = this.clientX + window.scrollX;
        const absY = this.clientY + window.scrollY;
        console.log(absX +" " + absY);

        const bcrParent = this.node.getBoundingClientRect();
        const bcrPopup = this.dialogNode.node.getBoundingClientRect();
        
        const maxX = bcrParent.width - bcrPopup.width - 10;
        const maxY = bcrParent.height - bcrPopup.height - 10;
        console.log(maxX +" " + maxY);
        
        let x = Math.max(0, Math.min(absX, maxX));
        let y = Math.max(0, Math.min(absY, maxY));
        
        if (x < 10) x = 10
        if (y < 10) y = 10
        this.dialogNode.style({
            left: x + "px",
            top: y + "px"
        })
        console.log(x +" " + y);
    }

    onmount() {
        console.log('onmount ' + this.id);
    }

    onunmount() {
        console.log('onunmount ' + this.id);
    }
}

class Dialog extends Element {

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
                onclick: (e) => {
                    if(e.target == this.node) {
                        mainNav.setDialog(null)
                        return false
                    }
                }
            }
        )
        this.id = id
        this.style(
            {
                backgroundColor: '#55555555'
            }
        )
        this.dialogNode = new Element(
            'div',
            {
                width: '300px',
                padding: '16px',
                backgroundColor: Color.BgColor,
                margin: 'auto'
            },
        )
        this.add(this.dialogNode)
        for(const e of els) {
            this.dialogNode.add(e)
        }
    }

    onmount() {
        console.log('onmount ' + this.id);
    }

    onunmount() {
        console.log('onunmount ' + this.id);
    }
}

class Nav {

    constructor(el) {
        this.screen = null
        this.dialog = null
        this.body = el
    }

    setScreen(newScreen) {
        if (this.screen) {
            this.screen.onunmount()
            this.screen.node.replaceWith(newScreen.node)
        } else {
            this.body.appendChild(newScreen.node)
        }
        this.screen = newScreen
        this.screen.onmount()
    }
    
    setDialog(dialog) {
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
