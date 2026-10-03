/**
 * Validates the lesson before building the form.
 */
function validateLesson(settings, lesson, questionTypes) {

  const expectedDynamic =
    settings["Dynamic Questions"];

  const expectedSubstitution =
    settings["Substitution Questions"];

  const expectedTranslation =
    settings["Translation Questions"];

  const validateCounts =
    settings["Validate Question Counts"];


  // Validate Question Types
  for (const question of lesson) {

    if (!questionTypes[question.questionType]) {

      throw new Error(
        `Unknown Question Type:\n\n` +
        `"${question.questionType}"\n\n` +
        `Question ${question.questionNumber}`
      );

    }

  }


  // Count questions in each section
  const dynamicCount =
    lesson.filter(q => q.section === "Dynamic").length;

  const substitutionCount =
    lesson.filter(q => q.section === "Substitution").length;

  const translationCount =
    lesson.filter(q => q.section === "Translation").length;


  // Only validate section counts if enabled
  if (String(validateCounts).toUpperCase() === "TRUE") {

    if (dynamicCount !== expectedDynamic) {

      throw new Error(
        `Dynamic section should contain ${expectedDynamic} questions.\n\n` +
        `Found: ${dynamicCount}`
      );

    }

    if (substitutionCount !== expectedSubstitution) {

      throw new Error(
        `Substitution section should contain ${expectedSubstitution} questions.\n\n` +
        `Found: ${substitutionCount}`
      );

    }

    if (translationCount !== expectedTranslation) {

      throw new Error(
        `Translation section should contain ${expectedTranslation} questions.\n\n` +
        `Found: ${translationCount}`
      );

    }

  }

}