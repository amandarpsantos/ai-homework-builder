/**
 * Activity-specific rules for Write a Sentence.
 */
function getSentenceRules(question) {

  return `
This is a Write a Sentence activity.

The student must write one complete, natural sentence using all required target words or phrases.

Required target words or phrases:
${formatTargetWordsForPrompt(question.targetWords)}

Activity rules:
- The student must use every listed target word or phrase.
- Each target word or phrase must be used naturally and correctly.
- The answer must be one complete sentence.
- The sentence must be grammatical and logical.
- Accept different correct sentences.
- Do not require one exact answer unless the prompt gives a very specific context.
- The student may add extra words when needed to create a natural sentence.
- The student may add articles, auxiliaries, pronouns, prepositions, and punctuation.
- The student may change word order naturally.
- The student may change the form of a verb when grammar requires it.
- The student may choose a different subject or tense when the prompt does not restrict them.
- Do not mark a correct sentence wrong simply because it differs from an example answer.

Important:
- Target words may be single words or multi-word phrases.
- A multi-word phrase should be treated as one target.
- Small grammatical adjustments are acceptable when necessary.
- Example: the target "to go to bed" may appear naturally as "go to bed," "goes to bed," or "went to bed," depending on the sentence.
- Do not require the infinitive marker "to" if the grammar of the final sentence requires another form.
- The sentence must still clearly include the meaning and structure of every target.

Examples:

Prompt:
"what time / to go to bed"

Target words:
1. what time
2. to go to bed

Possible correct answers:
"What time do you go to bed?"
"What time does your brother go to bed?"

Prompt:
"my friend / to have lunch"

Target words:
1. my friend
2. to have lunch

Possible correct answers:
"My friend has lunch at noon."
"My friend likes to have lunch at home."

Prompt:
"farm / city"

Target words:
1. farm
2. city

Possible correct answers:
"My grandparents have a farm near the city."
"The farm is far from the city."

Do not accept:
"I go to bed at ten."

Reason:
The required target "what time" is missing.

Do not accept:
"What time do you sleep?"

Reason:
The required expression "go to bed" is missing.

Do not accept:
"My friend is hungry."

Reason:
The required idea "have lunch" is missing.

Partial completion:
- If one required target is missing but the sentence is otherwise grammatical and logical, the highest possible score is 0.5.
- If several required targets are missing, score 0.
- If all target words are present but one is used incorrectly, give partial credit only when the intended meaning is still clear.

Activity-specific reasons for an incorrect answer:
- One or more required target words or phrases are missing.
- A target word or phrase is used incorrectly.
- The response is not a complete sentence.
- The sentence is ungrammatical or illogical.
- The sentence does not demonstrate the meaning or use of the required target words.
`;

}