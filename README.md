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
var just = require('basic-functions')
```

An simply reference the stored functions

## Default Values

```javascript
just.undefined() //undefined

just.null()      //null

just.true()      //true
//or just.True()

just.false()     //false
//or just.False()

just.zero()      //0
//or just[0], just['0'], just.Zero

just.one()       //1
//or just[1], just['1'], just.One

just.NaN()       //NaN
//or just.nan()

just.Infinity()  //Infinity
//or just.infinity()

just._Infinity() //-Infinity
//or just._infinity()

just.Array()     //[]
//or just.array()

just.Object()    //{}
//or just.object()

just.String()    //{}
//or just.string()

just.Function()  //function(){}
//or just.function()

just.this()      //this

//more detailed example of how 'this' can be used
var obj = {},
  f = just.this.bind( obj );

f() === obj; //true
```
<a name="handlers"></a>
## Handlers

  * [Empty Handler](#empty)
  * [Calling a Function](#call)
  * [Instantiating a Constructor](#instantiate)
  * [Throwing an Error](#throw)
  * [Echoing a Value](#echo)

<a name="empty"></a>
### Empty Handler

[Back to Top](#handlers)

* **noop**
* **noOp**
  
*Does nothing*

```javascript
var fn = just.noop;
//or just.noOp

fn() //undefined
```

<a name="call"></a>
### Calling a Function

[Back to Top](#handlers)

* **call**
* **run**

*Returns the result of invoking the first input argument*
  * *Only if the input argument is a* `Function`
  
```javascript
var fn = just.call;
//or just.run

function arrFn(){
  return ['a','b','c'];
}

fn( arrFn ) //['a','b','c']
```

* **call.with( _args_ )**
 
*Returns the result of invoking the first input argument with* `args` *as the* `arguments`

```javascript
var fn = just.call.with( 5, 10 );
//or just.run.with( 5, 10 )

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
var fn = just.call.fn( add );
//or just.run.fn( add )

fn( 5, 10 ) //15
```

* **call.fn( _fn_ ).with( _args_ )**
 
*Returns the result of invoking* `fn` *with* `args` *as the* `arguments`

```javascript
var fn = just.call.fn( add ).with( 5, 10 );
//or just.run.fn( add ).with( 5, 10 )

fn()          //15
fn( 25, 100 ) //15
```

* **call.firstFn**
 
*Returns the result of invoking the first input argument that is a* `Function`

```javascript
var fn = just.call.firstFn;
//or just.run.firstFn

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
var fn = just.call.firstFn.with( 5, 10 );
//or just.run.firstFn.with( 5, 10 )

fn( [], add, multiply )     //15
```

* **call.nth( _n_ )**
 
*Returns the result of invoking the* `nth` *input argument*

*Note: Index starts at* `0`

```javascript
var fn = just.call.nth(1);
//or just.run.nth(1)

fn( false, numFn, strFn ) //10
```

* **call.nth( _n_ ).with( _args_ )**
 
*Returns the result of invoking the* `nth` *input argument with* `args` *as the* `arguments`

```javascript
var fn = just.call.nth(1).with( 5, 10 );
//or just.run.nth(1).with( 5, 10 )

fn( [], add, multiply ) //15
```

* **call.nth( _n_ ).fn**
 
*Returns the result of invoking the* `nth` *input argument that is a* `Function`

*Note: Index starts at* `0`

```javascript
var fn = just.call.nth(1).fn;
//or just.run.nth(1).fn

fn( false, numFn, strFn ) //'hi'
```

* **call.nth( _n_ ).fn.with( _args_ )**
 
*Returns the result of invoking the* `nth` *input argument that is a* `Function` *with* `args` *as the* `arguments`

```javascript
var fn = just.call.nth(1).fn.with( 5, 10 );
//or just.run.nth(1).fn.with( 5, 10 )

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
  fn = just.call.key('fn');
  //or just.run.key('fn')

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
  fn = just.call.key('fn').with( 5, 10 );
  //or just.run.key('fn').with( 5, 10 )

fn( multObj ) //50
fn( addObj )  //15
```

* **call.key( _key_ ).inThis**
 
*Returns the result of invoking the property* `key` *in* `this` *with the input arguments as the* `arguments`

```javascript
var fn = just.call.key('fn').inThis.bind( addObj );
//or just.run.key('fn').inThis.bind( addObj )

fn( 5, 10 ) //15
```

* **call.key( _key_ ).inThis.with( _args_ )**
 
*Returns the result of invoking the property* `key` *in* `this` *with* `args` *as the* `arguments`

```javascript
var fn = just.call.key('fn').inThis.with( 5, 10 );
//or just.run.key('fn').inThis.with( 5, 10 ).bind( addObj )

fn()          //15
fn( 25, 100 ) //15
```

* **call.key( _key_ ).inNth( _n_ )**
 
*Returns the result of invoking the property* `key` *in the* `nth` *input argument*

```javascript
var fn = just.call.key('fn').inNth(1);
//or just.run.key('fn').inNth(1)

fn( false, numObj, strObj ) //10
```

* **call.key( _key_ ).inNth( _n_ ).with( _args_ )**
 
*Returns the result of invoking the property* `key` *in the* `nth` *input argument with* `args` *as the* `arguments`

```javascript
var fn = just.call.key('fn').inNth(1).with( 5, 10 );
//or just.run.key('fn').inNth(1).with( 5, 10 )

fn( [], addObj, multObj ) //15
```

* **call.key( _key_ ).inNth( _n_ ).ofType( _type_ )**
 
*Returns the result of invoking the property* `key` *in the* `nth` *input argument of type* `type`

```javascript
var fn = just.call.key('fn').inNth(1).ofType( Object );
//or just.run.key('fn').inNth(1).ofType( Object )

fn( false, numObj, strObj ) //'hi'
```

* **call.key( _key_ ).inNth( _n_ ).ofType( _type_ ).with( _args_ )**
 
*Returns the result of invoking the property* `key` *in the* `nth` *input argument of type* `type` *with* `args` *as the* `arguments`

```javascript
//can also use strings for the type
var fn = just.call.key('fn').inNth(1).ofType( 'object' ).with( 5, 10 );
//or just.run.key('fn').inNth(1).ofType( 'object' ).with( 5, 10 )

fn( [], addObj, multObj ) //50
```

<a name="instantiate"></a>
### Instantiating a Constructor

[Back to Top](#handlers)

* **instantiate**
* **new**

*Returns a* `new` *instance of the first input argument*
  * *Only if the input argument is a* `Function`
  
```javascript
var fn = just.instantiate;
//or just.new

fn( Array ) //[]
```

* **instantiate.with( _args_ )**
 
*Returns a* `new` *instance of the first input argument with* `args` *as the* `arguments`

```javascript
var fn = just.instantiate.with( 'abc' );
//or just.new.with( 'abc' )

fn( Array )   //['abc']
```

* **instantiate.fn( _fn_ )**
 
*Returns a* `new` *instance of* `fn` *with the input arguments as the* `arguments`

```javascript
var fn = just.instantiate.fn( Array );
//or just.new.fn( Array )

fn( 5 ) //[5]
```

* **instantiate.fn( _fn_ ).with( _args_ )**
 
*Returns a* `new` *instance of* `fn` *with* `args` *as the* `arguments`

```javascript
var fn = just.instantiate.fn( Array ).with( 5, 10 );
//or just.new.fn( Array ).with( 5, 10 )

fn()          //[5, 10]
fn( 25, 100 ) //[5, 10]
```

* **instantiate.firstFn**
 
*Returns a* `new` *instance of the first input argument that is a* `Function`

```javascript
var fn = just.instantiate.firstFn;
//or just.new.firstFn

fn( 100, Array, String ) //[]
```

* **instantiate.firstFn.with( _args_ )**
 
*Returns a* `new` *instance of the first input argument that is a* `Function` *with* `args` *as the* `arguments`

```javascript
var fn = just.instantiate.firstFn.with( true );
//or just.new.firstFn.with( true )

fn( 100, Array, String ) //[ true ]
```

* **instantiate.nth( _n_ )**
 
*Returns a* `new` *instance of the* `nth` *input argument*

*Note: Index starts at* `0`

```javascript
var fn = just.instantiate.nth(1);
//or just.new.nth(1)

fn( 100, Array, String ) //[]
```

* **instantiate.nth( _n_ ).with( _args_ )**
 
*Returns a* `new` *instance of the* `nth` *input argument with* `args` *as the* `arguments`

```javascript
var fn = just.instantiate.nth(1).with( true );
//or just.new.nth(1).with( true )

fn( 100, Array, String ) //[ true ]
```

* **instantiate.nth( _n_ ).fn**
 
*Returns a* `new` *instance of the* `nth` *input argument that is a* `Function`

*Note: Index starts at* `0`

```javascript
var fn = just.instantiate.nth(1).fn;
//or just.new.nth(1).fn

fn( 100, Array, String ) //''
```

* **instantiate.nth( _n_ ).fn.with( _args_ )**
 
*Returns a* `new` *instance of the* `nth` *input argument that is a* `Function` *with* `args` *as the* `arguments`

```javascript
var fn = just.instantiate.nth(1).fn.with( true );
//or just.new.nth(1).fn.with( true )

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
  fn = just.instantiate.key('fn');
  //or just.new.key('fn')

fn( arrObj ) //[]
fn( strObj ) //''
```

* **instantiate.key( _key_ ).with( _args_ )**
 
*Returns a* `new` *instance of the property* `key` *in the first input argument with* `args` *as the* `arguments`

```javascript
var fn = just.instantiate.key('fn').with( true );
//or just.new.key('fn').with( true )

fn( arrObj ) //[ true ]
```

* **instantiate.key( _key_ ).inThis**
 
*Returns a* `new` *instance of the property* `key` *in* `this` *with the input arguments as the* `arguments`

```javascript
var fn = just.instantiate.key('fn').inThis.bind( arrObj );
//or just.new.key('fn').inThis.bind( arrObj )

fn()       //[]
fn( 'hi' ) //[ 'hi' ]
```

* **instantiate.key( _key_ ).inThis.with( _args_ )**
 
*Returns a* `new` *instance of the property* `key` *in* `this` *with* `args` *as the* `arguments`

```javascript
var fn = just.instantiate.key('fn').inThis.with( true ).bind( arrObj );
//or just.new.key('fn').inThis.with( true ).bind( arrObj )

fn()       //[ true ]
fn( 'hi' ) //[ true ]
```

* **instantiate.key( _key_ ).inNth( _n_ )**
 
*Returns a* `new` *instance of the property* `key` *in the* `nth` *input argument*

```javascript
var fn = just.instantiate.key('fn').inNth(1);
//or just.new.key('fn').inNth(1)

fn( 100, arrObj, strObj ) //[]
```

* **instantiate.key( _key_ ).inNth( _n_ ).with( _args_ )**
 
*Returns a* `new` *instance of the property* `key` *in the* `nth` *input argument with* `args` *as the* `arguments`

```javascript
var fn = just.instantiate.key('fn').inNth(1).with( true );
//or just.new.key('fn').inNth(1).with( true )

fn( 100, arrObj, strObj ) //[ true ]
```

* **instantiate.key( _key_ ).inNth( _n_ ).ofType( _type_ )**
 
*Returns a* `new` *instance of the property* `key` *in the* `nth` *input argument of type* `type`

```javascript
var fn = just.instantiate.key('fn').inNth(1).ofType( Object );
//or just.new.key('fn').inNth(1).ofType( Object )

fn( 100, arrObj, strObj ) //''
```

* **instantiate.key( _key_ ).inNth( _n_ ).ofType( _type_ ).with( _args_ )**
 
*Returns a* `new` *instance of the property* `key` *in the* `nth` *input argument of type* `type` *with* `args` *as the* `arguments`

```javascript
var fn = just.instantiate.key('fn').inNth(1).ofType( 'object' ).with( true );
//or just.new.key('fn').inNth(1).ofType( 'object' ).with( true );

fn( 100, arrObj, strObj ) //'true'
```

<a name="throw"></a>
### Throwing an Error

[Back to Top](#handlers)

* **throw**
* **error**

*Throws the first input argument*
  
```javascript
var fn = just.throw;
//or just.error

fn( new Error ) //throws Error
```

* **throw.error( _err_ )**
 
*Throws* `fn`

```javascript
var fn = just.throw.error( new TypeError );
//or just.error.error( new TypeError )

fn() //throws TypeError
```

* **throw.firstError**
 
*Throws the first input argument that is an* `instanceof Error`

```javascript
var fn = just.throw.firstError;
//or just.error.firstError

fn( {}, new Error, new TypeError ) //throws Error
```

* **throw.nth( _n_ )**
 
*Throws the* `nth` *input argument*

*Note: Index starts at* `0`

```javascript
var fn = just.throw.nth(1);
//or just.error.nth(1)

fn( {}, new Error, new TypeError ) //throws Error
```

* **throw.nth( _n_ ).error**
 
*Throws the* `nth` *input argument that is an* `instanceof Error`

*Note: Index starts at* `0`

```javascript
var fn = just.throw.nth(1).error;
//or just.error.nth(1).error

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
  fn = just.throw.key('err');
  //or just.error.key('err')

fn( errObj )     //throws Error
fn( typeErrObj ) //throws TypeError
```

* **throw.key( _key_ ).inThis**
 
*Throws the property* `key` *in* `this`

```javascript
var fn = just.throw.key('err').inThis.bind( errObj );
//or just.error.key('err').inThis.bind( errObj )

fn() //throws Error
```

* **throw.key( _key_ ).inNth( _n_ )**
 
*Throws the property* `key` *in the* `nth` *input argument*

```javascript
var fn = just.throw.key('err').inNth(1);
//or just.error.key('err').inNth(1)

fn( 'hi', errObj, typeErrObj ) //throws Error
```

* **throw.key( _key_ ).inNth( _n_ ).ofType( _type_ )**
 
*Throws the property* `key` *in the* `nth` *input argument of type* `type`

```javascript
var fn = just.throw.key('err').inNth(1).ofType( Object );
//or just.error.key('err').inNth(1).ofType( Object )

fn( 'hi', errObj, typeErrObj ) //throws TypeError
```

<a name="echo"></a>
### Echoing a Value

[Back to Top](#handlers)

* **echo**
* **return**

*Returns the first input argument*
  
```javascript
var fn = just.echo;
//or just.return

fn( 10 ) //10
```

* **echo.value( _v_ )**
 
*Returns* `v`

```javascript
var fn = just.echo.value( 10 );
//or just.return.value( 10 )

fn()       //10
fn( true ) //10
```

* **echo.nth( _n_ )**
 
*Returns the* `nth` *input argument*

*Note: Index starts at* `0`

```javascript
var fn = just.echo.nth(1);
//or just.return.nth(1)

fn( 'hi', 100, 'there' ) //100
```

* **echo.nth( _n_ ).ofType( _type_ )**
 
*Returns the* `nth` *input argument of type* `type`

*Note: Index starts at* `0`

```javascript
var fn = just.echo.nth(1).ofType('string');
//or just.return.nth(1).ofType('string')

fn( 'hi', 100, 'there' ) //'there'
```

* **echo.key( _key_ )**
 
*Returns the property* `key` *in the first input argument*

```javascript
var obj = {
    str : 'hi',
    num : 100
  },
  fn = just.echo.key('str');
  //or just.return.key('str')

fn( obj ) //'hi'
```

* **echo.key( _key_ ).inThis**
 
*Returns the property* `key` *in* `this`

```javascript
var fn = just.echo.key('str').inThis.bind( obj );
//or just.return.key('str').inThis.bind( obj )

fn() //'hi'
```

* **echo.key( _key_ ).inNth( _n_ )**
 
*Returns the property* `key` *in the* `nth` *input argument*

```javascript
var fn = just.echo.key('num').inNth(1);
//or just.return.key('num').inNth(1)

fn( 'hi', obj ) //100
```

* **echo.key( _key_ ).inNth( _n_ ).ofType( _type_ )**
 
*Returns the property* `key` *in the* `nth` *input argument of type* `type`

```javascript
var fn = just.echo.key('str').inNth(1).ofType( Object );
//or just.return.key('str').inNth(1).ofType( Object )

fn( 'hi', {}, obj ) //'hi'
```