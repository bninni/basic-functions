# basic-functions
[![Build Status](https://travis-ci.org/bninni/basic-functions.svg?branch=master)](https://travis-ci.org/bninni/basic-functions)

A Simple module which contains common functions to save you time, code, and memory

## Install
```
npm install basic-functions
```
or
```
npm install -g basic-functions
```

Then import the module into your program:

```javascript
var baseFns = require('basic-functions')
```

An simply reference the stored functions

## Default Values

```javascript
baseFns.undefined() //undefined
baseFns.null()      //null
baseFns.true()      //true
baseFns.false()     //false
baseFns.zero()      //0
baseFns.one()       //1
baseFns.NaN()       //NaN
baseFns.Infinity()  //Infinity
baseFns._Infinity() //-Infinity
baseFns.array()     //[]
baseFns.object()    //{}
baseFns.string()    //{}
baseFns.function()  //function(){}
baseFns.this()      //this

//more detailed example of how 'this' can be used
var obj = {},
  f = baseFns.this.bind( obj );

f() === obj; //true
```

## Handlers

  * [Empty Handler](#empty)
  * [Calling a Function](#call)
  * [Instantiating a Constructor](#instantiate)
  * [Throwing an Error](#throw)
  * [Echoing a Value](#echo)

<a name="empty"></a>
### Empty Handler

* **noop**
* **noOp**
  
*Does nothing*

```javascript
var fn = baseFns.noop;
//or baseFns.noOp

fn() //undefined
```

<a name="call"></a>
### Calling a Function

* **call**
* **invoke**

*Returns the result of invoking the first input argument*
  * *Only if the input argument is a* `Function`
  
```javascript
var fn = baseFns.call;
//or baseFns.invoke

function arrFn(){
  return ['a','b','c'];
}

fn( arrFn ) //['a','b','c']
```

* **call.with( _args_ )**
 
*Returns the result of invoking the first input argument with* `args` *as the* `arguments`

```javascript
var fn = baseFns.call.with( 5, 10 );
//or baseFns.invoke.with( 5, 10 )

function add( a, b ){
  return a + b;
}

function multiply( a, b ){
  return a * b;
}

fn( add )      //15
fn( multiply ) //50
```

* **call.fn( _fn_ )**
 
*Returns the result of invoking* `fn` *with the input arguments as the* `arguments`

```javascript
var fn = baseFns.call.fn( add );
//or baseFns.invoke.fn( add )

fn( 5, 10 ) //15
```

* **call.fn( _fn_ ).with( _args_ )**
 
*Returns the result of invoking* `fn` *with* `args` *as the* `arguments`

```javascript
var fn = baseFns.call.fn( add ).with( 5, 10 );
//or baseFns.invoke.fn( add ).with( 5, 10 )

fn()          //15
fn( 25, 100 ) //15
```

* **call.firstFn**
 
*Returns the result of invoking the first input argument that is a* `Function`

```javascript
var fn = baseFns.call.firstFn;
//or baseFns.invoke.firstFn

function numFn(){
  return 10;
}

function strFn(){
  return 'hi';
}

fn( false, numFn, strFn ) //10
```

* **call.firstFn.with( _args_ )**
 
*Returns the result of invoking the first input argument that is a* `Function` *with* `args` *as the* `arguments`

```javascript
var fn = baseFns.call.firstFn.with( 5, 10 );
//or baseFns.invoke.firstFn.with( 5, 10 )

fn( [], add, multiply )     //15
```

* **call.nth( _n_ )**
 
*Returns the result of invoking the* `nth` *input argument*

*Note: Index starts at* `0`

```javascript
var fn = baseFns.call.nth(1);
//or baseFns.invoke.nth(1)

fn( false, numFn, strFn ) //10
```

* **call.nth( _n_ ).with( _args_ )**
 
*Returns the result of invoking the* `nth` *input argument with* `args` *as the* `arguments`

```javascript
var fn = baseFns.call.nth(1).with( 5, 10 );
//or baseFns.invoke.nth(1).with( 5, 10 )

fn( [], add, multiply ) //15
```

* **call.nth( _n_ ).fn**
 
*Returns the result of invoking the* `nth` *input argument that is a* `Function`

*Note: Index starts at* `0`

```javascript
var fn = baseFns.call.nth(1).fn;
//or baseFns.invoke.nth(1).fn

fn( false, numFn, strFn ) //'hi'
```

* **call.nth( _n_ ).fn.with( _args_ )**
 
*Returns the result of invoking the* `nth` *input argument that is a* `Function` *with* `args` *as the* `arguments`

```javascript
var fn = baseFns.call.nth(1).fn.with( 5, 10 );
//or baseFns.invoke.nth(1).fn.with( 5, 10 )

fn( [], add, multiply ) //50
```

* **call.key( _key_ )**
 
*Returns the result of invoking the property* `key` *in the first input argument*

```javascript
var numObj = {
    fn : numFn
  },
  strObj = {
    fn : strFn
  },
  fn = baseFns.call.key('fn');
  //or baseFns.invoke.key('fn')

fn( numObj ) //10
fn( strObj ) //'hi'
```

* **call.key( _key_ ).with( _args_ )**
 
*Returns the result of invoking the property* `key` *in the first input argument with* `args` *as the* `arguments`

```javascript
var multObj = {
    fn : multiply
  },
  addObj = {
    fn : add
  },
  fn = baseFns.call.key('fn').with( 5, 10 );
  //or baseFns.invoke.key('fn').with( 5, 10 )

fn( multObj ) //50
fn( addObj )  //15
```

* **call.key( _key_ ).inNth( _n_ )**
 
*Returns the result of invoking the property* `key` *in the* `nth` *input argument*

```javascript
var fn = baseFns.call.key('fn').inNth(1);
//or baseFns.invoke.key('fn').inNth(1)

fn( false, numObj, strObj ) //10
```

* **call.key( _key_ ).inNth( _n_ ).with( _args_ )**
 
*Returns the result of invoking the property* `key` *in the* `nth` *input argument with* `args` *as the* `arguments`

```javascript
var fn = baseFns.call.key('fn').inNth(1).with( 5, 10 );
//or baseFns.invoke.key('fn').inNth(1).with( 5, 10 )

fn( [], addObj, multObj ) //15
```

* **call.key( _key_ ).inNth( _n_ ).ofType( _type_ )**
 
*Returns the result of invoking the property* `key` *in the* `nth` *input argument of type* `type`

```javascript
var fn = baseFns.call.key('fn').inNth(1).ofType( Object );
//or baseFns.invoke.key('fn').inNth(1).ofType( Object )

fn( false, numObj, strObj ) //'hi'
```

* **call.key( _key_ ).inNth( _n_ ).ofType( _type_ ).with( _args_ )**
 
*Returns the result of invoking the property* `key` *in the* `nth` *input argument of type* `type` *with* `args` *as the* `arguments`

```javascript
//can also use strings for the type
var fn = baseFns.call.key('fn').inNth(1).ofType( 'object' ).with( 5, 10 );
//or baseFns.invoke.key('fn').inNth(1).ofType( 'object' ).with( 5, 10 )

fn( [], addObj, multObj ) //50
```

<a name="instantiate"></a>
### Instantiating a Constructor

* **instantiate**
* **new**

*Returns a* `new` *instance of the first input argument*
  * *Only if the input argument is a* `Function`
  
```javascript
var fn = baseFns.instantiate;
//or baseFns.new

fn( Array ) //[]
```

* **instantiate.with( _args_ )**
 
*Returns a* `new` *instance of the first input argument with* `args` *as the* `arguments`

```javascript
var fn = baseFns.instantiate.with( 'abc' );
//or baseFns.new.with( 'abc' )

fn( Array )   //['abc']
```

* **instantiate.fn( _fn_ )**
 
*Returns a* `new` *instance of* `fn` *with the input arguments as the* `arguments`

```javascript
var fn = baseFns.instantiate.fn( Array );
//or baseFns.new.fn( Array )

fn( 5 ) //[5]
```

* **instantiate.fn( _fn_ ).with( _args_ )**
 
*Returns a* `new` *instance of* `fn` *with* `args` *as the* `arguments`

```javascript
var fn = baseFns.instantiate.fn( Array ).with( 5, 10 );
//or baseFns.new.fn( Array ).with( 5, 10 )

fn()          //[5, 10]
fn( 25, 100 ) //[5, 10]
```

* **instantiate.firstFn**
 
*Returns a* `new` *instance of the first input argument that is a* `Function`

```javascript
var fn = baseFns.instantiate.firstFn;
//or baseFns.new.firstFn

fn( 100, Array, String ) //[]
```

* **instantiate.firstFn.with( _args_ )**
 
*Returns a* `new` *instance of the first input argument that is a* `Function` *with* `args` *as the* `arguments`

```javascript
var fn = baseFns.instantiate.firstFn.with( true );
//or baseFns.new.firstFn.with( true )

fn( 100, Array, String ) //[ true ]
```

* **instantiate.nth( _n_ )**
 
*Returns a* `new` *instance of the* `nth` *input argument*

*Note: Index starts at* `0`

```javascript
var fn = baseFns.instantiate.nth(1);
//or baseFns.new.nth(1)

fn( 100, Array, String ) //[]
```

* **instantiate.nth( _n_ ).with( _args_ )**
 
*Returns a* `new` *instance of the* `nth` *input argument with* `args` *as the* `arguments`

```javascript
var fn = baseFns.instantiate.nth(1).with( true );
//or baseFns.new.nth(1).with( true )

fn( 100, Array, String ) //[ true ]
```

* **instantiate.nth( _n_ ).fn**
 
*Returns a* `new` *instance of the* `nth` *input argument that is a* `Function`

*Note: Index starts at* `0`

```javascript
var fn = baseFns.instantiate.nth(1).fn;
//or baseFns.new.nth(1).fn

fn( 100, Array, String ) //''
```

* **instantiate.nth( _n_ ).fn.with( _args_ )**
 
*Returns a* `new` *instance of the* `nth` *input argument that is a* `Function` *with* `args` *as the* `arguments`

```javascript
var fn = baseFns.instantiate.nth(1).fn.with( true );
//or baseFns.new.nth(1).fn.with( true )

fn( 100, Array, String ) //'true'
```

* **instantiate.key( _key_ )**
 
*Returns a* `new` *instance of the property* `key` *in the first input argument*

```javascript
var arrObj = {
    fn : Array
  },
  strObj = {
    fn : String
  },
  fn = baseFns.instantiate.key('fn');
  //or baseFns.new.key('fn')

fn( arrObj ) //[]
fn( strObj ) //''
```

* **instantiate.key( _key_ ).with( _args_ )**
 
*Returns a* `new` *instance of the property* `key` *in the first input argument with* `args` *as the* `arguments`

```javascript
var fn = baseFns.instantiate.key('fn').with( true );
//or baseFns.new.key('fn').with( true )

fn( arrObj ) //[ true ]
```

* **instantiate.key( _key_ ).inNth( _n_ )**
 
*Returns a* `new` *instance of the property* `key` *in the* `nth` *input argument*

```javascript
var fn = baseFns.instantiate.key('fn').inNth(1);
//or baseFns.new.key('fn').inNth(1)

fn( 100, arrObj, strObj ) //[]
```

* **instantiate.key( _key_ ).inNth( _n_ ).with( _args_ )**
 
*Returns a* `new` *instance of the property* `key` *in the* `nth` *input argument with* `args` *as the* `arguments`

```javascript
var fn = baseFns.instantiate.key('fn').inNth(1).with( true );
//or baseFns.new.key('fn').inNth(1).with( true )

fn( 100, arrObj, strObj ) //[ true ]
```

* **instantiate.key( _key_ ).inNth( _n_ ).ofType( _type_ )**
 
*Returns a* `new` *instance of the property* `key` *in the* `nth` *input argument of type* `type`

```javascript
var fn = baseFns.instantiate.key('fn').inNth(1).ofType( Object );
//or baseFns.new.key('fn').inNth(1).ofType( Object )

fn( 100, arrObj, strObj ) //''
```

* **instantiate.key( _key_ ).inNth( _n_ ).ofType( _type_ ).with( _args_ )**
 
*Returns a* `new` *instance of the property* `key` *in the* `nth` *input argument of type* `type` *with* `args` *as the* `arguments`

```javascript
var fn = baseFns.instantiate.key('fn').inNth(1).ofType( 'object' ).with( true );
//or baseFns.new.key('fn').inNth(1).ofType( 'object' ).with( true );

fn( 100, arrObj, strObj ) //'true'
```

<a name="throw"></a>
### Throwing an Error

* **throw**
* **error**

*Throws the first input argument*
  
```javascript
var fn = baseFns.throw;
//or baseFns.error

fn( new Error ) //throws Error
```

* **throw.error( _err_ )**
 
*Throws* `fn`

```javascript
var fn = baseFns.throw.error( new TypeError );
//or baseFns.error.error( new TypeError )

fn() //throws TypeError
```

* **throw.firstError**
 
*Throws the first input argument that is an* `instanceof Error`

```javascript
var fn = baseFns.throw.firstError;
//or baseFns.error.firstError

fn( {}, new Error, new TypeError ) //throws Error
```

* **throw.nth( _n_ )**
 
*Throws the* `nth` *input argument*

*Note: Index starts at* `0`

```javascript
var fn = baseFns.throw.nth(1);
//or baseFns.error.nth(1)

fn( {}, new Error, new TypeError ) //throws Error
```

* **throw.nth( _n_ ).error**
 
*Throws the* `nth` *input argument that is an* `instanceof Error`

*Note: Index starts at* `0`

```javascript
var fn = baseFns.throw.nth(1).error;
//or baseFns.error.nth(1).error

fn( {}, new Error, new TypeError ) //throws TypeError
```

* **throw.key( _key_ )**
 
*Throws the property* `key` *in the first input argument*

```javascript
var errObj = {
    err : new Error
  },
  typeErrObj = {
    err : new TypeError
  },
  fn = baseFns.throw.key('err');
  //or baseFns.error.key('err')

fn( errObj )     //throws Error
fn( typeErrObj ) //throws TypeError
```

* **throw.key( _key_ ).inNth( _n_ )**
 
*Throws the property* `key` *in the* `nth` *input argument*

```javascript
var fn = baseFns.throw.key('err').inNth(1);
//or baseFns.error.key('err').inNth(1)

fn( 'hi', errObj, typeErrObj ) //throws Error
```

* **throw.key( _key_ ).inNth( _n_ ).ofType( _type_ )**
 
*Throws the property* `key` *in the* `nth` *input argument of type* `type`

```javascript
var fn = baseFns.throw.key('err').inNth(1).ofType( Object );
//or baseFns.error.key('err').inNth(1).ofType( Object )

fn( 'hi', errObj, typeErrObj ) //throws TypeError
```

<a name="echo"></a>
### Echoing a Value

* **echo**
* **return**

*Returns the first input argument*
  
```javascript
var fn = baseFns.echo;
//or baseFns.return

fn( 10 ) //10
```

* **echo.value( _v_ )**
 
*Returns* `v`

```javascript
var fn = baseFns.echo.value( 10 );
//or baseFns.return.value( 10 )

fn()       //10
fn( true ) //10
```

* **echo.nth( _n_ )**
 
*Returns the* `nth` *input argument*

*Note: Index starts at* `0`

```javascript
var fn = baseFns.echo.nth(1);
//or baseFns.return.nth(1)

fn( 'hi', 100, 'there' ) //100
```

* **echo.nth( _n_ ).ofType( _type_ )**
 
*Returns the* `nth` *input argument of type* `type`

*Note: Index starts at* `0`

```javascript
var fn = baseFns.echo.nth(1).ofType('string');
//or baseFns.return.nth(1).ofType('string')

fn( 'hi', 100, 'there' ) //'there'
```

* **echo.key( _key_ )**
 
*Returns the property* `key` *in the first input argument*

```javascript
var obj = {
    str : 'hi',
    num : 100
  },
  fn = baseFns.echo.key('str');
  //or baseFns.return.key('str')

fn( obj ) //'hi'
```

* **echo.key( _key_ ).inNth( _n_ )**
 
*Returns the property* `key` *in the* `nth` *input argument*

```javascript
var fn = baseFns.echo.key('num').inNth(1);
//or baseFns.return.key('num').inNth(1)

fn( 'hi', obj ) //100
```

* **echo.key( _key_ ).inNth( _n_ ).ofType( _type_ )**
 
*Returns the property* `key` *in the* `nth` *input argument of type* `type`

```javascript
var fn = baseFns.echo.key('str').inNth(1).ofType( Object );
//or baseFns.return.key('str').inNth(1).ofType( Object )

fn( 'hi', {}, obj ) //'hi'
```