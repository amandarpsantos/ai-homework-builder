/**
 * Builds the complete Google Form.
 */
function buildGoogleForm(settings, lesson) {

  const form = createForm(settings);

  addStudentInformation(form);

  addDynamicSection(form, lesson);

  addSubstitutionSection(form, lesson);

  addTranslationSection(form, lesson);

  return form;

}


/**
 * Creates the Google Form.
 */
function createForm(settings) {

  const formTitle =
    `${settings["Book Name"]} - Lesson ${settings["Lesson Number"]} Homework`;

  const form = FormApp.create(formTitle);

  form.setDescription(settings["Form Description"]);

  if (settings["Collect Email"] === true) {
    form.setCollectEmail(true);
  }

const folder = DriveApp.getFolderById(
  extractFolderId(settings["Forms Folder URL"])
);

  const file = DriveApp.getFileById(form.getId());

  folder.addFile(file);

  DriveApp.getRootFolder().removeFile(file);

  // Save the Form ID
  saveSystemValue("Form ID", form.getId());

  // Save the Form URL
  saveSystemValue("Form URL", form.getPublishedUrl());

  // Create the linked response spreadsheet
  createResponseSpreadsheet(form, settings);


  // Create the submission trigger
  createSubmissionTrigger();
  // createSubmissionTrigger();

  return form;


}


/**
 * Adds the Student Information section.
 */
function addStudentInformation(form) {

  const item = form.addTextItem();

  item.setTitle("Student Name");

  item.setRequired(true);

}


/**
 * Adds the Dynamic Activity section.
 */
function addDynamicSection(form, lesson) {

  const dynamicQuestions =
    lesson.filter(question => question.section === "Dynamic");

  addQuestionGroup(form, dynamicQuestions);

}


/**
 * Adds the Substitution section.
 */
function addSubstitutionSection(form, lesson) {

  const substitutionQuestions =
    lesson.filter(question => question.section === "Substitution");

  addQuestionGroup(form, substitutionQuestions);

}


/**
 * Adds the Translation section.
 */
function addTranslationSection(form, lesson) {

  const translationQuestions =
    lesson.filter(question => question.section === "Translation");

  addQuestionGroup(form, translationQuestions);

}


/**
 * Creates a complete question section.
 */
function addQuestionGroup(form, questions) {

  if (questions.length === 0) return;

  const activity = questions[0];

  const page = form.addPageBreakItem();

  page.setTitle(activity.displayName);

  let helpText =
  activity.englishInstruction +
  "\n\n" +
  activity.portugueseInstruction;

if (activity.patternModel !== "") {

  helpText +=
    "\n\nExample\n\n" +
    activity.patternModel;

}

page.setHelpText(helpText);

  for (const question of questions) {

    const item = form.addParagraphTextItem();

    const displayPrompt = highlightTargetWords(
      question.prompt,
      question.targetWords
   );

item.setTitle(
  question.questionNumber + ". " + displayPrompt
  );

    item.setRequired(true);

  }

}

/**
 * Creates and organizes the response spreadsheet.
 */
function createResponseSpreadsheet(form, settings) {

// Create the spreadsheet
const spreadsheetName =
  `${settings["Book Name"]} - Lesson ${settings["Lesson Number"]} Responses`;

const spreadsheet = SpreadsheetApp.create(spreadsheetName);

// Link the form to it
form.setDestination(
  FormApp.DestinationType.SPREADSHEET,
  spreadsheet.getId()
  );


// Move it into the Responses folder
  const folder = DriveApp.getFolderById(
  extractFolderId(settings["Responses Folder URL"])
    );

  const file =
    DriveApp.getFileById(spreadsheet.getId());

  folder.addFile(file);

  DriveApp.getRootFolder().removeFile(file);

  // Save the Spreadsheet ID
  saveSystemValue(
    "Response Spreadsheet ID",
    spreadsheet.getId()
  );

  saveSystemValue(
  "Response Spreadsheet URL",
  spreadsheet.getUrl()
  
);

}

/**
 * Wraps target words or phrases in brackets.
 */
function highlightTargetWords(prompt, targetWords) {

  if (!targetWords || targetWords.length === 0) {
    return prompt;
  }

  // Longest phrases first
  const sortedWords = [...targetWords].sort(
    (a, b) => b.length - a.length
  );

  let highlightedPrompt = prompt;

  for (const word of sortedWords) {

    const escapedWord = word.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    const regex = new RegExp(`\\b${escapedWord}\\b`, "g");

    highlightedPrompt =
      highlightedPrompt.replace(regex, `【${word}】`);

  }

  return highlightedPrompt;

}