var ret = require('../index.js'),
	vows = require('vows'),
    assert = require('assert');

vows.describe('Test').addBatch({
    'Testing each function': {
        'specific values are as expected': function () {
			assert( ret.true() );
			assert.equal( ret.false(), false );
			assert.equal( ret.null(), null );
			assert.equal( ret.zero(), 0 );
			assert.equal( ret.one(), 1 );
			assert.equal( ret.Infinity(), Infinity );
			assert.equal( ret.undefined(), undefined );
		},
		'NaN is as expected' : function(){
			assert( isNaN( ret.NaN() ) );
		},
		'call is as expected' : function(){
			function go(){
				return 10;
			}
			
			assert.equal( ret.call( go ), go() );
		},
		'Echo is as expected' : function(){
			var arr = [],
				obj = {};
			assert.equal( ret.echo( 10 ), 10 )
			assert.equal( ret.echo( '10' ), '10' )
			assert.equal( ret.echo( arr ), arr )
			assert.equal( ret.echo( obj ), obj )
		},
		'throw is as expected' : function(){
			function go(){
				ret.throw( new Error() );
			}
		
			assert.throws( go )
		},
		'value is as expected' : function(){
			var f = ret.value(10);
			assert.equal( f(), 10 )
		},
		'arg is as expected' : function(){
			var f0 = ret.arg(0),
				f1 = ret.arg(1),
				f2 = ret.arg(2);
			
			assert.equal( f0('a','b','c'), 'a' )
			assert.equal( f1('a','b','c'), 'b' )
			assert.equal( f2('a','b','c'), 'c' )
			assert.deepEqual( ret.arg.array('a','b','c'), ['a','b','c'] )
		},
		'empty is as expected' : function(){
			var f = ret.empty( Object );
		
			assert.equal( ret.empty.string(), '' )
			assert.deepEqual( ret.empty.array(), [] );
			assert.deepEqual( ret.empty.object(), {} );
			assert.deepEqual( f(), {} );
		},
		'function is as expected' : function(){
			var go = function(){
				return 10;
			},
			f = ret.function( go );
			
			assert.equal( f(), go() );
		},
		'new is as expected' : function(){
			var f = ret.new( Array );
			
			assert.deepEqual( f( '10' ), [10] );
		},
		'this is as expected' : function(){
			var obj = {};
			
			assert.equal( ret.this.call(obj), obj );
		}
    },
}).exportTo(module);