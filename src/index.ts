
export type Listener<Payload = any> = (payload: Payload) => any

export class jSignal<Payload = any> {
    private listeners: Listener<Payload>[] = []

    public listen = (listener: Listener<Payload>): void => {
        if (typeof listener !== 'function') {
            throw new Error(`listener is expected to be a function, but is of type ${typeof listener}`)
        }

        this.listeners.push(listener)
    }
    
    public unlisten = (listener: Listener<Payload>): void => {
        if (typeof listener !== 'function') {
            throw new Error(`listener is expected to be a function, but is of type ${typeof listener}`)
        }

        const i = this.listeners.indexOf(listener)
        if (i >= 0) {
            delete this.listeners[i]
        }
    }

    public dispatch = (payload?: Payload): void => {
        this.listeners.forEach(async listener => listener(payload))
    }

    public unlistenAll = (): void => {
        this.listeners = []
    }
}

export default jSignal
