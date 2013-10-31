function fixStrs(row) {
	for (var i = 0; i < row.length; i++) {
		if (row[i][0] == '"') {
			var rep = '';
			for (var j = i; j < row.length; j++) {
				if (j != i)
					rep += ',';
				rep += row[j];
				if (rep[rep.length - 1] == '"') {
					row.splice(i, j - i + 1, rep.substring(1, rep.length - 1));
				}
			}
		}
	}
	return row;
}

// http://stackoverflow.com/questions/3870019/javascript-parser-for-a-string-which-contains-ini-data
function parseINIString(data) {
	var regex = {
		section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
		param: /^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/,
		comment: /^\s*;.*$/
	};
	var value = {};
	var lines = data.split(/\r\n|\r|\n/);
	var section = null;
	
	lines.forEach(function(line) {
		if (line.length == 0) {
			return;
		}
		else if (regex.comment.test(line)) {
			return;
		}
		else if (regex.param.test(line)) {
			var match = line.match(regex.param);
			if(section) {
				var arr = fixStrs(match[2].split(','));
				arr.splice(0, 0, match[1]);
				value[section].push(arr);
			}
		}
		else if (regex.section.test(line)) {
			var match = line.match(regex.section);
			value[match[1]] = [];
			section = match[1];
		}
		else if(section) {
			value[section].push(line.split(','));
		}
	});
	return value;
}

// http://stackoverflow.com/questions/4359639/eval-with-variables-from-an-object-in-the-scope
function evalVars(func, vars) {
	return new Function("v", "with(Math) { with (v) { return (" + func +")}}")(vars);
}

function sqr(x) {
	return x * x;
}

function ln(x) {
	return Math.log(x);
}

function lg(x) {
	return Math.log(x) / Math.log(10);
}

function toHtml(str) {
	var newStr = '';
	var tag = 'n';
	for (var i = 0; i < str.length; i++) {
		if (str[i] == '\\') {
			if (tag == 'n') {
				
			}
			else if (tag == 'y') {
				newStr += '</sup>';
			}
			else if (tag == 'a') {
				newStr += '</sub>';
			}
			else if (tag == 's') {
				newStr += '</span>';
			}
			else if (tag == 'i') {
				newStr += '</i>';
			}
			
			var oldtag = tag;
			
			i++;
			tag = str[i];
			if (oldtag != tag) {
				if (tag == 'n') {
					
				}
				else if (tag == 'y') {
					newStr += '<sup>';
				}
				else if (tag == 'a') {
					newStr += '<sub>';
				}
				else if (tag == 's') {
					newStr += '<span>';
				}
				else if (tag == 'i') {
					newStr += '<i>';
				}
			}
			else {
				tag = 'n';
			}
		}
		else {
			if (tag == 's') {
				//newStr += String.fromCharCode(str[i].charCodeAt(0) + 0x0390 - 0x40 - 1);
				//'ABGDEZHQIKLMNXOPRSTUFCYW'
				//'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'
				//'abgdezhqiklmnxoprVstufcywj'
				//'αβγδεζηθικλμνξοπρςστυφχψωφ'
				newStr += String('\u0391\u0392\u0393\u0394\u0395\u0396\u0397\u0398\u0399\u039A\u039B\u039C\u039D\u039E\u039F\u03A0\u03A1\u03A3\u03A4\u03A5\u03A6\u03A7\u03A8\u03A9\u03B1\u03B2\u03B3\u03B4\u03B5\u03B6\u03B7\u03B8\u03B9\u03BA\u03BB\u03BC\u03BD\u03BE\u03BF\u03C0\u03C1\u03C2\u03C3\u03C4\u03C5\u03C6\u03C7\u03C8\u03C9\u03C6')[String('ABGDEZHQIKLMNXOPRSTUFCYWabgdezhqiklmnxoprVstufcywj').indexOf(str[i])];
				//console.log(str[i].charCodeAt(0) + ' ' + (str[i].charCodeAt(0) + 0x0390 - 0x40));
				//newStr += str[i];
			}
			else {
				newStr += str[i];
			}
		}
	}
	if (tag == 'n') {
		
	}
	else if (tag == 'y') {
		newStr += '</sup>';
	}
	else if (tag == 'a') {
		newStr += '</sub>';
	}
	else if (tag == 's') {
		newStr += '</span>';
	}
	else if (tag == 'i') {
		newStr += '</i>';
	}
	return newStr;
}

function sigFigs(n, sig) {
	if (n == 0)
		return 0;
	
	var mult = Math.pow(10, sig - Math.floor(Math.log(Math.abs(n)) / Math.LN10) - 1);
	return Math.round(n * mult) / mult;
}

// http://stackoverflow.com/questions/4313841/javascript-how-can-i-insert-a-string-at-a-specific-index
String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};

// http://stackoverflow.com/questions/646628/javascript-startswith
if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function (str, i) {
		return this.slice(i, i + str.length) == str;
	};
}

var ini;

function loadSry(filename) {
	$('#steps').html('');
	$.get(filename, function(data) {
		ini = parseINIString(data);
		var val = $('#variant option:selected').val();
		if (val != '')
			loadVariant(val);
	}, 'text');
}

function loadVariant(variant) {
	//var mathFuns = Object.getOwnPropertyNames(Math);
	var mathFuns = ['sqrt', 'sqr', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'ln', 'exp', 'lg'];
	mathFuns.sort(function (a, b) {
		return b.length - a.length;
	});
	
	var variantStr = variant;
	if (variant != 'Valemid')
		variantStr = (parseInt(variant, 10) + 1).toString();
	
	_gaq.push(['_trackEvent', 'Ylesanne', $('#nimi option:selected').text(), variantStr]);
	
	$('#steps').html('');
	$('#steps').append($('<li></li>').attr('data-role', 'list-divider').text('Algandmed'));
	
	var andmed;
	var vars = {};
	var tahised = {};
	var tahised2 = new Array();
	if (variant != 'Valemid')
		andmed = ini.Andmed[variant];
	
	for (var i = 0; i < ini.Kysimused.length; i++) {
		var sym = ini.Kysimused[i][0];
		var kysNr = ini.Kysimused[i][1];
		var kys = ini.Kysimused[i][2];
		var tahis = ini.Kysimused[i][3];
		var yhik = ini.Kysimused[i][4];
		var exp = ini.Kysimused[i][5];
		var tyveNr = ini.Kysimused[i][6];
		var valem = ini.Kysimused[i][7];
		var e = valem;

		valem = valem.replace(/([+-]?\d+(?:.\d+)?)E([+-]?\d+)/g, "$1e$2");
		valem = valem.replace(/3.1416\*(\w+)\/180/g, "$1");
		valem = valem.replace("*3.1416/180", "", "g");
		valem = valem.replace(/180\*atan\(([^)]+)\)\/3.1416/g, "atan($1)");
		valem = valem.replace("(180/3.1416)*atan", "atan", "g");
		
		tahised[sym] = toHtml(tahis);
		
		//var tahised2 = Object.getOwnPropertyNames(tahised);
		tahised2.push(sym);
		tahised2.sort(function (a, b) {
			return b.length - a.length;
		});
		
		for (var j = 0; j < valem.length; ) {
			var mathFun = false;
			
			for (var k = 0; k < mathFuns.length; k++) {
				if (valem.startsWith(mathFuns[k], j)) {
					mathFun = true;
					j += mathFuns[k].length;
					break;
				}
			}
			
			if (!mathFun) {		
				var replaced = false;
				
				for (var k = 0; k < tahised2.length; k++) {
					var sym2 = tahised2[k];
					if (valem.startsWith(sym2, j)) {
						valem = valem.splice(j, sym2.length, tahised[sym2]);
						j += tahised[sym2].length;
						replaced = true;
						break;
					}
				}
				
				if (!replaced) {
					j++;
				}
			}
			
			
		}
		
		if (variant != 'Valemid') {
			if (valem.indexOf('^') != -1)
				alert('shit');
			
			for (var j = 0; j < andmed.length; j++) {
				e = e.replace('#' + (j + 1).toString(), andmed[j]);
			}
			
			var ret = evalVars(e, vars);
			vars[sym] = ret;
		}
		
		if (kysNr >= 0)
		{
			var kysNr2 = kysNr;
			kysNr = (kysNr == 0 ? "A" : (kysNr.toString())); 
			var str;

			if (i > 0 && ini.Kysimused[i - 1][1] == 0 && kysNr2 != 0)
				$('#steps').append($('<li></li>').attr('data-role', 'list-divider').html('K&uuml;simused'));

			if (variant == 'Valemid') {
				str = '<h3>' + toHtml(kys) + ': </h3><p><b>' + toHtml(tahis) + '</b> = ' + valem + ' [<b>' + toHtml(yhik) + '</b>]</p>';
			}
			else {
				var retStr;
				ret = sigFigs(ret, tyveNr == '' ? 7 : tyveNr);
				if (exp > 0)
					retStr = ret.toExponential();
				else
					retStr = ret.toString();

				str = '<h3>' + toHtml(kys) + ': </h3><p><b>' + toHtml(tahis) + '</b> = ' + valem + ' = <b>' + retStr + ' ' + toHtml(yhik) + '</b></p>';
			}

			if (kysNr2 == 0)
				$('#steps').append($('<li></li>').addClass('alg').html(str));
			else
				$('#steps').append($('<li></li>').css('counter-reset', 'listnumbering ' + kysNr2).html(str));
		}
	}
	
	$('#steps').listview('refresh');
}


function loadNimed() {
	$.get('NIMED.TXT', function(data) {
		var lines = data.split(/\r\n|\r|\n/);
		lines.forEach(function (line) {
			if (line.length == 0)
				return;
			var pieces = line.split('\t');
			$('#nimi').append($('<option></option>').val(pieces[0]).text(pieces[1]));
		});
		
		$('#nimi').selectmenu('refresh');
		
		$('#nimi').change(function(ev) {
			var val = $('#nimi option:selected').val();
			if (val != '')
				loadSry(val);
		});
		
		//loadSry($('#nimi option:selected').val());
		
		$('#variant').change(function(ev) {
			var val = $('#variant option:selected').val();
			if (val != '' && ini)
				loadVariant(val);
		});
	}, 'text');
}

$(function () {
	loadNimed();
	
	for (var i = 0; i < 36; i++) {
		$('#variant').append($('<option></option>').val(i).text(i + 1));
	}
	
	$('#variant').selectmenu('refresh');
});
