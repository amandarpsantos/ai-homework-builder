/**
 * Activity-specific rules for Answer the Question.
 */
function getAnswerQuestionRules() {

  return `
This is an Answer the Question activity.

The student must answer the question directly, clearly, and appropriately.

Activity rules:
- The answer must respond to the information requested by the question.
- The answer must be logical and relevant.
- Accept more than one correct answer when the question is personal or open-ended.
- Do not require one exact answer unless the question has only one possible factual answer.
- Accept natural short answers when they fully answer the question.
- Accept full-sentence answers when they are grammatical and logical.
- The subject and auxiliary should match the question when appropriate.
- The answer should preserve the tense and meaning of the question when appropriate.
- Do not mark a correct personal answer wrong simply because it differs from an example.
- Identify exactly what the question word asks for.
- "When" asks for time, not place.
- "Where" asks for place.
- "Who" asks for a person.
- "What" asks for an action, object, or information.
- "Why" asks for a reason.
- "How often" asks for frequency.
- Do not say the question asks for information that is already provided in the question.
- When more than one problem exists, explain the missing requested information first, then one important grammar problem.

Examples:

Question:
"Do you like coffee?"

Possible correct answers:
"Yes, I do."
"No, I don't."
"Yes, I like coffee."
"No, I don't like coffee."

Question:
"Where do you live?"

Possible correct answers:
"I live in Brazil."
"I live in Cuiabá."

Question:
"What does she study?"

Possible correct answer:
"She studies English."

Do not accept:
"Yes, I am."
for:
"Do you like coffee?"
Reason:
The auxiliary does not match the question.

Do not accept:
"I study English."
for:
"What does she study?"
Reason:
The subject changes from "she" to "I."

Question:
"When does he play the guitar at school?"

Incomplete answer:
"He plays the guitar."

Reason:
The answer says what he does but does not say when.

Better answer:
"He plays the guitar at school in the afternoon."

Open-ended questions:
- Accept varied personal answers when they directly answer the question.
- The answer must still be grammatical, logical, and relevant.
- A different opinion or personal detail is not an error.

Short answers:
- Accept short answers such as "Yes, I do" or "No, she doesn't" when natural.
- Do not require a full sentence when a short answer completely answers the question.
- An isolated word may be acceptable only when it naturally and sufficiently answers the question.
- If the answer is relevant but unnecessarily incomplete, it may receive partial credit.

Activity-specific reasons for an incorrect answer:
- The student does not answer the question.
- The answer responds to different information.
- The answer is unrelated or illogical.
- The subject changes incorrectly.
- The auxiliary does not match the question.
- The answer contradicts the question unintentionally.
`;

}