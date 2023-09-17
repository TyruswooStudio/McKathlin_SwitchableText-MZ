//=============================================================================
// Switchable Text
// For RPG Maker MZ
// By McKathlin
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
 * @plugindesc MZ v1.3.1 Allows a text snippet to vary based on a switch, variable,
 * or party attribute without a page break.
 * @author McKathlin
 * @url https://www.tyruswoo.com
 * 
 * @help McKathlin Switchable Text
 * ============================================================================
 * 
 * Compatibility: This plugin is fully compatible with Tyruswoo_BigChoiceLists
 * in any order on the plugin list. However, Switchable Text may conflict with
 * non-Tyruswoo plugins that alter the way Game_Interpreter makes choice lists.
 * If you encounter conflicts, try switching which choice-list-affecting plugin
 * comes after which. If conflicts with Switchable Text persist, talk to us on
 * Tyruswoo.com and we'll do our best to help you.
 * 
 * ============================================================================
 * 
 * Switchable Text enables text codes for use in messages or dialogue choices.
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
 *                     value greater than or equal to N.
 *   \OV[vID==N]{foo}{bar} Show "foo" if the variable's value is equal to N;
 *                         Otherwise, show "bar".
 *   \OV[vJ < vK]{blah} Show "blah" if variable J's value is less than
 *                      variable K's value.
 * 
 * Some statements allow for text snippets based on party attributes.
 * \OPS stands for On Party Size.
 * Examples:
 *   \OPS[1]{hero}{heroes}    Show "hero" if party size is 1,
 *                            otherwise show "heroes"
 *   \OPS[>2]{buddies}{buddy} Text conditioned on more than 2 people in party.
 * 
 * \OPL stands for On Party Leader, and can check various actor attributes.
 * \OPM stands for On Party Member, and is true if any member matches.
 * When checking an attribute, use a comparison operator and numeric ID.
 * Here is a full list of attributes that can be checked:
 * --------------+------------------
 *  Attribute    |  Ways to write    
 * --------------+------------------
 *  Actor ID     |  actor, a        
 *  Class ID     |  class, c        
 *  State ID     |  state, s        
 * 
 * Examples:
 *   Hey \OPL[a=5]{old man}{kid}.
 *   Put your \OPL[class<=2]{might}{skill} to the test!
 *   A good meal restores health.\OPM[s=1]{ But it can't revive the dead.}
 * 
 * The following comparison operators are valid for variable-based snippets:
 *   ==   Equal               !=   Not equal
 *   >=   Greater or equal     >   Greater than
 *   <=   Less or equal        <   Less than
 * 
 * Switchable Text snippets can be nested inside each other.
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
 * This plugin offers the following additional text codes:
 *   \PartySize         Replaced with number of party members
 *   \NumWord[expr]     Replaces expr with the word version of the number:
 *                      e.g. one, two, three...
 *                      Numbers greater than 10 are left as numerals.
 *   \Ordinal[expr]     Makes the ordinal version of a numeric expression:
 *                      e.g. 1st, 2nd, 3rd...
 *   \OrdinalWord[expr] Makes the spelled-out ordinal, e.g. first, second, ...
 *                      Numbers greater than 10 are numerals with a suffix.
 * 
 * \NumWord[expr], \Ordinal[expr], and \OrdinalWord[expr] can enclose \V[n],
 * \PartySize, and anything else that resolves to a number.
 * If you plan to use these features on text codes from other plugins,
 * put McKathlin_SwitchableText UNDER these plugins.
 * Examples:
 * You have squished \NumWord[\V[22]] bugs.
 * A \NumWord[\PartySize]-person party like yours would be in for a challenge.
 * \Ordinal[\V[75]] Place
 * You're our \OrdinalWord[\V[158]] visitor!
 * 
 * More Examples
 * --------------
 * Good \ON[21]{evening}{day}, \OFF[A]{stranger}{friend}.
 * Go safely. \OV[v143<=10]{Watch out for wolves.}
 * 
 * Excuse me for a moment.
 * My \OPS[s>1]{\ON[41]{enemies}{friends} have}{\ON[41]{enemy}{friend} has}
 * arrived.
 * 
 * We have\OV[v22!=v23]{n't} squished the same number of bugs.
 * 
 * Come in\OPS[>1]{, \OPS[2]{both of you}{all \NumWord[\PartySize] of you}}!
 * 
 * --------------
 * 
 * This plugin does not use any parameters or plugin commands.
 * ============================================================================
 * For more help using the Switchable Text plugin, see Tyruswoo.com.
 * ============================================================================
 * Version History:
 *
 * v1.0  9/3/2020
 *        - Switchable Text plugin released for RPG Maker MZ!
 *
 * v1.1  9/13/2020
 *        - Added nested text snippets! Now, you can use switchable text
 *          snippets nested within each other!
 *        - Added variable-to-variable comparison. You can now check one
 *          variable's value against the value of another variable.
 * 
 * v1.2  9/15/2020
 *        - Added \OPS, which switches text based on party size.
 *        - Added \OPL, which switches text based on party leader attributes.
 *        - Added \OPM, which switches text based on any party member.
 *        - Added \PartySize, a text code for number of people in party.
 *        - Added \NumWord, \Ordinal, and \OrdinalWord, which change how
 *          numbers are written out.
 * 
 * v1.3  7/29/2022
 *        - Made fully compatible with Tyruswoo_BigChoiceLists.js
 * 
 * v1.3.1  8/31/2023
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
 * Enjoy the plugin!
 * -McKathlin
 */

(() => {

	const pluginName = "McKathlin_SwitchableText";
 
	//=============================================================================
	// Switchable condition evaluating helper methods
	//=============================================================================

	McKathlin.SwitchableText.compareUsingOperator = function(operator) {
		switch(operator) {
			case '=':
			case '==':
			case '===':
				return function(left, right) { return left == right };
			case '>=':
				return function(left, right) { return left >= right };
			case '<=':
				return function(left, right) { return left <= right };
			case '>':
				return function(left, right) { return left > right };
			case '<':
				return function(left, right) { return left < right };
			case '!=':
			case '<>':
				return function(left, right) { return left != right };
			default:
				throw new Error("Unsupported operator: " + operator);
		} // end switch statement
	};
	
	McKathlin.SwitchableText.evalVariableCondition = function(conditionString) {
		var captures = conditionString.match(
			/^(v)?(\d+) ?(={1,3}|>=|<=|>|<|!=|<>) ?(v)?(-?\d+)$/i);
		var rightIsVariable = captures[4] != null; // A leading 'v' means it's a variable.
		var leftIsVariable = !rightIsVariable || (captures[1] != null);
		
		var leftValue = Number.parseInt(captures[2]);
		if (leftIsVariable) {
			leftValue = $gameVariables.value(leftValue);
		}
		
		var rightValue = Number.parseInt(captures[5]);
		if (rightIsVariable) {
			rightValue = $gameVariables.value(rightValue);
		}
		
		var operator = captures[3];
		var compare = McKathlin.SwitchableText.compareUsingOperator(operator);
		return compare(leftValue, rightValue);
	};

	McKathlin.SwitchableText.evalSwitchCondition = function(switchIdString) {
		// Use only the part after the leading s or ss, if any.
		var switchIdString = switchIdString.match(/^s{0,2}([ABCD]|\d+)$/i)[1];
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
	
	McKathlin.SwitchableText.evalPartySizeCondition = function(conditionString) {
		// The stand-in variable name for party size can be "size", any single letter, or nothing.
		// The comparison operator is optional, too. If none, treat as an equals-check.
		// All that's strictly necessary is the number to compare to.
		var captures = conditionString.match(/^(?:(?:size|[a-z])? ?(={1,3}|>=|<=|>|<|!=|<>))? ?(\d+)$/i);
		var operator = captures[1];
		var expectedSize = Number.parseInt(captures[2]);
		
		var compare;
		if (operator == null) {
			compare = function(left, right) { return left == right };
		} else {
			compare = McKathlin.SwitchableText.compareUsingOperator(operator);
		}
		return compare($gameParty.size(), expectedSize);
	};

	McKathlin.SwitchableText.evalPartyLeaderCondition = function(conditionString) {
		return McKathlin.SwitchableText.checkActorsInList( [ $gameParty.leader() ], conditionString);
	};
	
	McKathlin.SwitchableText.evalPartyMemberCondition = function(conditionString) {
		return McKathlin.SwitchableText.checkActorsInList($gameParty.members(), conditionString);
	};
	
	McKathlin.SwitchableText.checkActorsInList = function(actorList, conditionString) {
		var captures = conditionString.match(
			/^(a|actor|c|class|s|state) ?(={1,3}|>=|<=|>|<|!=|<>) ?(\d+)$/i);
		var typeString = captures[1].toLowerCase();
		var compare = McKathlin.SwitchableText.compareUsingOperator(captures[2]);
		var expectedValue = Number.parseInt(captures[3]);
		
		if (typeString.startsWith('a')) {
			// check actor
			for (const actor of actorList) {
				if (compare(actor.actorId(), expectedValue)) {
					return true;
				}
			}
			return false; // No actor match found.
		} else if (typeString.startsWith('c')) {
			// check class
			for (const actor of actorList) {
				if (compare(actor.currentClass().id, expectedValue)) {
					return true;
				}
			}
			return false; // No class match found.
		} else if (typeString.startsWith('s')) {
			// check states
			for (const actor of actorList) {
				for (const state of actor.states()) {
					if (compare(state.id, expectedValue)) {
						return true;
					}
				}
			}
			return false; // No state match found.
		} else {
			throw new Error("Type '" + typeString + "' is not supported in Switchable Text.");
		}
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
		text = McKathlin.SwitchableText.convertPartySizeCode(text);
		text = McKathlin.SwitchableText.convertSwitchableText(text);
		text = McKathlin.SwitchableText.convertOrdinalCodes(text);
		text = McKathlin.SwitchableText.convertNumberWordCode(text);
		text = McKathlin.SwitchableText.convertEncodedBraces(text);
		return text;
	};
	
	//----------------------------------------------------------
	// convert party size code - new method
	McKathlin.SwitchableText.convertPartySizeCode = function(text) {
		return text.replace(/\x1bPartySize/gi, function() {
			return "" + $gameParty.size();
		}.bind(this));
	};
	
	//---------------------------------------------------
	// Convert Switchable Text - new method
	McKathlin.SwitchableText.convertSwitchableText = function(text) {
		// Convert switch-conditioned text.
		// If statements are nested, multiple passes will be necessary to replace all.
		// Innermost statements will be replaced first.
		var textIsChanging = true;
		while (textIsChanging) {
			var newText = text.replace(
				/\x1b(ON|OFF|OV|OPS|OPL|OPM)\[([^\]]+)\]\{([^\{\}]*)\}(?:\{([^\{\}]*)\}|([^\{])|$)/gi,
				function() {
					var textCode = arguments[1].toUpperCase();
					var conditionString = arguments[2];
					var ifText = arguments[3]; // Text to show if condition is true.
					var elseText = arguments[4] || ""; // Text to show if condition is false.
					var tail = arguments[5] || ""; // Captured for lookahead only. Put back.
					var conditionMet = false;
					switch(textCode) {
						case 'ON':
							conditionMet = McKathlin.SwitchableText.evalSwitchCondition(
								conditionString);
							break;
						case 'OFF':
							conditionMet = !McKathlin.SwitchableText.evalSwitchCondition(
								conditionString);
							break;
						case 'OV':
							conditionMet = McKathlin.SwitchableText.evalVariableCondition(
								conditionString);
							break;
						case 'OPS':
							conditionMet = McKathlin.SwitchableText.evalPartySizeCondition(conditionString);
							break;
						case 'OPL':
							conditionMet = McKathlin.SwitchableText.evalPartyLeaderCondition(conditionString);
							break;
						case 'OPM':
							conditionMet = McKathlin.SwitchableText.evalPartyMemberCondition(conditionString);
							break;
						default:
							throw new Error("Unbuilt Switchable code: " + textCode);
					}
					return (conditionMet ? ifText : elseText) + tail;
				}.bind(this)
			); // end replace
			textIsChanging = (newText != text); // check for changes
			text = newText; // update text
		} // end while (textIsChanging)
		return text;
	};
	
	McKathlin.SwitchableText.convertOrdinalCodes = function(text) {
		return text.replace(/\x1bOrdinal(Word)?\[([^\]]+)\]/gi, function(text) {
			var spellOutWord = (arguments[1] != null);
			var numString = arguments[2].trim();
			
			if (spellOutWord) {
				switch(numString) {
					case '1': return 'first'; break;
					case '2': return 'second'; break;
					case '3': return 'third'; break;
					case '4': return 'fourth'; break;
					case '5': return 'fifth'; break;
					case '6': return 'sixth'; break;
					case '7': return 'seventh'; break;
					case '8': return 'eighth'; break;
					case '9': return 'ninth'; break;
					case '10': return 'tenth'; break;
				}
				// If it's something else, control will move on to next step.
				// This is deliberate.
				// Numbers greater than 10 should use numerals in any case.
			}
			// And here's the part of the code that uses numerals.
			var ordinal = numString + 'th';
			if (numString.endsWith('1') && !numString.endsWith('11')) {
				return numString + 'st'; // e.g. 1st, 21st, 31st, ... but 11th.
			} else if (numString.endsWith('2') && !numString.endsWith('12')) {
				return numString + 'nd';
			} else if (numString.endsWith('3') && !numString.endsWith('13')) {
				return numString + 'rd';
			} else {
				return numString + 'th'; // Most numbers do this.
			}
		}.bind(this));
	};

	McKathlin.SwitchableText.convertNumberWordCode = function(text) {
		return text.replace(/\x1bNumWord\[([^\]]+)\]/gi, function(text) {
			var numString = arguments[1];
			switch(numString) {
				case '1': return 'one'; break;
				case '2': return 'two'; break;
				case '3': return 'three'; break;
				case '4': return 'four'; break;
				case '5': return 'five'; break;
				case '6': return 'six'; break;
				case '7': return 'seven'; break;
				case '8': return 'eight'; break;
				case '9': return 'nine'; break;
				case '10': return 'ten'; break;
				default: return numString;
			}
		}.bind(this));
	};
	
	//-----------------------------------------------------
	// Convert escapes to braces - new method
	McKathlin.SwitchableText.convertEncodedBraces = function(text) {
		// Convert escaped curly braces.
		text = text.replace(/\x1bBO/gi, '{');
		text = text.replace(/\x1bBC/gi, '}');
		return text;
	};

	//=============================================================================
	// Hide empty choices
	//=============================================================================

	// If Tyruswoo_BigChoiceLists is present,
	// its implementation of setupChoices supercedes Switchable Text's.
	if (!Imported.Tyruswoo_BigChoiceLists) {
		// Alias method
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

		// New helper method
		// Removes all choices made empty by Switchable Text.
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
	}

	// New helper method
	// Check if empty after Switchable Text does its thing
	McKathlin.SwitchableText.isEmpty = function(text) {
		text = text.replace(/\\/g, '\x1b');
		text = text.replace(/\x1b\x1b/g, '\\');
		text = McKathlin.SwitchableText.convertSwitchableText(text);
		return 0 == text.trim().length;
	};

})();