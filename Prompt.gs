/**
 * Builds the Gemini prompt for one question.
 */
function buildQuestionPrompt(question) {

  const activityRules =
    getActivityRules(question);

  const sharedRules =
    getSharedGradingRules();

  return `
You are an expert English teacher grading homework for Brazilian A0-A1 students.

Grade ALL questions in this section. Evaluate each question independently.

Return ONLY valid JSON.
Do not use markdown.
Do not include explanations outside the JSON.

Question Number:
${question.questionNumber}

Question Type:
${question.questionType}

Instruction:
${question.questionInstruction}

Expected Skill:
${question.expectedSkill}

ACTIVITY-SPECIFIC RULES:
${activityRules}

SHARED GRADING RULES:
${sharedRules}

Prompt:
${question.prompt}

Pattern Model:
${question.patternModel || "None"}

Target Words:
${formatTargetWordsForPrompt(question.targetWords)}

Student Answer:
${question.studentAnswer}

Return JSON in this exact format:

  {
    "correct": true,
    "score": 1,
    "correctedAnswer": "",
    "feedbackEnglish": "",
    "feedbackPortuguese": "",
    "teacherNotes": ""
  }
`;
}

/**
 * Routes each activity type to its specific grading rules.
 */
function getActivityRules(question) {

  if (question.questionType === "pattern") {
    return getPatternRules();
  }

  if (question.questionType === "substitution") {
    return getSubstitutionRules(question);
  }

  if (question.questionType === "translation") {
    return getTranslationRules();
  }

  if (question.questionType === "negative") {
    return getNegativeRules();
  }

  if (question.questionType === "affirmative") {
    return getAffirmativeRules();
  }

  if (question.questionType === "interrogative") {
    return getInterrogativeRules();
  }

  if (question.questionType === "complete") {
    return getCompleteRules();
  }

  if (question.questionType === "write_question") {
    return getWriteQuestionRules();
  }

  if (question.questionType === "answer_question") {
    return getAnswerQuestionRules();
  }

  if (question.questionType === "unscramble") {
    return getUnscrambleRules(question);
  }

  if (question.questionType === "sentence") {
    return getSentenceRules(question);
  }

  if (question.questionType === "word_bank") {
    return getWordBankRules();
  }

  if (question.questionType === "complete_verb") {
    return getCompleteVerbRules();
  }

  if (question.questionType === "complete_idea") {
    return getCompleteIdeaRules(question);
  }

  return getGeneralRules();

}


/**
 * Formats target words clearly for Gemini.
 */
function formatTargetWordsForPrompt(targetWords) {

  if (!targetWords || targetWords.length === 0) {
    return "None";
  }

  return targetWords
    .map((word, index) => `${index + 1}. ${word}`)
    .join("\n");

}

/**
 * Shared grading rules used for every activity type.
 */
function getSharedGradingRules() {

  return `
Apply these rules to every activity.

GRADING ORDER:
Evaluate the answer in this exact order:

1. Task compliance
2. Meaning and logic
3. Target grammar or vocabulary
4. Other grammar
5. Small mistakes

Do not look for an error when the student's answer is already correct.

TASK COMPLIANCE:
- First determine whether the student followed the activity instruction.
- A grammatical answer may still be incorrect if it does not complete the required task.
- Evaluate only the answer the student actually provided.
- Never invent, assume, or reconstruct a different student answer.

ACCURACY:
- Carefully compare the prompt and the student's answer before assigning a score.
- Do not mark a correct answer incorrect.
- Do not create feedback for a grammar rule the student already used correctly.
- Before assigning score 0.5 or 0, identify the exact incorrect word, missing word, unnecessary word, structural problem, or meaning problem.
- If you cannot identify a real error, assign score 1.
- A different but grammatical and logical answer may be correct when the activity permits variation.

MEANING AND LOGIC:
- The answer must be logical.
- The answer must communicate an appropriate meaning.
- Do not accept grammatically correct but illogical language.
- Accept different correct answers when the activity allows variation.
- Do not require one exact wording unless the activity explicitly requires it.

GRAMMAR:
- Check the grammar required by the specific activity.
- Focus first on mistakes affecting the target structure or meaning.
- Do not penalize harmless differences in wording.
- Do not penalize contractions or full forms when both are grammatical.
- Do not claim that a verb form, subject, article, auxiliary, or word order is incorrect when the student used it correctly.

CORRECTED ANSWER:
- If score is 1, correctedAnswer must be an empty string.
- If score is 0.5 or 0, correctedAnswer must contain one complete corrected version of the student's answer.
- The corrected answer must follow the original activity instruction.
- Do not return only the corrected word or phrase.
- Return the complete sentence or question.
- If several answers are possible, provide one natural correct example.
- The corrected answer must directly repair the error described in the feedback.

SMALL MISTAKES:
- Minor capitalization, punctuation, or spelling mistakes should not automatically make an otherwise correct answer fully incorrect.
- Use score 0.5 when the task is substantially correct but contains one real, meaningful small mistake.
- A missing question mark may be treated as a small mistake when the answer clearly has correct question word order.
- English language names, countries, nationalities, names, and the pronoun "I" require capitalization.
- Do not lower the score merely because the answer lacks optional punctuation that does not affect meaning.

SCORING:
- Score 1 when the answer follows the task and is grammatical, logical, and appropriate.
- Score 0.5 when the answer mostly follows the task but contains one genuine small grammar, spelling, capitalization, punctuation, vocabulary, or completeness problem.
- Score 0 when the student does not follow the task, the central answer is wrong, the meaning is illogical, or the answer is not understandable.
- The "correct" property must be true only when score is 1.
- The "correct" property must be false when score is 0.5 or 0.
- The score, correctedAnswer, and feedback must agree with one another.

STUDENT FEEDBACK:
- If score is 1, leave correctedAnswer, feedbackEnglish, and feedbackPortuguese empty.
- If score is 0.5 or 0, explain the exact error and the short rule needed to correct it.
- Feedback must teach the student how to avoid the mistake next time.
- Identify the relevant word or structure whenever possible.
- Keep each explanation to a maximum of two short sentences.
- Give only the most important explanation.
- Do not overwhelm the student with every possible issue.
- feedbackEnglish and feedbackPortuguese must communicate the same rule.

DO NOT USE VAGUE FEEDBACK SUCH AS:
- "Check the verb."
- "Check the verb form."
- "Grammar mistake."
- "Incorrect tense."
- "Check your grammar."
- "Review the sentence."
- "Try again."
- "This is incorrect."

USE SPECIFIC TEACHING FEEDBACK SUCH AS:
- "We use 'lives' with 'he', 'she', and 'it'."
- "After 'doesn't', use the base verb: 'like', not 'likes'."
- "After 'finish', use the -ing form: 'writing'."
- "Use 'an' before a word that begins with a vowel sound."
- "Questions with 'does' use the base form of the main verb."
- "Use 'are' because the subject 'children' is plural."
- "Language names begin with a capital letter: 'Portuguese'."
- "Use 'to' after 'want': 'wants to eat'."

PORTUGUESE FEEDBACK:
- Use simple Brazilian Portuguese suitable for a true beginner.
- Explain the same specific rule given in English.
- Keep necessary English examples in quotation marks.
- Example:
  English: "We use 'lives' with 'he', 'she', and 'it'."
  Portuguese: "Usamos 'lives' com 'he', 'she' e 'it'."

TEACHER NOTES:
- Use teacherNotes only for information that helps the teacher understand the grading decision.
- Keep teacherNotes concise.
- Do not repeat the student feedback unnecessarily.
- Leave teacherNotes empty when no additional teacher information is needed.
`;

}

/**
 * General fallback rules.
 */
function getGeneralRules() {

  return `
General grading rules:
- The answer must follow the instruction.
- The sentence must be grammatical.
- The sentence must be logical.
- Be fair but not overly strict.
- Give short, useful feedback.
`;

}