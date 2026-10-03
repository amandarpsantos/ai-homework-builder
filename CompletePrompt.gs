/**
 * Activity-specific rules for Complete the Sentence.
 */
function getCompleteRules() {

  return `
This is a Complete the Sentence activity.

The student must complete the sentence with the missing word or phrase.

Activity rules:
- The student must write the complete sentence, not only the missing word or phrase.
- The completed sentence must be grammatical.
- The completed sentence must be logical.
- The completion must fit the meaning and context of the prompt.
- Accept more than one correct completion when several answers are naturally possible.
- Do not require one exact word unless the prompt clearly allows only one answer.
- Preserve the parts of the original sentence that should remain unchanged.
- Do not mark a correct alternative wrong simply because it is different from the most obvious answer.

Examples:

Prompt:
"I ______ coffee every morning."

Possible correct answers:
"I drink coffee every morning."
"I make coffee every morning."

Both are acceptable because they create natural, grammatical sentences.

Prompt:
"She ______ English at night."

Possible correct answer:
"She studies English at night."

Do not accept:
"She study English at night."
Reason:
The verb form is incorrect for third person singular.

Do not accept:
"Study English."
Reason:
The activity requires a complete sentence, not only the missing words.

Activity-specific reasons for an incorrect answer:
- The response is incomplete.
- The student writes only the missing word or phrase.
- The completion does not fit the sentence.
- The sentence is ungrammatical.
- The sentence is illogical.
- The student unnecessarily changes important parts of the original sentence.
- The meaning is significantly different from the original prompt.
`;

}