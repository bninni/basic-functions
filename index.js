/*
TODO:
-'type' in ofType can be string.  If so, then use typeOf instead of constructor

*/
(function( exports ){
	function noop(){};
	exports.undefined = noop;
	exports.null = function(){
		return null;
	}
	exports.this = function(){
		return this;
	}
	exports.NaN = function(){
		return NaN;
	}
	exports.zero = function(){
		return 0;
	}
	exports.one = function(){
		return 1;
	}
	exports.Infinity = function(){
		return Infinity;
	}
	exports._Infinity = function(){
		return -Infinity;
	}
	exports.true = function(){
		return true;
	}
	exports.false = function(){
		return false;
	}
	exports.string = function(){
		return '';
	}
	exports.array = function(){
		return [];
	}
	exports.object = function(){
		return {};
	}
	exports.function = function(){
		return function(){};
	}

	//to turn the given arguments into an arg array
	function toArgArray( args ){
		return Array.prototype.slice.call( args );
	}
	
	//does the given value exist
	function exists( val ){
		return typeof val !== "undefined" && val !== null;
	}
	
	//is the given value of the given type
	function is(val, con){
		return exists( val ) && typeof con === "string" ? typeof val === con : val.constructor === con;
	}
	
	//is the given value an instance of the given type
	function isInstance(val, con){
		return typeof con === 'function' && val instanceof con;
	}
	
	var build = (function(){
	
		//to get a specific argument from the given arguments
		function getNthArgByType( comp, args, n, type ){
			var i,
				count = 0,
				a = toArgArray( args ),
				l = a.length;
					
			for(i=0;i<l;i++){
				if( comp(a[i],type) ){
					if( count++ === n ) return a[i];
				}
			}
		}
		
		//to handle the nth instance of the given type with the given arguments
		function handleNth( handle, comp, type, n, args ){
			return function(){
				var v = getNthArgByType( comp, arguments, n, type );
				return handle( v, args );
			}
		}
		
		//to handle a specific argument index with the given arguments
		function handleArg( handle, i, args ){
			return function(){
				return handle( arguments[i], args );
			}
		}
		
		//to handle a given key
		function handleKey( handle, key, args, n, comp, type ){
			n = n || 0;
			return function(){
				var obj = type ? getNthArgByType( comp, arguments, n, type ) : arguments[n];
				if( exists(obj) && exists( obj[key] ) ) return handle( obj[key], args );
			}
		}
	
		function build( handleFn, includeWith, name, compFn, type ){
			//create the base function
			var ret = function( v ){
				return handleFn( v );
			},
			upperName = name[0].toUpperCase() + name.slice(1);
			
			//to run the handle function with the given arguments
			if( includeWith ) ret.with = function(){
				var args = arguments;
				return function( v ){
					return handleFn( v, args );
				}
			}
			
			//if a type was provided:
			if( type ){
				//to handle the first occurrence of the type
				ret['first' + upperName ] = handleNth( handleFn, compFn, type, 0 );
				if( includeWith ) ret['first' + upperName ].with = function(){
					return handleNth( handleFn, compFn, type, 0, arguments );
				}
			}
			
			//to handle the nth occurrence of the type
			ret.nth = function( n ){
				var ret = handleArg( handleFn, n ),
					ofType = type ? handleNth( handleFn, compFn, type, n ) : function( type ){
						var ret = handleNth( handleFn, compFn, type, n );
						
						if( includeWith ) ret.with = function(){
							return handleNth( handleFn, compFn, type, n, arguments );
						}
						
						return ret;
					};
					
				if( includeWith ){
					if( type ) ofType.with = function(){
						return handleNth( handleFn, compFn, type, n, arguments );
					}
					ret.with = function(){
						return handleArg( handleFn, n, arguments );
					}
				}
				
				ret[ type ? name : 'ofType'] = ofType;
				
				return ret;
			}
			
			//to handle the given key
			ret.key = function( key ){
				var ret = handleKey( handleFn, key );
				//to handle the given key in the given arguments
				if( includeWith ) ret.with = function(){
					return handleKey( handleFn, key, arguments );
				}
				//to handle the given key in the nth of arg/type
				ret.inNth = function( n ){
						//to call the given key in the nth argument
					var ret = handleKey( handleFn, key, [], n );
					
						//to call the given key in the nth type
					ret.ofType = function( t ){
						var ret = handleKey( handleFn, key, [], n, is, t );
						if( includeWith ) ret.with = function(){
							return handleKey( handleFn, key, arguments, n, is, t );
						}
						return ret;
					};
					
					//to call the given key in the nth argument with the given arguments
					if( includeWith ) ret.with = function(){
						return handleKey( handleFn, key, arguments, n );
					}
					
					return ret;
				}
				return ret;
			}
			
			//to handle a specific value
			ret[name] = function( v ){
				var ret = function(){
					return handleFn( v, arguments );
				}
				//to handle the specific value with the given arguments
				if( includeWith ) ret.with = function(){
					var args = arguments;
					return function(){
						return handleFn( v, args );
					}
				}
				return ret;
			}
			
		
			return ret;
		}
		
		return build;
		
	})();
	
	
	function callHandle( f, args ){
		if( is(f,Function) ) return f.apply(this, args);
	}
	exports.invoke = build( callHandle, true, 'fn', is, Function );
	exports.call = exports.invoke;

	function instantiateHandle( f, args ){
		args = args ? toArgArray( args ) : [];
		if( is(f,Function) ) return new (Function.prototype.bind.apply(f,[f].concat(args)));
	}
	exports.instantiate =  build( instantiateHandle, true, 'fn', is, Function );
	exports.new = exports.instantiate;	
	
	function throwHandle( e ){
		throw e;
	}
	exports.throw = build( throwHandle, false, 'error', isInstance, Error );
	exports.error = exports.throw;

	function echoHandle( v ){
		return v;
	}
	exports.echo =  build( echoHandle, false, 'value', is );
	exports.return = exports.echo;
	
	exports.noop = noop;
	exports.noOp = noop;
	
})( (typeof module === "object" && typeof module.exports === "object") ? module.exports : (baseFns = {}) )