// @ts-nocheck
function CBuffer() {
  // handle cases where "new" keyword wasn't used
  if (!(this instanceof CBuffer)) {
    // multiple conditions need to be checked to properly emulate Array
    if (arguments.length > 1 || typeof arguments[0] !== "number") {
      return CBuffer.apply(new CBuffer(arguments.length), arguments);
    } else {
      return new CBuffer(arguments[0]);
    }
  }
  // if no arguments, then nothing needs to be set
  if (arguments.length === 0)
    throw new Error("Missing Argument: You must pass a valid buffer length");
  // this is the same in either scenario
  this.size = this.start = 0;
  // set to callback fn if data is about to be overwritten
  this.overflow = null;
  // emulate Array based on passed arguments
  if (arguments.length > 1 || typeof arguments[0] !== "number") {
    this.data = new Float32Array(arguments.length);
    this.end = (this.length = arguments.length) - 1;
    this.push.apply(this, arguments);
  } else {
    this.data = new Float32Array(arguments[0]);
    this.end = (this.length = arguments[0]) - 1;
  }
  // need to `return this` so `return CBuffer.apply` works
  return this;
}

function defaultComparitor(a, b) {
  return a == b ? 0 : a > b ? 1 : -1;
}

CBuffer.prototype = {
  // properly set constructor
  constructor: CBuffer,

  /* mutator methods */
  // pop last item
  pop: function () {
    var item;
    if (this.size === 0) return;
    item = this.data[this.end];
    // remove the reference to the object so it can be garbage collected
    delete this.data[this.end];
    this.end = (this.end - 1 + this.length) % this.length;
    this.size--;
    return item;
  },
  // push item to the end
  push: function () {
    var i = 0;
    // check if overflow is set, and if data is about to be overwritten
    if (this.overflow && this.size + arguments.length > this.length) {
      // call overflow function and send data that's about to be overwritten
      for (; i < this.size + arguments.length - this.length; i++) {
        this.overflow(this.data[(this.end + i + 1) % this.length], this);
      }
    }
    // push items to the end, wrapping and erasing existing items
    // using arguments variable directly to reduce gc footprint
    for (i = 0; i < arguments.length; i++) {
      this.data[(this.end + i + 1) % this.length] = arguments[i];
    }
    // recalculate size
    if (this.size < this.length) {
      if (this.size + i > this.length) this.size = this.length;
      else this.size += i;
    }
    // recalculate end
    this.end = (this.end + i) % this.length;
    // recalculate start
    this.start = (this.length + this.end - this.size + 1) % this.length;
    // return number current number of items in CBuffer
    return this.size;
  },
  // reverse order of the buffer
  reverse: function () {
    var i = 0,
      tmp;
    for (; i < ~~(this.size / 2); i++) {
      tmp = this.data[(this.start + i) % this.length];
      this.data[(this.start + i) % this.length] =
        this.data[(this.start + (this.size - i - 1)) % this.length];
      this.data[(this.start + (this.size - i - 1)) % this.length] = tmp;
    }
    return this;
  },
  // rotate buffer to the left by cntr, or by 1
  rotateLeft: function (cntr) {
    if (typeof cntr === "undefined") cntr = 1;
    if (typeof cntr !== "number") throw new Error("Argument must be a number");
    while (--cntr >= 0) {
      this.push(this.shift());
    }
    return this;
  },
  // rotate buffer to the right by cntr, or by 1
  rotateRight: function (cntr) {
    if (typeof cntr === "undefined") cntr = 1;
    if (typeof cntr !== "number") throw new Error("Argument must be a number");
    while (--cntr >= 0) {
      this.unshift(this.pop());
    }
    return this;
  },
  // remove and return first item
  shift: function () {
    var item;
    // check if there are any items in CBuff
    if (this.size === 0) return;
    // store first item for return
    item = this.data[this.start];
    // recalculate start of CBuffer
    this.start = (this.start + 1) % this.length;
    // decrement size
    this.size--;
    return item;
  },
  // sort items
  sort: function (fn) {
    // this.data.sort(fn || defaultComparitor);
    // this.start = 0;
    // this.end = this.size - 1;
    return this;
  },
  // add item to beginning of buffer
  unshift: function () {
    var i = 0;
    // check if overflow is set, and if data is about to be overwritten
    if (this.overflow && this.size + arguments.length > this.length) {
      // call overflow function and send data that's about to be overwritten
      for (; i < this.size + arguments.length - this.length; i++) {
        this.overflow(this.data[this.end - (i % this.length)], this);
      }
    }
    for (i = 0; i < arguments.length; i++) {
      this.data[
        (this.length + this.start - (i % this.length) - 1) % this.length
      ] = arguments[i];
    }
    if (this.length - this.size - i < 0) {
      this.end += this.length - this.size - i;
      if (this.end < 0) this.end = this.length + (this.end % this.length);
    }
    if (this.size < this.length) {
      if (this.size + i > this.length) this.size = this.length;
      else this.size += i;
    }
    this.start -= arguments.length;
    if (this.start < 0) this.start = this.length + (this.start % this.length);
    return this.size;
  },

  /* accessor methods */
  // return index of first matched element
  indexOf: function (arg, idx) {
    if (!idx) idx = 0;
    for (; idx < this.size; idx++) {
      if (this.data[(this.start + idx) % this.length] === arg) return idx;
    }
    return -1;
  },
  // return last index of the first match
  lastIndexOf: function (arg, idx) {
    if (!idx) idx = this.size - 1;
    for (; idx >= 0; idx--) {
      if (this.data[(this.start + idx) % this.length] === arg) return idx;
    }
    return -1;
  },

  // return the index an item would be inserted to if this
  // is a sorted circular buffer
  sortedIndex: function (value, comparitor, context) {
    comparitor = comparitor || defaultComparitor;
    var low = this.start,
      high = this.size - 1;

    // Tricky part is finding if its before or after the pivot
    // we can get this info by checking if the target is less than
    // the last item. After that it's just a typical binary search.
    if (low && comparitor.call(context, value, this.data[high]) > 0) {
      (low = 0), (high = this.end);
    }

    while (low < high) {
      var mid = (low + high) >>> 1;
      if (comparitor.call(context, value, this.data[mid]) > 0) low = mid + 1;
      else high = mid;
    }
    // http://stackoverflow.com/a/18618273/1517919
    return (((low - this.start) % this.size) + this.size) % this.size;
  },

  /* iteration methods */
  // check every item in the array against a test
  every: function (callback, context) {
    var i = 0;
    for (; i < this.size; i++) {
      if (
        !callback.call(
          context,
          this.data[(this.start + i) % this.length],
          i,
          this,
        )
      )
        return false;
    }
    return true;
  },
  // loop through each item in buffer
  // TODO: figure out how to emulate Array use better
  forEach: function (callback, context) {
    var i = 0;
    for (; i < this.size; i++) {
      callback.call(
        context,
        this.data[(this.start + i) % this.length],
        i,
        this,
      );
    }
  },
  // check items agains test until one returns true
  // TODO: figure out how to emuldate Array use better
  some: function (callback, context) {
    var i = 0;
    for (; i < this.size; i++) {
      if (
        callback.call(
          context,
          this.data[(this.start + i) % this.length],
          i,
          this,
        )
      )
        return true;
    }
    return false;
  },
  // calculate the average value of a circular buffer
  avg: function () {
    return this.size == 0 ? 0 : this.sum() / this.size;
  },
  // loop through each item in buffer and calculate sum
  sum: function () {
    var index = this.size;
    var s = 0;
    while (index--) s += this.data[index];
    return s;
  },
  // loop through each item in buffer and calculate median
  median: function () {
    if (this.size === 0) return 0;
    var values = this.slice().sort(defaultComparitor);
    var half = Math.floor(values.length / 2);
    if (values.length % 2) return values[half];
    else return (values[half - 1] + values[half]) / 2.0;
  },
  /* utility methods */
  // reset pointers to buffer with zero items
  // note: this will not remove values in cbuffer, so if for security values
  //       need to be overwritten, run `.fill(null).empty()`
  empty: function () {
    var i = 0;
    this.size = this.start = 0;
    this.end = this.length - 1;
    return this;
  },
  // fill all places with passed value or function
  fill: function (arg) {
    var i = 0;
    if (typeof arg === "function") {
      while (((this.data[i] = arg()), ++i < this.length));
    } else {
      while (((this.data[i] = arg), ++i < this.length));
    }
    // reposition start/end
    this.start = 0;
    this.end = this.length - 1;
    this.size = this.length;
    return this;
  },
  // return first item in buffer
  first: function () {
    return this.data[this.start];
  },
  // return last item in buffer
  last: function () {
    return this.data[this.end];
  },
  // return specific index in buffer
  get: function (arg) {
    return this.data[(this.start + arg) % this.length];
  },
  isFull: function (arg) {
    return this.length === this.size;
  },
  // set value at specified index
  set: function (idx, arg) {
    return (this.data[(this.start + idx) % this.length] = arg);
  },
  // return clean array of values
  toArray: function () {
    return this.slice();
  },
  // slice the buffer to an arraay
  slice: function (start, end) {
    var length = this.size;

    start = +start || 0;

    if (start < 0) {
      if (start >= end) return [];
      start = -start > length ? 0 : length + start;
    }

    if (end == null || end > length) end = length;
    else if (end < 0) end += length;
    else end = +end || 0;

    length = start < end ? end - start : 0;

    var result = Array(length);
    for (var index = 0; index < length; index++) {
      result[index] = this.data[(this.start + start + index) % this.length];
    }
    return result;
  },
};
function OLATS(frameSize, windowType) {
  this.process = function (frame, outputArray) {
    var input = window_mul(frame);

    overlap_and_add(
      _Hs,
      input,
      _squaredFramingWindow,
      _overlapBuffers,
      _owOverlapBuffers,
      _frameSize,
      outputArray,
    );

    _clean = false;

    return _Hs;
  };

  /*
   *  Overlap & Add with CBuffer.
   */
  function overlap_and_add(
    RS,
    inF,
    squaredWinF,
    oBuf,
    owOBuf,
    windowSize,
    outF,
  ) {
    var owSample,
      oSample = 0;

    for (var i = 0; i < RS; i++) {
      owSample = owOBuf.shift() || 0;
      oSample = oBuf.shift() || 0;
      outF.push(oSample / (owSample < 10e-3 ? 1 : owSample));
      oBuf.push(0);
      owOBuf.push(0);
      _numSamples--;
    }

    for (var i = 0; i < windowSize; i++) {
      oSample = oBuf.shift();
      oBuf.push(inF[i] + oSample);
      owSample = owOBuf.shift();
      owOBuf.push(squaredWinF[i] + owSample);
      _numSamples++;
    }
  }

  this.beta_fn = function (alpha) {
    if (_alpha <= 1) {
      return 2.0;
    } else if (_alpha <= 1.2) {
      return 2.0;
    } else if (_alpha <= 1.4) {
      return 2.0;
    } else if (_alpha <= 1.8) {
      return 2.5;
    } else {
      return 3.0;
    }
  };

  this.overlap_fn = function (alpha) {
    if (alpha < 0.9) {
      return 1.3;
    } else if (alpha < 1) {
      return alpha + 0.15;
    } else if (alpha >= 1 && alpha < 1.25) {
      return alpha + 0.15;
    } else if (alpha >= 1.25 && alpha < 1.5) {
      return alpha + 0.2;
    } else if (alpha >= 1.5 && alpha < 1.8) {
      return alpha + 0.6;
    } else if (alpha >= 1.8 && alpha < 2) {
      return alpha + 0.9;
    } else if (alpha >= 2 && alpha < 2.5) {
      return alpha + 2.2;
    } else {
      return alpha + 2.2;
    }
  };

  this.get_alpha_step = function (alpha) {
    if (alpha < 0.9) {
    } else if (alpha < 1) {
    } else if (alpha >= 1 && alpha < 1.25) {
    } else if (alpha >= 1.25 && alpha < 1.5) {
    } else if (alpha >= 1.5 && alpha < 1.8) {
    } else if (alpha >= 1.8 && alpha < 2) {
    } else if (alpha >= 2 && alpha < 2.5) {
    } else {
    }
  };

  /*
   * --------------
   *    Getters
   * --------------
   */

  this.get_hs = function () {
    return _Hs;
  };

  this.get_ha = function () {
    return _Ha;
  };

  this.get_alpha = function () {
    return _alpha;
  };

  this.get_real_alpha = function () {
    return _Hs / _Ha;
  };

  this.get_overlap_factor = function () {
    return _overlapFactor;
  };

  this.clear_buffers = function () {
    _overlapBuffers = new CBuffer(_frameSize);
    _owOverlapBuffers = new CBuffer(_frameSize);
    _clean = true;
  };

  /*
   * --------------
   *    Setters
   * --------------
   */

  this.set_window_type = function (newType) {
    _windowType = WindowFunctions[newType] ? newType : _windowType;
  };

  this.set_alpha = function (newAlpha, newOverlap, newBeta) {
    _alpha = newAlpha;

    if (newBeta == undefined) this.set_beta(this.beta_fn(_alpha));
    else this.set_beta(newBeta);

    if (newOverlap == undefined) _overlapFactor = this.overlap_fn(_alpha);
    else _overlapFactor = newOverlap;

    // "Fixed" analysis hop
    _Ha = Math.round(_frameSize / _overlapFactor);
    _Hs = Math.round(_alpha * _Ha);

    // console.log([newAlpha, _Hs/_Ha]);

    // "Fixed" synthesis hop
    // _Hs = Math.round(_frameSize/_overlapFactor);
    // _Ha = Math.round(_Hs / _alpha);
  };

  this.set_beta = function (newBeta) {
    _beta = newBeta;

    _window = create_window(_frameSize, _beta, _windowType);

    _squaredFramingWindow = new Float32Array(_window.length);
    for (var i = 0; i < _squaredFramingWindow.length; i++)
      _squaredFramingWindow[i] = Math.pow(_window[i], 1);
  };

  /*
   * --------------
   *    Helpers
   * --------------
   */

  function window_mul(frame) {
    var aux = new Float32Array(frame.length);
    for (var i = 0; i < frame.length; i++) {
      aux[i] = _window[i] * frame[i];
    }
    return aux;
  }

  function create_window(length, beta, type) {
    var win = new Float32Array(length);

    for (var i = 0; i < length; i++) {
      win[i] = WindowFunctions[type](length, i, beta);
    }

    return win;
  }

  function create_constant_array(size, constant, ArrayType) {
    var arr = new (ArrayType ? ArrayType : Array)(size);
    for (var i = 0; i < size; i++) arr[i] = constant;
    return arr;
  }

  var WindowFunctions = {
    Lanczos: function (length, index, beta) {
      var x = (2 * index) / (length - 1) - 1;
      return Math.pow(Math.sin(Math.PI * x) / (Math.PI * x), beta);
    },

    Triangular: function (length, index, beta) {
      return Math.pow(
        (2 / length) * (length / 2 - Math.abs(index - (length - 1) / 2)),
        beta,
      );
    },

    Bartlett: function (length, index, beta) {
      return Math.pow(
        (2 / (length - 1)) *
          ((length - 1) / 2 - Math.abs(index - (length - 1) / 2)),
        beta,
      );
    },

    BartlettHann: function (length, index, beta) {
      return Math.pow(
        0.62 -
          0.48 * Math.abs(index / (length - 1) - 0.5) -
          0.38 * Math.cos((2 * Math.PI * index) / (length - 1)),
        beta,
      );
    },

    Blackman: function (length, index, alpha) {
      var a0 = (1 - alpha) / 2;
      var a1 = 0.5;
      var a2 = alpha / 2;

      return (
        a0 -
        a1 * Math.cos((2 * Math.PI * index) / (length - 1)) +
        a2 * Math.cos((4 * Math.PI * index) / (length - 1))
      );
    },

    Cosine: function (length, index, beta) {
      return Math.pow(
        Math.cos((Math.PI * index) / (length - 1) - Math.PI / 2),
        beta,
      );
    },

    Gauss: function (length, index, alpha) {
      return Math.pow(
        Math.E,
        -0.5 *
          Math.pow(
            (index - (length - 1) / 2) / ((alpha * (length - 1)) / 2),
            2,
          ),
      );
    },

    Hamming: function (length, index, beta) {
      return Math.pow(
        0.54 - 0.46 * Math.cos((2 * Math.PI * index) / (length - 1)),
        beta,
      );
    },

    Hann: function (length, index, beta) {
      return Math.pow(
        0.5 * (1 - Math.cos((2 * Math.PI * index) / (length - 1))),
        beta,
      );
    },

    Rectangular: function (length, index, beta) {
      return beta;
    },

    SinBeta: function (length, index, beta) {
      return Math.pow(Math.sin((Math.PI * index) / length), beta);
    },

    Trapezoidal: function (length, index, beta) {
      var div = 10;
      var topIdx = Math.round(length / 4);
      var i1 = topIdx - 1;
      var i2 = topIdx * (div - 1) - 1;
      if (index <= i1) {
        return Math.pow(index / i1, beta);
      } else if (index >= i2) {
        return Math.pow(i2 / index, beta);
      } else {
        return 1;
      }
    },
  };

  var _frameSize = frameSize;
  var _alpha, _Ha, _Hs;
  var _beta = 1;
  var _overlapFactor = 1.1;
  var _windowType = "Lanczos";
  var _window;
  var _squaredFramingWindow;
  var _numSamples = 0;

  this.set_alpha(1);

  this.set_beta(_beta);

  var _overlapBuffers = new CBuffer(_frameSize);
  var _owOverlapBuffers = new CBuffer(_frameSize);
  for (var i = 0; i < _frameSize; i++) {
    _overlapBuffers.push(0);
    _owOverlapBuffers.push(0);
  }

  var _clean = true;

  this.is_clean = function () {
    return _clean;
  };
}

/*
 *	A helper class to use OLATS with the Web Audio API.
 *	Just pass an AudioBuffer with the "set_audio_buffer" method.
 *	Then, for example, at each cycle of ScriptProcessor.onaudioprocess,
 *	change the "alpha" and "position" fields to change the stretching
 *  factor and the audio buffer position pointer. After changing one
 *  or both parameters, call the "process" method.
 *
 */
export function BufferedOLA(frameSize) {
  var _frameSize = frameSize || 4096;
  var _olaL = new OLATS(_frameSize);
  var _olaR = new OLATS(_frameSize);
  var _buffer;
  var _position = 0;
  var _newAlpha = 1;

  var _midBufL = new CBuffer(Math.round(_frameSize * 1.2));
  var _midBufR = new CBuffer(Math.round(_frameSize * 1.2));

  this.process = function (outputAudioBuffer) {
    if (!_buffer) return;

    var sampleCounter = 0;
    var channels = _buffer.numberOfChannels;
    var rightNum = 1;

    if (channels == 1) {
      rightNum = 0;
    }

    var il = _buffer.getChannelData(0);
    var ir = _buffer.getChannelData(0);
    var ol = outputAudioBuffer.getChannelData(0);
    var or = outputAudioBuffer.getChannelData(rightNum);

    while (_midBufR.size > 0 && sampleCounter < outputAudioBuffer.length) {
      var i = sampleCounter++;
      ol[i] = _midBufL.shift();
      or[i] = _midBufR.shift();
    }

    if (sampleCounter == outputAudioBuffer.length) return;

    while (sampleCounter < outputAudioBuffer.length) {
      var bufL = il.subarray(_position, _position + _frameSize);
      var bufR = ir.subarray(_position, _position + _frameSize);

      if (bufL.length < _frameSize) {
      }

      if (_newAlpha != undefined && _newAlpha != _olaL.get_alpha()) {
        _olaL.set_alpha(_newAlpha);
        _olaR.set_alpha(_newAlpha);
        _newAlpha = undefined;
      }

      _olaL.process(bufL, _midBufL);
      _olaR.process(bufR, _midBufR);
      for (
        var i = sampleCounter;
        _midBufL.size > 0 && i < outputAudioBuffer.length;
        i++
      ) {
        ol[i] = _midBufL.shift();
        or[i] = _midBufR.shift();
      }

      sampleCounter += _olaL.get_hs();

      _position += _olaL.get_ha();
    }
  };

  this.set_audio_buffer = function (newBuffer) {
    _buffer = newBuffer;
  };

  Object.defineProperties(this, {
    position: {
      get: function () {
        return _position;
      },
      set: function (newPosition) {
        _position = new Number(newPosition);
      },
    },
    alpha: {
      get: function () {
        return _olaL.get_alpha();
      },
      set: function (newAlpha) {
        _newAlpha = new Number(newAlpha);
      },
    },
  });
}


