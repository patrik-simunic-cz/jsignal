
# jSignal
A simple signal based event handler for JavaScript.

## Install

```
npm install jsignal
```

### Using es2015
```javascript
import jSignal from 'jsignal'
import * as jSignal from 'jsignal'
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
```javascript
signal.dispose()
```
Dispose method will unlisten all the listeners on signal and set the signal disposed. You cannot listen again on disposed signal. If you'll try to call ```signal.listen(callback)``` on a disposed trigger, you'll get an error.