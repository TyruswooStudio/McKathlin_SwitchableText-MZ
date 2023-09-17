//=============================================================================
// Switchable Text
// by McKathlin
// Kath_Switchable.js
//=============================================================================

/*
 * MIT License
 *
 * Copyright (c) 2023 Kathy Bunn and Scott Tyrus Washburn
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var Imported = Imported || {};
Imported.McKathlin_SwitchableText = true;

var McKathlin = McKathlin || {};
McKathlin.SwitchableText = McKathlin.SwitchableText || {};

/*:
 * @target MZ
 * @plugindesc MZ v1.0.1 Allows a text snippet to vary based on a switch or variable
 *      without causing a page break.
 * @author McKathlin
 * @url https://www.tyruswoo.com
 * 
 * @help McKathlin Switchable Text
 * 
 * WARNING: This is an older plugin! It lacks features and improvements
 * present in the latest version. You can get the latest version for free
 * on Tyruswoo.com.
 *
 * ============================================================================
 * This plugin enables text codes for use in messages or dialogue choices.
 * Text is inserted in place at runtime based on state of the referenced
 * switch or variable.
 * 
 * To start a switch-based snippet, use one of the following text codes:
 *   \ON[ID]{text}       Show the contained text if the switch is ON  (true).
 *   \OFF[ID]{text}      Show the contained text if the switch is OFF (false).
 *   \ON[ID]{foo}{bar}   Show "foo" if switch is on; otherwise show "bar".
 *   \OFF[ID]{blue}{red} Show "blue" if switch is off; otherwise show "red". 
 * 
 * An integer ID will check the corresponding game-wide switch.
 * If the ID is the letter A, B, C, or D, then the calling event's self switch
 * is checked.
 * 
 * Start a variable-based snippet with a statement like this:
 *   \OV[vID>=N]{text} Show the text if the variable with the given ID has a
 *                    value greater than or equal to N.
 *   \OV[vID==N]{foo}{bar} Show "foo" if the variable's value is equal to N;
 *                        Otherwise, show "bar".
 * 
 * The following comparison operators are valid for variable-based snippets:
 *   ==   Equal               !=   Not equal
 *   >=   Greater or equal     >   Greater than
 *   <=   Less or equal        <   Less than
 * 
 * If a dialogue choice ends up empty for a given Switchable state, it will
 * not appear in the player's list of dialogue choices. This allows available
 * choices to vary dynamically based on game state.
 * 
 * Due to Switchable Text's use of curly braces as delimiters, any text in
 * which switchable snippets and literal curly braces both occur will need
 * to escape the literal curly braces thus:
 *   \BO   Opening brace {
 *   \BC   Closing brace }
 * 
 * Examples
 * ---------
 * Good \ON[21]{evening}{day}, \OFF[A]{stranger}{friend}.
 * Go safely. \OV[143<=10]{Watch out for wolves.}
 * 
 * TODO: add more examples.
 * 
 * This plugin does not use any parameters or plugin commands.
 * 
 * ============================================================================
 * Version History:
 * 
 * v1.0  9/3/2020
 *         - Switchable Text plugin released for RPG Maker MZ!
 * 
 * v1.0.1  9/1/2023
 *        - This plugin is now free and open source under the MIT license.
 * 
 * ============================================================================
 * MIT License
 *
 * Copyright (c) 2023 Kathy Bunn and Scott Tyrus Washburn
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the “Software”), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 * ============================================================================
 * 
 */

(() => {

	const pluginName = "McKathlin_SwitchableText";
 
	//=============================================================================
	// Switchable condition evaluating helper methods
	//=============================================================================

	McKathlin.SwitchableText.evalVariableCondition = function(conditionString) {
		var captures = conditionString.match(
			/^v?(\d+) ?(={1,3}|>=|<=|>|<|!=|<>) ?(-?\d+)$/i);
		var id = Number.parseInt(captures[1]);
		var actualValue = $gameVariables.value(id);
		var operator = captures[2];
		var expectedValue = Number.parseInt(captures[3]);
		switch(operator) {
			case '=':
			case '==':
			case '===':
				return actualValue == expectedValue;
			case '>=':
				return actualValue >= expectedValue;
			case '<=':
				return actualValue <= expectedValue;
			case '>':
				return actualValue > expectedValue;
			case '<':
				return actualValue < expectedValue;
			case '!=':
			case '<>':
				return actualValue != expectedValue;
			default:
				throw new Error("Unsupported operator: " + operator);
		} // end switch statement
	};

	McKathlin.SwitchableText.evalSwitchCondition = function(switchIdString) {
		if (/^[ABCD]$/i.test(switchIdString)) {
			return this.evalSelfSwitchCondition(switchIdString);
		}
		else if (/^\d+$/.test(switchIdString)) {
			return $gameSwitches.value(Number.parseInt(switchIdString));
		} else {
			throw new Error("Invalid switch ID: " + switchIdString);
		}
	};

	McKathlin.SwitchableText.evalSelfSwitchCondition = function(switchChar) {
		var mapId = $gameMap.mapId();
		var eventId = $gameMap.runningEventId();
		var key = [mapId, eventId, switchChar];
		return $gameSelfSwitches.value(key);
	};

	//--------------------------------------------------
	// Game_Map running event ID - new method
	Game_Map.prototype.runningEventId = function() {
		if (!this._interpreter) {
			return null;
		}
		return this._interpreter.eventId();
	};

	//=============================================================================
	// Text conversion methods
	//=============================================================================

	//----------------------------------------------------------
	// Window_Base convert escape characters - extended method
	McKathlin.SwitchableText.Window_Base_convertEscapeCharacters =
		Window_Base.prototype.convertEscapeCharacters;
	Window_Base.prototype.convertEscapeCharacters = function(text) {
		text = McKathlin.SwitchableText.Window_Base_convertEscapeCharacters.call(
			this, text);
		console.log("SwitchableText called convertEscapeCharacters.");
		text = McKathlin.SwitchableText.convertSwitchableText(text);
		text = McKathlin.SwitchableText.convertEncodedBraces(text);
		return text;
	};

	//---------------------------------------------------
	// Window_Base convert Switchable Text - new method
	McKathlin.SwitchableText.convertSwitchableText = function(text) {
		// Convert switch-conditioned text.
		text = text.replace(
			/\x1b(ON|OFF|OV)\[([^\]]+)\]\{([^\}]*)\}(?:\{([^\}]*)\})?/gi,
			function() {
				var textCode = arguments[1].toUpperCase();
				var conditionString = arguments[2].toUpperCase();
				var ifText = arguments[3];
				var elseText = arguments[4] || "";
				var conditionMet = false;
				switch(textCode) {
					case 'ON':
						console.log("SwitchableText: ON condition found.");
						conditionMet = McKathlin.SwitchableText.evalSwitchCondition(
							conditionString);
						break;
					case 'OFF':
						console.log("SwitchableText: OFF condition found.");
						conditionMet = !McKathlin.SwitchableText.evalSwitchCondition(
							conditionString);
						break;
					case 'OV':
						console.log("SwitchableText: OV condition found.");
						conditionMet = McKathlin.SwitchableText.evalVariableCondition(
							conditionString);
						break;
					default:
						throw new Error("Unbuilt Switchable code: " + textCode);
				}
				return conditionMet ? ifText : elseText;
			}.bind(this)
		);
		return text;
	};

	//-----------------------------------------------------
	// Window_Base convert escapes to braces - new method
	McKathlin.SwitchableText.convertEncodedBraces = function(text) {
		// Convert escaped curly braces.
		text = text.replace(/\x1bBO/gi, '{');
		text = text.replace(/\x1bBC/gi, '}');
		return text;
	};

	//=============================================================================
	// Hide empty choices
	//=============================================================================

	//-------------------------------------------------------------------------
	// Game_Interpreter setup choices - extended method
	// Feeds choice setup an altered parameter list that omits empty choices.
	McKathlin.SwitchableText.Game_Interpreter_setupChoices =
		Game_Interpreter.prototype.setupChoices;
	Game_Interpreter.prototype.setupChoices = function(params) {
		var newParams = this.adjustChoiceParameters(params);
		McKathlin.SwitchableText.Game_Interpreter_setupChoices.call(this, newParams);
		this._choiceBranches = newParams[5];
		$gameMessage.setChoiceCallback(function(n) {
			this._branch[this._indent] = this._choiceBranches[n];
		}.bind(this));
	};

	Game_Interpreter.prototype.adjustChoiceParameters = function(params) {
		newParams = params.clone();
		var choices = newParams[0].clone();
		var cancelBranch = newParams[1];
		var defaultBranch = newParams[2];
		var choiceBranches = new Array(choices.length);
		for (var i = choices.length - 1; i >= 0; i--) {
			choiceBranches[i] = i;
			if (McKathlin.SwitchableText.isEmpty(choices[i])) {
				choices.splice(i, 1);
				choiceBranches.splice(i, 1);
				if (cancelBranch > i) {
					cancelBranch--;
				}
				if (defaultBranch > i) {
					defaultBranch--;
				}
			}
		}
		newParams[0] = choices;
		newParams[1] = cancelBranch;
		newParams[2] = defaultBranch;
		newParams[5] = choiceBranches;
		return newParams;
	};

	McKathlin.SwitchableText.isEmpty = function(text) {
		text = text.replace(/\\/g, '\x1b');
		text = text.replace(/\x1b\x1b/g, '\\');
		text = McKathlin.SwitchableText.convertSwitchableText(text);
		return 0 == text.trim().length;
	};

})();
