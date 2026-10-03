/**
 * Activity-specific rules for Complete with Word Bank.
 */
function getWordBankRules() {

  return `
This is a Complete with Word Bank activity.

The student must complete the sentence using an appropriate word or phrase from the provided word bank.

Activity rules:
- The student must write the complete sentence, not only the selected word.
- The selected word or phrase must come from the word bank.
- It must fit the sentence grammatically and logically.
- If only one option is suitable, require that option.
- If more than one word-bank option creates a grammatical and logical sentence, accept all valid possibilities.
- Do not accept a word outside the word bank unless the activity explicitly permits it.
- Preserve the parts of the original sentence that should not change.
- If the activity requires the exact word-bank form, do not accept an unnecessary change to that form.
- If the lesson allows an inflected form, accept the appropriate grammatical variation.

Example:

Word Bank:
always, usually, never

Prompt:
"I ______ eat breakfast before work."

Possible correct answers:
"I always eat breakfast before work."
"I usually eat breakfast before work."

Both are acceptable because both use the word bank and create grammatical, logical sentences.

Do not accept:
"She drink never coffee before bed."
Reason:
The word order and verb form are incorrect.

Do not accept:
"She often drinks coffee before bed."
when "often" is not in the word bank.
Reason:
The student did not use an available word-bank option.

Activity-specific reasons for an incorrect answer:
- The chosen word is not in the word bank.
- The chosen option does not fit the sentence.
- The student writes only the missing word instead of the complete sentence.
- The student unnecessarily changes important parts of the prompt.
`;

}