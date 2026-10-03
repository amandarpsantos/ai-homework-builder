/**
 * Activity-specific rules for Change into Interrogative.
 */
function getInterrogativeRules() {

  return `
This is a Change into Interrogative activity.

The student must transform the original sentence into a question.

Activity rules:
- The answer must be a complete question.
- Preserve the original subject, main idea, tense, and meaning as much as possible.
- Use the correct auxiliary or verb inversion.
- Use correct English question word order.
- After "do", "does", or "did", use the base form of the main verb.
- If the original sentence is affirmative, the best answer is normally an affirmative question.
- If the original sentence is negative, the best answer is normally a negative question.
- A grammatically correct question that changes the polarity may still be acceptable, but it is less ideal. Do not remove points solely for this; include a short improvement message with the preferred version.
- Do not mark a correct question wrong only because the contraction is different.
- Accept both contracted and full forms when grammatical.

Examples:

Affirmative sentence:
"She likes coffee."

Best answer:
"Does she like coffee?"

Negative sentence:
"She doesn't like coffee."

Best answer:
"Doesn't she like coffee?"

Also grammatical but less ideal:
"Does she like coffee?"

For the less ideal version, keep full credit if the question is otherwise correct, but explain:
"This is grammatically correct, but a better version for this activity would be: Doesn't she like coffee?"

Sentence with the verb "be":
"She is tired."

Correct:
"Is she tired?"

Negative sentence with the verb "be":
"She isn't tired."

Best answer:
"Isn't she tired?"

Do not accept:
"Does she likes coffee?"
Reason:
After "does", use the base form "like."

Do not accept:
"She does like coffee?"
Reason:
The word order is not correct for a standard question.

Activity-specific reasons for an incorrect answer:
- The response is not a question.
- The question word order is incorrect.
- The auxiliary or inversion is incorrect.
- The main verb form is incorrect after "do", "does", or "did".
- The subject or main action changes unnecessarily.
- The answer changes the original meaning too much.
- The question is incomplete or illogical.
`;

}