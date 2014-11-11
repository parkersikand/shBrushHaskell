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
		var keywords =	'case class data default deriving do else forall' + 
		                'if import in infix infixl infixr instance let module' + 
		                'newtype of qualified then type where _ foreign ccall as safe unsafe' + 
						'LANGUAGE';
		var symbols = '\+ \- \* \& \^ \% \$ \# \@ \! \~ \< \> \? \=';
        
        var multiLineHSComments = /\{\-[\s\S]*?\-\}/gm;
		var singleLineHSComments = /\-\-.*$/gm;				

		var dataTypeRegex = /[A-Z]\w*/gm;

		var funDef = /\w+(?=\ ::)/gm

		var r = SyntaxHighlighter.regexLib;
		
		this.regexList = [
			{ regex: r.multiLineDoubleQuotedString,					css: 'string' },			// double quoted strings
			{ regex: singleLineHSComments,							css: 'color1' },			// one line comments
			{ regex: multiLineHSComments,							css: 'color1' },			// multiline comments
			{ regex: /\s*#.*/gm,									css: 'preprocessor' },		// preprocessor tags like #region and #endregion
			{ regex: new RegExp(this.getKeywords(keywords), 'gm'),	css: 'keyword' },
			{ regex: dataTypeRegex,                                 css: 'color2 bold'},
			{ regex: funDef,                                        css: 'comments bold'}			
			];
	
		this.forHtmlScript(r.scriptScriptTags);
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['hs', 'lhs', 'haskell'];

	SyntaxHighlighter.brushes.Haskell = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
