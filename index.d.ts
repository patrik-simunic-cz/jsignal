
export type Listener<Payload extends any = void> = (payload?: Payload) => any

export declare class jSignal<Payload extends any = void> {
    listen: (listener: Listener<Payload>) => void
    unlisten: (listener: Listener<Payload>) => void
    dispatch: (payload?: Payload) => void
    unlistenAll: () => void
}

declare module 'jsignal' {
    export default jSignal
}
