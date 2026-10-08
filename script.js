
let editingIndex = null;

const savedLessons = localStorage.getItem("lessons");
const lessons = savedLessons ? JSON.parse(savedLessons) : [];

const lessonList = document.getElementById("lesson-list");


// FORM ELEMENTS
const saveLessonBtn = document.getElementById("save-lesson");

const lesson = document.getElementById("lesson");
const ageGroup = document.getElementById("age-group");
const bibleVerse = document.getElementById("bible-verse");
const recap = document.getElementById("recap");
const objective = document.getElementById("objective");
const example = document.getElementById("example");
const activities = document.getElementById("activities");
const outcomes = document.getElementById("outcomes");
const declarations = document.getElementById("declarations");

const submittedMessage = document.getElementById("submmited");


// RENDER SAVED LESSONS
function renderLessons() {
    lessonList.textContent = "";

    lessons.forEach(function(lessonData) {

        const lessonElement = document.createElement("div");
        lessonElement.classList.add("lesson-card");


        // LESSON TITLE
        const lessonElementTitle = document.createElement("h3");
        lessonElementTitle.textContent = lessonData.lesson;


        // AGE GROUP
        const ageElement = document.createElement("p");
        ageElement.textContent = `Age Group: ${lessonData.ageGroup}`;


        // BIBLE VERSE
        const verseElement = document.createElement("p");
        verseElement.textContent = `Bible Verse: ${lessonData.bibleVerse}`;


        // RECAP
        const recapElement = document.createElement("p");
        recapElement.textContent = `Recap: ${lessonData.recap}`;


        // OBJECTIVE
        const objectiveElement = document.createElement("p");
        objectiveElement.textContent = `Objective: ${lessonData.objective}`;


        // EXAMPLE / DEMONSTRATION
        const exampleElement = document.createElement("p");
        exampleElement.textContent = `Example/Demonstration: ${lessonData.example}`;


        // ACTIVITIES
        const activitiesElement = document.createElement("p");
        activitiesElement.textContent = `Activities: ${lessonData.activities}`;


        // OUTCOMES / CONCLUSION
        const outcomesElement = document.createElement("p");
        outcomesElement.textContent = `Outcomes/Conclusion: ${lessonData.outcomes}`;


        // DECLARATIONS
        const declarationsElement = document.createElement("p");
        declarationsElement.textContent = `Declarations: ${lessonData.declarations}`;


        // HIDE LESSON CONTENT INITIALLY
        recapElement.style.display = "none";
        objectiveElement.style.display = "none";
        exampleElement.style.display = "none";
        activitiesElement.style.display = "none";
        outcomesElement.style.display = "none";
        declarationsElement.style.display = "none";


        // VIEW BUTTON
        const viewElement = document.createElement("button");
        viewElement.classList.add("view-lesson");
        viewElement.textContent = "View Lesson";


        // DELETE BUTTON
        const deleteElement = document.createElement("button");
        deleteElement.classList.add("delete-lesson");
        deleteElement.textContent = "Delete Lesson";


        // EDIT BUTTON
        const editElement = document.createElement("button");
        editElement.classList.add("edit-lesson");
        editElement.textContent = "Edit Lesson";


        // VIEW LESSON
        viewElement.addEventListener("click", function() {

            if (recapElement.style.display === "none") {

                recapElement.style.display = "block";
                objectiveElement.style.display = "block";
                exampleElement.style.display = "block";
                activitiesElement.style.display = "block";
                outcomesElement.style.display = "block";
                declarationsElement.style.display = "block";

                viewElement.textContent = "Hide Lesson";

            } else {

                recapElement.style.display = "none";
                objectiveElement.style.display = "none";
                exampleElement.style.display = "none";
                activitiesElement.style.display = "none";
                outcomesElement.style.display = "none";
                declarationsElement.style.display = "none";

                viewElement.textContent = "View Lesson";
            }
        });


        // DELETE LESSON
        deleteElement.addEventListener("click", function() {

            const index = lessons.indexOf(lessonData);

            lessons.splice(index, 1);

            localStorage.setItem("lessons", JSON.stringify(lessons));

            renderLessons();
        });


        // EDIT LESSON
        editElement.addEventListener("click", function() {

            editingIndex = lessons.indexOf(lessonData);

            lesson.value = lessonData.lesson;
            ageGroup.value = lessonData.ageGroup;
            bibleVerse.value = lessonData.bibleVerse;
            recap.value = lessonData.recap;
            objective.value = lessonData.objective;
            example.value = lessonData.example;
            activities.value = lessonData.activities;
            outcomes.value = lessonData.outcomes;
            declarations.value = lessonData.declarations;
        });


        // ADD ELEMENTS TO CARD
        lessonElement.appendChild(lessonElementTitle);
        lessonElement.appendChild(ageElement);
        lessonElement.appendChild(verseElement);
        lessonElement.appendChild(recapElement);
        lessonElement.appendChild(objectiveElement);
        lessonElement.appendChild(exampleElement);
        lessonElement.appendChild(activitiesElement);
        lessonElement.appendChild(outcomesElement);
        lessonElement.appendChild(declarationsElement);
        lessonElement.appendChild(viewElement);
        lessonElement.appendChild(deleteElement);
        lessonElement.appendChild(editElement);

        lessonList.appendChild(lessonElement);
    });
}


// DISPLAY SAVED LESSONS WHEN PAGE LOADS
renderLessons();


// SAVE LESSON
saveLessonBtn.addEventListener("click", function() {

    const lessonData = {
        lesson: lesson.value,
        ageGroup: ageGroup.value,
        bibleVerse: bibleVerse.value,
        recap: recap.value,
        objective: objective.value,
        example: example.value,
        activities: activities.value,
        outcomes: outcomes.value,
        declarations: declarations.value
    };


    // CREATE OR UPDATE
    if (editingIndex === null) {

        lessons.push(lessonData);

    } else {

        lessons[editingIndex] = lessonData;
    }


    // SAVE TO LOCAL STORAGE
    localStorage.setItem("lessons", JSON.stringify(lessons));


    // UPDATE THE PAGE
    renderLessons();


    // EXIT EDIT MODE
    editingIndex = null;


    // SUCCESS MESSAGE
    submittedMessage.textContent = "Lesson saved successfully!";


    // CLEAR FORM
    lesson.value = "";
    ageGroup.value = "";
    bibleVerse.value = "";
    recap.value = "";
    objective.value = "";
    example.value = "";
    activities.value = "";
    outcomes.value = "";
    declarations.value = "";
});

