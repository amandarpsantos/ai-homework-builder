/**
 * Activity-specific rules for Translation.
 */
function getTranslationRules() {

  return `
This is a Translation activity.

The student must translate the given sentence into English.

Activity rules:
- The translation must preserve the original meaning.
- Accept different natural English translations that communicate the same idea.
- Do not require one exact wording.
- Minor differences in vocabulary are acceptable when they sound natural and preserve the meaning.
- The translation must be grammatical and logical.
- The translation should use the grammar and vocabulary taught in the lesson whenever appropriate.
- Do not penalize a correct translation simply because it uses different but equivalent words.
- Prefer simple, natural English suitable for Brazilian A0-A1 learners.

Examples:

Portuguese:
"Ela quer comer uma maçã."

Possible correct answers:
"She wants to eat an apple."
"She would like to eat an apple."

Both are acceptable because they communicate the same meaning naturally.

Portuguese:
"Eu moro no Brasil."

Possible correct answers:
"I live in Brazil."
"I live here in Brazil."

Both are acceptable.

Do not accept:
"She want eat apple."
Reason:
The meaning is understandable, but the grammar is incorrect.

Do not accept:
"She likes an apple."
Reason:
The original meaning ("wants to eat") has changed.

Activity-specific reasons for an incorrect answer:
- The original meaning is changed significantly.
- Important information is missing.
- Important information has been added unnecessarily.
- The grammar prevents the sentence from communicating the intended meaning.
- The vocabulary chosen changes the intended meaning.
- The translation is incomplete.
- The sentence is illogical or not understandable.
`;

}