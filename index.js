function noop(){};
exports.noop = noop;
exports.undefined = noop;

//Handles for functions, errors, values
exports.call = function( f ){
	return f();
};

exports.throw = function( e ){
	throw e;
};

exports.echo = function( v ){
	return v;
};

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

exports.true = function(){
	return true;
}
exports.false = function(){
	return false;
}


exports.value = function( v ){
	return function(){
		return v;
	};
}

exports.function = function( f ){
	return function(){
		return f();
	};
}

function empty( c ){
	return function(){
		return new c();
	};
}
empty.string = function(){
	return '';
}
empty.array = function(){
	return [];
}
empty.object = function(){
	return {};
}
empty.function = function(){
	return function(){};
}
exports.empty = empty;

function toArgArray( args ){
	return Array.prototype.slice.call( args );
}

function arg(i){
	return function(){
		var a = toArgArray( arguments );
		return a[i];
	}
}

arg.array = function(){
	return toArgArray( arguments );
};

exports.arg = arg;

exports.new = function(c){
	return function(){
		var args = toArgArray( arguments );
		return new (Function.prototype.bind.apply(c,[c].concat(args)));
	};
}