
class jSignal {
    _listeners = [ ]

    listen(listener) {
        if (this._listeners === undefined || this._listeners === null)
            return console.error('Cannot listen on destroyed jSignal;', 'listener:', listener)
        if (typeof listener !== 'function') throw new Error('jSignal.listen expects a function')
        this._listeners.push(listener)
    }

    unlisten(listener) {
        if (this._listeners === undefined || this._listeners === null)
            return console.error('Cannot unlisten on destroyed jSignal;', 'listener:', listener)
        if (typeof listener !== 'function') throw new Error('jSignal.unlisten expects a function')
        const listenerIndex = this._listeners.indexOf(listener)
        delete this._listeners[listenerIndex]
    }

    dispatch(...payload) {
        if (this._listeners === undefined || this._listeners === null)
            return console.error('Cannot dispatch destroyed jSignal;', 'with payload:', ...payload)
        this._listeners.map(listener => listener(...payload))
    }

    dispose() {
        if (this._listeners === undefined || this._listeners === null)
            return console.error('Cannot dispose destroyed jSignal')
        this._listeners = [ ]
    }

    destroy() {
        this._listeners = null
    }
}

export default jSignal
