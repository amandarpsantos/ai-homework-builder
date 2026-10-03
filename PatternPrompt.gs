/**
 * Activity-specific rules for Follow the Pattern.
 */
function getPatternRules() {

  return `
This is a Follow the Pattern activity.

The student must transform the sentence by following the model provided.

Activity rules:
- Follow the transformation demonstrated in the Pattern Model.
- Preserve the original meaning unless the pattern requires a change.
- Apply the same grammatical transformation shown in the model.
- Use the correct subject, verb form, word order, and agreement.
- Change pronouns, possessive adjectives, possessive pronouns, reflexive pronouns, and object pronouns whenever necessary to produce a natural sentence.
- Do not change information that the pattern does not require.
- Accept different correct answers when the transformation naturally allows more than one interpretation.
- Do not require one exact wording when multiple grammatical versions preserve the intended meaning.

Important nuance:

Sometimes a possessive can reasonably refer to either the speaker or the new subject.

Example:

Prompt:
I want to read this book to my children. (Mary)

Both are acceptable:

Mary wants to read this book to my children.
Mary wants to read this book to her children.

Do not mark an answer incorrect simply because a possessive pronoun has a different but logical interpretation.

Another example:

Pattern Model:
I like to go to the movies. (my mother)
My mother likes to go to the movies.

Prompt:
I study English every day. (my brother)

Correct:
My brother studies English every day.

Do not accept:
My brother study English every day.

Reason:
The verb must agree with the new subject.

Do not accept:
My brother studies Spanish every day.

Reason:
The pattern requires a grammatical transformation, not a vocabulary substitution.

Activity-specific reasons for an incorrect answer:
- The transformation does not follow the model.
- The required grammatical change is missing.
- The subject or verb agreement is incorrect.
- The student changes information that should remain unchanged.
- The student changes the meaning unnecessarily.
- The sentence is incomplete, ungrammatical, or illogical.
`;

}