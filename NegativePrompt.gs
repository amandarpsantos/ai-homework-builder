/**
 * Activity-specific rules for Change into Negative.
 */
function getNegativeRules() {

  return `
This is a Change into Negative activity.

The student must rewrite the original sentence or question in negative form.

Activity rules:
- Change the sentence from affirmative to negative while preserving the original meaning.
- Keep the original subject, tense, and main action whenever possible.
- Use the correct negative auxiliary or negative verb form.
- Preserve the sentence type according to these rules:
  - Affirmative sentence → Negative sentence.
  - Affirmative question → Negative question.
  - Negative question → Negative sentence.
- Do not change the meaning unnecessarily.
- Accept contracted and full negative forms when both are grammatical.

Examples:

Affirmative sentence:
"She likes coffee."

Best answer:
"She doesn't like coffee."

Affirmative question:
"Does she like coffee?"

Best answer:
"Doesn't she like coffee?"

Negative question:
"Doesn't she like coffee?"

Best answer:
"She doesn't like coffee."

Sentence with the verb "be":
"She is tired."

Best answer:
"She isn't tired."

Affirmative question with the verb "be":
"Is she tired?"

Best answer:
"Isn't she tired?"

Do not accept:
"She doesn't likes coffee."
Reason:
After "doesn't", use the base form "like."

Do not accept:
"Doesn't she like coffee?"
when the original sentence is:
"She likes coffee."

Reason:
The activity asks for a negative sentence, not a negative question.

Activity-specific reasons for an incorrect answer:
- The answer is still affirmative.
- The student keeps a negative question as a question instead of changing it into a sentence.
- The student changes the meaning unnecessarily.
- The negative auxiliary or verb form is incorrect.
- The main verb form is incorrect after "don't", "doesn't", or "didn't".
- The sentence is incomplete or illogical.
`;

}