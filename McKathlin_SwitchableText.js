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
 * @plugindesc MZ v2.0.1 Let a text snippet vary based on a switch, variable,
 * or party attribute, all without a page break.
 * @author McKathlin
 * @url https://www.tyruswoo.com
 * 
 * @help McKathlin Switchable Text for RPG Maker MZ
 * ============================================================================
 * Compatibility
 * --------------
 * 
 * This plugin is fully compatible with Tyruswoo_BigChoiceLists
 * in any order on the plugin list. However, Switchable Text may conflict with
 * non-Tyruswoo plugins that alter the way Game_Interpreter makes choice lists.
 * If you encounter conflicts, try switching which choice-list-affecting plugin
 * comes after which. If conflicts with Switchable Text persist, talk to us on
 * Tyruswoo.com and we'll do our best to help you.
 * 
 * When Tyruswoo_EventAI is in the plugin list (either above or below),
 * Switchable Text can also check self variables using the \OV code, and extra
 * self switches using the \ON code. Special syntax even allows checking other
 * events' self variables and self switches. More details near the end of this
 * help text.
 * 
 * ============================================================================
 * Switchable Snippets
 * --------------------
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
 * ============================================================================
 * Escaping Curly Braces
 * ----------------------
 * 
 * Due to Switchable Text's use of curly braces as delimiters, any text in
 * which switchable snippets and literal curly braces both occur will need
 * to escape the literal curly braces thus:
 *   \BO   Opening brace {
 *   \BC   Closing brace }
 *
 * ============================================================================
 * Actor Attributes
 * -----------------
 * 
 * This plugin expands the syntax of the text codes \P[n] and \N[n]:
 * with the form \P[n.attribute] or \N[n.attribute], you can insert any of
 * a variety of Actor attributes.
 * 
 * Examples:
 *   If it isn't old \P[1.nickname]! Long time no see.
 *   I see you have a new \P[2.class] recruit.
 *   Any word from \N[5.nickname]?
 * 
 * Available attributes include class, name, nickname, level, and profile.
 * If some other attribute name is given, Switchable Text will search the
 * notetags for its value. Make up any notetags you like!
 * 
 * Imagine, for the notetag-using examples below, that each party member
 * has a few tags in the Note field of their Actors database entry:
 * a polite address notetag <polite: sir> or <polite: ma'am>, as well as a
 * derogatory notetag <derog: nerd>, <derog: old geezer>, or <derog: brat>...
 * you get the idea.
 *
 *   Good \ON[10]{evening}{day}, \P[1.polite].
 * 
 *   Get lost, \P[1.derog].
 *   \OPS[>=2]{I don't want to see you or that \P[2.derog] again.}
 * 
 * ============================================================================
 * More Text Codes
 * ----------------
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
 * 
 * Examples:
 *   You have squished \NumWord[\V[22]] bugs.
 *   A \NumWord[\PartySize]-person party like yours is in for a challenge.
 *   \Ordinal[\V[75]] Place
 *   You're our \OrdinalWord[\V[158]] visitor!
 *   This might be difficult for \an \OrdinalWord[\P[1.level]] level group.
 * 
 * ============================================================================
 * Grammar Helper Codes
 * ---------------------
 *
 * The following postprocessing text codes resolve after other text codes,
 * to address grammatical issues that commonly occur in variable text.
 *   \UP{some text}     This changes all text inside the braces to all caps.
 *   \UP                Without braces, it makes only one letter uppercase.
 *   \LOW{some text}    This makes the contained text all-lowercase.
 *   \LOW               Without braces, it makes only one letter lowercase.
 *   \an                This will insert "a" or "an" depending on whether the
 *                      immediately after it starts with a vowel sound.
 *   \An                Inserts "A" or "An" with a capital A.
 * 
 * ============================================================================
 * More Examples
 * --------------
 * \UP\NumWord[\V[38]] soldier\OV[v38>1]{s} left town this morning.
 * 
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
 * \An \LOW{\N[3.class]} passed through here \NumWord[\V[14]]
 * day\OV[14>1]{s} ago.
 * 
 * ============================================================================
 * Checking Self Switches and Self Variables with Tyruswoo Event AI
 * -----------------------------------------------------------------
 * Snippets like those below REQUIRE Tyruswoo_EventAI in the plugin list.
 * 
 * The text below checks Self Switch B of Event #28 in Map #12,
 * and changes the text accordingly:
 * 
 *   I saw a blue \ON[B m12 e28]{butterfly}{caterpillar} on the way.
 *
 * Here's the equivalent, but referencing map and event by name.
 * 
 *   I saw a blue \ON[B m(West Glade) e(Little Blue)]{butterfly}{caterpillar}
 *   on the way.
 *
 * Self variables and extra self switches can also be accessed this way.
 * If no map is specified, Switchable Text references the current map.
 * If neither map nor event are specified, Switchable Text checks the event
 * that is currently linked, or if none is linked, the event that is currently
 * running.
 * Here's an example of checking Alice's self variable.
 * Alice is across the room on the same map as the speaker.
 * 
 *   Alice \OV[7 e(Alice) > 5]{likes}{hardly knows} you.
 * 
 * Self variable reference syntax also works inside the \V[n] text code.
 * For example, the sentence below checks Charlie's value of a self variable.
 * The self variable was made from Variable 50, which is named "s:Days Worked".
 * 
 *   Charlie has worked here for \V[50 e(Charlie)] days.
 *
 * Here's an example of checking one's own self variable, vs. checking someone
 * else's.
 * 
 *   I've earned \V[45] tokens so far. Dad has \V[45 e(Dad)].
 *
 * ----------------
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
 * v2.0  8/8/2022
 *        - Can coordinate with Tyruswoo_EventAI to check a self switch or
 *          self variable of any other event anywhere.
 *        - \P[n.attribute] or \N[n.attribute] can insert an actor's class,
 *          nickname, level, or any notetag value.
 *        - New text processing utility codes \an, \UP, and \LOW.
 *        - Bugfix: In previous versions, a Name Box Window whose switchable
 *          text resolved to empty would still show up on screen. Now, an empty
 *          name box window always hides.
 * 
 * v2.0.1  8/30/2023
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
 * Happy storytelling!
 * -McKathlin
 */

(() => {

	const pluginName = "McKathlin_SwitchableText";
 
	//=============================================================================
	// Switchable condition evaluating helper methods
	//=============================================================================

	McKathlin.SwitchableText.INTEGER_REGEX = /^-?\d+$/;
	McKathlin.SwitchableText.SELF_REF_REGEX =
		/^([ABCD]|\d+) ?(?:m(\d+|\([^\)]+\)))? ?(?:e(\d+|\([^\)]+\)))$/i

	McKathlin.SwitchableText.checkComparison = function(left, operator, right) {
		switch (operator) {
			case '=':
			case '==':
			case '===':
				return left == right;
			case '>=':
				return left >= right;
			case '<=':
				return left <= right;
			case '>':
				return left > right;
			case '<':
				return left < right;
			case '!=':
			case '<>':
				return left != right;
			default:
				throw new Error("Unsupported operator: " + operator);
		} // end switch statement
	};
	
	McKathlin.SwitchableText.evalVariableCondition = function(conditionString) {
		var captures = conditionString.match(
			/^([^<>=]*[0-9\)]) ?(={1,3}|>=|<=|>|<|!=|<>) ?([0-9v\-][^<>=]*)$/i);
		
		var leftStr = captures[1];
		var operator = captures[2];
		var rightStr = captures[3];

		if (McKathlin.SwitchableText.INTEGER_REGEX.test(leftStr)) {
			// The left expression is written as an integer.
			if (McKathlin.SwitchableText.INTEGER_REGEX.test(rightStr)) {
				// It doesn't make sense to check constant vs. constant,
				// so interpret the value on the left as a variable.
				// Put a v at the beginning so it'll be treated as one.
				leftStr = "v" + leftStr;
			}
		}

		leftValue = this.evalVariableValue(leftStr);
		rightValue = this.evalVariableValue(rightStr);
		return this.checkComparison(leftValue, operator, rightValue);
	};

	McKathlin.SwitchableText.evalSwitchCondition = function(switchIdString) {
		// Use only the part after the leading s or ss, if any.
		var switchIdString = switchIdString.match(
			/^s{0,2}(.*)$/i)[1]; // Strip s or ss from beginning, if any
		if (/^[ABCD]/i.test(switchIdString)) {
			return this.evalSelfSwitchValue(switchIdString);
		}
		else if (/^\d+/.test(switchIdString)) {
			return this.evalSwitchValue(switchIdString);
		} else {
			throw new Error("Invalid switch ID: " + switchIdString);
		}
	};

	// Hidden feature used by games that have a "core" party
	// distinct from "guest" party members.
	McKathlin.SwitchableText.evalCorePartySizeCondition = function(conditionString) {
		return this.evalPartySizeCondition(conditionString);
	};
	
	McKathlin.SwitchableText.evalPartySizeCondition = function(conditionString) {
		// The stand-in variable name for party size can be "size", any single letter, or nothing.
		// The comparison operator is optional, too. If none, treat as an equals-check.
		// All that's strictly necessary is the number to compare to.
		const captures = conditionString.match(/^(?:(?:size|[a-z])? ?(={1,3}|>=|<=|>|<|!=|<>))? ?(\d+)$/i);
		const operator = captures[1] || "==";
		const expectedSize = Number.parseInt(captures[2]);
		return this.checkComparison($gameParty.size(), operator, expectedSize);
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
		const operator = captures[2];
		const compare = McKathlin.SwitchableText.checkComparison;
		const expectedValue = Number.parseInt(captures[3]);
		
		if (typeString.startsWith('a')) {
			// check actor
			for (const actor of actorList) {
				if (compare(actor.actorId(), operator, expectedValue)) {
					return true;
				}
			}
			return false; // No actor match found.
		} else if (typeString.startsWith('c')) {
			// check class
			for (const actor of actorList) {
				if (compare(actor.currentClass().id, operator, expectedValue)) {
					return true;
				}
			}
			return false; // No class match found.
		} else if (typeString.startsWith('s')) {
			// check states
			for (const actor of actorList) {
				for (const state of actor.states()) {
					if (compare(state.id, operator, expectedValue)) {
						return true;
					}
				}
			}
			return false; // No state match found.
		} else {
			throw new Error("Type '" + typeString + "' is not supported in Switchable Text.");
		}
	};

	// Resolve the variable of one side of a variable checking expression.
	McKathlin.SwitchableText.evalVariableValue = function(variableString) {
		if (McKathlin.SwitchableText.INTEGER_REGEX.test(variableString)) {
			// This is a constant.
			return Number(variableString);
		}

		// If we've gotten this far, we know it's not a constant,
		// so it must be a variable or self variable.
		if (variableString.startsWith("v") || variableString.startsWith("V")) {
			// Strip off leading v, then keep going.
			variableString = variableString.substring(1);
		}

		if (McKathlin.SwitchableText.INTEGER_REGEX.test(variableString)) {
			// This is a simple variable ID.
			return $gameVariables.value(Number(variableString));
		}

		// If we're still here, this is something more complicated.
		// Check if it's a reference to another event's self variable.
		const selfVar = this.parseSelfReference(variableString);
		if (selfVar) {
			if (Tyruswoo.EventAI.isValidSelfVariableId(selfVar.id)) {
				let key = [ selfVar.mapId, selfVar.eventId, selfVar.id ];
				return $gameSelfVariables.value(key);
			} else {
				console.warn("Variable " + selfVar.id + " was referenced " + 
					"as a self variable, but is not a self variable.");
				return $gameVariables.value(selfVar.id);
			}
		} else {
			throw new Error("Unrecognized variable expression: " +
				variableString);
		}
	};

	McKathlin.SwitchableText.evalSwitchValue = function(switchString) {
		if (McKathlin.SwitchableText.INTEGER_REGEX.test(switchString)) {
			// This is a simple switch ID.
			return $gameSwitches.value(Number.parseInt(switchString));
		}
		
		// If we're still here, this is something more complicated.
		// Check if it's a reference to another event's self switch.
		const selfRef = this.parseSelfReference(switchString);
		if (selfRef) {
			if (Tyruswoo.EventAI.isValidSelfSwitchId(selfRef.id)) {
				let key = [ selfRef.mapId, selfRef.eventId, selfRef.id ];
				return $gameSelfSwitches.value(key);
			} else {
				console.warn("Switch " + selfRef.id + " was referenced " + 
					"as a self switch, but is not a self switch.");
				return $gameSwitches.value(selfRef.id);
			}
		} else {
			throw new Error("Unrecognized switch ID: " +
				variableString);
		}
	};

	McKathlin.SwitchableText.evalSelfSwitchValue = function(switchString) {
		const switchChar = switchString[0];
		var mapId = $gameMap.mapId();
		var eventId = $gameMap.runningEventId();
		if (switchString.length > 1) {
			// This may reference a different map and event.
			const selfVar = this.parseSelfReference(switchString);
			mapId = selfVar.mapId;
			eventId = selfVar.eventId;
		}
		let key = [mapId, eventId, switchChar];
		return $gameSelfSwitches.value(key);
	};

	McKathlin.SwitchableText.parseSelfReference = function(refString) {
		const captures = refString.match(
			McKathlin.SwitchableText.SELF_REF_REGEX);
		if (!captures) {
			return null;
		} else if (!Imported.Tyruswoo_EventAI) {
			throw new Error("SwitchableText snippets that access other events " +
				"require the Tyruswoo_EventAI plugin.");
		}

		var selfRef = {};
		selfRef.id = captures[1];
		if (/^\d+$/.test(selfRef.id)) {
			selfRef.id = Number(selfRef.id);
		}

		const mapRef = captures[2];
		if (!mapRef) {
			selfRef.mapId = $gameMap.mapId();
		} else if (mapRef.startsWith("(")) {
			let mapName = mapRef.substring(1, mapRef.length - 1);
			selfRef.mapId = Tyruswoo.EventAI.getMapIdByName(mapName);
		} else {
			// Get map ID directly.
			selfRef.mapId = Number(mapRef);
		}

		const eventRef = captures[3];
		if (eventRef.startsWith("(")) {
			// Get event name from inside parentheses.
			let eventName = eventRef.substring(1, eventRef.length - 1);
			selfRef.eventId = Tyruswoo.EventAI.getEventIdByName(
				eventName, selfRef.mapId);
		} else {
			// Get event ID directly.
			selfRef.eventId = Number(eventRef);
		}
		return selfRef;
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
		text = McKathlin.SwitchableText.convertExternalSelfVariables(text);
		text = McKathlin.SwitchableText.convertActorAttributeCodes(text);
		text = McKathlin.SwitchableText.convertPartySizeCode(text);
		text = McKathlin.SwitchableText.convertSwitchableText(text);
		text = McKathlin.SwitchableText.convertOrdinalCodes(text);
		text = McKathlin.SwitchableText.convertNumberWordCode(text);
		text = McKathlin.SwitchableText.convertUppercaseCode(text);
		text = McKathlin.SwitchableText.convertLowercaseCode(text);
		text = McKathlin.SwitchableText.convertAnCode(text);
		text = McKathlin.SwitchableText.convertEncodedBraces(text);
		return text;
	};

	McKathlin.SwitchableText.convertExternalSelfVariables = function(text) {
		return text.replace(/\x1bV\[([^\]]+)\]/gi, (_, p1) => 
			this.evalVariableValue(p1));
	};

	// Convert Actor Attribute Codes - new method
	// \P[n.attribute] and \N[n.attribute]
	McKathlin.SwitchableText.convertActorAttributeCodes = function(text) {
		return text.replace(/\x1b(N|P)\[(\d+)[ .:]+(\w+)\]/gi, 
			function(match, code, index, attribute) {
				index = Number(index);

				// Find the actor.
				var actor;
				if (index <= 0) {
					actor = null;
				} else if ('P' == code.toUpperCase()) {
					actor = $gameParty.members()[index - 1];
				} else {
					actor = $gameActors.actor(index);
				}

				// If no actor here, don't show anything.
				if (!actor) {
					return "";
				}

				// Find this actor's attribute.
				switch (attribute) {
					case "class":
						return actor.currentClass().name;
					case "name":
						return actor.name();
					case "nickname":
						return actor.nickname();
					case "level":
						return actor.level;
					case "profile":
						return actor.profile();
					default:
						// Attempt to get a value from an arbitrary notetag.
						let value = actor.actor().meta[attribute];
						return value ? value.trim() : "";
				}
			}
		);
	};
	
	// Convert Party Size Code - new method
	McKathlin.SwitchableText.convertPartySizeCode = function(text) {
		return text.replace(/\x1bPartySize/gi, function() {
			return "" + $gameParty.size();
		}.bind(this));
	};
	
	// Convert Switchable Text - new method
	McKathlin.SwitchableText.convertSwitchableText = function(text) {
		// Convert switch-conditioned text.
		// If statements are nested, multiple passes will be necessary to replace all.
		// Innermost statements will be replaced first.
		var textIsChanging = true;
		while (textIsChanging) {
			var newText = text.replace(
				/\x1b(ON|OFF|OV|OPS|OPC|OPL|OPM)\[([^\]]+)\]\{([^\{\}]*)\}(?:\{([^\{\}]*)\}|([^\{])|$)/gi,
				function() {
					var textCode = arguments[1].toUpperCase();
					var conditionString = arguments[2];
					var ifText = arguments[3]; // Text to show if condition is true.
					var elseText = arguments[4] || ""; // Text to show if condition is false.
					var tail = arguments[5] || ""; // Captured for lookahead only. Put back.
					var conditionMet = false;

					switch (textCode) {
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
						case 'OPC':
							conditionMet = McKathlin.SwitchableText.evalCorePartySizeCondition(conditionString);
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
	
	// Convert Ordinal Codes - new method
	McKathlin.SwitchableText.convertOrdinalCodes = function(text) {
		return text.replace(/\x1bOrdinal(Word)?\[([^\]]+)\]/gi, function(text) {
			var spellOutWord = (arguments[1] != null);
			var numString = arguments[2].trim();
			
			if (spellOutWord) {
				switch (numString) {
					case '1': return 'first';
					case '2': return 'second';
					case '3': return 'third';
					case '4': return 'fourth';
					case '5': return 'fifth';
					case '6': return 'sixth';
					case '7': return 'seventh';
					case '8': return 'eighth';
					case '9': return 'ninth';
					case '10': return 'tenth';
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
			switch (numString) {
				case '1': return 'one';
				case '2': return 'two';
				case '3': return 'three';
				case '4': return 'four';
				case '5': return 'five';
				case '6': return 'six';
				case '7': return 'seven';
				case '8': return 'eight';
				case '9': return 'nine';
				case '10': return 'ten';
				default: return numString;
			}
		}.bind(this));
	};

	// Convert Uppercase Code - new method
	// \UP{text} makes all text inside the braces all-caps.
	// \UP makes the character immediately after it uppercase.
	McKathlin.SwitchableText.convertUppercaseCode = function(text) {
		return text.replace(/\x1bUP\{([^}]+)\}/gi, (_, p1) => p1.toUpperCase());
		return text.replace(/\x1bUP(.)/gi, (_, p1) => p1.toUpperCase());
	};

	// Convert Lowercase Code - new method
	// \LOW{text} makes all text inside the braces lowercase.
	// \LOW makes the character immediately after it lowercase.
	McKathlin.SwitchableText.convertLowercaseCode = function(text) {
		return text.replace(/\x1bLOW\{([^}]+)\}/gi, (_, p1) => p1.toLowerCase());
		return text.replace(/\x1bLOW(.)/gi, (_, p1) => p1.toLowerCase());
	};

	// Convert An Code - new method
	// Changes \an to "a" or "an", depending on the next word.
	McKathlin.SwitchableText.convertAnCode = function(text) {
		return text.replace(/\x1b(an) (\w+)/gi, (_, p1, p2) =>
			McKathlin.SwitchableText.startsWithVowelSound(p2) ?
				p1 + " " + p2 :
				p1.substring(0, 1) + " " + p2
		);
	};
	
	// Convert escapes to braces - new method
	McKathlin.SwitchableText.convertEncodedBraces = function(text) {
		// Convert escaped curly braces.
		text = text.replace(/\x1bBO/gi, '{');
		text = text.replace(/\x1bBC/gi, '}');
		return text;
	};

	//-----------------------------------------------------------------------------
	// Starts with Vowel Sound - helper method and constants

	McKathlin.SwitchableText.VOWELS = "aeiou";

	McKathlin.SwitchableText.VOWEL_START_NAMED_LETTERS = "aefhilmnorsx";

	// U words with these prefixes go "yoo".
	// This list isn't perfect, but it's close enough for our purposes.
	McKathlin.SwitchableText.YOO_SOUND_PREFIXES = [
		"unary", "uni",
		"ura", "ure", "uri", "uro",
		"usa", "use", "usi", "usu",
	];

	McKathlin.SwitchableText.SILENT_H_PREFIXES = [
		"heir", "honest", "honor", "hour"
	];

	McKathlin.SwitchableText.startsWithVowelSound = function(str) {
		if (!str) {
			console.warn("Can't check sound of null, empty, or undefined value.");
			return false;
		}
		str = str.trim();

		// Check numbers and other digit-led words.
		if (/^[0-9]/.test(str)) {
			let digits = str.match(/^[0-9]+/)[0];
			if (digits.startsWith("8")) {
				// "eight", "eighty", "eight hundred", "eight thousand", ...
				// always vowel sounding.
				return true;
			} else if (digits.startsWith("11") || digits.startsWith("18")) {
				// True if pronounced "eleven" or "eighteen".
				// e.g. eleven thousand passes; one hundred ten fails.
				return 2 == digits.length % 3;
			} else {
				// All other numbers start with a consonant sound.
				return false;
			}
		} // end of digit-led word check.

		// Check single letters and initialisms.
		if (1 == str.length || str[1] == str[1].toUpperCase()) {
			// These have their own rules,
			// as their pronunciation comes directly from their letters' names.
			// Examples: F, RSA, UN, YMCA
			return McKathlin.SwitchableText.VOWEL_START_NAMED_LETTERS.includes(word[0]);
		} // End of initialism check.

		// On to general cases. These are case-insensitive.
		const word = str.toLowerCase();
		if (word.startsWith("a") || word.startsWith("e") || word.startsWith("i")) {
			// These vowels have no exceptions.
			return true;
		} else if (word.startsWith("o")) {
			// O has only a few exceptions.
			return word != "one" && !word.startsWith("oui");
		} else if (word.startsWith("u")) {
			// U has some exceptions, including U itself, where it goes "yoo".
			// Also, the exceptions have exceptions!
			for (const yoo of McKathlin.SwitchableText.YOO_SOUND_PREFIXES) {
				if (word.startsWith(yoo)) {
					if (word.startsWith("unidentif")) {
						// Unidentified is an exception to the "uni" exception!
						return true;
					}
					// It goes "yoo".
					return false;
				}
			}
			// If we're here, it starts with a vowel-sounding U.
			return true;
		} else if (word.startsWith("y")) {
			// Y acts as a vowel if a consonant comes right after it,
			// or as a consonant if a vowel comes right after it.
			return !McKathlin.SwitchableText.VOWELS.includes(word[1]);
		} else if (word.startsWith("h")) {
			// H is sometimes silent, letting the vowel have the first sound.
			for (const silent of McKathlin.SwitchableText.SILENT_H_PREFIXES) {
				if (word.startsWith(silent)) {
					return true;
				}
			}
			// If we're here, it's a non-silent H.
			return false;
		} else {
			// It starts with a consonant.
			return false;
		}
	};

	//=============================================================================
	// Conditional name box hiding
	//=============================================================================

	// Alias method
	// This makes name box hide if its Switchable Text snippet resolves to empty.
	McKathlin.SwitchableText.Window_NameBox_windowWidth =
		Window_NameBox.prototype.windowWidth;
	Window_NameBox.prototype.windowWidth = function() {
		if (this._name && this.convertEscapeCharacters(this._name).trim()) {
			return McKathlin.SwitchableText.Window_NameBox_windowWidth.call(this);
		} else {
			return 0;
		}
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
