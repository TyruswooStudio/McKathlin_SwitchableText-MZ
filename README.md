## WARNING: This is an older version!
It lacks the features and improvements of this plugin's later versions.
To get the latest version for free, visit
[Tyruswoo.com](https://www.tyruswoo.com).

# McKathlin Switchable Text v1.3.1 for RPG Maker MZ

Allows a text snippet to vary based on a switch, variable, or party attribute!

Perfect for making your game’s dialogue respond intelligently to the player’s decisions!

## Compatibility

This plugin is fully compatible with Tyruswoo_BigChoiceLists
in any order on the plugin list.

However, Switchable Text may conflict with
non-Tyruswoo plugins that alter the way `Game_Interpreter` makes choice lists.
If you encounter conflicts, try switching which choice-list-affecting plugin
comes after which. If conflicts with Switchable Text persist, talk to us on
[Tyruswoo.com](https://www.tyruswoo.com) and we'll do our best to help you.

## Switchable Snippets

Switchable Text enables text codes for use in messages or dialogue choices.
Text is inserted in place at runtime based on state of the referenced
switch or variable.

To start a switch-based snippet, use one of the following text codes:

| Text Code Format      | Description                                           |
|-----------------------|-------------------------------------------------------|
| `\ON[ID]{text}`       | Show the contained text if the switch is ON  (true).  |
| `\OFF[ID]{text}`      | Show the contained text if the switch is OFF (false). |
| `\ON[ID]{foo}{bar}`   | Show "foo" if switch is on; otherwise show "bar".     |
| `\OFF[ID]{blue}{red}` | Show "blue" if switch is off; otherwise show "red".   |

An integer ID will check the corresponding game-wide switch.
If the ID is the letter A, B, C, or D, then the calling event's self switch
is checked.

Start a variable-based snippet with a statement like this:

| Text Code Format        | Description                                           |
|-------------------------|-------------------------------------------------------|
| `\OV[vID>=N]{text}`     | Show the text if the variable with the given ID has a value greater than or equal to N. |
| `\OV[vID==N]{foo}{bar}` | Show "foo" if the variable's value is equal to N. Otherwise, show "bar". |
| `\OV[vJ < vK]{blah}`    | Show "blah" if variable J's value is less than variable K's value. |

The following comparison operators are valid for variable-based snippets:
```
  ==   Equal               !=   Not equal
  >=   Greater or equal     >   Greater than
  <=   Less or equal        <   Less than
```

## Party Attributes

Some statements allow for text snippets based on party attributes.
* `\OPS` stands for On Party Size.

Examples:
| Text Code Example        | Description                                             |
|--------------------------|---------------------------------------------------------|
| \OPS[1]{hero}{heroes}    | Show "hero" if party size is 1, otherwise show "heroes" |
| \OPS[>2]{buddies}{buddy} | Text conditioned on more than 2 people in party.        |

* `\OPL` stands for On Party Leader, and can check various actor attributes.
* `\OPM` stands for On Party Member, and is true if any member matches.

When checking an attribute, use a comparison operator and numeric ID.
Here is a full list of attributes that can be checked:

| Attribute    |  Ways to write |
|--------------|----------------|
| Actor ID     |  actor, a      |
| Class ID     |  class, c      |
| State ID     |  state, s      |

Examples:
* `Hey \OPL[a=5]{old man}{kid}.`
* `Put your \OPL[class<=2]{might}{skill} to the test!`
* `A good meal restores health.\OPM[s=1]{ But it can't revive the dead.}`

Switchable Text snippets can be nested inside each other.

## Switchable Text in Choice Lists

If a dialogue choice ends up empty for a given Switchable state, it will
not appear in the player's list of dialogue choices. This allows available
choices to vary dynamically based on game state.

## Escaping Curly Braces

Due to Switchable Text's use of curly braces as delimiters, any text in
which switchable snippets and literal curly braces both occur will need
to escape the literal curly braces with these codes:

| Text Code | Stands For      |
|-----------|-----------------|
| `\BO`     | Opening brace { |
| `\BC`     | Closing brace } |

## More Text Codes

This plugin offers the following additional text codes:
| Text Code            | Description                           |
|----------------------|---------------------------------------|
| `\PartySize`         | Replaced with number of party members |
| `\NumWord[expr]`     | Replaces expr with the word version of the number: e.g. one, two, three... Numbers greater than 10 are left as numerals. |
| `\Ordinal[expr]`     | Makes the ordinal version of a numeric expression: e.g. 1st, 2nd, 3rd... |
| `\OrdinalWord[expr]` | Makes the spelled-out ordinal, e.g. first, second, ... Numbers greater than 10 are numerals with a suffix. |

`\NumWord[expr]`, `\Ordinal[expr]`, and `\OrdinalWord[expr]` can enclose `\V[n]`,
`\PartySize`, and anything else that resolves to a number.

If you plan to use these features on text codes from other plugins,
put McKathlin_SwitchableText **under** these plugins.

Examples:
* `You have squished \NumWord[\V[22]] bugs.`
* `A \NumWord[\PartySize]-person party like yours is in for a challenge.`
* `\Ordinal[\V[75]] Place`
* `You're our \OrdinalWord[\V[158]] visitor!`
* `This might be difficult for \an \OrdinalWord[\P[1.level]] level group.`

## More Examples

```
Good \ON[21]{evening}{day}, \OFF[A]{stranger}{friend}.
Go safely. \OV[v143<=10]{Watch out for wolves.}
```

```
Excuse me for a moment.
My \OPS[s>1]{\ON[41]{enemies}{friends} have}{\ON[41]{enemy}{friend} has}
arrived.
```

`We have\OV[v22!=v23]{n't} squished the same number of bugs.`

`Come in\OPS[>1]{, \OPS[2]{both of you}{all \NumWord[\PartySize] of you}}!`

### For more help using the Switchable Text plugin, see [Tyruswoo.com](https://www.tyruswoo.com).

## Version History

**v1.0** - 9/3/2020
- Switchable Text plugin released for RPG Maker MZ!

**v1.1** - 9/13/2020
- Added nested text snippets! Now, you can use switchable text
  snippets nested within each other!
- Added variable-to-variable comparison. You can now check one
  variable's value against the value of another variable.

**v1.2** - 9/15/2020
- Added \OPS, which switches text based on party size.
- Added \OPL, which switches text based on party leader attributes.
- Added \OPM, which switches text based on any party member.
- Added \PartySize, a text code for number of people in party.
- Added \NumWord, \Ordinal, and \OrdinalWord, which change how
  numbers are written out.

**v1.3** - 7/29/2022
- Made fully compatible with Tyruswoo_BigChoiceLists.js

**v1.3.1** - 8/31/2023
- This plugin is now free and open source under the [MIT license](https://opensource.org/license/mit/).

> Happy storytelling!
> 
> -McKathlin
