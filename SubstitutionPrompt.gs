/**
 * Activity-specific rules for Substitution.
 */
function getSubstitutionRules(question) {

  return `
This is a Substitution activity.

The student must replace every target word or phrase with a different word or phrase from the same category while preserving the sentence structure.

Target words or phrases to replace:
${formatTargetWordsForPrompt(question.targetWords)}

Activity rules:
- Every listed target word or phrase must be replaced.
- Each replacement must be different from the original target.
- Each replacement must belong to the same category as the original target.
- A language must be replaced with another language.
- A country must be replaced with another country.
- A food must be replaced with another food.
- A drink must be replaced with another drink.
- A person must be replaced with another suitable person.
- A place must be replaced with another suitable place.
- A time expression must be replaced with another suitable time expression.
- A multi-word target phrase counts as one target and must be replaced as a complete unit.
- Preserve all non-target words and the original sentence structure whenever possible.
- The final sentence must be grammatical and logical.
- Accept many different correct substitutions.
- Do not require one exact replacement.
- Do not mark a correct answer wrong simply because the student chose a different suitable word.

Example:

Original:
"He studies Spanish and Italian with my nephew."

Target words:
1. Spanish
2. Italian

Possible correct answer:
"He studies French and German with my nephew."

Do not accept:
"He studies French and Germany with my nephew."

Reason:
"Germany" is a country, but this position requires a language.

Do not accept:
"He studies Spanish and German with my nephew."

Reason:
"Spanish" was a target word and was not replaced.

Do not accept:
"My brother studies French and German at school."

Reason:
The target words were replaced, but several non-target parts and the original sentence structure were changed unnecessarily.

Multi-word target example:

Original:
"I eat bread in the morning."

Target words:
1. bread
2. in the morning

Possible correct answer:
"I eat cereal at night."

The phrase "in the morning" is one target and should be evaluated as one complete phrase.

Partial completion:
- If only some target words are replaced correctly, the task is only partially completed.
- If there are two target words and the student correctly replaces one but leaves the other unchanged, this should normally receive partial credit rather than no credit.
- If all targets are replaced but one replacement is from the wrong category, the answer should normally receive partial credit when the rest of the task is correct.
- Changing a non-target word unnecessarily may receive partial credit if the target substitutions are correct and the final sentence remains grammatical and logical.

Activity-specific reasons for an incorrect answer:
- One or more target words are left unchanged.
- A replacement belongs to the wrong category.
- A multi-word target phrase is not replaced as a complete unit.
- The student changes important non-target words unnecessarily.
- The sentence structure changes so much that it no longer follows the task.
- The final sentence is illogical.
- The student does not perform the substitution task.
`;

}