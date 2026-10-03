/**
 * Activity-specific rules for Complete with the Verb.
 */
function getCompleteVerbRules() {

  return `
This is a Complete with the Verb activity.

The prompt provides a verb in parentheses. The student must use that specific verb in the correct grammatical form and write the complete sentence or question.

Activity rules:
- Use the verb provided in parentheses.
- Do not replace it with a different verb.
- Change the provided infinitive into the form required by the sentence.
- The answer must include the complete sentence or question.
- Preserve all other words from the prompt unless a small grammatical adjustment is required.
- Determine the correct form from the surrounding structure, tense, subject, auxiliary, and meaning.

Common patterns:
- "am / is / are" + verb-ing
- "was / were" + verb-ing
- "start" + verb-ing or infinitive when both are natural
- "finish" + verb-ing
- "do / does / did" + base verb
- Questions with "to be" require correct inversion
- Third person singular may require -s when no auxiliary is present

Examples:

Prompt:
"She is not ______ for her family now. (to cook)"

Correct:
"She is not cooking for her family now."

Prompt:
"Didn't my boss finish ______ his speech? (to write)"

Correct:
"Didn't my boss finish writing his speech?"

Prompt:
"______ the children playing in their bedroom? (to be)"

Correct:
"Are the children playing in their bedroom?"

Do not accept:
"She is not making food for her family now."

Reason:
The student must use the provided verb "to cook."

Do not accept:
"Didn't my boss finish to write his speech?"

Reason:
After "finish," use the gerund form "writing."

Activity-specific reasons for an incorrect answer:
- The provided verb is not used.
- The verb form is incorrect.
- The auxiliary and verb form do not agree.
- The subject-verb agreement is incorrect.
- The question word order is incorrect.
- The student writes only the missing verb instead of the complete sentence or question.
- Important parts of the original prompt are changed unnecessarily.
`;

}