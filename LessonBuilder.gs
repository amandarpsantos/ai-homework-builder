/**
 * Combines Homework rows with Question Types.
 */
function buildLesson(homework, questionTypes) {

  const lesson = [];

  for (const question of homework) {

    const typeInfo = questionTypes[question.questionType];

    lesson.push({

      questionNumber: question.questionNumber,

      questionType: question.questionType,

      displayName: typeInfo.displayName,

      section: typeInfo.section,

      englishInstruction: typeInfo.englishInstruction,

      portugueseInstruction: typeInfo.portugueseInstruction,

      studentInstruction: typeInfo.studentInstruction,

      patternModel: question.patternModel,

      targetWords: question.targetWords,

      prompt: question.prompt

    });

  }

  return lesson;

}