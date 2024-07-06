
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
        this.node.innerHTML = text
    }
    
}

class A extends Element {

    constructor(text, href, style, attr) {
        super('a', style, attr)
        this.style({
            margin: '0px',
            color: Color.TextColor,
        })
        this.node.innerHTML = text
        if (href) {
            this.href(href)
        }
    }

    href(ref) {
        this.node.href = ref
    }
    
}

class Button extends Element {

    constructor(text, href, style, attr) {
        super('a', style, attr)
        this.style({
            margin: '0px',
            color: Color.TextColor,
        })
        this.style(Card)
        this.onMouse(
            () => {
                this.style(
                    {
                        backgroundColor: Color.SecBgColor
                    }
                )
            }
            ,
            () => {
                this.style(
                    {
                        backgroundColor: ''
                    }
                )
            }
        )
        this.node.innerHTML = text
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
            this.dialogNode.node.appendChild(e.node)
        }        
    }

    onmount() {
        console.log('onmount ' + this.id);
    }

    onunmount() {
        console.log('onunmount ' + this.id);
    }
}
