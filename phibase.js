(function(){
	Number.isInteger = Number.isInteger || function(value) {
	  return typeof value === "number" && 
	    isFinite(value) && 
	    Math.floor(value) === value;
	};

	if (!Array.prototype.findIndex) {
	  Array.prototype.findIndex = function(predicate) {
	    if (this == null) {
	      throw new TypeError('Array.prototype.findIndex called on null or undefined');
	    }
	    if (typeof predicate !== 'function') {
	      throw new TypeError('predicate must be a function');
	    }
	    var list = Object(this);
	    var length = list.length >>> 0;
	    var thisArg = arguments[1];
	    var value;

	    for (var i = 0; i < length; i++) {
	      value = list[i];
	      if (predicate.call(thisArg, value, i, list)) {
	        return i;
	      }
	    }
	    return -1;
	  };
	}

	var operations = ["add", "sub", "mul", "div", "eq", "gt", "gte", "lt", "lte"];

	function R5(r, q){
		if(!(this instanceof R5)){
			return new R5(r, q);
		}
		var self = this;
		if(typeof r == "number"){
			r = R(r);
		}
		q = q || 0;
		if(typeof q == "number"){
			q = R(q);
		}
		this.r = r;
		this.q = q;

		this.add = function(other){
			return new R5(self.r.add(other.r), self.q.add(other.q));
		};

		this.sub = function(other){
			return new R5(self.r.sub(other.r), self.q.sub(other.q));
		};

		this.mul = function(other){
			return new R5(
				self.r.mul(other.r).add(
					self.q.mul(other.q).mul(5)
				),
				self.q.mul(other.r).add(
					self.r.mul(other.q)
				)
			);
		};

		this.div = function(other){
			var d = other.r*other.r - 5*other.q*other.q;
			return new R5(
				self.r.mul(other.r).sub(
					self.q.mul(other.q).mul(5)
				).div(d),
				self.q.mul(other.r).sub(
					self.r.mul(other.q)
				).div(d)
			);
		};

		this.eq = function(other){
			return (self.r.eq(other.r)) && (self.q.eq(other.q));
		};

		this.gt = function(other){
			return diffsign(self, other) > 0;
		};

		this.gte = function(other){
			return diffsign(self, other) >= 0;
		};

		this.lt = function(other){
			return diffsign(self, other) < 0;
		};

		this.lte = function(other){
			return diffsign(self, other) <= 0;
		};

		this.toString = function(){
			var rs = self.r.toString(),
				qs = self.q.toString(),
				s = "";
			if(qs == "0"){
				return rs;
			}
			if(rs != "0"){
				s += rs;
				s += self.q.gt(0) ? "+" : "";
			}
			if(!(s == 1 || s == -1)){
				s += qs;
			}	
			s += "√5";
			return s;
		};

		this.valueOf = function(){
			return self.r + self.q*Math.sqrt(5);
		};

		this.toPhiBase = function(){
			return toPhiBase(self);
		};

		decorate(this, operations, function(cb){
			return function(arg){
				if(arg instanceof R || typeof arg == "number"){
					arg = new R5(arg);
				}
				return cb(arg);
			}
		});
	}

	function R(n, d){
		if(!(this instanceof R)){
			return new R(n, d);
		}
		var self = this;
		d = d || 1;
		if(!(Number.isInteger(n) && Number.isInteger(d))){
			throw new Error("Rational number can only be constructed from integers");
		}
		if(d < 0){
			d = -d;
			n = -n;
		}
		var cd = gcd(n, d);
		this.n = n / cd;
		this.d = d / cd;

		this.add = function(other){
			return new R(self.n*other.d + self.d*other.n, self.d*other.d);
		};

		this.sub = function(other){
			return new R(self.n*other.d - self.d*other.n, self.d*other.d);
		};

		this.mul = function(other){
			return new R(self.n*other.n, self.d*other.d);
		};

		this.div = function(other){
			if(other.n == 0){
				throw new Error("Division by zero");
			}
			return new R(self.n*other.d, self.d*other.n);
		};

		this.eq = function(other){
			return self.n == other.n && self.d == other.d;
		};

		this.gt = function(other){
			return self.n*other.d > self.d*other.n;
		};

		this.gte = function(other){
			return self.n*other.d >= self.d*other.n;
		};

		this.lt = function(other){
			return self.n*other.d < self.d*other.n;
		};

		this.lte = function(other){
			return self.n*other.d <= self.d*other.n;
		};

		this.toPhiBase = function(){
			return toPhiBase(self);
		};

		this.toString = function(){
			return self.n + ((self.d != 1) ? ("/" + self.d) : "");
		};

		this.valueOf = function(){
			return self.n / self.d;
		};

		decorate(this, operations, function(cb){
			return function(arg){
				if(typeof arg == "number"){
					arg = new R(arg);
				}
				return cb(arg);
			}
		});
	}

	function diffsign(a, b){
		var r = a.r.sub(b.r);
		var q = a.q.sub(b.q);
		if(r.eq(0) && q.eq(0)){
			return 0;
		}
		if(r.gte(0) && q.gte(0)){
			return 1;
		}
		if(r.lte(0) && q.lte(0)){
			return -1;
		}
		var sign = (r.gt(0) ? 1 : -1);
		return r.mul(r).sub(
				q.mul(q).mul(5)
			).n*sign;
	}

	function decorate(obj, list, f){
		list.forEach(function(key){
			obj[key] = f(obj[key]);
		})
	}

	function gcd(a, b){
		a = Math.abs(a);
		while(b = a % (a = b));
		return a;
	}

	var phi = R5(1, 1).div(2);
	var phi_inv = R5(1).div(phi); 

	function toPhiBase(n){
		if(!(n instanceof R5)){
			n = R5(n);
		}
		var result = "";
		if(n.lt(0)){
			result += "-";
			n = n.mul(-1);
		}
		var pow = R5(1);
		while(pow.lte(n)){
			pow = pow.mul(phi);
		}
		pow = pow.mul(phi_inv);
		var frac = 0;
		while(pow.gte(1)){
			if(pow.gt(n)){
				result += 0;
			}else{
				result += 1;
				n = n.sub(pow);
			}
			pow = pow.mul(phi_inv);
		}
		if(result == "" || result == "-"){
			result += "0";
		}
		if(n.gt(0)){
			result += "." + afterDot(n);
		}
		return result;
	}

	function afterDot(n){
		var digits = "",
			remainders = [],
			maxdigits = 100,
			i;
		while(n.gt(0) && maxdigits--){
			i = remainders.findIndex(function(elem){
				return elem.eq(n);
			});
			if(~i){
				return digits.slice(0, i) + "(" + digits.slice(i) + ")";
			}
			remainders.push(n);
			n = n.mul(phi);
			if(n.gte(1)){
				n = n.sub(1);
				digits += 1;
			}else{
				digits += 0;
			}
		}
		return digits;
	} 

	function fromPhiBase(s){
		if(!/^\-?(0|1[01]*)(\.([01]+|[01]*(\([01]+\)))?)?$/.test(s)){
			throw new Error("Incorrect string");
		}
		var parts = s.split(".");
		var	wholePart = parts[0],
			fracPart = parts[1],
			sign = 1,
			pow = R5(1),
			result = R5(0),
			i = 1,
			c;
		while(i <= wholePart.length){
			c = wholePart.charAt(wholePart.length - i++);
			if(c == "1"){
				result = result.add(pow);
			}
			if(c == "-"){
				sign = -1;
			}
			pow = pow.mul(phi);
		}
		if(!fracPart){
			return result.mul(sign);
		}
		var periodicPart = (/\([01]+\)/.exec(fracPart) || [""])[0];
		fracPart = fracPart.replace(periodicPart, "");
		periodicPart = periodicPart.replace(/[\(\)]/g, "");
		i = 0;
		pow = R5(1);
		while(i < fracPart.length){
			pow = pow.mul(phi_inv);
			c = fracPart.charAt(i++);
			if(c == "1"){
				result = result.add(pow);
			}
		}
		if(!periodicPart){
			return result.mul(sign);
		}
		var periodValue = R5(0),
			periodPow = R5(1);
		i = 0;
		while(i < periodicPart.length){
			periodPow = periodPow.mul(phi_inv);
			pow = pow.mul(phi_inv);
			c = periodicPart.charAt(i++);
			if(c == "1"){
				periodValue = periodValue.add(pow);
			}
		}
		result = result.add(
			periodValue.div(
				R5(1).sub(periodPow)
			)
		);
		return result.mul(sign);
	}


	var Phi = {
		toPhiBase: toPhiBase,
		fromPhiBase: fromPhiBase,
		R: R,
		R5: R5
	};

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
		module.exports = Phi;
	}else{
		var _ = window.PhiBase;
		Phi.noConflict = function(){
			window.PhiBase = _;
			return Phi;
		}
		window.PhiBase = Phi;
	}

})();