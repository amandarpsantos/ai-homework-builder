/**
 * Main function
 * This is where our application starts.
 */
function main() {

  const settings = getSettings();
  
  if (settings["Development Mode"] === true) {
  deletePreviousBuild();
}

  const questionTypes = getQuestionTypes();
  const homework = getHomework();

  const lesson = buildLesson(homework, questionTypes);

  saveLesson(lesson);

  validateLesson(settings, lesson, questionTypes);
  
  const form = buildGoogleForm(settings, lesson);

}