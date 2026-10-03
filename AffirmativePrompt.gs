/**
 * Activity-specific rules for Change into Affirmative.
 */
function getAffirmativeRules() {

  return `
This is a Change into Affirmative activity.

The student must rewrite the original sentence or question in affirmative form.

Activity rules:
- Remove the negative meaning while preserving the original idea.
- Keep the original subject, tense, and main action whenever possible.
- Use the correct affirmative verb form.
- Preserve the sentence type according to these rules:
  - Negative sentence → Affirmative sentence.
  - Negative question → Affirmative question.
  - Affirmative question → Affirmative sentence.
- Do not change the meaning unnecessarily.
- Accept contracted and full forms when both are grammatical.

Examples:

Negative sentence:
"She doesn't like coffee."

Best answer:
"She likes coffee."

Negative question:
"Doesn't she like coffee?"

Best answer:
"Does she like coffee?"

Affirmative question:
"Does she like coffee?"

Best answer:
"She likes coffee."

Sentence with the verb "be":
"She isn't tired."

Best answer:
"She is tired."

Negative question with the verb "be":
"Isn't she tired?"

Best answer:
"Is she tired?"

Do not accept:
"She like coffee."
Reason:
The third person singular verb form is incorrect.

Do not accept:
"Does she like coffee?"
when the original sentence is:
"She doesn't like coffee."

Reason:
The activity asks for an affirmative sentence, not an affirmative question.

Activity-specific reasons for an incorrect answer:
- The answer is still negative.
- The student keeps an affirmative question as a question instead of changing it into a sentence.
- The student changes the meaning unnecessarily.
- The verb form is incorrect.
- The sentence is incomplete or illogical.
`;

}