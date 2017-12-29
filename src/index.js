
class jSignal {
    _listeners = [ ]

    listen() {
        if (this._listeners === undefined || this._listeners === null) {
            throw new Error('Cannot listen on destroyed jSignal')
        }
        for (let i in arguments) {
            if (typeof arguments[i] !== 'function') {
                console.error('jSignal.listen expects a function (or functions), but got ', typeof arguments[i], '; on paramentr number ', i)
            } else {
                this._listeners.push(arguments[i])
            }
        }
    }
    
    unlisten() {
        if (this._listeners === undefined || this._listeners === null) {
            throw new Error('Cannot unlisten on destroyed jSignal')
        }
        for (let i in arguments) {
            if (typeof arguments[i] !== 'function') {
                console.error('jSignal.unlisten expects a function (or functions), but got ', typeof arguments[i], '; on paramentr number ', i)
            } else {
                const listenerIndex = this._listeners.indexOf(arguments[i])
                if (listenerIndex != -1) { }
                delete this._listeners[listenerIndex]
            }
        }
    }

    dispatch(...payload) {
        if (this._listeners === undefined || this._listeners === null) {
            throw new Error('Cannot dispatch an destroyed jSignal')
        }
        if (this._listeners === undefined || this._listeners === null) {
            return console.error('Cannot dispatch destroyed jSignal;', 'with payload:', ...payload)
        }
        this._listeners.map(listener => listener(...payload))
    }

    dispose() {
        if (this._listeners === undefined || this._listeners === null) {
            throw new Error('Cannot dispose destroyed jSignal')
        }
        this._listeners = [ ]
    }

    destroy() {
        this._listeners = null
    }
}

export default jSignal
