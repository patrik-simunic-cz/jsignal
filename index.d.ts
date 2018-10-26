
import { jSignal as JSignal } from './src'

declare module 'jsignal' {
    export class jSignal extends JSignal {}
    export default JSignal
}
