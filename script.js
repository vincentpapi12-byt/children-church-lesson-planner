
let editingIndex = null;



const isPlannerPage = document.getElementById("lesson-list") !== null;

if (isPlannerPage) {

    const savedLessons = localStorage.getItem("lessons");
    const shareLessonBtn = document.getElementById("share-lesson");
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

    
function createLessonMessage(lessonData) {
            return `GOD'S PRESENCE MINISTRIES
        CHILDREN'S CHURCH LESSON

        Lesson: ${lessonData.lesson}
        Age Group: ${lessonData.ageGroup}
        Bible Verse: ${lessonData.bibleVerse}

        RECAP
        ${lessonData.recap}

        OBJECTIVE
        ${lessonData.objective}

        EXAMPLE / DEMONSTRATION
        ${lessonData.example}

        ACTIVITIES
        ${lessonData.activities}

        OUTCOMES / CONCLUSION
        ${lessonData.outcomes}

        DECLARATIONS
        ${lessonData.declarations}

        All Life in God's Presence`;
}



function downloadLessonPDF(lessonData) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("GOD'S PRESENCE MINISTRIES", 20, 20);

    doc.setFontSize(11);
    doc.text("All Life in God's Presence", 20, 30);

    doc.setFontSize(16);
    doc.text("Children's Church Lesson", 20, 45);

    doc.setFontSize(12);

    const lessonText = `
        Lesson: ${lessonData.lesson}
        Age Group: ${lessonData.ageGroup}
        Bible Verse: ${lessonData.bibleVerse}

        RECAP
        ${lessonData.recap}

        OBJECTIVE
        ${lessonData.objective}

        EXAMPLE / DEMONSTRATION
        ${lessonData.example}

        ACTIVITIES
        ${lessonData.activities}

        OUTCOMES / CONCLUSION
        ${lessonData.outcomes}

        DECLARATIONS
        ${lessonData.declarations}
`;

    const lines = doc.splitTextToSize(lessonText, 170);
    doc.text(lines, 20, 60);

    const fileName = `${lessonData.lesson || "lesson"}.pdf`;
    doc.save(fileName);
}

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

                        
            // SHARE BUTTON
            const shareElement = document.createElement("button");
            shareElement.classList.add("share-lesson");
            shareElement.textContent = "Share on WhatsApp";


             // PDF BUTTON
                const pdfElement = document.createElement("button");
                pdfElement.classList.add("pdf-lesson");
                pdfElement.textContent = "Download PDF";


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


                            
                // SHARE LESSON
                shareElement.addEventListener("click", function() {
                    const message = createLessonMessage(lessonData);

                    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;

                    window.open(whatsappURL, "_blank");
                });

                
                // DOWNLOAD PDF
                pdfElement.addEventListener("click", function() {
                    downloadLessonPDF(lessonData);
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
            lessonElement.appendChild(shareElement);
            lessonElement.appendChild(pdfElement);

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

    
shareLessonBtn.addEventListener("click", () => {
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

    const message = createLessonMessage(lessonData);

    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
});

}