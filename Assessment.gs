/**
 * Builds the assessment object sent to Gemini.
 */
function buildAssessment(lesson, submission) {

  if (!Array.isArray(lesson)) {
    throw new Error(
      "Lesson data is missing or is not an array."
    );
  }

  if (
    !submission ||
    !Array.isArray(submission.answers)
  ) {
    throw new Error(
      "Submission answers are missing or invalid."
    );
  }

  const assessment = [];

  for (const question of lesson) {

    /*
     * Accept both possible lesson-object formats:
     *
     * Spreadsheet headers:
     * question["Question #"]
     *
     * Code properties:
     * question.questionNumber
     */
    const questionNumber =
      question.questionNumber !== undefined
        ? question.questionNumber
        : question["Question #"];

    const questionType =
      question.questionType !== undefined
        ? question.questionType
        : question["Question Type"];

    const displayName =
      question.displayName !== undefined
        ? question.displayName
        : question["Display Name"];

    const section =
      question.section !== undefined
        ? question.section
        : question["Section"];

    const questionInstruction =
      question.englishInstruction !== undefined
        ? question.englishInstruction
        : question.questionInstruction !== undefined
        ? question.questionInstruction
        : question["English Instruction"];

    const expectedSkill =
      question.studentInstruction !== undefined
        ? question.studentInstruction
        : question.expectedSkill !== undefined
        ? question.expectedSkill
        : question["Student Instruction"];

    const patternModel =
      question.patternModel !== undefined
        ? question.patternModel
        : question["Pattern Model"];

    const prompt =
      question.prompt !== undefined
        ? question.prompt
        : question["Prompt"];

    const rawTargetWords =
      question.targetWords !== undefined
        ? question.targetWords
        : question["Target Words"];

    let targetWords = [];

    if (Array.isArray(rawTargetWords)) {

      targetWords =
        rawTargetWords
          .map(word => String(word).trim())
          .filter(word => word !== "");

    } else if (rawTargetWords) {

      targetWords =
        String(rawTargetWords)
          .split(";")
          .map(word => word.trim())
          .filter(word => word !== "");

    }

    if (
      questionNumber === "" ||
      questionNumber === null ||
      questionNumber === undefined
    ) {
      throw new Error(
        `A lesson question is missing its Question Number. Prompt: ${prompt || "Unknown"}`
      );
    }

    if (!questionType) {
      throw new Error(
        `Question ${questionNumber} is missing its Question Type.`
      );
    }

    const matchingAnswer =
      submission.answers.find(answer =>
        Number(answer.questionNumber) ===
        Number(questionNumber)
      );

    assessment.push({
      questionNumber: Number(questionNumber),
      questionType: questionType,
      displayName: displayName || "",
      section: section || "",
      questionInstruction:
        questionInstruction || "",
      expectedSkill:
        expectedSkill || "",
      patternModel:
        patternModel || "",
      targetWords: targetWords,
      prompt: prompt || "",
      studentAnswer:
        matchingAnswer
          ? matchingAnswer.answer
          : ""
    });

  }

  return assessment;

}