/**
 * Activity-specific rules for Unscramble.
 */
function getUnscrambleRules(question) {

  return `
This is an Unscramble activity.

The student must rearrange all provided target words to form one correct English sentence or question.

Required words:
${formatTargetWordsForPrompt(question.targetWords)}

Activity rules:
- The student must use every listed target word.
- Each target word should normally appear once.
- The student should not omit any target word.
- The student should not add unnecessary words.
- The final answer must preserve the intended meaning.
- The final answer must be grammatical, logical, and natural.
- Accept more than one correct answer when different word orders are both natural and grammatically correct.
- Capitalization and punctuation may be adjusted naturally.
- Do not require the slash marks or the original order from the prompt.

Important:
- Target Words are the complete set of words that must be rearranged.
- Compare the student's answer with the Target Words before grading.
- Do not give full credit if a required word is missing.
- Do not give full credit if an important extra word is added.
- Do not silently ignore a missing word just because the final sentence is grammatical.
- Small changes to a word form are not normally allowed unless the prompt or activity explicitly requires a grammatical change.
- Contractions may replace their full forms only when they represent the same provided words and meaning.

If the target is a sentence:
- The student must produce a correct English statement.
- Check normal English word order.
- Check subject-verb agreement.

If the target is a question:
- The student must produce a correct English question.
- Check the auxiliary verb.
- Check subject-auxiliary inversion.
- Check the main verb form.
- Check question word order.

Examples:

Prompt:
"she / likes / pizza"

Target words:
1. she
2. likes
3. pizza

Correct:
"She likes pizza."

Prompt:
"do / where / live / you"

Target words:
1. do
2. where
3. live
4. you

Correct:
"Where do you live?"

Do not accept:
"Where you do live?"

Reason:
All words are present, but the question word order is incorrect.

Do not accept:
"She likes."

Reason:
The required word "pizza" is missing.

Do not accept:
"She really likes pizza."

Reason:
The word "really" was added unnecessarily.

Do not accept:
"She like pizza."

Reason:
The provided word "likes" was changed, and the final sentence is grammatically incorrect.

Partial completion:
- If exactly one required word is missing but the answer is otherwise grammatical and clearly follows the task, the highest possible score is 0.5.
- If multiple required words are missing, score 0.
- If all required words are present but the word order contains one small, understandable problem, score 0.5.
- If the word order prevents the sentence or question from being understood, score 0.
- If an unnecessary added word does not significantly change the meaning, partial credit may be appropriate.
- If an added word changes the meaning or structure significantly, score 0.

Activity-specific reasons for an incorrect answer:
- One or more required target words are missing.
- Extra words change the sentence unnecessarily.
- A provided word is changed when the activity does not allow it.
- The word order is incorrect.
- The answer changes the intended sentence type.
- The original meaning is not preserved.
- The sentence or question is incomplete, ungrammatical, or illogical.
`;

}