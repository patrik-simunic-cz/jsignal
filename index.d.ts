
import {
    jSignal as JSignal,
} from './src'

declare module 'jsignal' {
    export class jSignal<Payload> extends JSignal<Payload> {}
    export default JSignal
}
