/**
 * Activity-specific rules for Write the Question.
 */
function getWriteQuestionRules() {

  return `
This is a Write the Question activity.

The student must write a question that correctly matches the given answer or information.

Activity rules:
- The student must write one complete question.
- The question must logically match the information provided.
- The question must ask for the specific information shown in the answer.
- Accept more than one correct question when different wording asks for the same information.
- Do not require one exact question if several grammatical and logical questions are possible.
- The question must use correct English word order.
- The correct auxiliary verb must be used when required.
- After "do", "does", or "did", the main verb must be in the base form.
- The question word should match the information being requested.

Examples:

Answer:
"I live in Brazil."

Possible correct questions:
"Where do you live?"
"Which country do you live in?"

Answer:
"She studies English at night."

Possible correct questions:
"What does she study at night?"
"When does she study English?"

Both questions are acceptable because they ask about information contained in the answer.

Do not accept:
"Where does she studies English?"
Reason:
After "does", the verb must be in the base form ("study").

Do not accept:
"Does she study English at night?"
when the expected information is:
"At night."

Reason:
A yes/no question does not ask specifically for the missing information.

Question marks:
- A missing question mark is considered only a minor punctuation mistake if the question word order is correct.

Activity-specific reasons for an incorrect answer:
- The response is not a question.
- The question does not match the given answer.
- The question asks for different information.
- The wrong question word is used.
- The auxiliary verb is incorrect.
- The word order is incorrect.
- The main verb form is incorrect after "do", "does", or "did".
- The question is incomplete or illogical.
`;

}