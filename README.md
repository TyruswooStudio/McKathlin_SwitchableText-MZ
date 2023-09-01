## WARNING: This is an older version!
It lacks the features and improvements of this plugin's later versions.
To get the latest version for free, visit
[Tyruswoo.com](https://www.tyruswoo.com).

# McKathlin Switchable Text v1.1.1 for RPG Maker MZ

Allows a text snippet to vary based on a switch, variable, or party attribute!

Perfect for making your game’s dialogue respond intelligently to the player’s decisions!

## Compatibility

Switchable Text may conflict with other plugins that alter the way
`Game_Interpreter` makes choice lists.
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

## Examples

```
Good \ON[21]{evening}{day}, \OFF[A]{stranger}{friend}.
Go safely. \OV[v143<=10]{Watch out for wolves.}
```

```
Excuse me for a moment.
My \OV[v2>1]{\ON[41]{enemies}{friends} have}{\ON[41]{enemy}{friend} has}
arrived.
```

`We have\OV[v22!=v23]{n't} squished the same number of bugs.`

### For more help using the Switchable Text plugin, see [Tyruswoo.com](https://www.tyruswoo.com).

## Version History

**v1.0** - 9/3/2020
- Switchable Text plugin released for RPG Maker MZ!

**v1.1** - 9/13/2020
- Added nested text snippets! Now, you can use switchable text
  snippets nested within each other!
- Added variable-to-variable comparison. You can now check one
  variable's value against the value of another variable.

**v1.1.1** - 9/1/2023
- This older plugin version is now free and open source under the [MIT license](https://opensource.org/license/mit/).

> Happy storytelling!
> 
> -McKathlin
