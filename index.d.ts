
export type Listener<Payload> = (payload?: Payload) => any

export declare class jSignal<Payload> {
    listen: (listener: Listener<Payload>) => void
    unlisten: (listener: Listener<Payload>) => void
    dispatch: (payload?: Payload) => void
    unlistenAll: () => void
}

declare module 'jsignal' {
    export default jSignal
}
