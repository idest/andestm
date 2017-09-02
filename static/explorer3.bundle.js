/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 31);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getCurrentGlobalMTime = getCurrentGlobalMTime;
exports.setLoggerFunction = setLoggerFunction;
exports.vtkLogMacro = vtkLogMacro;
exports.vtkInfoMacro = vtkInfoMacro;
exports.vtkDebugMacro = vtkDebugMacro;
exports.vtkErrorMacro = vtkErrorMacro;
exports.vtkWarningMacro = vtkWarningMacro;
exports.capitalize = capitalize;
exports.safeArrays = safeArrays;
exports.enumToString = enumToString;
exports.getStateArrayMapFunc = getStateArrayMapFunc;
exports.obj = obj;
exports.get = get;
exports.set = set;
exports.setGet = setGet;
exports.getArray = getArray;
exports.setArray = setArray;
exports.setGetArray = setGetArray;
exports.algo = algo;
exports.event = event;
exports.newInstance = newInstance;
exports.chain = chain;
exports.isVtkObject = isVtkObject;
exports.traverseInstanceTree = traverseInstanceTree;

var _vtk = __webpack_require__(32);

var _vtk2 = _interopRequireDefault(_vtk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var globalMTime = 0;

function getCurrentGlobalMTime() {
  return globalMTime;
}

// ----------------------------------------------------------------------------
// Loggins function calls
// ----------------------------------------------------------------------------
/* eslint-disable no-prototype-builtins                                      */

var fakeConsole = {};
function noOp() {}

var consoleMethods = ['log', 'debug', 'info', 'warn', 'error', 'time', 'timeEnd', 'group', 'groupEnd'];
consoleMethods.forEach(function (methodName) {
  return fakeConsole[methodName] = noOp;
});

global.console = window.console.hasOwnProperty('log') ? window.console : fakeConsole;

var loggerFunctions = {
  debug: noOp, // Don't print debug by default
  error: global.console.error || noOp,
  info: global.console.info || noOp,
  log: global.console.log || noOp,
  warn: global.console.warn || noOp
};

function setLoggerFunction(name, fn) {
  if (loggerFunctions[name]) {
    loggerFunctions[name] = fn || noOp;
  }
}

function vtkLogMacro() {
  loggerFunctions.log.apply(loggerFunctions, arguments);
}

function vtkInfoMacro() {
  loggerFunctions.info.apply(loggerFunctions, arguments);
}

function vtkDebugMacro() {
  loggerFunctions.debug.apply(loggerFunctions, arguments);
}

function vtkErrorMacro() {
  loggerFunctions.error.apply(loggerFunctions, arguments);
}

function vtkWarningMacro() {
  loggerFunctions.warn.apply(loggerFunctions, arguments);
}

// ----------------------------------------------------------------------------
// capitilze provided string
// ----------------------------------------------------------------------------

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ----------------------------------------------------------------------------
// Array helper
// ----------------------------------------------------------------------------

function safeArrays(model) {
  Object.keys(model).forEach(function (key) {
    if (Array.isArray(model[key])) {
      model[key] = [].concat(model[key]);
    }
  });
}

// ----------------------------------------------------------------------------

function enumToString(e, value) {
  return Object.keys(e).find(function (key) {
    return e[key] === value;
  });
}

function getStateArrayMapFunc(item) {
  if (item.isA) {
    return item.getState();
  }
  return item;
}

// ----------------------------------------------------------------------------
// vtkObject: modified(), onModified(callback), delete()
// ----------------------------------------------------------------------------

function obj() {
  var publicAPI = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // Ensure each instance as a unique ref of array
  safeArrays(model);

  var callbacks = [];
  model.mtime = Number.isInteger(model.mtime) ? model.mtime : ++globalMTime;
  model.classHierarchy = ['vtkObject'];

  function off(index) {
    callbacks[index] = null;
  }

  function on(index) {
    function unsubscribe() {
      off(index);
    }
    return Object.freeze({ unsubscribe: unsubscribe });
  }

  publicAPI.isDeleted = function () {
    return !!model.deleted;
  };

  publicAPI.modified = function () {
    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method');
      return;
    }

    model.mtime = ++globalMTime;
    callbacks.forEach(function (callback) {
      return callback && callback(publicAPI);
    });
  };

  publicAPI.onModified = function (callback) {
    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method');
      return null;
    }

    var index = callbacks.length;
    callbacks.push(callback);
    return on(index);
  };

  publicAPI.getMTime = function () {
    return model.mtime;
  };

  publicAPI.isA = function (className) {
    return model.classHierarchy.indexOf(className) !== -1;
  };

  publicAPI.getClassName = function () {
    return model.classHierarchy.slice(-1)[0];
  };

  publicAPI.set = function () {
    var map = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var noWarning = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var noFunction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var ret = false;
    Object.keys(map).forEach(function (name) {
      var fn = noFunction ? null : publicAPI['set' + capitalize(name)];
      if (fn && Array.isArray(map[name])) {
        ret = fn.apply(undefined, _toConsumableArray(map[name])) || ret;
      } else if (fn) {
        ret = fn(map[name]) || ret;
      } else {
        // Set data on model directly
        if (['mtime'].indexOf(name) === -1 && !noWarning) {
          vtkWarningMacro('Warning: Set value to model directly ' + name + ', ' + map[name]);
        }
        model[name] = map[name];
        ret = true;
      }
    });
    return ret;
  };

  publicAPI.get = function () {
    for (var _len = arguments.length, list = Array(_len), _key = 0; _key < _len; _key++) {
      list[_key] = arguments[_key];
    }

    if (!list.length) {
      return model;
    }
    var subset = {};
    list.forEach(function (name) {
      subset[name] = model[name];
    });
    return subset;
  };

  publicAPI.delete = function () {
    Object.keys(model).forEach(function (field) {
      return delete model[field];
    });
    callbacks.forEach(function (el, index) {
      return off(index);
    });

    // Flag the instance being deleted
    model.deleted = true;
  };

  // Add serialization support
  publicAPI.getState = function () {
    var jsonArchive = Object.assign({}, model, { vtkClass: publicAPI.getClassName() });

    // Convert every vtkObject to its serializable form
    Object.keys(jsonArchive).forEach(function (keyName) {
      if (jsonArchive[keyName] === null || jsonArchive[keyName] === undefined) {
        delete jsonArchive[keyName];
      } else if (jsonArchive[keyName].isA) {
        jsonArchive[keyName] = jsonArchive[keyName].getState();
      } else if (Array.isArray(jsonArchive[keyName])) {
        jsonArchive[keyName] = jsonArchive[keyName].map(getStateArrayMapFunc);
      }
    });

    // Sort resulting object by key name
    var sortedObj = {};
    Object.keys(jsonArchive).sort().forEach(function (name) {
      sortedObj[name] = jsonArchive[name];
    });

    // Remove mtime
    if (sortedObj.mtime) {
      delete sortedObj.mtime;
    }

    return sortedObj;
  };

  // Add shallowCopy(otherInstance) support
  publicAPI.shallowCopy = function (other) {
    var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (other.getClassName() !== publicAPI.getClassName()) {
      throw new Error('Cannot ShallowCopy ' + other.getClassName() + ' into ' + publicAPI.getClassName());
    }
    var otherModel = other.get();

    var keyList = Object.keys(model).sort();
    var otherKeyList = Object.keys(otherModel).sort();

    otherKeyList.forEach(function (key) {
      var keyIdx = keyList.indexOf(key);
      if (keyIdx === -1) {
        if (debug) {
          vtkDebugMacro('add ' + key + ' in shallowCopy');
        }
      } else {
        keyList.splice(keyIdx, 1);
      }
      model[key] = otherModel[key];
    });
    if (keyList.length && debug) {
      vtkDebugMacro('Untouched keys: ' + keyList.join(', '));
    }

    publicAPI.modified();
  };
}

// ----------------------------------------------------------------------------
// getXXX: add getters
// ----------------------------------------------------------------------------

function get(publicAPI, model, fieldNames) {
  fieldNames.forEach(function (field) {
    if ((typeof field === 'undefined' ? 'undefined' : _typeof(field)) === 'object') {
      publicAPI['get' + capitalize(field.name)] = function () {
        return model[field.name];
      };
    } else {
      publicAPI['get' + capitalize(field)] = function () {
        return model[field];
      };
    }
  });
}

// ----------------------------------------------------------------------------
// setXXX: add setters
// ----------------------------------------------------------------------------

var objectSetterMap = {
  enum: function _enum(publicAPI, model, field) {
    return function (value) {
      if (typeof value === 'string') {
        if (field.enum[value] !== undefined) {
          if (model[field.name] !== field.enum[value]) {
            model[field.name] = field.enum[value];
            publicAPI.modified();
            return true;
          }
          return false;
        }
        vtkErrorMacro('Set Enum with invalid argument ' + field + ', ' + value);
        throw new RangeError('Set Enum with invalid string argument');
      }
      if (typeof value === 'number') {
        if (model[field.name] !== value) {
          if (Object.keys(field.enum).map(function (key) {
            return field.enum[key];
          }).indexOf(value) !== -1) {
            model[field.name] = value;
            publicAPI.modified();
            return true;
          }
          vtkErrorMacro('Set Enum outside numeric range ' + field + ', ' + value);
          throw new RangeError('Set Enum outside numeric range');
        }
        return false;
      }
      vtkErrorMacro('Set Enum with invalid argument (String/Number) ' + field + ', ' + value);
      throw new TypeError('Set Enum with invalid argument (String/Number)');
    };
  }
};

function findSetter(field) {
  if ((typeof field === 'undefined' ? 'undefined' : _typeof(field)) === 'object') {
    var fn = objectSetterMap[field.type];
    if (fn) {
      return function (publicAPI, model) {
        return fn(publicAPI, model, field);
      };
    }

    vtkErrorMacro('No setter for field ' + field);
    throw new TypeError('No setter for field');
  }
  return function getSetter(publicAPI, model) {
    return function setter(value) {
      if (model.deleted) {
        vtkErrorMacro('instance deleted - cannot call any method');
        return false;
      }

      if (model[field] !== value) {
        model[field] = value;
        publicAPI.modified();
        return true;
      }
      return false;
    };
  };
}

function set(publicAPI, model, fields) {
  fields.forEach(function (field) {
    if ((typeof field === 'undefined' ? 'undefined' : _typeof(field)) === 'object') {
      publicAPI['set' + capitalize(field.name)] = findSetter(field)(publicAPI, model);
    } else {
      publicAPI['set' + capitalize(field)] = findSetter(field)(publicAPI, model);
    }
  });
}

// ----------------------------------------------------------------------------
// set/get XXX: add both setters and getters
// ----------------------------------------------------------------------------

function setGet(publicAPI, model, fieldNames) {
  get(publicAPI, model, fieldNames);
  set(publicAPI, model, fieldNames);
}

// ----------------------------------------------------------------------------
// getXXX: add getters for object of type array
// ----------------------------------------------------------------------------

function getArray(publicAPI, model, fieldNames) {
  fieldNames.forEach(function (field) {
    publicAPI['get' + capitalize(field)] = function () {
      return [].concat(model[field]);
    };
  });
}

// ----------------------------------------------------------------------------
// setXXX: add setter for object of type array
// ----------------------------------------------------------------------------

function setArray(publicAPI, model, fieldNames, size) {
  fieldNames.forEach(function (field) {
    publicAPI['set' + capitalize(field)] = function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (model.deleted) {
        vtkErrorMacro('instance deleted - cannot call any method');
        return false;
      }

      var array = args;
      // allow an array passed as a single arg.
      if (array.length === 1 && Array.isArray(array[0])) {
        array = array[0];
      }

      if (array.length !== size) {
        throw new RangeError('Invalid number of values for array setter');
      }
      var changeDetected = false;
      model[field].forEach(function (item, index) {
        if (item !== array[index]) {
          if (changeDetected) {
            return;
          }
          changeDetected = true;
        }
      });

      if (changeDetected) {
        model[field] = [].concat(array);
        publicAPI.modified();
      }
      return true;
    };
  });
}

// ----------------------------------------------------------------------------
// set/get XXX: add setter and getter for object of type array
// ----------------------------------------------------------------------------

function setGetArray(publicAPI, model, fieldNames, size) {
  getArray(publicAPI, model, fieldNames);
  setArray(publicAPI, model, fieldNames, size);
}

// ----------------------------------------------------------------------------
// vtkAlgorithm: setInputData(), setInputConnection(), getOutput(), getOutputPort()
// ----------------------------------------------------------------------------

function algo(publicAPI, model, numberOfInputs, numberOfOutputs) {
  if (model.inputData) {
    model.inputData = model.inputData.map(_vtk2.default);
  } else {
    model.inputData = [];
  }

  if (model.inputConnection) {
    model.inputConnection = model.inputConnection.map(_vtk2.default);
  } else {
    model.inputConnection = [];
  }

  if (model.output) {
    model.output = model.output.map(_vtk2.default);
  } else {
    model.output = [];
  }

  if (model.inputArrayToProcess) {
    model.inputArrayToProcess = model.inputArrayToProcess.map(_vtk2.default);
  } else {
    model.inputArrayToProcess = [];
  }

  // Methods
  function setInputData(dataset) {
    var port = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method');
      return;
    }
    if (model.inputData[port] !== dataset || model.inputConnection[port]) {
      model.inputData[port] = dataset;
      model.inputConnection[port] = null;
      if (publicAPI.modified) {
        publicAPI.modified();
      }
    }
  }

  function getInputData() {
    var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    if (model.inputConnection[port]) {
      model.inputData[port] = model.inputConnection[port]();
    }
    return model.inputData[port];
  }

  function setInputConnection(outputPort) {
    var port = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method');
      return;
    }
    model.inputData[port] = null;
    model.inputConnection[port] = outputPort;
  }

  function getInputConnection() {
    var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    return model.inputConnection[port];
  }

  function getOutputData() {
    var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method');
      return null;
    }
    if (publicAPI.shouldUpdate()) {
      // console.log('update filter', publicAPI.getClassName());
      publicAPI.update();
    }
    return model.output[port];
  }

  publicAPI.shouldUpdate = function () {
    var localMTime = publicAPI.getMTime();
    var count = numberOfOutputs;
    while (count--) {
      if (!model.output[count] || model.output[count].getMTime() < localMTime) {
        return true;
      }
    }

    count = numberOfInputs;
    while (count--) {
      if (model.inputConnection[count] && model.inputConnection[count].filter.shouldUpdate()) {
        return true;
      }
    }

    var minOutputMTime = Math.min.apply(Math, _toConsumableArray(model.output.filter(function (i) {
      return !!i;
    }).map(function (i) {
      return i.getMTime();
    })));
    count = numberOfInputs;
    while (count--) {
      if (publicAPI.getInputData(count) && publicAPI.getInputData(count).getMTime() > minOutputMTime) {
        return true;
      }
    }
    return false;
  };

  function getOutputPort() {
    var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var outputPortAccess = function outputPortAccess() {
      return getOutputData(port);
    };
    // Add reference to filter
    outputPortAccess.filter = publicAPI;
    return outputPortAccess;
  }

  // Handle input if needed
  if (numberOfInputs) {
    // Reserve inputs
    var count = numberOfInputs;
    while (count--) {
      model.inputData.push(null);
      model.inputConnection.push(null);
    }

    // Expose public methods
    publicAPI.setInputData = setInputData;
    publicAPI.setInputConnection = setInputConnection;
    publicAPI.getInputData = getInputData;
    publicAPI.getInputConnection = getInputConnection;
  }

  if (numberOfOutputs) {
    publicAPI.getOutputData = getOutputData;
    publicAPI.getOutputPort = getOutputPort;
  }

  publicAPI.update = function () {
    var ins = [];
    if (numberOfInputs) {
      var _count = 0;
      while (_count < numberOfInputs) {
        ins[_count] = publicAPI.getInputData(_count);
        _count++;
      }
    }
    if (publicAPI.shouldUpdate()) {
      publicAPI.requestData(ins, model.output);
    }
  };

  publicAPI.getNumberOfInputPorts = function () {
    return numberOfInputs;
  };
  publicAPI.getNumberOfOutputPorts = function () {
    return numberOfOutputs;
  };

  publicAPI.getInputArrayToProcess = function (inputPort) {
    var arrayDesc = model.inputArrayToProcess[inputPort];
    var ds = model.inputData[inputPort];
    if (arrayDesc && ds) {
      return ds['get' + arrayDesc.fieldAssociation]().getArray(arrayDesc.arrayName);
    }
    return null;
  };
  publicAPI.setInputArrayToProcess = function (inputPort, arrayName, fieldAssociation) {
    var attributeType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'Scalars';

    while (model.inputArrayToProcess.length < inputPort) {
      model.inputArrayToProcess.push(null);
    }
    model.inputArrayToProcess[inputPort] = { arrayName: arrayName, fieldAssociation: fieldAssociation, attributeType: attributeType };
  };
}

// ----------------------------------------------------------------------------
// Event handling: onXXX(callback), invokeXXX(args...)
// ----------------------------------------------------------------------------

function event(publicAPI, model, eventName) {
  var callbacks = [];
  var previousDelete = publicAPI.delete;

  function off(index) {
    callbacks[index] = null;
  }

  function on(index) {
    function unsubscribe() {
      off(index);
    }
    return Object.freeze({ unsubscribe: unsubscribe });
  }

  publicAPI['invoke' + capitalize(eventName)] = function () {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method');
      return;
    }

    callbacks.forEach(function (callback) {
      return callback && callback.apply(publicAPI, args);
    });
  };

  publicAPI['on' + capitalize(eventName)] = function (callback) {
    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method');
      return null;
    }

    var index = callbacks.length;
    callbacks.push(callback);
    return on(index);
  };

  publicAPI.delete = function () {
    previousDelete();
    callbacks.forEach(function (el, index) {
      return off(index);
    });
  };
}

// ----------------------------------------------------------------------------
// newInstance
// ----------------------------------------------------------------------------

function newInstance(extend, className) {
  var constructor = function constructor() {
    var initialValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var model = {};
    var publicAPI = {};
    extend(publicAPI, model, initialValues);
    return Object.freeze(publicAPI);
  };

  // Register constructor to factory
  if (className) {
    _vtk2.default.register(className, constructor);
  }

  return constructor;
}

// ----------------------------------------------------------------------------
// Chain function calls
// ----------------------------------------------------------------------------

function chain() {
  for (var _len4 = arguments.length, fn = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    fn[_key4] = arguments[_key4];
  }

  return function () {
    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return fn.filter(function (i) {
      return !!i;
    }).forEach(function (i) {
      return i.apply(undefined, args);
    });
  };
}

// ----------------------------------------------------------------------------
// Some utility methods for vtk objects
// ----------------------------------------------------------------------------

function isVtkObject(instance) {
  return instance && instance.isA && instance.isA('vtkObject');
}

function traverseInstanceTree(instance, extractFunction) {
  var accumulator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var visitedInstances = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  if (isVtkObject(instance)) {
    if (visitedInstances.indexOf(instance) >= 0) {
      // avoid cycles
      return accumulator;
    }

    visitedInstances.push(instance);
    var result = extractFunction(instance);
    if (result !== undefined) {
      accumulator.push(result);
    }

    // Now go through this instance's model
    var model = instance.get();
    Object.keys(model).forEach(function (key) {
      var modelObj = model[key];
      if (Array.isArray(modelObj)) {
        modelObj.forEach(function (subObj) {
          traverseInstanceTree(subObj, extractFunction, accumulator, visitedInstances);
        });
      } else {
        traverseInstanceTree(modelObj, extractFunction, accumulator, visitedInstances);
      }
    });
  }

  return accumulator;
}

// ----------------------------------------------------------------------------
// Default export
// ----------------------------------------------------------------------------

exports.default = {
  algo: algo,
  capitalize: capitalize,
  chain: chain,
  enumToString: enumToString,
  event: event,
  get: get,
  getArray: getArray,
  getCurrentGlobalMTime: getCurrentGlobalMTime,
  getStateArrayMapFunc: getStateArrayMapFunc,
  isVtkObject: isVtkObject,
  newInstance: newInstance,
  obj: obj,
  safeArrays: safeArrays,
  set: set,
  setArray: setArray,
  setGet: setGet,
  setGetArray: setGetArray,
  setLoggerFunction: setLoggerFunction,
  traverseInstanceTree: traverseInstanceTree,
  vtkDebugMacro: vtkDebugMacro,
  vtkErrorMacro: vtkErrorMacro,
  vtkInfoMacro: vtkInfoMacro,
  vtkLogMacro: vtkLogMacro,
  vtkWarningMacro: vtkWarningMacro
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var States = exports.States = {
  IS_START: 0,
  IS_NONE: 0,

  IS_ROTATE: 1,
  IS_PAN: 2,
  IS_SPIN: 3,
  IS_DOLLY: 4,
  IS_ZOOM: 5,
  IS_USCALE: 6,
  IS_TIMER: 7,
  IS_FORWARDFLY: 8,
  IS_REVERSEFLY: 9,
  IS_TWO_POINTER: 10,

  IS_ANIM_OFF: 0,
  IS_ANIM_ON: 1,

  IS_WINDOW_LEVEL: 1024,
  IS_PICK: 1025,
  IS_SLICE: 1026
};

exports.default = {
  States: States
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _seedrandom = __webpack_require__(36);

var _seedrandom2 = _interopRequireDefault(_seedrandom);

var _macro = __webpack_require__(4);

var _macro2 = _interopRequireDefault(_macro);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vtkErrorMacro = _macro2.default.vtkErrorMacro,
    vtkWarningMacro = _macro2.default.vtkWarningMacro;

// ----------------------------------------------------------------------------
/* eslint-disable camelcase                                                  */
/* eslint-disable no-cond-assign                                             */
/* eslint-disable no-bitwise                                                 */
/* eslint-disable no-multi-assign                                            */
// ----------------------------------------------------------------------------

var randomSeedValue = 0;
var VTK_MAX_ROTATIONS = 20;
var VTK_SMALL_NUMBER = 1.0e-12;

function notImplemented(method) {
  return function () {
    return vtkErrorMacro('vtkMath::' + method + ' - NOT IMPLEMENTED');
  };
}

function vtkSwapVectors3(v1, v2) {
  for (var i = 0; i < 3; i++) {
    var tmp = v1[i];
    v1[i] = v2[i];
    v2[i] = tmp;
  }
}

function createArray() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;

  var array = [];
  while (array.length < size) {
    array.push(0);
  }
  return array;
}

// ----------------------------------------------------------------------------
// Global methods
// ----------------------------------------------------------------------------

var Pi = function Pi() {
  return Math.PI;
};
var radiansFromDegrees = function radiansFromDegrees(deg) {
  return deg / 180 * Math.PI;
};
var degreesFromRadians = function degreesFromRadians(rad) {
  return rad * 180 / Math.PI;
};
var round = Math.round;
var floor = Math.floor;
var ceil = Math.ceil;
var ceilLog2 = notImplemented('ceilLog2');
var min = Math.min;
var max = Math.max;
var factorial = notImplemented('factorial');

function nearestPowerOfTwo(xi) {
  var v = 1;
  while (v < xi) {
    v *= 2;
  }
  return v;
}

function isPowerOfTwo(x) {
  return x === nearestPowerOfTwo(x);
}

function binomial(m, n) {
  var r = 1;
  for (var i = 1; i <= n; ++i) {
    r *= (m - i + 1) / i;
  }
  return Math.floor(r);
}

function beginCombination(m, n) {
  if (m < n) {
    return 0;
  }

  var r = createArray(n);
  for (var i = 0; i < n; ++i) {
    r[i] = i;
  }
  return r;
}

function nextCombination(m, n, r) {
  var status = 0;
  for (var i = n - 1; i >= 0; --i) {
    if (r[i] < m - n + i) {
      var j = r[i] + 1;
      while (i < n) {
        r[i++] = j++;
      }
      status = 1;
      break;
    }
  }
  return status;
}

var randomSeed = function randomSeed(seed) {
  (0, _seedrandom2.default)('' + seed, { global: true });
  randomSeedValue = seed;
};

var getSeed = function getSeed() {
  return randomSeedValue;
};

function random() {
  var minValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var maxValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var delta = maxValue - minValue;
  return minValue + delta * Math.random();
}

var gaussian = notImplemented('gaussian');

// Vect3 operations
function add(a, b, out) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
}

function subtract(a, b, out) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
}

function multiplyScalar(vec, scalar) {
  vec[0] *= scalar;
  vec[1] *= scalar;
  vec[2] *= scalar;
}

function multiplyScalar2D(vec, scalar) {
  vec[0] *= scalar;
  vec[1] *= scalar;
}

function dot(x, y) {
  return x[0] * y[0] + x[1] * y[1] + x[2] * y[2];
}

function outer(x, y, out_3x3) {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      out_3x3[i][j] = x[i] * y[j];
    }
  }
}

function cross(x, y, out) {
  var Zx = x[1] * y[2] - x[2] * y[1];
  var Zy = x[2] * y[0] - x[0] * y[2];
  var Zz = x[0] * y[1] - x[1] * y[0];
  out[0] = Zx;
  out[1] = Zy;
  out[2] = Zz;
}

function norm(x) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;

  switch (n) {
    case 1:
      return Math.abs(x);
    case 2:
      return Math.sqrt(x[0] * x[0] + x[1] * x[1]);
    case 3:
      return Math.sqrt(x[0] * x[0] + x[1] * x[1] + x[2] * x[2]);
    default:
      {
        var sum = 0;
        for (var i = 0; i < n; i++) {
          sum += x[i] * x[i];
        }
        return Math.sqrt(sum);
      }
  }
}

function normalize(x) {
  var den = norm(x);
  if (den !== 0.0) {
    x[0] /= den;
    x[1] /= den;
    x[2] /= den;
  }
  return den;
}

function perpendiculars(x, y, z, theta) {
  var x2 = x[0] * x[0];
  var y2 = x[1] * x[1];
  var z2 = x[2] * x[2];
  var r = Math.sqrt(x2 + y2 + z2);

  var dx = void 0;
  var dy = void 0;
  var dz = void 0;

  // transpose the vector to avoid divide-by-zero error
  if (x2 > y2 && x2 > z2) {
    dx = 0;
    dy = 1;
    dz = 2;
  } else if (y2 > z2) {
    dx = 1;
    dy = 2;
    dz = 0;
  } else {
    dx = 2;
    dy = 0;
    dz = 1;
  }

  var a = x[dx] / r;
  var b = x[dy] / r;
  var c = x[dz] / r;
  var tmp = Math.sqrt(a * a + c * c);

  if (theta !== 0) {
    var sintheta = Math.sin(theta);
    var costheta = Math.cos(theta);

    if (y) {
      y[dx] = (c * costheta - a * b * sintheta) / tmp;
      y[dy] = sintheta * tmp;
      y[dz] = (-(a * costheta) - b * c * sintheta) / tmp;
    }

    if (z) {
      z[dx] = (-(c * sintheta) - a * b * costheta) / tmp;
      z[dy] = costheta * tmp;
      z[dz] = (a * sintheta - b * c * costheta) / tmp;
    }
  } else {
    if (y) {
      y[dx] = c / tmp;
      y[dy] = 0;
      y[dz] = -a / tmp;
    }

    if (z) {
      z[dx] = -a * b / tmp;
      z[dy] = tmp;
      z[dz] = -b * c / tmp;
    }
  }
}

function projectVector(a, b, projection) {
  var bSquared = dot(b, b);

  if (bSquared === 0) {
    projection[0] = 0;
    projection[1] = 0;
    projection[2] = 0;
    return false;
  }

  var scale = dot(a, b) / bSquared;

  for (var i = 0; i < 3; i++) {
    projection[i] = b[i];
  }
  multiplyScalar(projection, scale);

  return true;
}

function dot2D(x, y) {
  return x[0] * y[0] + x[1] * y[1];
}

function projectVector2D(a, b, projection) {
  var bSquared = dot2D(b, b);

  if (bSquared === 0) {
    projection[0] = 0;
    projection[1] = 0;
    return false;
  }

  var scale = dot2D(a, b) / bSquared;

  for (var i = 0; i < 2; i++) {
    projection[i] = b[i];
  }
  multiplyScalar2D(projection, scale);

  return true;
}

function distance2BetweenPoints(x, y) {
  return (x[0] - y[0]) * (x[0] - y[0]) + (x[1] - y[1]) * (x[1] - y[1]) + (x[2] - y[2]) * (x[2] - y[2]);
}

function angleBetweenVectors(v1, v2) {
  var crossVect = [0, 0, 0];
  cross(v1, v2, crossVect);
  return Math.atan2(norm(crossVect), dot(v1, v2));
}

function gaussianAmplitude(mean, variance, position) {
  var distanceFromMean = Math.abs(mean - position);
  return 1 / Math.sqrt(2 * Math.PI * variance) * Math.exp(-Math.pow(distanceFromMean, 2) / (2 * variance));
}

function gaussianWeight(mean, variance, position) {
  var distanceFromMean = Math.abs(mean - position);
  return Math.exp(-Math.pow(distanceFromMean, 2) / (2 * variance));
}

function outer2D(x, y, out_2x2) {
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 2; j++) {
      out_2x2[i][j] = x[i] * y[j];
    }
  }
}

function norm2D(x2D) {
  return Math.sqrt(x2D[0] * x2D[0] + x2D[1] * x2D[1]);
}

function normalize2D(x) {
  var den = norm2D(x);
  if (den !== 0.0) {
    x[0] /= den;
    x[1] /= den;
  }
  return den;
}

function determinant2x2(c1, c2) {
  return c1[0] * c2[1] - c2[0] * c1[1];
}

function LUFactor3x3(mat_3x3, index_3) {
  var maxI = void 0;
  var tmp = void 0;
  var largest = void 0;
  var scale = [0, 0, 0];

  // Loop over rows to get implicit scaling information
  for (var i = 0; i < 3; i++) {
    largest = Math.abs(mat_3x3[i][0]);
    if ((tmp = Math.abs(mat_3x3[i][1])) > largest) {
      largest = tmp;
    }
    if ((tmp = Math.abs(mat_3x3[i][2])) > largest) {
      largest = tmp;
    }
    scale[i] = 1 / largest;
  }

  // Loop over all columns using Crout's method

  // first column
  largest = scale[0] * Math.abs(mat_3x3[0][0]);
  maxI = 0;
  if ((tmp = scale[1] * Math.abs(mat_3x3[1][0])) >= largest) {
    largest = tmp;
    maxI = 1;
  }
  if ((tmp = scale[2] * Math.abs(mat_3x3[2][0])) >= largest) {
    maxI = 2;
  }
  if (maxI !== 0) {
    vtkSwapVectors3(mat_3x3[maxI], mat_3x3[0]);
    scale[maxI] = scale[0];
  }
  index_3[0] = maxI;

  mat_3x3[1][0] /= mat_3x3[0][0];
  mat_3x3[2][0] /= mat_3x3[0][0];

  // second column
  mat_3x3[1][1] -= mat_3x3[1][0] * mat_3x3[0][1];
  mat_3x3[2][1] -= mat_3x3[2][0] * mat_3x3[0][1];
  largest = scale[1] * Math.abs(mat_3x3[1][1]);
  maxI = 1;
  if ((tmp = scale[2] * Math.abs(mat_3x3[2][1])) >= largest) {
    maxI = 2;
    vtkSwapVectors3(mat_3x3[2], mat_3x3[1]);
    scale[2] = scale[1];
  }
  index_3[1] = maxI;
  mat_3x3[2][1] /= mat_3x3[1][1];

  // third column
  mat_3x3[1][2] -= mat_3x3[1][0] * mat_3x3[0][2];
  mat_3x3[2][2] -= mat_3x3[2][0] * mat_3x3[0][2] + mat_3x3[2][1] * mat_3x3[1][2];
  index_3[2] = 2;
}

function LUSolve3x3(mat_3x3, index_3, x_3) {
  // forward substitution
  var sum = x_3[index_3[0]];
  x_3[index_3[0]] = x_3[0];
  x_3[0] = sum;

  sum = x_3[index_3[1]];
  x_3[index_3[1]] = x_3[1];
  x_3[1] = sum - mat_3x3[1][0] * x_3[0];

  sum = x_3[index_3[2]];
  x_3[index_3[2]] = x_3[2];
  x_3[2] = sum - mat_3x3[2][0] * x_3[0] - mat_3x3[2][1] * x_3[1];

  // back substitution
  x_3[2] /= mat_3x3[2][2];
  x_3[1] = (x_3[1] - mat_3x3[1][2] * x_3[2]) / mat_3x3[1][1];
  x_3[0] = (x_3[0] - mat_3x3[0][1] * x_3[1] - mat_3x3[0][2] * x_3[2]) / mat_3x3[0][0];
}

function linearSolve3x3(mat_3x3, x_3, y_3) {
  var a1 = mat_3x3[0][0];
  var b1 = mat_3x3[0][1];
  var c1 = mat_3x3[0][2];
  var a2 = mat_3x3[1][0];
  var b2 = mat_3x3[1][1];
  var c2 = mat_3x3[1][2];
  var a3 = mat_3x3[2][0];
  var b3 = mat_3x3[2][1];
  var c3 = mat_3x3[2][2];

  // Compute the adjoint
  var d1 = +determinant2x2(b2, b3, c2, c3);
  var d2 = -determinant2x2(a2, a3, c2, c3);
  var d3 = +determinant2x2(a2, a3, b2, b3);

  var e1 = -determinant2x2(b1, b3, c1, c3);
  var e2 = +determinant2x2(a1, a3, c1, c3);
  var e3 = -determinant2x2(a1, a3, b1, b3);

  var f1 = +determinant2x2(b1, b2, c1, c2);
  var f2 = -determinant2x2(a1, a2, c1, c2);
  var f3 = +determinant2x2(a1, a2, b1, b2);

  // Compute the determinant
  var det = a1 * d1 + b1 * d2 + c1 * d3;

  // Multiply by the adjoint
  var v1 = d1 * x_3[0] + e1 * x_3[1] + f1 * x_3[2];
  var v2 = d2 * x_3[0] + e2 * x_3[1] + f2 * x_3[2];
  var v3 = d3 * x_3[0] + e3 * x_3[1] + f3 * x_3[2];

  // Divide by the determinant
  y_3[0] = v1 / det;
  y_3[1] = v2 / det;
  y_3[2] = v3 / det;
}

function multiply3x3_vect3(mat_3x3, in_3, out_3) {
  var x = mat_3x3[0][0] * in_3[0] + mat_3x3[0][1] * in_3[1] + mat_3x3[0][2] * in_3[2];
  var y = mat_3x3[1][0] * in_3[0] + mat_3x3[1][1] * in_3[1] + mat_3x3[1][2] * in_3[2];
  var z = mat_3x3[2][0] * in_3[0] + mat_3x3[2][1] * in_3[1] + mat_3x3[2][2] * in_3[2];

  out_3[0] = x;
  out_3[1] = y;
  out_3[2] = z;
}

function multiply3x3_mat3(a_3x3, b_3x3, out_3x3) {
  var tmp = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

  for (var i = 0; i < 3; i++) {
    tmp[0][i] = a_3x3[0][0] * b_3x3[0][i] + a_3x3[0][1] * b_3x3[1][i] + a_3x3[0][2] * b_3x3[2][i];
    tmp[1][i] = a_3x3[1][0] * b_3x3[0][i] + a_3x3[1][1] * b_3x3[1][i] + a_3x3[1][2] * b_3x3[2][i];
    tmp[2][i] = a_3x3[2][0] * b_3x3[0][i] + a_3x3[2][1] * b_3x3[1][i] + a_3x3[2][2] * b_3x3[2][i];
  }

  for (var j = 0; j < 3; j++) {
    out_3x3[j][0] = tmp[j][0];
    out_3x3[j][1] = tmp[j][1];
    out_3x3[j][2] = tmp[j][2];
  }
}

function multiplyMatrix(a, b, rowA, colA, rowB, colB, out_rowXcol) {
  // we need colA == rowB
  if (colA !== rowB) {
    vtkErrorMacro('Number of columns of A must match number of rows of B.');
  }

  // output matrix is rowA*colB
  // output row
  for (var i = 0; i < rowA; i++) {
    // output col
    for (var j = 0; j < colB; j++) {
      out_rowXcol[i][j] = 0;
      // sum for this point
      for (var k = 0; k < colA; k++) {
        out_rowXcol[i][j] += a[i][k] * b[k][j];
      }
    }
  }
}

function transpose3x3(in_3x3, outT_3x3) {
  var tmp = void 0;
  tmp = in_3x3[1][0];
  outT_3x3[1][0] = in_3x3[0][1];
  outT_3x3[0][1] = tmp;
  tmp = in_3x3[2][0];
  outT_3x3[2][0] = in_3x3[0][2];
  outT_3x3[0][2] = tmp;
  tmp = in_3x3[2][1];
  outT_3x3[2][1] = in_3x3[1][2];
  outT_3x3[1][2] = tmp;

  outT_3x3[0][0] = in_3x3[0][0];
  outT_3x3[1][1] = in_3x3[1][1];
  outT_3x3[2][2] = in_3x3[2][2];
}

function invert3x3(in_3x3, outI_3x3) {
  var a1 = in_3x3[0][0];
  var b1 = in_3x3[0][1];
  var c1 = in_3x3[0][2];
  var a2 = in_3x3[1][0];
  var b2 = in_3x3[1][1];
  var c2 = in_3x3[1][2];
  var a3 = in_3x3[2][0];
  var b3 = in_3x3[2][1];
  var c3 = in_3x3[2][2];

  // Compute the adjoint
  var d1 = +determinant2x2(b2, b3, c2, c3);
  var d2 = -determinant2x2(a2, a3, c2, c3);
  var d3 = +determinant2x2(a2, a3, b2, b3);

  var e1 = -determinant2x2(b1, b3, c1, c3);
  var e2 = +determinant2x2(a1, a3, c1, c3);
  var e3 = -determinant2x2(a1, a3, b1, b3);

  var f1 = +determinant2x2(b1, b2, c1, c2);
  var f2 = -determinant2x2(a1, a2, c1, c2);
  var f3 = +determinant2x2(a1, a2, b1, b2);

  // Divide by the determinant
  var det = a1 * d1 + b1 * d2 + c1 * d3;

  outI_3x3[0][0] = d1 / det;
  outI_3x3[1][0] = d2 / det;
  outI_3x3[2][0] = d3 / det;

  outI_3x3[0][1] = e1 / det;
  outI_3x3[1][1] = e2 / det;
  outI_3x3[2][1] = e3 / det;

  outI_3x3[0][2] = f1 / det;
  outI_3x3[1][2] = f2 / det;
  outI_3x3[2][2] = f3 / det;
}

function identity3x3(mat_3x3) {
  for (var i = 0; i < 3; i++) {
    mat_3x3[i][0] = mat_3x3[i][1] = mat_3x3[i][2] = 0;
    mat_3x3[i][i] = 1;
  }
}

function determinant3x3(mat_3x3) {
  return mat_3x3[0][0] * mat_3x3[1][1] * mat_3x3[2][2] + mat_3x3[1][0] * mat_3x3[2][1] * mat_3x3[0][2] + mat_3x3[2][0] * mat_3x3[0][1] * mat_3x3[1][2] - mat_3x3[0][0] * mat_3x3[2][1] * mat_3x3[1][2] - mat_3x3[1][0] * mat_3x3[0][1] * mat_3x3[2][2] - mat_3x3[2][0] * mat_3x3[1][1] * mat_3x3[0][2];
}

function quaternionToMatrix3x3(quat_4, mat_3x3) {
  var ww = quat_4[0] * quat_4[0];
  var wx = quat_4[0] * quat_4[1];
  var wy = quat_4[0] * quat_4[2];
  var wz = quat_4[0] * quat_4[3];

  var xx = quat_4[1] * quat_4[1];
  var yy = quat_4[2] * quat_4[2];
  var zz = quat_4[3] * quat_4[3];

  var xy = quat_4[1] * quat_4[2];
  var xz = quat_4[1] * quat_4[3];
  var yz = quat_4[2] * quat_4[3];

  var rr = xx + yy + zz;
  // normalization factor, just in case quaternion was not normalized
  var f = 1 / (ww + rr);
  var s = (ww - rr) * f;
  f *= 2;

  mat_3x3[0][0] = xx * f + s;
  mat_3x3[1][0] = (xy + wz) * f;
  mat_3x3[2][0] = (xz - wy) * f;

  mat_3x3[0][1] = (xy - wz) * f;
  mat_3x3[1][1] = yy * f + s;
  mat_3x3[2][1] = (yz + wx) * f;

  mat_3x3[0][2] = (xz + wy) * f;
  mat_3x3[1][2] = (yz - wx) * f;
  mat_3x3[2][2] = zz * f + s;
}

function jacobiN(a, n, w, v) {
  var i = void 0;
  var j = void 0;
  var k = void 0;
  var iq = void 0;
  var ip = void 0;
  var numPos = void 0;
  var tresh = void 0;
  var theta = void 0;
  var t = void 0;
  var tau = void 0;
  var sm = void 0;
  var s = void 0;
  var h = void 0;
  var g = void 0;
  var c = void 0;
  var tmp = void 0;
  var b = createArray(n);
  var z = createArray(n);

  var vtkROTATE = function vtkROTATE(aa, ii, jj, kk, ll) {
    g = aa[ii][jj];
    h = aa[kk][ll];
    aa[ii][jj] = g - s * (h + g * tau);
    aa[kk][ll] = h + s * (g - h * tau);
  };

  // initialize
  for (ip = 0; ip < n; ip++) {
    for (iq = 0; iq < n; iq++) {
      v[ip][iq] = 0.0;
    }
    v[ip][ip] = 1.0;
  }
  for (ip = 0; ip < n; ip++) {
    b[ip] = w[ip] = a[ip][ip];
    z[ip] = 0.0;
  }

  // begin rotation sequence
  for (i = 0; i < VTK_MAX_ROTATIONS; i++) {
    sm = 0.0;
    for (ip = 0; ip < n - 1; ip++) {
      for (iq = ip + 1; iq < n; iq++) {
        sm += Math.abs(a[ip][iq]);
      }
    }
    if (sm === 0.0) {
      break;
    }

    // first 3 sweeps
    if (i < 3) {
      tresh = 0.2 * sm / (n * n);
    } else {
      tresh = 0.0;
    }

    for (ip = 0; ip < n - 1; ip++) {
      for (iq = ip + 1; iq < n; iq++) {
        g = 100.0 * Math.abs(a[ip][iq]);

        // after 4 sweeps
        if (i > 3 && Math.abs(w[ip]) + g === Math.abs(w[ip]) && Math.abs(w[iq]) + g === Math.abs(w[iq])) {
          a[ip][iq] = 0.0;
        } else if (Math.abs(a[ip][iq]) > tresh) {
          h = w[iq] - w[ip];
          if (Math.abs(h) + g === Math.abs(h)) {
            t = a[ip][iq] / h;
          } else {
            theta = 0.5 * h / a[ip][iq];
            t = 1.0 / (Math.abs(theta) + Math.sqrt(1.0 + theta * theta));
            if (theta < 0.0) {
              t = -t;
            }
          }
          c = 1.0 / Math.sqrt(1 + t * t);
          s = t * c;
          tau = s / (1.0 + c);
          h = t * a[ip][iq];
          z[ip] -= h;
          z[iq] += h;
          w[ip] -= h;
          w[iq] += h;
          a[ip][iq] = 0.0;

          // ip already shifted left by 1 unit
          for (j = 0; j <= ip - 1; j++) {
            vtkROTATE(a, j, ip, j, iq);
          }
          // ip and iq already shifted left by 1 unit
          for (j = ip + 1; j <= iq - 1; j++) {
            vtkROTATE(a, ip, j, j, iq);
          }
          // iq already shifted left by 1 unit
          for (j = iq + 1; j < n; j++) {
            vtkROTATE(a, ip, j, iq, j);
          }
          for (j = 0; j < n; j++) {
            vtkROTATE(v, j, ip, j, iq);
          }
        }
      }
    }

    for (ip = 0; ip < n; ip++) {
      b[ip] += z[ip];
      w[ip] = b[ip];
      z[ip] = 0.0;
    }
  }

  // this is NEVER called
  if (i >= VTK_MAX_ROTATIONS) {
    vtkWarningMacro('vtkMath::Jacobi: Error extracting eigenfunctions');
    return 0;
  }

  // sort eigenfunctions: these changes do not affect accuracy
  for (j = 0; j < n - 1; j++) {
    // boundary incorrect
    k = j;
    tmp = w[k];
    for (i = j + 1; i < n; i++) {
      // boundary incorrect, shifted already
      if (w[i] >= tmp) {
        // why exchange if same?
        k = i;
        tmp = w[k];
      }
    }
    if (k !== j) {
      w[k] = w[j];
      w[j] = tmp;
      for (i = 0; i < n; i++) {
        tmp = v[i][j];
        v[i][j] = v[i][k];
        v[i][k] = tmp;
      }
    }
  }
  // ensure eigenvector consistency (i.e., Jacobi can compute vectors that
  // are negative of one another (.707,.707,0) and (-.707,-.707,0). This can
  // reek havoc in hyperstreamline/other stuff. We will select the most
  // positive eigenvector.
  var ceil_half_n = (n >> 1) + (n & 1);
  for (j = 0; j < n; j++) {
    for (numPos = 0, i = 0; i < n; i++) {
      if (v[i][j] >= 0.0) {
        numPos++;
      }
    }
    //    if ( numPos < ceil(double(n)/double(2.0)) )
    if (numPos < ceil_half_n) {
      for (i = 0; i < n; i++) {
        v[i][j] *= -1.0;
      }
    }
  }
  return 1;
}

function matrix3x3ToQuaternion(mat_3x3, quat_4) {
  var tmp = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

  // on-diagonal elements
  tmp[0][0] = mat_3x3[0][0] + mat_3x3[1][1] + mat_3x3[2][2];
  tmp[1][1] = mat_3x3[0][0] - mat_3x3[1][1] - mat_3x3[2][2];
  tmp[2][2] = -mat_3x3[0][0] + mat_3x3[1][1] - mat_3x3[2][2];
  tmp[3][3] = -mat_3x3[0][0] - mat_3x3[1][1] + mat_3x3[2][2];

  // off-diagonal elements
  tmp[0][1] = tmp[1][0] = mat_3x3[2][1] - mat_3x3[1][2];
  tmp[0][2] = tmp[2][0] = mat_3x3[0][2] - mat_3x3[2][0];
  tmp[0][3] = tmp[3][0] = mat_3x3[1][0] - mat_3x3[0][1];

  tmp[1][2] = tmp[2][1] = mat_3x3[1][0] + mat_3x3[0][1];
  tmp[1][3] = tmp[3][1] = mat_3x3[0][2] + mat_3x3[2][0];
  tmp[2][3] = tmp[3][2] = mat_3x3[2][1] + mat_3x3[1][2];

  var eigenvectors = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  var eigenvalues = [0, 0, 0, 0];

  // convert into format that JacobiN can use,
  // then use Jacobi to find eigenvalues and eigenvectors
  var NTemp = [0, 0, 0, 0];
  var eigenvectorsTemp = [0, 0, 0, 0];
  for (var i = 0; i < 4; i++) {
    NTemp[i] = tmp[i];
    eigenvectorsTemp[i] = eigenvectors[i];
  }
  jacobiN(NTemp, 4, eigenvalues, eigenvectorsTemp);

  // the first eigenvector is the one we want
  quat_4[0] = eigenvectors[0][0];
  quat_4[1] = eigenvectors[1][0];
  quat_4[2] = eigenvectors[2][0];
  quat_4[3] = eigenvectors[3][0];
}

function multiplyQuaternion(quat_1, quat_2, quat_out) {
  var ww = quat_1[0] * quat_2[0];
  var wx = quat_1[0] * quat_2[1];
  var wy = quat_1[0] * quat_2[2];
  var wz = quat_1[0] * quat_2[3];

  var xw = quat_1[1] * quat_2[0];
  var xx = quat_1[1] * quat_2[1];
  var xy = quat_1[1] * quat_2[2];
  var xz = quat_1[1] * quat_2[3];

  var yw = quat_1[2] * quat_2[0];
  var yx = quat_1[2] * quat_2[1];
  var yy = quat_1[2] * quat_2[2];
  var yz = quat_1[2] * quat_2[3];

  var zw = quat_1[3] * quat_2[0];
  var zx = quat_1[3] * quat_2[1];
  var zy = quat_1[3] * quat_2[2];
  var zz = quat_1[3] * quat_2[3];

  quat_out[0] = ww - xx - yy - zz;
  quat_out[1] = wx + xw + yz - zy;
  quat_out[2] = wy - xz + yw + zx;
  quat_out[3] = wz + xy - yx + zw;
}

function orthogonalize3x3(a_3x3, out_3x3) {
  // copy the matrix
  for (var i = 0; i < 3; i++) {
    out_3x3[0][i] = a_3x3[0][i];
    out_3x3[1][i] = a_3x3[1][i];
    out_3x3[2][i] = a_3x3[2][i];
  }

  // Pivot the matrix to improve accuracy
  var scale = createArray(3);
  var index = createArray(3);
  var largest = void 0;

  // Loop over rows to get implicit scaling information
  for (var _i = 0; _i < 3; _i++) {
    var _x5 = Math.abs(out_3x3[_i][0]);
    var _x6 = Math.abs(out_3x3[_i][1]);
    var _x7 = Math.abs(out_3x3[_i][2]);
    largest = _x6 > _x5 ? _x6 : _x5;
    largest = _x7 > largest ? _x7 : largest;
    scale[_i] = 1;
    if (largest !== 0) {
      scale[_i] /= largest;
    }
  }

  // first column
  var x1 = Math.abs(out_3x3[0][0]) * scale[0];
  var x2 = Math.abs(out_3x3[1][0]) * scale[1];
  var x3 = Math.abs(out_3x3[2][0]) * scale[2];
  index[0] = 0;
  largest = x1;
  if (x2 >= largest) {
    largest = x2;
    index[0] = 1;
  }
  if (x3 >= largest) {
    index[0] = 2;
  }
  if (index[0] !== 0) {
    vtkSwapVectors3(out_3x3[index[0]], out_3x3[0]);
    scale[index[0]] = scale[0];
  }

  // second column
  var y2 = Math.abs(out_3x3[1][1]) * scale[1];
  var y3 = Math.abs(out_3x3[2][1]) * scale[2];
  index[1] = 1;
  largest = y2;
  if (y3 >= largest) {
    index[1] = 2;
    vtkSwapVectors3(out_3x3[2], out_3x3[1]);
  }

  // third column
  index[2] = 2;

  // A quaternion can only describe a pure rotation, not
  // a rotation with a flip, therefore the flip must be
  // removed before the matrix is converted to a quaternion.
  var flip = 0;
  if (determinant3x3(out_3x3) < 0) {
    flip = 1;
    for (var _i2 = 0; _i2 < 3; _i2++) {
      out_3x3[0][_i2] = -out_3x3[0][_i2];
      out_3x3[1][_i2] = -out_3x3[1][_i2];
      out_3x3[2][_i2] = -out_3x3[2][_i2];
    }
  }

  // Do orthogonalization using a quaternion intermediate
  // (this, essentially, does the orthogonalization via
  // diagonalization of an appropriately constructed symmetric
  // 4x4 matrix rather than by doing SVD of the 3x3 matrix)
  var quat = createArray(4);
  matrix3x3ToQuaternion(out_3x3, quat);
  quaternionToMatrix3x3(quat, out_3x3);

  // Put the flip back into the orthogonalized matrix.
  if (flip) {
    for (var _i3 = 0; _i3 < 3; _i3++) {
      out_3x3[0][_i3] = -out_3x3[0][_i3];
      out_3x3[1][_i3] = -out_3x3[1][_i3];
      out_3x3[2][_i3] = -out_3x3[2][_i3];
    }
  }

  // Undo the pivoting
  if (index[1] !== 1) {
    vtkSwapVectors3(out_3x3[index[1]], out_3x3[1]);
  }
  if (index[0] !== 0) {
    vtkSwapVectors3(out_3x3[index[0]], out_3x3[0]);
  }
}

function diagonalize3x3(a_3x3, w_3, v_3x3) {
  var i = void 0;
  var j = void 0;
  var k = void 0;
  var maxI = void 0;
  var tmp = void 0;
  var maxVal = void 0;

  // do the matrix[3][3] to **matrix conversion for Jacobi
  var C = [createArray(3), createArray(3), createArray(3)];
  var ATemp = createArray(3);
  var VTemp = createArray(3);
  for (i = 0; i < 3; i++) {
    C[i][0] = a_3x3[i][0];
    C[i][1] = a_3x3[i][1];
    C[i][2] = a_3x3[i][2];
    ATemp[i] = C[i];
    VTemp[i] = v_3x3[i];
  }

  // diagonalize using Jacobi
  jacobiN(ATemp, 3, w_3, VTemp);

  // if all the eigenvalues are the same, return identity matrix
  if (w_3[0] === w_3[1] && w_3[0] === w_3[2]) {
    identity3x3(v_3x3);
    return;
  }

  // transpose temporarily, it makes it easier to sort the eigenvectors
  transpose3x3(v_3x3, v_3x3);

  // if two eigenvalues are the same, re-orthogonalize to optimally line
  // up the eigenvectors with the x, y, and z axes
  for (i = 0; i < 3; i++) {
    // two eigenvalues are the same
    if (w_3[(i + 1) % 3] === w_3[(i + 2) % 3]) {
      // find maximum element of the independent eigenvector
      maxVal = Math.abs(v_3x3[i][0]);
      maxI = 0;
      for (j = 1; j < 3; j++) {
        if (maxVal < (tmp = Math.abs(v_3x3[i][j]))) {
          maxVal = tmp;
          maxI = j;
        }
      }
      // swap the eigenvector into its proper position
      if (maxI !== i) {
        tmp = w_3[maxI];
        w_3[maxI] = w_3[i];
        w_3[i] = tmp;
        vtkSwapVectors3(v_3x3[i], v_3x3[maxI]);
      }
      // maximum element of eigenvector should be positive
      if (v_3x3[maxI][maxI] < 0) {
        v_3x3[maxI][0] = -v_3x3[maxI][0];
        v_3x3[maxI][1] = -v_3x3[maxI][1];
        v_3x3[maxI][2] = -v_3x3[maxI][2];
      }

      // re-orthogonalize the other two eigenvectors
      j = (maxI + 1) % 3;
      k = (maxI + 2) % 3;

      v_3x3[j][0] = 0.0;
      v_3x3[j][1] = 0.0;
      v_3x3[j][2] = 0.0;
      v_3x3[j][j] = 1.0;
      cross(v_3x3[maxI], v_3x3[j], v_3x3[k]);
      normalize(v_3x3[k]);
      cross(v_3x3[k], v_3x3[maxI], v_3x3[j]);

      // transpose vectors back to columns
      transpose3x3(v_3x3, v_3x3);
      return;
    }
  }

  // the three eigenvalues are different, just sort the eigenvectors
  // to align them with the x, y, and z axes

  // find the vector with the largest x element, make that vector
  // the first vector
  maxVal = Math.abs(v_3x3[0][0]);
  maxI = 0;
  for (i = 1; i < 3; i++) {
    if (maxVal < (tmp = Math.abs(v_3x3[i][0]))) {
      maxVal = tmp;
      maxI = i;
    }
  }
  // swap eigenvalue and eigenvector
  if (maxI !== 0) {
    tmp = w_3[maxI];
    w_3[maxI] = w_3[0];
    w_3[0] = tmp;
    vtkSwapVectors3(v_3x3[maxI], v_3x3[0]);
  }
  // do the same for the y element
  if (Math.abs(v_3x3[1][1]) < Math.abs(v_3x3[2][1])) {
    tmp = w_3[2];
    w_3[2] = w_3[1];
    w_3[1] = tmp;
    vtkSwapVectors3(v_3x3[2], v_3x3[1]);
  }

  // ensure that the sign of the eigenvectors is correct
  for (i = 0; i < 2; i++) {
    if (v_3x3[i][i] < 0) {
      v_3x3[i][0] = -v_3x3[i][0];
      v_3x3[i][1] = -v_3x3[i][1];
      v_3x3[i][2] = -v_3x3[i][2];
    }
  }
  // set sign of final eigenvector to ensure that determinant is positive
  if (determinant3x3(v_3x3) < 0) {
    v_3x3[2][0] = -v_3x3[2][0];
    v_3x3[2][1] = -v_3x3[2][1];
    v_3x3[2][2] = -v_3x3[2][2];
  }

  // transpose the eigenvectors back again
  transpose3x3(v_3x3, v_3x3);
}

function singularValueDecomposition3x3(a_3x3, u_3x3, w_3, vT_3x3) {
  var i = void 0;
  var B = [createArray(3), createArray(3), createArray(3)];

  // copy so that A can be used for U or VT without risk
  for (i = 0; i < 3; i++) {
    B[0][i] = a_3x3[0][i];
    B[1][i] = a_3x3[1][i];
    B[2][i] = a_3x3[2][i];
  }

  // temporarily flip if determinant is negative
  var d = determinant3x3(B);
  if (d < 0) {
    for (i = 0; i < 3; i++) {
      B[0][i] = -B[0][i];
      B[1][i] = -B[1][i];
      B[2][i] = -B[2][i];
    }
  }

  // orthogonalize, diagonalize, etc.
  orthogonalize3x3(B, u_3x3);
  transpose3x3(B, B);
  multiply3x3_mat3(B, u_3x3, vT_3x3);
  diagonalize3x3(vT_3x3, w_3, vT_3x3);
  multiply3x3_mat3(u_3x3, vT_3x3, u_3x3);
  transpose3x3(vT_3x3, vT_3x3);

  // re-create the flip
  if (d < 0) {
    w_3[0] = -w_3[0];
    w_3[1] = -w_3[1];
    w_3[2] = -w_3[2];
  }
}

function luFactorLinearSystem(A, index, size) {
  var i = void 0;
  var j = void 0;
  var k = void 0;
  var largest = void 0;
  var maxI = 0;
  var sum = void 0;
  var temp1 = void 0;
  var temp2 = void 0;
  var scale = createArray(size);

  //
  // Loop over rows to get implicit scaling information
  //
  for (i = 0; i < size; i++) {
    for (largest = 0.0, j = 0; j < size; j++) {
      if ((temp2 = Math.abs(A[i][j])) > largest) {
        largest = temp2;
      }
    }

    if (largest === 0.0) {
      vtkWarningMacro('Unable to factor linear system');
      return 0;
    }
    scale[i] = 1.0 / largest;
  }
  //
  // Loop over all columns using Crout's method
  //
  for (j = 0; j < size; j++) {
    for (i = 0; i < j; i++) {
      sum = A[i][j];
      for (k = 0; k < i; k++) {
        sum -= A[i][k] * A[k][j];
      }
      A[i][j] = sum;
    }
    //
    // Begin search for largest pivot element
    //
    for (largest = 0.0, i = j; i < size; i++) {
      sum = A[i][j];
      for (k = 0; k < j; k++) {
        sum -= A[i][k] * A[k][j];
      }
      A[i][j] = sum;

      if ((temp1 = scale[i] * Math.abs(sum)) >= largest) {
        largest = temp1;
        maxI = i;
      }
    }
    //
    // Check for row interchange
    //
    if (j !== maxI) {
      for (k = 0; k < size; k++) {
        temp1 = A[maxI][k];
        A[maxI][k] = A[j][k];
        A[j][k] = temp1;
      }
      scale[maxI] = scale[j];
    }
    //
    // Divide by pivot element and perform elimination
    //
    index[j] = maxI;

    if (Math.abs(A[j][j]) <= VTK_SMALL_NUMBER) {
      vtkWarningMacro('Unable to factor linear system');
      return 0;
    }

    if (j !== size - 1) {
      temp1 = 1.0 / A[j][j];
      for (i = j + 1; i < size; i++) {
        A[i][j] *= temp1;
      }
    }
  }
  return 1;
}

function luSolveLinearSystem(A, index, x, size) {
  var i = void 0;
  var j = void 0;
  var ii = void 0;
  var idx = void 0;
  var sum = void 0;
  //
  // Proceed with forward and backsubstitution for L and U
  // matrices.  First, forward substitution.
  //
  for (ii = -1, i = 0; i < size; i++) {
    idx = index[i];
    sum = x[idx];
    x[idx] = x[i];

    if (ii >= 0) {
      for (j = ii; j <= i - 1; j++) {
        sum -= A[i][j] * x[j];
      }
    } else if (sum !== 0.0) {
      ii = i;
    }

    x[i] = sum;
  }
  //
  // Now, back substitution
  //
  for (i = size - 1; i >= 0; i--) {
    sum = x[i];
    for (j = i + 1; j < size; j++) {
      sum -= A[i][j] * x[j];
    }
    x[i] = sum / A[i][i];
  }
}

function solveLinearSystem(A, x, size) {
  // if we solving something simple, just solve it
  if (size === 2) {
    var y = createArray(2);
    var det = determinant2x2(A[0][0], A[0][1], A[1][0], A[1][1]);

    if (det === 0.0) {
      // Unable to solve linear system
      return 0;
    }

    y[0] = (A[1][1] * x[0] - A[0][1] * x[1]) / det;
    y[1] = (-(A[1][0] * x[0]) + A[0][0] * x[1]) / det;

    x[0] = y[0];
    x[1] = y[1];
    return 1;
  } else if (size === 1) {
    if (A[0][0] === 0.0) {
      // Unable to solve linear system
      return 0;
    }

    x[0] /= A[0][0];
    return 1;
  }

  //
  // System of equations is not trivial, use Crout's method
  //

  // Check on allocation of working vectors
  var index = createArray(size);

  // Factor and solve matrix
  if (luFactorLinearSystem(A, index, size) === 0) {
    return 0;
  }
  luSolveLinearSystem(A, index, x, size);

  return 1;
}

function invertMatrix(A, AI, size) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var column = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  var tmp1Size = index || createArray(size);
  var tmp2Size = column || createArray(size);

  // Factor matrix; then begin solving for inverse one column at a time.
  // Note: tmp1Size returned value is used later, tmp2Size is just working
  // memory whose values are not used in LUSolveLinearSystem
  if (luFactorLinearSystem(A, tmp1Size, size, tmp2Size) === 0) {
    return 0;
  }

  for (var j = 0; j < size; j++) {
    for (var i = 0; i < size; i++) {
      tmp2Size[i] = 0.0;
    }
    tmp2Size[j] = 1.0;

    luSolveLinearSystem(A, tmp1Size, tmp2Size, size);

    for (var _i4 = 0; _i4 < size; _i4++) {
      AI[_i4][j] = tmp2Size[_i4];
    }
  }

  return 1;
}

function estimateMatrixCondition(A, size) {
  var minValue = +Number.MAX_VALUE;
  var maxValue = -Number.MAX_VALUE;

  // find the maximum value
  for (var i = 0; i < size; i++) {
    for (var j = i; j < size; j++) {
      if (Math.abs(A[i][j]) > max) {
        maxValue = Math.abs(A[i][j]);
      }
    }
  }

  // find the minimum diagonal value
  for (var _i5 = 0; _i5 < size; _i5++) {
    if (Math.abs(A[_i5][_i5]) < min) {
      minValue = Math.abs(A[_i5][_i5]);
    }
  }

  if (minValue === 0.0) {
    return Number.MAX_VALUE;
  }
  return maxValue / minValue;
}

function jacobi(a_3x3, w, v) {
  return jacobiN(a_3x3, 3, w, v);
}

function solveHomogeneousLeastSquares(numberOfSamples, xt, xOrder, mt) {
  // check dimensional consistency
  if (numberOfSamples < xOrder) {
    vtkWarningMacro('Insufficient number of samples. Underdetermined.');
    return 0;
  }

  var i = void 0;
  var j = void 0;
  var k = void 0;

  // set up intermediate variables
  // Allocate matrix to hold X times transpose of X
  var XXt = createArray(xOrder); // size x by x
  // Allocate the array of eigenvalues and eigenvectors
  var eigenvals = createArray(xOrder);
  var eigenvecs = createArray(xOrder);

  // Clear the upper triangular region (and btw, allocate the eigenvecs as well)
  for (i = 0; i < xOrder; i++) {
    eigenvecs[i] = createArray(xOrder);
    XXt[i] = createArray(xOrder);
    for (j = 0; j < xOrder; j++) {
      XXt[i][j] = 0.0;
    }
  }

  // Calculate XXt upper half only, due to symmetry
  for (k = 0; k < numberOfSamples; k++) {
    for (i = 0; i < xOrder; i++) {
      for (j = i; j < xOrder; j++) {
        XXt[i][j] += xt[k][i] * xt[k][j];
      }
    }
  }

  // now fill in the lower half of the XXt matrix
  for (i = 0; i < xOrder; i++) {
    for (j = 0; j < i; j++) {
      XXt[i][j] = XXt[j][i];
    }
  }

  // Compute the eigenvectors and eigenvalues
  jacobiN(XXt, xOrder, eigenvals, eigenvecs);

  // Smallest eigenval is at the end of the list (xOrder-1), and solution is
  // corresponding eigenvec.
  for (i = 0; i < xOrder; i++) {
    mt[i][0] = eigenvecs[i][xOrder - 1];
  }

  return 1;
}

function solveLeastSquares(numberOfSamples, xt, xOrder, yt, yOrder, mt) {
  var checkHomogeneous = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;

  // check dimensional consistency
  if (numberOfSamples < xOrder || numberOfSamples < yOrder) {
    vtkWarningMacro('Insufficient number of samples. Underdetermined.');
    return 0;
  }

  var homogenFlags = createArray(yOrder);
  var allHomogeneous = 1;
  var hmt = void 0;
  var homogRC = 0;
  var i = void 0;
  var j = void 0;
  var k = void 0;
  var someHomogeneous = 0;

  // Ok, first init some flags check and see if all the systems are homogeneous
  if (checkHomogeneous) {
    // If Y' is zero, it's a homogeneous system and can't be solved via
    // the pseudoinverse method. Detect this case, warn the user, and
    // invoke SolveHomogeneousLeastSquares instead. Note that it doesn't
    // really make much sense for yOrder to be greater than one in this case,
    // since that's just yOrder occurrences of a 0 vector on the RHS, but
    // we allow it anyway. N


    // Initialize homogeneous flags on a per-right-hand-side basis
    for (j = 0; j < yOrder; j++) {
      homogenFlags[j] = 1;
    }
    for (i = 0; i < numberOfSamples; i++) {
      for (j = 0; j < yOrder; j++) {
        if (Math.abs(yt[i][j]) > VTK_SMALL_NUMBER) {
          allHomogeneous = 0;
          homogenFlags[j] = 0;
        }
      }
    }

    // If we've got one system, and it's homogeneous, do it and bail out quickly.
    if (allHomogeneous && yOrder === 1) {
      vtkWarningMacro('Detected homogeneous system (Y=0), calling SolveHomogeneousLeastSquares()');
      return solveHomogeneousLeastSquares(numberOfSamples, xt, xOrder, mt);
    }

    // Ok, we've got more than one system of equations.
    // Figure out if we need to calculate the homogeneous equation solution for
    // any of them.
    if (allHomogeneous) {
      someHomogeneous = 1;
    } else {
      for (j = 0; j < yOrder; j++) {
        if (homogenFlags[j]) {
          someHomogeneous = 1;
        }
      }
    }
  }

  // If necessary, solve the homogeneous problem
  if (someHomogeneous) {
    // hmt is the homogeneous equation version of mt, the general solution.
    hmt = createArray(xOrder);
    for (j = 0; j < xOrder; j++) {
      // Only allocate 1 here, not yOrder, because here we're going to solve
      // just the one homogeneous equation subset of the entire problem
      hmt[j] = [0];
    }

    // Ok, solve the homogeneous problem
    homogRC = solveHomogeneousLeastSquares(numberOfSamples, xt, xOrder, hmt);
  }

  // set up intermediate variables
  var XXt = createArray(xOrder); // size x by x
  var XXtI = createArray(xOrder); // size x by x
  var XYt = createArray(xOrder); // size x by y
  for (i = 0; i < xOrder; i++) {
    XXt[i] = createArray(xOrder);
    XXtI[i] = createArray(xOrder);

    for (j = 0; j < xOrder; j++) {
      XXt[i][j] = 0.0;
      XXtI[i][j] = 0.0;
    }

    XYt[i] = createArray(yOrder);
    for (j = 0; j < yOrder; j++) {
      XYt[i][j] = 0.0;
    }
  }

  // first find the pseudoinverse matrix
  for (k = 0; k < numberOfSamples; k++) {
    for (i = 0; i < xOrder; i++) {
      // first calculate the XXt matrix, only do the upper half (symmetrical)
      for (j = i; j < xOrder; j++) {
        XXt[i][j] += xt[k][i] * xt[k][j];
      }

      // now calculate the XYt matrix
      for (j = 0; j < yOrder; j++) {
        XYt[i][j] += xt[k][i] * yt[k][j];
      }
    }
  }

  // now fill in the lower half of the XXt matrix
  for (i = 0; i < xOrder; i++) {
    for (j = 0; j < i; j++) {
      XXt[i][j] = XXt[j][i];
    }
  }

  var successFlag = invertMatrix(XXt, XXtI, xOrder);

  // next get the inverse of XXt
  if (successFlag) {
    for (i = 0; i < xOrder; i++) {
      for (j = 0; j < yOrder; j++) {
        mt[i][j] = 0.0;
        for (k = 0; k < xOrder; k++) {
          mt[i][j] += XXtI[i][k] * XYt[k][j];
        }
      }
    }
  }

  // Fix up any of the solutions that correspond to the homogeneous equation
  // problem.
  if (someHomogeneous) {
    for (j = 0; j < yOrder; j++) {
      if (homogenFlags[j]) {
        // Fix this one
        for (i = 0; i < xOrder; i++) {
          mt[i][j] = hmt[i][0];
        }
      }
    }
  }

  if (someHomogeneous) {
    return homogRC && successFlag;
  }

  return successFlag;
}

function rgb2hsv(rgb, hsv) {
  var h = void 0;
  var s = void 0;

  var _rgb = _slicedToArray(rgb, 3),
      r = _rgb[0],
      g = _rgb[1],
      b = _rgb[2];

  var onethird = 1.0 / 3.0;
  var onesixth = 1.0 / 6.0;
  var twothird = 2.0 / 3.0;

  var cmax = r;
  var cmin = r;

  if (g > cmax) {
    cmax = g;
  } else if (g < cmin) {
    cmin = g;
  }
  if (b > cmax) {
    cmax = b;
  } else if (b < cmin) {
    cmin = b;
  }
  var v = cmax;

  if (v > 0.0) {
    s = (cmax - cmin) / cmax;
  } else {
    s = 0.0;
  }
  if (s > 0) {
    if (r === cmax) {
      h = onesixth * (g - b) / (cmax - cmin);
    } else if (g === cmax) {
      h = onethird + onesixth * (b - r) / (cmax - cmin);
    } else {
      h = twothird + onesixth * (r - g) / (cmax - cmin);
    }
    if (h < 0.0) {
      h += 1.0;
    }
  } else {
    h = 0.0;
  }

  // Set the values back to the array
  hsv[0] = h;
  hsv[1] = s;
  hsv[2] = v;
}

function hsv2rgb(hsv, rgb) {
  var _hsv = _slicedToArray(hsv, 3),
      h = _hsv[0],
      s = _hsv[1],
      v = _hsv[2];

  var onethird = 1.0 / 3.0;
  var onesixth = 1.0 / 6.0;
  var twothird = 2.0 / 3.0;
  var fivesixth = 5.0 / 6.0;
  var r = void 0;
  var g = void 0;
  var b = void 0;

  // compute RGB from HSV
  if (h > onesixth && h <= onethird) {
    // green/red
    g = 1.0;
    r = (onethird - h) / onesixth;
    b = 0.0;
  } else if (h > onethird && h <= 0.5) {
    // green/blue
    g = 1.0;
    b = (h - onethird) / onesixth;
    r = 0.0;
  } else if (h > 0.5 && h <= twothird) {
    // blue/green
    b = 1.0;
    g = (twothird - h) / onesixth;
    r = 0.0;
  } else if (h > twothird && h <= fivesixth) {
    // blue/red
    b = 1.0;
    r = (h - twothird) / onesixth;
    g = 0.0;
  } else if (h > fivesixth && h <= 1.0) {
    // red/blue
    r = 1.0;
    b = (1.0 - h) / onesixth;
    g = 0.0;
  } else {
    // red/green
    r = 1.0;
    g = h / onesixth;
    b = 0.0;
  }

  // add Saturation to the equation.
  r = s * r + (1.0 - s);
  g = s * g + (1.0 - s);
  b = s * b + (1.0 - s);

  r *= v;
  g *= v;
  b *= v;

  // Assign back to the array
  rgb[0] = r;
  rgb[1] = g;
  rgb[2] = b;
}

function lab2xyz(lab, xyz) {
  // LAB to XYZ
  var _lab = _slicedToArray(lab, 3),
      L = _lab[0],
      a = _lab[1],
      b = _lab[2];

  var var_Y = (L + 16) / 116;
  var var_X = a / 500 + var_Y;
  var var_Z = var_Y - b / 200;

  if (Math.pow(var_Y, 3) > 0.008856) {
    var_Y = Math.pow(var_Y, 3);
  } else {
    var_Y = (var_Y - 16.0 / 116.0) / 7.787;
  }

  if (Math.pow(var_X, 3) > 0.008856) {
    var_X = Math.pow(var_X, 3);
  } else {
    var_X = (var_X - 16.0 / 116.0) / 7.787;
  }

  if (Math.pow(var_Z, 3) > 0.008856) {
    var_Z = Math.pow(var_Z, 3);
  } else {
    var_Z = (var_Z - 16.0 / 116.0) / 7.787;
  }
  var ref_X = 0.9505;
  var ref_Y = 1.000;
  var ref_Z = 1.089;
  xyz[0] = ref_X * var_X; // ref_X = 0.9505  Observer= 2 deg Illuminant= D65
  xyz[1] = ref_Y * var_Y; // ref_Y = 1.000
  xyz[2] = ref_Z * var_Z; // ref_Z = 1.089
}

function xyz2lab(xyz, lab) {
  var _xyz = _slicedToArray(xyz, 3),
      x = _xyz[0],
      y = _xyz[1],
      z = _xyz[2];

  var ref_X = 0.9505;
  var ref_Y = 1.000;
  var ref_Z = 1.089;
  var var_X = x / ref_X; // ref_X = 0.9505  Observer= 2 deg, Illuminant= D65
  var var_Y = y / ref_Y; // ref_Y = 1.000
  var var_Z = z / ref_Z; // ref_Z = 1.089

  if (var_X > 0.008856) var_X = Math.pow(var_X, 1.0 / 3.0);else var_X = 7.787 * var_X + 16.0 / 116.0;
  if (var_Y > 0.008856) var_Y = Math.pow(var_Y, 1.0 / 3.0);else var_Y = 7.787 * var_Y + 16.0 / 116.0;
  if (var_Z > 0.008856) var_Z = Math.pow(var_Z, 1.0 / 3.0);else var_Z = 7.787 * var_Z + 16.0 / 116.0;

  lab[0] = 116 * var_Y - 16;
  lab[1] = 500 * (var_X - var_Y);
  lab[2] = 200 * (var_Y - var_Z);
}

function xyz2rgb(xyz, rgb) {
  var _xyz2 = _slicedToArray(xyz, 3),
      x = _xyz2[0],
      y = _xyz2[1],
      z = _xyz2[2];

  var r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  var g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  var b = x * 0.0557 + y * -0.2040 + z * 1.0570;

  // The following performs a "gamma correction" specified by the sRGB color
  // space.  sRGB is defined by a canonical definition of a display monitor and
  // has been standardized by the International Electrotechnical Commission (IEC
  // 61966-2-1).  The nonlinearity of the correction is designed to make the
  // colors more perceptually uniform.  This color space has been adopted by
  // several applications including Adobe Photoshop and Microsoft Windows color
  // management.  OpenGL is agnostic on its RGB color space, but it is reasonable
  // to assume it is close to this one.
  if (r > 0.0031308) r = 1.055 * Math.pow(r, 1 / 2.4) - 0.055;else r *= 12.92;
  if (g > 0.0031308) g = 1.055 * Math.pow(g, 1 / 2.4) - 0.055;else g *= 12.92;
  if (b > 0.0031308) b = 1.055 * Math.pow(b, 1 / 2.4) - 0.055;else b *= 12.92;

  // Clip colors. ideally we would do something that is perceptually closest
  // (since we can see colors outside of the display gamut), but this seems to
  // work well enough.
  var maxVal = r;
  if (maxVal < g) maxVal = g;
  if (maxVal < b) maxVal = b;
  if (maxVal > 1.0) {
    r /= maxVal;
    g /= maxVal;
    b /= maxVal;
  }
  if (r < 0) r = 0;
  if (g < 0) g = 0;
  if (b < 0) b = 0;

  // Push values back to array
  rgb[0] = r;
  rgb[1] = g;
  rgb[2] = b;
}

function rgb2xyz(rgb, xyz) {
  var _rgb2 = _slicedToArray(rgb, 3),
      r = _rgb2[0],
      g = _rgb2[1],
      b = _rgb2[2];
  // The following performs a "gamma correction" specified by the sRGB color
  // space.  sRGB is defined by a canonical definition of a display monitor and
  // has been standardized by the International Electrotechnical Commission (IEC
  // 61966-2-1).  The nonlinearity of the correction is designed to make the
  // colors more perceptually uniform.  This color space has been adopted by
  // several applications including Adobe Photoshop and Microsoft Windows color
  // management.  OpenGL is agnostic on its RGB color space, but it is reasonable
  // to assume it is close to this one.


  if (r > 0.04045) r = Math.pow((r + 0.055) / 1.055, 2.4);else r /= 12.92;
  if (g > 0.04045) g = Math.pow((g + 0.055) / 1.055, 2.4);else g /= 12.92;
  if (b > 0.04045) b = Math.pow((b + 0.055) / 1.055, 2.4);else b /= 12.92;

  // Observer. = 2 deg, Illuminant = D65
  xyz[0] = r * 0.4124 + g * 0.3576 + b * 0.1805;
  xyz[1] = r * 0.2126 + g * 0.7152 + b * 0.0722;
  xyz[2] = r * 0.0193 + g * 0.1192 + b * 0.9505;
}

function rgb2lab(rgb, lab) {
  var xyz = [0, 0, 0];
  rgb2xyz(rgb, xyz);
  xyz2lab(xyz, lab);
}

function lab2rgb(lab, rgb) {
  var xyz = [0, 0, 0];
  lab2xyz(lab, xyz);
  xyz2rgb(xyz, rgb);
}

function uninitializeBounds(bounds) {
  bounds[0] = 1.0;
  bounds[1] = -1.0;
  bounds[2] = 1.0;
  bounds[3] = -1.0;
  bounds[4] = 1.0;
  bounds[5] = -1.0;
}

function areBoundsInitialized(bounds) {
  return !(bounds[1] - bounds[0] < 0.0);
}

function clampValue(value, minValue, maxValue) {
  if (value < minValue) {
    return minValue;
  }
  if (value > maxValue) {
    return maxValue;
  }
  return value;
}

function clampAndNormalizeValue(value, range) {
  var result = 0;
  if (range[0] !== range[1]) {
    // clamp
    if (value < range[0]) {
      result = range[0];
    } else if (value > range[1]) {
      result = range[1];
    } else {
      result = value;
    }
    // normalize
    result = (result - range[0]) / (range[1] - range[0]);
  }

  return result;
}

var getScalarTypeFittingRange = notImplemented('GetScalarTypeFittingRange');
var getAdjustedScalarRange = notImplemented('GetAdjustedScalarRange');

function extentIsWithinOtherExtent(extent1, extent2) {
  if (!extent1 || !extent2) {
    return 0;
  }

  for (var i = 0; i < 6; i += 2) {
    if (extent1[i] < extent2[i] || extent1[i] > extent2[i + 1] || extent1[i + 1] < extent2[i] || extent1[i + 1] > extent2[i + 1]) {
      return 0;
    }
  }

  return 1;
}

function boundsIsWithinOtherBounds(bounds1_6, bounds2_6, delta_3) {
  if (!bounds1_6 || !bounds2_6) {
    return 0;
  }
  for (var i = 0; i < 6; i += 2) {
    if (bounds1_6[i] + delta_3[i / 2] < bounds2_6[i] || bounds1_6[i] - delta_3[i / 2] > bounds2_6[i + 1] || bounds1_6[i + 1] + delta_3[i / 2] < bounds2_6[i] || bounds1_6[i + 1] - delta_3[i / 2] > bounds2_6[i + 1]) {
      return 0;
    }
  }
  return 1;
}

function pointIsWithinBounds(point_3, bounds_6, delta_3) {
  if (!point_3 || !bounds_6 || !delta_3) {
    return 0;
  }
  for (var i = 0; i < 3; i++) {
    if (point_3[i] + delta_3[i] < bounds_6[2 * i] || point_3[i] - delta_3[i] > bounds_6[2 * i + 1]) {
      return 0;
    }
  }
  return 1;
}

function solve3PointCircle(p1, p2, p3, center) {
  var v21 = createArray(3);
  var v32 = createArray(3);
  var v13 = createArray(3);
  var v12 = createArray(3);
  var v23 = createArray(3);
  var v31 = createArray(3);

  for (var i = 0; i < 3; ++i) {
    v21[i] = p1[i] - p2[i];
    v32[i] = p2[i] - p3[i];
    v13[i] = p3[i] - p1[i];
    v12[i] = -v21[i];
    v23[i] = -v32[i];
    v31[i] = -v13[i];
  }

  var norm12 = norm(v12);
  var norm23 = norm(v23);
  var norm13 = norm(v13);

  var crossv21v32 = createArray(3);
  cross(v21, v32, crossv21v32);
  var normCross = norm(crossv21v32);

  var radius = norm12 * norm23 * norm13 / (2 * normCross);

  var normCross22 = 2 * normCross * normCross;
  var alpha = norm23 * norm23 * dot(v21, v31) / normCross22;
  var beta = norm13 * norm13 * dot(v12, v32) / normCross22;
  var gamma = norm12 * norm12 * dot(v13, v23) / normCross22;

  for (var _i6 = 0; _i6 < 3; ++_i6) {
    center[_i6] = alpha * p1[_i6] + beta * p2[_i6] + gamma * p3[_i6];
  }
  return radius;
}

var inf = Infinity;
var negInf = -Infinity;

var isInf = function isInf(value) {
  return !Number.isFinite(value);
};
var isNan = Number.isNaN;
var isFinite = Number.isFinite;

// JavaScript - add-on ----------------------

function createUninitializedBounds() {
  return [].concat([Number.MAX_VALUE, Number.MIN_VALUE, // X
  Number.MAX_VALUE, Number.MIN_VALUE, // Y
  Number.MAX_VALUE, Number.MIN_VALUE] // Z
  );
}

// ----------------------------------------------------------------------------
// Only Static API
// ----------------------------------------------------------------------------

exports.default = {
  Pi: Pi,
  radiansFromDegrees: radiansFromDegrees,
  degreesFromRadians: degreesFromRadians,
  round: round,
  floor: floor,
  ceil: ceil,
  ceilLog2: ceilLog2,
  min: min,
  max: max,
  isPowerOfTwo: isPowerOfTwo,
  nearestPowerOfTwo: nearestPowerOfTwo,
  factorial: factorial,
  binomial: binomial,
  beginCombination: beginCombination,
  nextCombination: nextCombination,
  randomSeed: randomSeed,
  getSeed: getSeed,
  random: random,
  gaussian: gaussian,
  add: add,
  subtract: subtract,
  multiplyScalar: multiplyScalar,
  multiplyScalar2D: multiplyScalar2D,
  dot: dot,
  outer: outer,
  cross: cross,
  norm: norm,
  normalize: normalize,
  perpendiculars: perpendiculars,
  projectVector: projectVector,
  projectVector2D: projectVector2D,
  distance2BetweenPoints: distance2BetweenPoints,
  angleBetweenVectors: angleBetweenVectors,
  gaussianAmplitude: gaussianAmplitude,
  gaussianWeight: gaussianWeight,
  dot2D: dot2D,
  outer2D: outer2D,
  norm2D: norm2D,
  normalize2D: normalize2D,
  determinant2x2: determinant2x2,
  LUFactor3x3: LUFactor3x3,
  LUSolve3x3: LUSolve3x3,
  linearSolve3x3: linearSolve3x3,
  multiply3x3_vect3: multiply3x3_vect3,
  multiply3x3_mat3: multiply3x3_mat3,
  multiplyMatrix: multiplyMatrix,
  transpose3x3: transpose3x3,
  invert3x3: invert3x3,
  identity3x3: identity3x3,
  determinant3x3: determinant3x3,
  quaternionToMatrix3x3: quaternionToMatrix3x3,
  matrix3x3ToQuaternion: matrix3x3ToQuaternion,
  multiplyQuaternion: multiplyQuaternion,
  orthogonalize3x3: orthogonalize3x3,
  diagonalize3x3: diagonalize3x3,
  singularValueDecomposition3x3: singularValueDecomposition3x3,
  solveLinearSystem: solveLinearSystem,
  invertMatrix: invertMatrix,
  luFactorLinearSystem: luFactorLinearSystem,
  luSolveLinearSystem: luSolveLinearSystem,
  estimateMatrixCondition: estimateMatrixCondition,
  jacobi: jacobi,
  jacobiN: jacobiN,
  solveHomogeneousLeastSquares: solveHomogeneousLeastSquares,
  solveLeastSquares: solveLeastSquares,
  rgb2hsv: rgb2hsv,
  hsv2rgb: hsv2rgb,
  lab2xyz: lab2xyz,
  xyz2lab: xyz2lab,
  xyz2rgb: xyz2rgb,
  rgb2xyz: rgb2xyz,
  rgb2lab: rgb2lab,
  lab2rgb: lab2rgb,
  uninitializeBounds: uninitializeBounds,
  areBoundsInitialized: areBoundsInitialized,
  clampValue: clampValue,
  clampAndNormalizeValue: clampAndNormalizeValue,
  getScalarTypeFittingRange: getScalarTypeFittingRange,
  getAdjustedScalarRange: getAdjustedScalarRange,
  extentIsWithinOtherExtent: extentIsWithinOtherExtent,
  boundsIsWithinOtherBounds: boundsIsWithinOtherBounds,
  pointIsWithinBounds: pointIsWithinBounds,
  solve3PointCircle: solve3PointCircle,
  inf: inf,
  negInf: negInf,
  isInf: isInf,
  isNan: isNan,
  isFinite: isFinite,

  // JS add-on
  createUninitializedBounds: createUninitializedBounds
};

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newInstance = undefined;
exports.extend = extend;

var _macro = __webpack_require__(4);

var _macro2 = _interopRequireDefault(_macro);

var _InteractorStyleTrackballCamera = __webpack_require__(33);

var _InteractorStyleTrackballCamera2 = _interopRequireDefault(_InteractorStyleTrackballCamera);

var _Math = __webpack_require__(7);

var _Math2 = _interopRequireDefault(_Math);

var _Constants = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ----------------------------------------------------------------------------
// vtkInteractorStyleImage methods
// ----------------------------------------------------------------------------
function vtkInteractorStyleImage(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkInteractorStyleImage');
  //----------------------------------------------------------------------------
  publicAPI.startWindowLevel = function () {
    if (model.state !== _Constants.States.IS_NONE) {
      return;
    }
    publicAPI.startState(_Constants.States.IS_WINDOW_LEVEL);
    // Get the last (the topmost) image
    publicAPI.setCurrentImageNumber(model.currentImageNumber);
    if (model.handleObservers && typeof publicAPI.invokeStartWindowLevelEvent === 'function') {
      publicAPI.invokeStartWindowLevelEvent({ type: 'StartWindowLevelEvent', style: publicAPI });
    } else if (model.currentImageProperty) {
      var property = model.currentImageProperty;
      model.windowLevelInitial[0] = property.getColorWindow();
      model.windowLevelInitial[1] = property.getColorLevel();
    }
  };
  //----------------------------------------------------------------------------
  publicAPI.endWindowLevel = function () {
    if (model.state !== _Constants.States.IS_WINDOW_LEVEL) {
      return;
    }
    if (model.handleObservers && typeof publicAPI.invokeEndWindowLevelEvent === 'function') {
      publicAPI.invokeEndWindowLevelEvent({ type: 'EndWindowLevelEvent', style: publicAPI });
    }
    publicAPI.stopState();
  };
  //----------------------------------------------------------------------------
  publicAPI.startSlice = function () {
    if (model.state !== _Constants.States.IS_NONE) {
      return;
    }
    publicAPI.startState(_Constants.States.IS_SLICE);
  };
  //----------------------------------------------------------------------------
  publicAPI.endSlice = function () {
    if (model.state !== _Constants.States.IS_SLICE) {
      return;
    }
    publicAPI.stopState();
  };
  // Public API methods
  publicAPI.superHandleAnimation = publicAPI.handleAnimation;
  publicAPI.handleAnimation = function () {
    var pos = model.interactor.getEventPosition(model.interactor.getPointerIndex());
    switch (model.state) {
      case _Constants.States.IS_WINDOW_LEVEL:
        publicAPI.findPokedRenderer(pos.x, pos.y);
        publicAPI.windowLevel();
        publicAPI.invokeInteractionEvent({ type: 'InteractionEvent' });
        break;
      case _Constants.States.IS_SLICE:
        publicAPI.findPokedRenderer(pos.x, pos.y);
        publicAPI.slice();
        publicAPI.invokeInteractionEvent({ type: 'InteractionEvent' });
        break;
      default:
        break;
    }
    publicAPI.superHandleAnimation();
  };
  //----------------------------------------------------------------------------
  publicAPI.superHandleLeftButtonPress = publicAPI.handleLeftButtonPress;
  publicAPI.handleLeftButtonPress = function () {
    var pos = model.interactor.getEventPosition(model.interactor.getPointerIndex());
    publicAPI.findPokedRenderer(pos.x, pos.y);
    if (model.currentRenderer === null) {
      return;
    }
    publicAPI.grabFocus(model.eventCallbackCommand);
    if (!model.interactor.getShiftKey() && !model.interactor.getControlKey()) {
      model.windowLevelStartPosition[0] = pos.x;
      model.windowLevelStartPosition[1] = pos.y;
      publicAPI.startWindowLevel();
      publicAPI.setAnimationStateOn();
    } else if (model.interactionMode === 'IMAGE3D' && model.interactor.getShiftKey()) {
      // If shift is held down, do a rotation
      publicAPI.startRotate();
      publicAPI.setAnimationStateOn();
    } else if (model.interactionMode === 'IMAGE_SLICING' && model.interactor.getControlKey()) {
      // If ctrl is held down in slicing mode, slice the image
      model.lastSlicePosition = pos.y;
      publicAPI.startSlice();
      publicAPI.setAnimationStateOn();
    } else {
      // The rest of the button + key combinations remain the same
      publicAPI.superHandleLeftButtonPress();
    }
  };
  //--------------------------------------------------------------------------
  publicAPI.superHandleLeftButtonRelease = publicAPI.handleLeftButtonRelease;
  publicAPI.handleLeftButtonRelease = function () {
    switch (model.state) {
      case _Constants.States.IS_WINDOW_LEVEL:
        publicAPI.endWindowLevel();
        if (model.interactor) {
          publicAPI.releaseFocus();
          publicAPI.setAnimationStateOff();
        }
        break;
      case _Constants.States.IS_SLICE:
        publicAPI.endSlice();
        if (model.interactor) {
          publicAPI.releaseFocus();
          publicAPI.setAnimationStateOff();
        }
        break;
      default:
        break;
    }
    publicAPI.superHandleLeftButtonRelease();
  };
  //----------------------------------------------------------------------------
  publicAPI.windowLevel = function () {
    var pos = model.interactor.getEventPosition(model.interactor.getPointerIndex());
    model.windowLevelCurrentPosition[0] = pos.x;
    model.windowLevelCurrentPosition[1] = pos.y;
    var rwi = model.interactor;
    if (model.handleObservers && typeof publicAPI.invokeWindowLevelEvent === 'function') {
      publicAPI.invokeWindowLevelEvent({ type: 'WindowLevelEvent', style: publicAPI });
    } else if (model.currentImageProperty) {
      var size = rwi.getView().getViewportSize(model.currentRenderer);
      var mWindow = model.windowLevelInitial[0];
      var level = model.windowLevelInitial[1];
      // Compute normalized delta
      var dx = (model.windowLevelCurrentPosition[0] - model.windowLevelStartPosition[0]) * 4.0 / size[0];
      var dy = (model.windowLevelStartPosition[1] - model.windowLevelCurrentPosition[1]) * 4.0 / size[1];
      // Scale by current values
      if (Math.abs(mWindow) > 0.01) {
        dx *= mWindow;
      } else {
        dx *= mWindow < 0 ? -0.01 : 0.01;
      }
      if (Math.abs(level) > 0.01) {
        dy *= level;
      } else {
        dy *= level < 0 ? -0.01 : 0.01;
      }
      // Abs so that direction does not flip
      if (mWindow < 0.0) {
        dx *= -1;
      }
      if (level < 0.0) {
        dy *= -1;
      }
      // Compute new mWindow level
      var newWindow = dx + mWindow;
      var newLevel = level - dy;
      if (newWindow < 0.01) {
        newWindow = 0.01;
      }
      model.currentImageProperty.setColorWindow(newWindow);
      model.currentImageProperty.setColorLevel(newLevel);
      rwi.render();
    }
  };
  //----------------------------------------------------------------------------
  publicAPI.slice = function () {
    if (model.currentRenderer === null) {
      return;
    }
    var rwi = model.interactor;
    var lastPtr = model.interactor.getPointerIndex();
    var pos = model.interactor.getEventPosition(lastPtr);
    var dy = pos.y - model.lastSlicePosition;
    var camera = model.currentRenderer.getActiveCamera();
    var range = camera.getClippingRange();
    var distance = camera.getDistance();
    // scale the interaction by the height of the viewport
    var viewportHeight = 0.0;
    if (camera.getParallelProjection()) {
      viewportHeight = camera.getParallelScale();
    } else {
      var angle = _Math2.default.radiansFromDegrees(camera.getViewAngle());
      viewportHeight = 2.0 * distance * Math.tan(0.5 * angle);
    }
    var size = rwi.getView().getViewportSize(model.currentRenderer);
    var delta = dy * viewportHeight / size[1];
    distance += delta;
    // clamp the distance to the clipping range
    if (distance < range[0]) {
      distance = range[0] + viewportHeight * 1e-3;
    }
    if (distance > range[1]) {
      distance = range[1] - viewportHeight * 1e-3;
    }
    camera.setDistance(distance);
    rwi.render();
    model.lastSlicePosition = pos.y;
  };
  //----------------------------------------------------------------------------
  // This is a way of dealing with images as if they were layers.
  // It looks through the renderer's list of props and sets the
  // interactor ivars from the Nth image that it finds.  You can
  // also use negative numbers, i.e. -1 will return the last image,
  // -2 will return the second-to-last image, etc.
  publicAPI.setCurrentImageNumber = function (i) {
    model.currentImageNumber = i;
    if (!model.currentRenderer) {
      return;
    }
    function propMatch(j, prop, targetIndex) {
      if (prop.isA('vtkImageSlice') && j === targetIndex && prop.getPickable()) {
        return true;
      }
      return false;
    }
    var props = model.currentRenderer.getViewProps();
    var targetIndex = i;
    if (i < 0) {
      targetIndex += props.length;
    }
    var imageProp = null;
    var foundImageProp = false;
    for (var j = 0; j < props.length && !foundImageProp; j++) {
      if (propMatch(j, props[j], targetIndex)) {
        foundImageProp = true;
        imageProp = props[j];
      }
    }
    if (imageProp) {
      model.currentImageProperty = imageProp.getProperty();
    }
  };
}
// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------
var DEFAULT_VALUES = {
  motionFactor: 10.0,
  windowLevelStartPosition: [0, 0],
  windowLevelCurrentPosition: [0, 0],
  lastSlicePosition: 0,
  windowLevelInitial: [1.0, 0.5],
  currentImageProperty: 0,
  currentImageNumber: -1,
  interactionMode: 'IMAGE2D',
  xViewRightVector: [0, 1, 0],
  xViewUpVector: [0, 0, -1],
  yViewRightVector: [1, 0, 0],
  yViewUpVector: [0, 0, -1],
  zViewRightVector: [1, 0, 0],
  zViewUpVector: [0, 1, 0]
};
// ----------------------------------------------------------------------------
function extend(publicAPI, model) {
  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  Object.assign(model, DEFAULT_VALUES, initialValues);
  // Inheritance
  _InteractorStyleTrackballCamera2.default.extend(publicAPI, model, initialValues);
  // Create get-set macros
  _macro2.default.setGet(publicAPI, model, ['motionFactor', 'interactionMode']);
  // For more macro methods, see "Sources/macro.js"
  // Object specific methods
  vtkInteractorStyleImage(publicAPI, model);
}
// ----------------------------------------------------------------------------
var newInstance = exports.newInstance = _macro2.default.newInstance(extend, 'vtkInteractorStyleImage');
// ----------------------------------------------------------------------------
exports.default = Object.assign({ newInstance: newInstance, extend: extend });

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = vtk;
exports.register = register;
var factoryMapping = {
  vtkObject: function vtkObject() {
    return null;
  }
};

function vtk(obj) {
  if (obj === null || obj === undefined) {
    return obj;
  }
  if (obj.isA) {
    return obj;
  }
  if (!obj.vtkClass) {
    if (global.console && global.console.error) {
      global.console.error('Invalid VTK object');
    }
    return null;
  }
  var constructor = factoryMapping[obj.vtkClass];
  if (!constructor) {
    if (global.console && global.console.error) {
      global.console.error('No vtk class found for Object of type ' + obj.vtkClass);
    }
    return null;
  }

  // Shallow copy object
  var model = Object.assign({}, obj);

  // Convert into vtkObject any nested key
  Object.keys(model).forEach(function (keyName) {
    if (model[keyName] && _typeof(model[keyName]) === 'object' && model[keyName].vtkClass) {
      model[keyName] = vtk(model[keyName]);
    }
  });

  // Return the root
  var newInst = constructor(model);
  if (newInst && newInst.modified) {
    newInst.modified();
  }
  return newInst;
}

function register(vtkClassName, constructor) {
  factoryMapping[vtkClassName] = constructor;
}

// Nest register method under the vtk function
vtk.register = register;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newInstance = undefined;
exports.extend = extend;

var _macro = __webpack_require__(4);

var _macro2 = _interopRequireDefault(_macro);

var _InteractorStyle = __webpack_require__(34);

var _InteractorStyle2 = _interopRequireDefault(_InteractorStyle);

var _Math = __webpack_require__(7);

var _Math2 = _interopRequireDefault(_Math);

var _Constants = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-lonely-if */

// ----------------------------------------------------------------------------
// vtkInteractorStyleTrackballCamera methods
// ----------------------------------------------------------------------------

function vtkInteractorStyleTrackballCamera(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkInteractorStyleTrackballCamera');

  // Public API methods
  publicAPI.handleAnimation = function () {
    var pos = model.interactor.getAnimationEventPosition(model.interactor.getPointerIndex());

    switch (model.state) {
      case _Constants.States.IS_ROTATE:
        publicAPI.findPokedRenderer(pos.x, pos.y);
        publicAPI.rotate();
        publicAPI.invokeInteractionEvent({ type: 'InteractionEvent' });
        break;

      case _Constants.States.IS_PAN:
        publicAPI.findPokedRenderer(pos.x, pos.y);
        publicAPI.pan();
        publicAPI.invokeInteractionEvent({ type: 'InteractionEvent' });
        break;

      case _Constants.States.IS_DOLLY:
        publicAPI.findPokedRenderer(pos.x, pos.y);
        publicAPI.dolly();
        publicAPI.invokeInteractionEvent({ type: 'InteractionEvent' });
        break;

      case _Constants.States.IS_SPIN:
        publicAPI.findPokedRenderer(pos.x, pos.y);
        publicAPI.spin();
        publicAPI.invokeInteractionEvent({ type: 'InteractionEvent' });
        break;

      default:
        break;
    }
  };

  //----------------------------------------------------------------------------
  publicAPI.handleLeftButtonPress = function () {
    var pos = model.interactor.getEventPosition(model.interactor.getPointerIndex());
    publicAPI.findPokedRenderer(pos.x, pos.y);
    if (model.currentRenderer === null) {
      return;
    }

    publicAPI.grabFocus(model.eventCallbackCommand);
    if (model.interactor.getShiftKey()) {
      if (model.interactor.getControlKey() || model.interactor.getAltKey()) {
        publicAPI.startDolly();
        publicAPI.setAnimationStateOn();
      } else {
        publicAPI.startPan();
        publicAPI.setAnimationStateOn();
      }
    } else {
      if (model.interactor.getControlKey() || model.interactor.getAltKey()) {
        publicAPI.startSpin();
        publicAPI.setAnimationStateOn();
      } else {
        publicAPI.startRotate();
        publicAPI.setAnimationStateOn();
      }
    }
  };

  //--------------------------------------------------------------------------
  publicAPI.handleLeftButtonRelease = function () {
    switch (model.state) {
      case _Constants.States.IS_DOLLY:
        publicAPI.setAnimationStateOff();
        publicAPI.endDolly();
        break;

      case _Constants.States.IS_PAN:
        publicAPI.setAnimationStateOff();
        publicAPI.endPan();
        break;

      case _Constants.States.IS_SPIN:
        publicAPI.setAnimationStateOff();
        publicAPI.endSpin();
        break;

      case _Constants.States.IS_ROTATE:
        publicAPI.setAnimationStateOff();
        publicAPI.endRotate();
        break;

      default:
        break;
    }

    if (model.interactor) {
      publicAPI.releaseFocus();
    }
  };

  //----------------------------------------------------------------------------
  publicAPI.handlePinch = function () {
    var pos = model.interactor.getEventPosition(model.interactor.getPointerIndex());
    publicAPI.findPokedRenderer(pos.x, pos.y);
    if (model.currentRenderer === null) {
      return;
    }

    var camera = model.currentRenderer.getActiveCamera();

    var dyf = model.interactor.getScale() / model.interactor.getLastScale();
    if (camera.getParallelProjection()) {
      camera.setParallelScale(camera.getParallelScale() / dyf);
    } else {
      camera.dolly(dyf);
      if (model.autoAdjustCameraClippingRange) {
        model.currentRenderer.resetCameraClippingRange();
      }
    }

    if (model.interactor.getLightFollowCamera()) {
      model.currentRenderer.updateLightsGeometryToFollowCamera();
    }
    model.interactor.render();
  };

  //----------------------------------------------------------------------------
  publicAPI.handlePan = function () {
    var pos = model.interactor.getEventPosition(model.interactor.getPointerIndex());
    publicAPI.findPokedRenderer(pos.x, pos.y);
    if (model.currentRenderer === null) {
      return;
    }

    var camera = model.currentRenderer.getActiveCamera();

    var rwi = model.interactor;

    // Calculate the focal depth since we'll be using it a lot
    var viewFocus = camera.getFocalPoint();

    viewFocus = publicAPI.computeWorldToDisplay(viewFocus[0], viewFocus[1], viewFocus[2]);
    var focalDepth = viewFocus[2];

    var newPickPoint = publicAPI.computeDisplayToWorld(pos.x, pos.y, focalDepth);

    var trans = rwi.getTranslation();
    var lastTrans = rwi.getLastTranslation();
    newPickPoint = publicAPI.computeDisplayToWorld(viewFocus[0] + trans[0] - lastTrans[0], viewFocus[1] + trans[1] - lastTrans[1], focalDepth);

    // Has to recalc old mouse point since the viewport has moved,
    // so can't move it outside the loop
    var oldPickPoint = publicAPI.computeDisplayToWorld(viewFocus[0], viewFocus[1], focalDepth);

    // Camera motion is reversed
    var motionVector = [];
    motionVector[0] = oldPickPoint[0] - newPickPoint[0];
    motionVector[1] = oldPickPoint[1] - newPickPoint[1];
    motionVector[2] = oldPickPoint[2] - newPickPoint[2];

    viewFocus = camera.getFocalPoint();
    var viewPoint = camera.getPosition();
    camera.setFocalPoint(motionVector[0] + viewFocus[0], motionVector[1] + viewFocus[1], motionVector[2] + viewFocus[2]);

    camera.setPosition(motionVector[0] + viewPoint[0], motionVector[1] + viewPoint[1], motionVector[2] + viewPoint[2]);

    if (model.interactor.getLightFollowCamera()) {
      model.currentRenderer.updateLightsGeometryToFollowCamera();
    }

    camera.orthogonalizeViewUp();
    model.interactor.render();
  };

  publicAPI.handleRotate = function () {
    var pos = model.interactor.getEventPosition(model.interactor.getPointerIndex());
    publicAPI.findPokedRenderer(pos.x, pos.y);
    if (model.currentRenderer === null) {
      return;
    }

    var camera = model.currentRenderer.getActiveCamera();

    camera.roll(model.interactor.getRotation() - model.interactor.getLastRotation());

    camera.orthogonalizeViewUp();
    model.interactor.render();
  };

  //--------------------------------------------------------------------------
  publicAPI.rotate = function () {
    if (model.currentRenderer === null) {
      return;
    }

    var rwi = model.interactor;

    var lastPtr = model.interactor.getPointerIndex();
    var pos = model.interactor.getAnimationEventPosition(lastPtr);
    var lastPos = model.interactor.getLastAnimationEventPosition(lastPtr);

    var dx = pos.x - lastPos.x;
    var dy = pos.y - lastPos.y;

    var size = rwi.getView().getViewportSize(model.currentRenderer);

    var deltaElevation = -0.1;
    var deltaAzimuth = -0.1;
    if (size[0] && size[1]) {
      deltaElevation = -20.0 / size[1];
      deltaAzimuth = -20.0 / size[0];
    }

    var rxf = dx * deltaAzimuth * model.motionFactor;
    var ryf = dy * deltaElevation * model.motionFactor;

    var camera = model.currentRenderer.getActiveCamera();
    if (!isNaN(rxf) && !isNaN(ryf)) {
      camera.azimuth(rxf);
      camera.elevation(ryf);
      camera.orthogonalizeViewUp();
    }

    if (model.autoAdjustCameraClippingRange) {
      model.currentRenderer.resetCameraClippingRange();
    }

    if (rwi.getLightFollowCamera()) {
      model.currentRenderer.updateLightsGeometryToFollowCamera();
    }

    rwi.render();
  };

  //--------------------------------------------------------------------------
  publicAPI.spin = function () {
    if (model.currentRenderer === null) {
      return;
    }

    var rwi = model.interactor;

    var lastPtr = model.interactor.getPointerIndex();
    var pos = model.interactor.getAnimationEventPosition(lastPtr);
    var lastPos = model.interactor.getLastAnimationEventPosition(lastPtr);

    var camera = model.currentRenderer.getActiveCamera();
    var center = rwi.getView().getViewportCenter(model.currentRenderer);

    var oldAngle = _Math2.default.degreesFromRadians(Math.atan2(lastPos.y - center[1], lastPos.x - center[0]));
    var newAngle = _Math2.default.degreesFromRadians(Math.atan2(pos.y - center[1], pos.x - center[0])) - oldAngle;

    if (!isNaN(newAngle)) {
      camera.roll(newAngle);
      camera.orthogonalizeViewUp();
    }

    rwi.render();
  };

  publicAPI.pan = function () {
    if (model.currentRenderer === null) {
      return;
    }

    var rwi = model.interactor;

    var lastPtr = model.interactor.getPointerIndex();
    var pos = model.interactor.getAnimationEventPosition(lastPtr);
    var lastPos = model.interactor.getLastAnimationEventPosition(lastPtr);

    var camera = model.currentRenderer.getActiveCamera();

    // Calculate the focal depth since we'll be using it a lot
    var viewFocus = camera.getFocalPoint();
    viewFocus = publicAPI.computeWorldToDisplay(viewFocus[0], viewFocus[1], viewFocus[2]);
    var focalDepth = viewFocus[2];

    var newPickPoint = publicAPI.computeDisplayToWorld(pos.x, pos.y, focalDepth);

    // Has to recalc old mouse point since the viewport has moved,
    // so can't move it outside the loop
    var oldPickPoint = publicAPI.computeDisplayToWorld(lastPos.x, lastPos.y, focalDepth);

    // Camera motion is reversed
    var motionVector = [];
    motionVector[0] = oldPickPoint[0] - newPickPoint[0];
    motionVector[1] = oldPickPoint[1] - newPickPoint[1];
    motionVector[2] = oldPickPoint[2] - newPickPoint[2];

    viewFocus = camera.getFocalPoint();
    var viewPoint = camera.getPosition();
    camera.setFocalPoint(motionVector[0] + viewFocus[0], motionVector[1] + viewFocus[1], motionVector[2] + viewFocus[2]);

    camera.setPosition(motionVector[0] + viewPoint[0], motionVector[1] + viewPoint[1], motionVector[2] + viewPoint[2]);

    if (rwi.getLightFollowCamera()) {
      model.currentRenderer.updateLightsGeometryToFollowCamera();
    }

    rwi.render();
  };

  //----------------------------------------------------------------------------
  publicAPI.dolly = function () {
    if (model.currentRenderer === null) {
      return;
    }

    var lastPtr = model.interactor.getPointerIndex();
    var pos = model.interactor.getAnimationEventPosition(lastPtr);
    var lastPos = model.interactor.getLastAnimationEventPosition(lastPtr);

    var dy = pos.y - lastPos.y;
    var rwi = model.interactor;
    var center = rwi.getView().getViewportCenter(model.currentRenderer);
    var dyf = model.motionFactor * dy / center[1];

    publicAPI.dollyByFactor(Math.pow(1.1, dyf));
  };

  //----------------------------------------------------------------------------
  publicAPI.dollyByFactor = function (factor) {
    if (model.currentRenderer === null || isNaN(factor)) {
      return;
    }

    var rwi = model.interactor;

    var camera = model.currentRenderer.getActiveCamera();
    if (camera.getParallelProjection()) {
      camera.setParallelScale(camera.getParallelScale() / factor);
    } else {
      camera.dolly(factor);
      if (model.autoAdjustCameraClippingRange) {
        model.currentRenderer.resetCameraClippingRange();
      }
    }

    if (rwi.getLightFollowCamera()) {
      model.currentRenderer.updateLightsGeometryToFollowCamera();
    }

    rwi.render();
  };
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

var DEFAULT_VALUES = {
  motionFactor: 10.0
};

// ----------------------------------------------------------------------------

function extend(publicAPI, model) {
  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  Object.assign(model, DEFAULT_VALUES, initialValues);

  // Inheritance
  _InteractorStyle2.default.extend(publicAPI, model, initialValues);

  // Create get-set macros
  _macro2.default.setGet(publicAPI, model, ['motionFactor']);

  // For more macro methods, see "Sources/macro.js"

  // Object specific methods
  vtkInteractorStyleTrackballCamera(publicAPI, model);
}

// ----------------------------------------------------------------------------

var newInstance = exports.newInstance = _macro2.default.newInstance(extend, 'vtkInteractorStyleTrackballCamera');

// ----------------------------------------------------------------------------

exports.default = Object.assign({ newInstance: newInstance, extend: extend });

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newInstance = undefined;
exports.extend = extend;

var _macro = __webpack_require__(4);

var _macro2 = _interopRequireDefault(_macro);

var _InteractorObserver = __webpack_require__(35);

var _InteractorObserver2 = _interopRequireDefault(_InteractorObserver);

var _Constants = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// { ENUM_1: 0, ENUM_2: 1, ... }

var vtkWarningMacro = _macro2.default.vtkWarningMacro;

// ----------------------------------------------------------------------------
// Global methods
// ----------------------------------------------------------------------------

// Add module-level functions or api that you want to expose statically via
// the next section...

var stateNames = {
  Rotate: _Constants.States.IS_ROTATE,
  Pan: _Constants.States.IS_PAN,
  Spin: _Constants.States.IS_SPIN,
  Dolly: _Constants.States.IS_DOLLY,
  Zoom: _Constants.States.IS_ZOOM,
  Timer: _Constants.States.IS_TIMER,
  TwoPointer: _Constants.States.IS_TWO_POINTER,
  UniformScale: _Constants.States.IS_USCALE
};

var events = ['Animation', 'Enter', 'Leave', 'MouseMove', 'LeftButtonPress', 'LeftButtonRelease', 'MiddleButtonPress', 'MiddleButtonRelease', 'RightButtonPress', 'RightButtonRelease', 'MouseWheelForward', 'MouseWheelBackward', 'Expose', 'Configure', 'Timer', 'KeyPress', 'KeyUp', 'Char', 'Delete', 'Pinch', 'Pan', 'Rotate', 'Tap', 'LongTap', 'Swipe'];

// ----------------------------------------------------------------------------
// vtkInteractorStyle methods
// ----------------------------------------------------------------------------

function vtkInteractorStyle(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkInteractorStyle');

  // Public API methods
  publicAPI.setInteractor = function (i) {
    if (i === model.interactor) {
      return;
    }

    // if we already have an Interactor then stop observing it
    if (model.interactor) {
      while (model.unsubscribes.length) {
        model.unsubscribes.pop().unsubscribe();
      }
    }

    model.interactor = i;

    if (i) {
      events.forEach(function (eventName) {
        model.unsubscribes.push(i['on' + eventName](function () {
          if (publicAPI['handle' + eventName]) {
            publicAPI['handle' + eventName]();
          }
        }));
      });
    }
  };

  // create bunch of Start/EndState methods
  Object.keys(stateNames).forEach(function (key) {
    publicAPI['start' + key] = function () {
      if (model.state !== _Constants.States.IS_NONE) {
        return;
      }
      publicAPI.startState(stateNames[key]);
    };
    publicAPI['end' + key] = function () {
      if (model.state !== stateNames[key]) {
        return;
      }
      publicAPI.stopState();
    };
  });

  //----------------------------------------------------------------------------
  publicAPI.handleChar = function () {
    var rwi = model.interactor;

    var pos = null;

    switch (rwi.getKeyCode()) {
      case 'r':
      case 'R':
        pos = model.interactor.getEventPosition(rwi.getPointerIndex());
        publicAPI.findPokedRenderer(pos.x, pos.y);
        if (model.currentRenderer !== 0) {
          model.currentRenderer.resetCamera();
        } else {
          vtkWarningMacro('no current renderer on the interactor style.');
        }
        rwi.render();
        break;

      case 'w':
      case 'W':
        pos = model.interactor.getEventPosition(rwi.getPointerIndex());
        publicAPI.findPokedRenderer(pos.x, pos.y);
        if (model.currentRenderer !== 0) {
          var ac = model.currentRenderer.getActors();
          ac.forEach(function (anActor) {
            anActor.getProperty().setRepresentationToWireframe();
          });
        } else {
          vtkWarningMacro('no current renderer on the interactor style.');
        }
        rwi.render();
        break;

      case 's':
      case 'S':
        pos = model.interactor.getEventPosition(rwi.getPointerIndex());
        publicAPI.findPokedRenderer(pos.x, pos.y);
        if (model.currentRenderer !== 0) {
          var _ac = model.currentRenderer.getActors();
          _ac.forEach(function (anActor) {
            anActor.getProperty().setRepresentationToSurface();
          });
        } else {
          vtkWarningMacro('no current renderer on the interactor style.');
        }
        rwi.render();
        break;

      case 'v':
      case 'V':
        pos = model.interactor.getEventPosition(rwi.getPointerIndex());
        publicAPI.findPokedRenderer(pos.x, pos.y);
        if (model.currentRenderer !== 0) {
          var _ac2 = model.currentRenderer.getActors();
          _ac2.forEach(function (anActor) {
            anActor.getProperty().setRepresentationToPoints();
          });
        } else {
          vtkWarningMacro('no current renderer on the interactor style.');
        }
        rwi.render();
        break;

      default:
        break;
    }
  };

  //----------------------------------------------------------------------------
  publicAPI.findPokedRenderer = function (x, y) {
    publicAPI.setCurrentRenderer(model.interactor.findPokedRenderer(x, y));
  };

  publicAPI.setAnimationStateOn = function () {
    if (model.animationState === _Constants.States.IS_ANIM_ON) {
      return;
    }
    model.animationState = _Constants.States.IS_ANIM_ON;
    model.interactor.requestAnimation(publicAPI);
  };

  publicAPI.setAnimationStateOff = function () {
    if (model.animationState === _Constants.States.IS_ANIM_OFF) {
      return;
    }
    model.animationState = _Constants.States.IS_ANIM_OFF;
    model.interactor.cancelAnimation(publicAPI);
  };

  publicAPI.startState = function (state) {
    model.state = state;
    if (model.animationState === _Constants.States.IS_ANIM_OFF) {
      // const rwi = model.interactor;
      // rwi.getRenderWindow().setDesiredUpdateRate(rwi.getDesiredUpdateRate());
      publicAPI.invokeStartInteractionEvent({ type: 'StartInteractionEvent' });
    }
  };

  publicAPI.stopState = function () {
    model.state = _Constants.States.IS_NONE;
    if (model.animationState === _Constants.States.IS_ANIM_OFF) {
      var rwi = model.interactor;
      // rwi.getRenderWindow().setDesiredUpdateRate(rwi.getStillUpdateRate());
      publicAPI.invokeEndInteractionEvent({ type: 'EndInteractionEvent' });
      rwi.render();
    }
  };
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

var DEFAULT_VALUES = {
  state: _Constants.States.IS_NONE,
  animationState: _Constants.States.IS_ANIM_OFF,
  handleObservers: 1,
  autoAdjustCameraClippingRange: 1,
  unsubscribes: null
};

// ----------------------------------------------------------------------------

function extend(publicAPI, model) {
  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  Object.assign(model, DEFAULT_VALUES, initialValues);

  // Inheritance
  _InteractorObserver2.default.extend(publicAPI, model, initialValues);

  model.unsubscribes = [];

  // Object specific methods
  vtkInteractorStyle(publicAPI, model);
}

// ----------------------------------------------------------------------------

var newInstance = exports.newInstance = _macro2.default.newInstance(extend, 'vtkInteractorStyle');

// ----------------------------------------------------------------------------

exports.default = Object.assign({ newInstance: newInstance, extend: extend });

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newInstance = undefined;
exports.extend = extend;

var _macro = __webpack_require__(4);

var _macro2 = _interopRequireDefault(_macro);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ----------------------------------------------------------------------------
// vtkInteractorObserver methods
// ----------------------------------------------------------------------------

function vtkInteractorObserver(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkInteractorObserver');

  // Public API methods
  publicAPI.setInteractor = function (i) {
    if (i === model.interactor) {
      return;
    }

    // Since the observer mediator is bound to the interactor, reset it to
    // 0 so that the next time it is requested, it is queried from the
    // new interactor.
    // Furthermore, remove ourself from the mediator queue.

    // if (this->ObserverMediator)
    //   {
    //   this->ObserverMediator->RemoveAllCursorShapeRequests(this);
    //   this->ObserverMediator = 0;
    //   }

    // if we already have an Interactor then stop observing it
    if (model.interactor) {
      publicAPI.setEnabled(false); // disable the old interactor
      model.charObserverTag();
      model.charObserverTag = null;
      model.deleteObserverTag();
      model.deleteObserverTag = null;
    }

    model.interactor = i;

    // add observers for each of the events handled in ProcessEvents
    if (i) {
      model.charObserverTag = i.onCharEvent(publicAPI.keyPressCallbackCommand);
      //                                           this->Priority);
      model.deleteObserverTag = i.onDeleteEvent(publicAPI.keyPressCallbackCommand);
      //                                           this->Priority);
      // publicAPI.registerPickers();
    }

    publicAPI.modified();
  };

  //----------------------------------------------------------------------------
  // Description:
  // Transform from display to world coordinates.
  publicAPI.computeDisplayToWorld = function (x, y, z) {
    if (!model.currentRenderer) {
      return null;
    }

    var ndp = model.interactor.getView().displayToNormalizedDisplay(x, y, z);

    return model.currentRenderer.normalizedDisplayToWorld(ndp[0], ndp[1], ndp[2]);
  };

  //----------------------------------------------------------------------------
  // Description:
  // Transform from world to display coordinates.
  publicAPI.computeWorldToDisplay = function (x, y, z) {
    if (!model.currentRenderer) {
      return null;
    }

    var ndp = model.currentRenderer.worldToNormalizedDisplay(x, y, z);

    return model.interactor.getView().normalizedDisplayToDisplay(ndp[0], ndp[1], ndp[2]);
  };

  //----------------------------------------------------------------------------
  publicAPI.grabFocus = function () {
    // void vtkInteractorObserver::GrabFocus(vtkCommand *mouseEvents, vtkCommand *keypressEvents)
    // {
    //   if ( this->Interactor )
    //     {
    //     this->Interactor->GrabFocus(mouseEvents,keypressEvents);
    //     }
  };

  //----------------------------------------------------------------------------
  publicAPI.releaseFocus = function () {
    // void vtkInteractorObserver::ReleaseFocus()
    // {
    //   if ( this->Interactor )
    //     {
    //     this->Interactor->ReleaseFocus();
    //     }
  };

  // //----------------------------------------------------------------------------
  // void vtkInteractorObserver::StartInteraction()
  // {
  //   this->Interactor->GetRenderWindow()->SetDesiredUpdateRate(this->Interactor->GetDesiredUpdateRate());
  // }

  // //----------------------------------------------------------------------------
  // void vtkInteractorObserver::EndInteraction()
  // {
  //   this->Interactor->GetRenderWindow()->SetDesiredUpdateRate(this->Interactor->GetStillUpdateRate());
  // }
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

var DEFAULT_VALUES = {
  enabled: false,
  interactor: null,
  currentRenderer: null,
  defaultRenderer: null,
  priority: 0.0,
  keyPressActivationValue: 'i',
  charObserverTag: null,
  deleteObserverTag: null
};

// ----------------------------------------------------------------------------

function extend(publicAPI, model) {
  var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  Object.assign(model, DEFAULT_VALUES, initialValues);

  // Object methods
  _macro2.default.obj(publicAPI, model);

  _macro2.default.event(publicAPI, model, 'InteractionEvent');
  _macro2.default.event(publicAPI, model, 'StartInteractionEvent');
  _macro2.default.event(publicAPI, model, 'EndInteractionEvent');

  // Create get-only macros
  _macro2.default.get(publicAPI, model, ['interactor']);

  // Create get-set macros
  _macro2.default.setGet(publicAPI, model, ['priority', 'currentRenderer']);

  // For more macro methods, see "Sources/macro.js"

  // Object specific methods
  vtkInteractorObserver(publicAPI, model);
}

// ----------------------------------------------------------------------------

var newInstance = exports.newInstance = _macro2.default.newInstance(extend, 'vtkInteractorObserver');

// ----------------------------------------------------------------------------

exports.default = Object.assign({ newInstance: newInstance, extend: extend });

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// A library of seedable RNGs implemented in Javascript.
//
// Usage:
//
// var seedrandom = require('seedrandom');
// var random = seedrandom(1); // or any seed.
// var x = random();       // 0 <= x < 1.  Every bit is random.
// var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.

// alea, a 53-bit multiply-with-carry generator by Johannes Baagøe.
// Period: ~2^116
// Reported to pass all BigCrush tests.
var alea = __webpack_require__(37);

// xor128, a pure xor-shift generator by George Marsaglia.
// Period: 2^128-1.
// Reported to fail: MatrixRank and LinearComp.
var xor128 = __webpack_require__(38);

// xorwow, George Marsaglia's 160-bit xor-shift combined plus weyl.
// Period: 2^192-2^32
// Reported to fail: CollisionOver, SimpPoker, and LinearComp.
var xorwow = __webpack_require__(39);

// xorshift7, by François Panneton and Pierre L'ecuyer, takes
// a different approach: it adds robustness by allowing more shifts
// than Marsaglia's original three.  It is a 7-shift generator
// with 256 bits, that passes BigCrush with no systmatic failures.
// Period 2^256-1.
// No systematic BigCrush failures reported.
var xorshift7 = __webpack_require__(40);

// xor4096, by Richard Brent, is a 4096-bit xor-shift with a
// very long period that also adds a Weyl generator. It also passes
// BigCrush with no systematic failures.  Its long period may
// be useful if you have many generators and need to avoid
// collisions.
// Period: 2^4128-2^32.
// No systematic BigCrush failures reported.
var xor4096 = __webpack_require__(41);

// Tyche-i, by Samuel Neves and Filipe Araujo, is a bit-shifting random
// number generator derived from ChaCha, a modern stream cipher.
// https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
// Period: ~2^127
// No systematic BigCrush failures reported.
var tychei = __webpack_require__(42);

// The original ARC4-based prng included in this library.
// Period: ~2^1600
var sr = __webpack_require__(43);

sr.alea = alea;
sr.xor128 = xor128;
sr.xorwow = xorwow;
sr.xorshift7 = xorshift7;
sr.xor4096 = xor4096;
sr.tychei = tychei;

module.exports = sr;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
// http://baagoe.com/en/RandomMusings/javascript/
// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
// Original work is under MIT license -

// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.



(function(global, module, define) {

function Alea(seed) {
  var me = this, mash = Mash();

  me.next = function() {
    var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
    me.s0 = me.s1;
    me.s1 = me.s2;
    return me.s2 = t - (me.c = t | 0);
  };

  // Apply the seeding algorithm from Baagoe.
  me.c = 1;
  me.s0 = mash(' ');
  me.s1 = mash(' ');
  me.s2 = mash(' ');
  me.s0 -= mash(seed);
  if (me.s0 < 0) { me.s0 += 1; }
  me.s1 -= mash(seed);
  if (me.s1 < 0) { me.s1 += 1; }
  me.s2 -= mash(seed);
  if (me.s2 < 0) { me.s2 += 1; }
  mash = null;
}

function copy(f, t) {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}

function impl(seed, opts) {
  var xg = new Alea(seed),
      state = opts && opts.state,
      prng = xg.next;
  prng.int32 = function() { return (xg.next() * 0x100000000) | 0; }
  prng.double = function() {
    return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
  };
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

function Mash() {
  var n = 0xefc8249d;

  var mash = function(data) {
    data = data.toString();
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  return mash;
}


if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(1) && __webpack_require__(3)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return impl; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.alea = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  __webpack_require__(1)   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xor128" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;

  // Set up generator function.
  me.next = function() {
    var t = me.x ^ (me.x << 11);
    me.x = me.y;
    me.y = me.z;
    me.z = me.w;
    return me.w ^= (me.w >>> 19) ^ t ^ (t >>> 8);
  };

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(1) && __webpack_require__(3)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return impl; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xor128 = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  __webpack_require__(1)   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorwow" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var t = (me.x ^ (me.x >>> 2));
    me.x = me.y; me.y = me.z; me.z = me.w; me.w = me.v;
    return (me.d = (me.d + 362437 | 0)) +
       (me.v = (me.v ^ (me.v << 4)) ^ (t ^ (t << 1))) | 0;
  };

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;
  me.v = 0;

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    if (k == strseed.length) {
      me.d = me.x << 10 ^ me.x >>> 4;
    }
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  t.v = f.v;
  t.d = f.d;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(1) && __webpack_require__(3)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return impl; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xorwow = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  __webpack_require__(1)   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorshift7" algorithm by
// François Panneton and Pierre L'ecuyer:
// "On the Xorgshift Random Number Generators"
// http://saluc.engr.uconn.edu/refs/crypto/rng/panneton05onthexorshift.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    // Update xor generator.
    var X = me.x, i = me.i, t, v, w;
    t = X[i]; t ^= (t >>> 7); v = t ^ (t << 24);
    t = X[(i + 1) & 7]; v ^= t ^ (t >>> 10);
    t = X[(i + 3) & 7]; v ^= t ^ (t >>> 3);
    t = X[(i + 4) & 7]; v ^= t ^ (t << 7);
    t = X[(i + 7) & 7]; t = t ^ (t << 13); v ^= t ^ (t << 9);
    X[i] = v;
    me.i = (i + 1) & 7;
    return v;
  };

  function init(me, seed) {
    var j, w, X = [];

    if (seed === (seed | 0)) {
      // Seed state array using a 32-bit integer.
      w = X[0] = seed;
    } else {
      // Seed state using a string.
      seed = '' + seed;
      for (j = 0; j < seed.length; ++j) {
        X[j & 7] = (X[j & 7] << 15) ^
            (seed.charCodeAt(j) + X[(j + 1) & 7] << 13);
      }
    }
    // Enforce an array length of 8, not all zeroes.
    while (X.length < 8) X.push(0);
    for (j = 0; j < 8 && X[j] === 0; ++j);
    if (j == 8) w = X[7] = -1; else w = X[j];

    me.x = X;
    me.i = 0;

    // Discard an initial 256 values.
    for (j = 256; j > 0; --j) {
      me.next();
    }
  }

  init(me, seed);
}

function copy(f, t) {
  t.x = f.x.slice();
  t.i = f.i;
  return t;
}

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.x) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(1) && __webpack_require__(3)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return impl; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xorshift7 = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  __webpack_require__(1)   // present with an AMD loader
);


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
//
// This fast non-cryptographic random number generator is designed for
// use in Monte-Carlo algorithms. It combines a long-period xorshift
// generator with a Weyl generator, and it passes all common batteries
// of stasticial tests for randomness while consuming only a few nanoseconds
// for each prng generated.  For background on the generator, see Brent's
// paper: "Some long-period random number generators using shifts and xors."
// http://arxiv.org/pdf/1004.3115v1.pdf
//
// Usage:
//
// var xor4096 = require('xor4096');
// random = xor4096(1);                        // Seed with int32 or string.
// assert.equal(random(), 0.1520436450538547); // (0, 1) range, 53 bits.
// assert.equal(random.int32(), 1806534897);   // signed int32, 32 bits.
//
// For nonzero numeric keys, this impelementation provides a sequence
// identical to that by Brent's xorgens 3 implementaion in C.  This
// implementation also provides for initalizing the generator with
// string seeds, or for saving and restoring the state of the generator.
//
// On Chrome, this prng benchmarks about 2.1 times slower than
// Javascript's built-in Math.random().

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    var w = me.w,
        X = me.X, i = me.i, t, v;
    // Update Weyl generator.
    me.w = w = (w + 0x61c88647) | 0;
    // Update xor generator.
    v = X[(i + 34) & 127];
    t = X[i = ((i + 1) & 127)];
    v ^= v << 13;
    t ^= t << 17;
    v ^= v >>> 15;
    t ^= t >>> 12;
    // Update Xor generator array state.
    v = X[i] = v ^ t;
    me.i = i;
    // Result is the combination.
    return (v + (w ^ (w >>> 16))) | 0;
  };

  function init(me, seed) {
    var t, v, i, j, w, X = [], limit = 128;
    if (seed === (seed | 0)) {
      // Numeric seeds initialize v, which is used to generates X.
      v = seed;
      seed = null;
    } else {
      // String seeds are mixed into v and X one character at a time.
      seed = seed + '\0';
      v = 0;
      limit = Math.max(limit, seed.length);
    }
    // Initialize circular array and weyl value.
    for (i = 0, j = -32; j < limit; ++j) {
      // Put the unicode characters into the array, and shuffle them.
      if (seed) v ^= seed.charCodeAt((j + 32) % seed.length);
      // After 32 shuffles, take v as the starting w value.
      if (j === 0) w = v;
      v ^= v << 10;
      v ^= v >>> 15;
      v ^= v << 4;
      v ^= v >>> 13;
      if (j >= 0) {
        w = (w + 0x61c88647) | 0;     // Weyl.
        t = (X[j & 127] ^= (v + w));  // Combine xor and weyl to init array.
        i = (0 == t) ? i + 1 : 0;     // Count zeroes.
      }
    }
    // We have detected all zeroes; make the key nonzero.
    if (i >= 128) {
      X[(seed && seed.length || 0) & 127] = -1;
    }
    // Run the generator 512 times to further mix the state before using it.
    // Factoring this as a function slows the main generator, so it is just
    // unrolled here.  The weyl generator is not advanced while warming up.
    i = 127;
    for (j = 4 * 128; j > 0; --j) {
      v = X[(i + 34) & 127];
      t = X[i = ((i + 1) & 127)];
      v ^= v << 13;
      t ^= t << 17;
      v ^= v >>> 15;
      t ^= t >>> 12;
      X[i] = v ^ t;
    }
    // Storing state as object members is faster than using closure variables.
    me.w = w;
    me.X = X;
    me.i = i;
  }

  init(me, seed);
}

function copy(f, t) {
  t.i = f.i;
  t.w = f.w;
  t.X = f.X.slice();
  return t;
};

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.X) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(1) && __webpack_require__(3)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return impl; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xor4096 = impl;
}

})(
  this,                                     // window object or global
  (typeof module) == 'object' && module,    // present in node.js
  __webpack_require__(1)   // present with an AMD loader
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "Tyche-i" prng algorithm by
// Samuel Neves and Filipe Araujo.
// See https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var b = me.b, c = me.c, d = me.d, a = me.a;
    b = (b << 25) ^ (b >>> 7) ^ c;
    c = (c - d) | 0;
    d = (d << 24) ^ (d >>> 8) ^ a;
    a = (a - b) | 0;
    me.b = b = (b << 20) ^ (b >>> 12) ^ c;
    me.c = c = (c - d) | 0;
    me.d = (d << 16) ^ (c >>> 16) ^ a;
    return me.a = (a - b) | 0;
  };

  /* The following is non-inverted tyche, which has better internal
   * bit diffusion, but which is about 25% slower than tyche-i in JS.
  me.next = function() {
    var a = me.a, b = me.b, c = me.c, d = me.d;
    a = (me.a + me.b | 0) >>> 0;
    d = me.d ^ a; d = d << 16 ^ d >>> 16;
    c = me.c + d | 0;
    b = me.b ^ c; b = b << 12 ^ d >>> 20;
    me.a = a = a + b | 0;
    d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
    me.c = c = c + d | 0;
    b = b ^ c;
    return me.b = (b << 7 ^ b >>> 25);
  }
  */

  me.a = 0;
  me.b = 0;
  me.c = 2654435769 | 0;
  me.d = 1367130551;

  if (seed === Math.floor(seed)) {
    // Integer seed.
    me.a = (seed / 0x100000000) | 0;
    me.b = seed | 0;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 20; k++) {
    me.b ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.a = f.a;
  t.b = f.b;
  t.c = f.c;
  t.d = f.d;
  return t;
};

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(1) && __webpack_require__(3)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return impl; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.tychei = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  __webpack_require__(1)   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
Copyright 2014 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function (pool, math) {
//
// The following constants are related to IEEE 754 limits.
//
var global = this,
    width = 256,        // each RC4 output is 0 <= x < 256
    chunks = 6,         // at least six RC4 outputs for each double
    digits = 52,        // there are 52 significant digits in a double
    rngname = 'random', // rngname: name for Math.random and Math.seedrandom
    startdenom = math.pow(width, chunks),
    significance = math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1,
    nodecrypto;         // node.js crypto module, initialized at the bottom.

//
// seedrandom()
// This is the seedrandom function described above.
//
function seedrandom(seed, options, callback) {
  var key = [];
  options = (options == true) ? { entropy: true } : (options || {});

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    options.entropy ? [seed, tostring(pool)] :
    (seed == null) ? autoseed() : seed, 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.
  var prng = function() {
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  prng.int32 = function() { return arc4.g(4) | 0; }
  prng.quick = function() { return arc4.g(4) / 0x100000000; }
  prng.double = prng;

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Calling convention: what to return as a function of prng, seed, is_math.
  return (options.pass || callback ||
      function(prng, seed, is_math_call, state) {
        if (state) {
          // Load the arc4 state from the given state if it has an S array.
          if (state.S) { copy(state, arc4); }
          // Only provide the .state method if requested via options.state.
          prng.state = function() { return copy(arc4, {}); }
        }

        // If called as a method of Math (Math.seedrandom()), mutate
        // Math.random because that is how seedrandom.js has worked since v1.0.
        if (is_math_call) { math[rngname] = prng; return seed; }

        // Otherwise, it is a newer calling convention, so return the
        // prng directly.
        else return prng;
      })(
  prng,
  shortseed,
  'global' in options ? options.global : (this == math),
  options.state);
}
math['seed' + rngname] = seedrandom;

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability, the function call below automatically
    // discards an initial batch of values.  This is called RC4-drop[256].
    // See http://google.com/search?q=rsa+fluhrer+response&btnI
  })(width);
}

//
// copy()
// Copies internal state of ARC4 to or from a plain object.
//
function copy(f, t) {
  t.i = f.i;
  t.j = f.j;
  t.S = f.S.slice();
  return t;
};

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj), prop;
  if (depth && typ == 'object') {
    for (prop in obj) {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
    }
  }
  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto and Node crypto
// module if available.
//
function autoseed() {
  try {
    var out;
    if (nodecrypto && (out = nodecrypto.randomBytes)) {
      // The use of 'out' to remember randomBytes makes tight minified code.
      out = out(width);
    } else {
      out = new Uint8Array(width);
      (global.crypto || global.msCrypto).getRandomValues(out);
    }
    return tostring(out);
  } catch (e) {
    var browser = global.navigator,
        plugins = browser && browser.plugins;
    return [+new Date, global, plugins, global.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to interfere with deterministic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

//
// Nodejs and AMD support: export the implementation as a module using
// either convention.
//
if ((typeof module) == 'object' && module.exports) {
  module.exports = seedrandom;
  // When in node.js, try using crypto package for autoseeding.
  try {
    nodecrypto = __webpack_require__(44);
  } catch (ex) {}
} else if (true) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return seedrandom; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}

// End anonymous scope, and pass initial values.
})(
  [],     // pool: entropy pool starts empty
  Math    // math: package containing random, pow, and seedrandom
);


/***/ }),
/* 44 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);