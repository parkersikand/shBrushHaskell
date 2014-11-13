/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
;(function()
{
	// CommonJS
	typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

	function Brush()
	{
		var keywords =	' case class data default deriving do else forall ' + 
		                ' if import in infix infixl infixr instance let module ' + 
		                ' newtype of qualified then type where _ foreign ccall as safe unsafe ' + 
						' LANGUAGE ';
		var symbols = /[\/\\\~\`\!\@\#\$\%\^\&\*\(\)\[\]\{\}\?\>\<]+/;

		var prelude = 'error fmap id return fail foldr foldl build cons snoc' +
		              'augment map ord minInt maxInt assert' +
		              'const flip until asTypeOf not and or' +
		              'maybe either fst snd curry uncurry compare max min succ pred toEnum' +
		              'fromEnum enumFrom enumFromThen enumFromTo enumFromThenTo minBound' +
		              'maxBound negate abs signum fromInteger toRational quot rem div mod' +
		              'quotRem divMod toInteger recip fromRational pi exp sqrt log logBase' +
		              'sin tan cos asin atan acos sinh tanh cosh asinh atanh acosh ' +
		              'properFraction truncate round ceiling floor floatRadix floatDigits' +
		              'floatRange decodeFloat encodeFloat exponent significand scaleFloat' +
		              'isNaN isInfinite isDenormalized isNegativeZero isIEEE atan2 subtract' +
		              'even odd gcd lcm fromIntegral realToFrac mapM mapM sequence sequence_ undefined' +
		              'seq map filter head last tail init null length reverse foldr1 sum' +
		              'product concat concatMap maximum minimum scanl scanl1 scanr scanr1' +
		              'iterate repeat replicate cycle take drop splitAt takeWhile dropWhile' +
		              'span break elem notElem lookup zip zip3 zipWith zipWith3 unzip unzip3' +
		              'lines words unlines unwords showsPrec show showList shows showChar' +
		              'showString showParen readsPrec readList reads readParen read lex' +
		              'putChar putStr putStrLn print getChar getLine getContents interact' +
		              'readFile writeFile appendFile readIO readLn ioError userError mapM_';
        
        var multiLineHSComments = /\{\-[\s\S]*?\-\}/gm;
		var singleLineHSComments = /\-\-.*$/gm;				

		var dataTypeRegex = /[A-Z]\w*/gm;

		var numbers = /[0-9\.]+/g

		var dataTypeRegexInfo = {
			regex: /\w+/g,
			css: 'variable bold',
			func: function(match, info) { // hackery to throw out things that are NOT actually datatypes
				if(typeof(match) === 'object' && match[0]) {
					if(match[0].charAt(0) === match[0].charAt(0).toLowerCase()){
						return [];
					} else return match[0];
			    }
			}
		};

		var funDef = /\w+(?=\ ::)/gm;

		var r = SyntaxHighlighter.regexLib;
		
		this.regexList = [
			{ regex: r.multiLineDoubleQuotedString,					css: 'string' },
			{ regex: singleLineHSComments,							css: 'color1' },
			{ regex: multiLineHSComments,							css: 'color1' },
			{ regex: /\s*#.*/gm,									css: 'preprocessor' },
			{ regex: new RegExp(this.getKeywords(keywords), 'gm'),	css: 'keyword' },
			{ regex: funDef,                                        css: 'comments bold'},
			{ regex: new RegExp(this.getKeywords(prelude), 'gm'),   css: 'functions'},			
			dataTypeRegexInfo,
			{ regex: numbers, css: 'constants'}
			];
	
		this.forHtmlScript(r.scriptScriptTags);
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['hs', 'lhs', 'haskell'];

	SyntaxHighlighter.brushes.Haskell = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
