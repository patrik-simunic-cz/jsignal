
# jSignal
A simple signal based event handler for JavaScript.

## Install

```
npm install jsignal
```

### Using es2015
```javascript
import jSignal from 'jsignal'
import { default as jSignal } from 'jsignal'
```

### Using CommonJS
```javascript
var jSignal = require('jsignal');
```

## Usage

### Create a new instance of signal
```javascript
const signal = new jSignal()
```

### Listen to signal
```javascript
function onChange(...result) {
    console.log('onChange - got data: ', ...result)
}

signal.listen(onChange)
```

### Dispatch a signal
```javascript
signal.dispatch(1234)
// writes "onChange - got data: 1234"
```

### Unlisten a signal
```javascript
function onAnotherChange(...result) {
    console.log('onAnotherChange - got data: ', ...result)
}

signal.listen(onAnotherChange)
signal.dispatch(1234)
// writes "onChange - got data: 1234"
//        "onAnotherChange - got data: 1234"

signal.unlisten(onChange)
dignal.dispatch(4321)
// writes "onAnotherChange - got data: 4321"
```

### Dispose a signal
Dispose method will unlisten all the listeners on signal.
```javascript
const signal = new jSignal()
signal.listen(function (someData) {
    console.log('1st listener says', someData)
})
signal.listen(function (someData) {
    console.log('2nd listener says', someData)
})
signal.dispatch('Hello there!')
// writes "1st listener says Hello there!"
//        "2nd listener says Hello there!"
signal.dispose()
// removes all listeners from signal
siganl.dispatch('R u still there?')
// nothing happens
```


### Destroy a signal
```javascript
signal.dispose()
```
Destroy method will unlisten all the listeners on signal and set the signal destroyed. This means you cannot listen/unlisten/dispatch on this signal any more. If you'll try to call any of these on a destroyed signal, you'll get an exception.