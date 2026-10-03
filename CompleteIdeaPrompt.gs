/**
 * Activity-specific rules for Complete the Idea.
 */
function getCompleteIdeaRules(question) {

  return `
This is a Complete the Idea activity.

The prompt gives the beginning of a sentence. The student must continue it with their own complete, natural idea.

Required target words or phrases:
${formatTargetWordsForPrompt(question.targetWords)}

Activity rules:
- The student must preserve the sentence beginning provided in the prompt.
- The student must add enough information to create one complete sentence.
- The completed sentence must be grammatical, logical, and natural.
- Accept many different correct answers.
- Do not require one exact completion.
- Personal answers are acceptable when they fit the sentence beginning.
- The student may add any suitable vocabulary unless Target Words are provided.
- If Target Words are provided, every listed target word or phrase must be included naturally.
- The final answer must not contradict the sentence beginning.
- The student should not unnecessarily rewrite or remove the beginning of the sentence.
- Minor natural adjustments are acceptable when needed for capitalization, punctuation, pronouns, or grammar.

Examples:

Prompt:
"On weekends, I usually..."

Possible correct answers:
"On weekends, I usually stay home."
"On weekends, I usually go out with my friends."
"On weekends, I usually watch movies with my family."

Prompt:
"My mother likes to..."

Possible correct answers:
"My mother likes to cook."
"My mother likes to read before bed."

Prompt:
"When I am tired, I..."

Possible correct answers:
"When I am tired, I go to bed early."
"When I am tired, I drink coffee."

Do not accept:
"On weekends, I usually."

Reason:
The sentence is incomplete.

Do not accept:
"I like pizza."

for the prompt:
"On weekends, I usually..."

Reason:
The student did not preserve and complete the sentence beginning.

Do not accept:
"On weekends, I usually because I am tired."

Reason:
The completed sentence is not grammatical or complete.

Target Words:
- If no Target Words are provided, grade the answer based on task completion, grammar, logic, and naturalness.
- If Target Words are provided, all of them must appear naturally in the completed sentence.
- If one required Target Word is missing but the sentence is otherwise correct, the highest possible score is 0.5.
- If several required Target Words are missing or the student ignores the sentence beginning, score 0.

Activity-specific reasons for an incorrect answer:
- The sentence beginning is not preserved.
- The response does not complete the idea.
- The final sentence is incomplete.
- The completion is ungrammatical or illogical.
- The answer does not connect naturally to the prompt.
- One or more required Target Words are missing.
`;

}