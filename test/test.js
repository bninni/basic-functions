var ret = require('../index.js'),
	vows = require('vows'),
    assert = require('assert');

vows.describe('Test').addBatch({
    'Testing each function': {
        'specific values are as expected': function () {
			assert.equal( ret.undefined, ret.noop );
			assert.equal( ret.undefined(), undefined );
			assert.equal( ret.null(), null );
			assert.equal( ret.this.call(this), this );
			assert( isNaN( ret.NaN() ) );
			assert.equal( ret.zero(), 0 );
			assert.equal( ret.one(), 1 );
			assert.equal( ret.Infinity(), Infinity );
			assert.equal( ret._Infinity(), -Infinity );
			assert( ret.true() );
			assert.equal( ret.false(), false );
			assert.equal( ret.string(), '' )
			assert.equal( ret.function()(), undefined );
			assert.deepEqual( ret.array(), [] );
			assert.deepEqual( ret.object(), {} );
			assert.deepEqual( ret.function()(), undefined );
		},
		'call is as expected' : function(){
			function go( a ){
				return a || 10;
			};
			
			assert.equal( ret.call( go ), 10 );
			assert.equal( ret.call.with('hi')( go ), 'hi' );
			
			assert.equal( ret.call.fn( go )(), 10 );
			assert.equal( ret.call.fn( go )( true ), true );
			assert.equal( ret.call.fn( go ).with('hi')( true ), 'hi' );
			
			assert.equal( ret.call.firstFn(true, go ), 10 );
			assert.equal( ret.call.firstFn.with('hi')(true, go ), 'hi' );
			
			assert.equal( ret.call.nth(1)(true, go ), 10 );
			assert.equal( ret.call.nth(1).with('hi')(true, go ), 'hi' );
			
			assert.equal( ret.call.nth(1).fn(String, true, go ), 10 );
			assert.equal( ret.call.nth(1).fn.with('hi')(String, true, go ), 'hi' );
			
			assert.equal( ret.call.key('fn')({a:true, fn:go}), 10 );
			assert.equal( ret.call.key('fn').with('hi')({a:true, fn:go}), 'hi' );
			
			assert.equal( ret.call.key('fn').inNth(1)([],{a:true, fn:go}), 10 );
			assert.equal( ret.call.key('fn').inNth(1).with('hi')([],{a:true, fn:go}), 'hi' );
			
			assert.equal( ret.call.key('fn').inNth(1).ofType(Object)({},{a:true, fn:go}), 10 );
			assert.equal( ret.call.key('fn').inNth(1).ofType(Object).with('hi')({},{a:true, fn:go}), 'hi' );
			
			assert.equal( ret.call.key('fn').inNth(1).ofType('object')({},{a:true, fn:go}), 10 );
			assert.equal( ret.call.key('fn').inNth(1).ofType('object').with('hi')({},{a:true, fn:go}), 'hi' );
		},
		'instantiate is as expected' : function(){
			assert.deepEqual( ret.instantiate( Array ), [] );
			assert.deepEqual( ret.instantiate.with('hi')( Array ), ['hi'] );
			
			assert.deepEqual( ret.instantiate.fn( Array )(), [] );
			assert.deepEqual( ret.instantiate.fn( Array )( true ), [true] );
			assert.deepEqual( ret.instantiate.fn( Array ).with('hi')( true ), ['hi'] );
			
			assert.deepEqual( ret.instantiate.firstFn(true, Array ), [] );
			assert.deepEqual( ret.instantiate.firstFn.with('hi')(true, Array ), ['hi'] );
			
			assert.deepEqual( ret.instantiate.nth(1)(true, Array ), [] );
			assert.deepEqual( ret.instantiate.nth(1).with('hi')(true, Array ), ['hi'] );
			
			assert.deepEqual( ret.instantiate.nth(1).fn(String, true, Array ), [] );
			assert.deepEqual( ret.instantiate.nth(1).fn.with('hi')(String, true, Array ), ['hi'] );
			
			assert.deepEqual( ret.instantiate.key('fn')({a:true, fn:Array}), [] );
			assert.deepEqual( ret.instantiate.key('fn').with('hi')({a:true, fn:Array}), ['hi'] );
			
			assert.deepEqual( ret.instantiate.key('fn').inNth(1)([],{a:true, fn:Array}), [] );
			assert.deepEqual( ret.instantiate.key('fn').inNth(1).with('hi')([],{a:true, fn:Array}), ['hi'] );
			
			assert.deepEqual( ret.instantiate.key('fn').inNth(1).ofType(Object)({},{a:true, fn:Array}), [] );
			assert.deepEqual( ret.instantiate.key('fn').inNth(1).ofType(Object).with('hi')({},{a:true, fn:Array}), ['hi'] );
		
			assert.deepEqual( ret.instantiate.key('fn').inNth(1).ofType('object')({},{a:true, fn:Array}), [] );
			assert.deepEqual( ret.instantiate.key('fn').inNth(1).ofType('object').with('hi')({},{a:true, fn:Array}), ['hi'] );
		
		},
		'throw is as expected' : function(){
			var myErr = new TypeError();
			
			assert.throws( function(){ ret.throw( myErr ) } );
			
			assert.throws( function(){ ret.throw.error( myErr )() } );
			assert.throws( function(){ ret.throw.error( myErr )( true ) } );
			
			assert.throws( function(){ ret.throw.firstError(true, myErr ) } );
			
			assert.throws( function(){ ret.throw.nth(1)(true, myErr ) } );
			
			assert.throws( function(){ ret.throw.nth(1).error(myErr, true, myErr ) } );
			
			assert.throws( function(){ ret.throw.key('err')({a:true, err:myErr}) } );
			
			assert.throws( function(){ ret.throw.key('err').inNth(1)([],{a:true, err:myErr}) } );
			
			assert.throws( function(){ ret.throw.key('err').inNth(1).ofType(Object)({},{a:true, err:myErr}) } );
			assert.throws( function(){ ret.throw.key('err').inNth(1).ofType('object')({},{a:true, err:myErr}) } );
		},
		'echo is as expected' : function(){
			assert.equal( ret.echo( 10 ), 10 );
			
			assert.equal( ret.echo.value( 10 )(), 10 );
			assert.equal( ret.echo.value( 10 )( true ), 10 );
			
			assert.equal( ret.echo.nth(1)(true, 'hi' ), 'hi' );
			
			assert.equal( ret.echo.nth(1).ofType(Function)(String, true, Array ), Array );
			
			assert.equal( ret.echo.key('a')({a:true, fn:String}), true );
			
			assert.equal( ret.echo.key('a').inNth(1)([],{a:10, fn:String}), 10 );
			
			assert.equal( ret.echo.key('fn').inNth(1).ofType(Object)({},{a:true, fn:String}), String );
			assert.equal( ret.echo.key('fn').inNth(1).ofType('object')({},{a:true, fn:String}), String );
		}
    },
}).exportTo(module);