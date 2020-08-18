const print = require('../print')
// \Q supresses the meaning of metacharacters until \E
const supressedRegex = RegExp('\\Q!"#$%&\\E')
print(supressedRegex)

// For insensitive case use i flag
const insensitiveRegex = RegExp('Hello', 'i')
print(insensitiveRegex.exec('hello'))

// To get some ASCII characters without mess use \c
const controlCRegex = RegExp('\\cC')
print(controlCRegex)

// To match one of many characters or a set tos say properly use [] meta chars
const numberSetRegex = RegExp('[123][456][789]')
print(numberSetRegex.exec('142'))
// But how can we obtain an array square
// I know that is not cool but anyways
const arrayRegex = RegExp('[\\]\\[]')
print(`Is array: ${arrayRegex.test('[1, 2, 3]')}`)
// Every other character except [, ], ^, - adds itself to the set
const questionRegex = RegExp('[?]')
print(`Is question: ${questionRegex.test('How are you?')}`)
// ^(caret) negates the set
const notQuestionAndArrayRegex = RegExp('[^\\[?]')
print(notQuestionAndArrayRegex.exec('I come home.'))
// Trap: ^ matches with linebreaks
// Hyphen creates a range
// Always from lower char to upper
const digitRegex = RegExp('[0-9]')
print(`Does contain digits? ${digitRegex.test('I am 17.')}`)
// There are six shorthand character classes (Three upper three lower)
// Lower ones are the complements of upper ones
// \d: digit => [0-9], \D: non-digit => [^0-9]
// Quest: A regex for hexadecimal digit
const hexadecimalRegex = RegExp('[a-fA-F\\d]')
print(`Is a82D a hexadecimal? ${hexadecimalRegex.test('a82D')}`)
// \w: word => [a-zA-Z0-9_], \W: non-word => [^\w]
// \s: whitespace => [ \t\n], \S: non-whitespace => [^\s]
const notWordRegex = RegExp('\\s')
print(`Is 'jump over me' a word? ${!notWordRegex.test('jump over me')}`)
// Match any character except \n(line break)
const allRegexExceptNewLine = RegExp('.')
print(`Is this a line break? ${!allRegexExceptNewLine.test('\n')}`)
// All matcher
const allRegex = RegExp('[\\s\\S]')
// ^ and $ are called anchors. They do not match any characters.
// Instead the match position
const oneLowercaseLetterRegex = RegExp('^[a-z]$')
print(`Is this a single word? ${oneLowercaseLetterRegex.test('e')}`)
// \b is called word boundry, \B is non-word boundry
// Let's assume we are searching for a part of a word inside a word
const atSearchRegex = RegExp('\\Bat\\B')
print(`Does this contain 'at'? ${atSearchRegex.test('battle')}`)
// Check if a word starts or ends with a given word
// | called an alternator it works as an or operator
const wordBeginEndRegex = RegExp('\\Bex|ex\\B')
print(`Does these words begins or ends with ex? ${wordBeginEndRegex.test('regex') && wordBeginEndRegex.test('exclude')}`)
// Grouping operator () takes a smaller unit of matched string
const wordNumberRegex = RegExp('\\b(\\d+)\\w+\\b')
print(wordNumberRegex.exec('254vcd')[1])
// Non capturing group (?:) exactly same as () but returns no groups
// Case insensitive group (?i:)
// \n is for to match previous nth group
const sameDateRegex = RegExp('\\b\\d\\d(\\d\\d)-\\1-\\1\\b')
print(`Is the same recursive address? ${sameDateRegex.test('2010-10-10')}`)
// Repetition of a set or character
// {a,b} from a to b, b included (When b it is not given b becomes Inf nearly, when a is not given it is 0)
// ? => {0,1}
// * => {0,Inf}
// + => {1,Inf}
const maxFourLettersWord = RegExp('\\b\\w{1,4}\\b')
print(`Is this a maximum four letters word? ${maxFourLettersWord.test('word')}`)
// * : greedy
// *? : lazy
const pTagGreedyRegex = RegExp('<p>.*</p>')
const pTagLazyRegex = RegExp('<p>.*?</p>')
const html = '<p>Hello</p><p>World!</p>'
print(html.match(pTagGreedyRegex))
print(html.match(pTagLazyRegex))
// ?<! : negative lookbehind
// ?! : negative lookahead
// Negative for not match
// ?= : positive lookahead
// ?<= : positive lookbehind
// Positive for match
const bTagTextRegex = RegExp('(?<=<b>)\\w+(?=</b>)')
print(bTagTextRegex.exec('<b>cat</b>'))
const cattyMatchRegex = RegExp('(?<=c)at(?=ty)')
print(cattyMatchRegex.exec('catty'))
const cattyNotMatchRegex = RegExp('(?<!c)at(?!ty)')
print(cattyNotMatchRegex.exec('satsy'))
// (?<=a)b(?=c) === inverse((?!a)b(?<!c))
const divTagContentExtractor = RegExp('(?<=<div>).*(?=</div>)')
print(divTagContentExtractor.exec('<div>Sassy content</div>'))