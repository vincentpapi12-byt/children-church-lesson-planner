
const savedLessons = localStorage.getItem("lessons");
const lessons = savedLessons ? JSON.parse(savedLessons) : [];


const lessonList = document.getElementById("lesson-list");


function renderLessons() {
   lessonList.textContent = "";
   lessons.forEach(function(lesson) {
    const lessonElement = document.createElement("div");
    lessonElement.classList.add("lesson-card");

    const titleElement = document.createElement("h3");
    titleElement.textContent = lesson.title;

    const ageElement = document.createElement("p");
    ageElement.textContent = `Age Group: ${lesson.ageGroup}`;

    const verseElement = document.createElement("p");
    verseElement.textContent = `Bible Verse: ${lesson.bibleVerse}`;
      
    const summaryElement = document.createElement("p");
    summaryElement.textContent = `Lesson Summary: ${lesson.summary}`;

    const activitiesElement = document.createElement("p");
    activitiesElement.textContent = `Activities: ${lesson.activities}`;

    const prayerElement = document.createElement("p");
    prayerElement.textContent = `Prayer: ${lesson.prayer}`;

    summaryElement.style.display = "none";
     activitiesElement.style.display = "none";
     prayerElement.style.display = "none";

    const viewElement = document.createElement("button");
    viewElement.classList.add("view-lesson");
    viewElement.textContent = "View Lesson";
  viewElement.addEventListener("click", function() {
    if (summaryElement.style.display === "none") {
        summaryElement.style.display = "block";
        activitiesElement.style.display = "block";
        prayerElement.style.display = "block";

        viewElement.textContent = "Hide Lesson";
    } else {
        summaryElement.style.display = "none";
        activitiesElement.style.display = "none";
        prayerElement.style.display = "none";

        viewElement.textContent = "View Lesson";
    }
});

      
    lessonElement.appendChild(titleElement);
    lessonElement.appendChild(ageElement);
    lessonElement.appendChild(verseElement);
    lessonElement.appendChild(summaryElement);
    lessonElement.appendChild(activitiesElement);
    lessonElement.appendChild(prayerElement);
    lessonElement.appendChild(viewElement);

    lessonList.appendChild(lessonElement);
});
}

renderLessons();

const saveLessonBtn = document.getElementById("save-lesson");

const lessonTitle = document.getElementById("lesson-title");
const ageGroup = document.getElementById("age-group");
const bibleVerse = document.getElementById("bible-verse");
const lessonSummary= document.getElementById("lesson-summary");
const activities = document.getElementById("activities");
const prayer = document.getElementById("prayer");
const submittedMessage=document.getElementById("submmited");

saveLessonBtn.addEventListener("click", function() {

    const lesson = {
        title: lessonTitle.value,
        ageGroup: ageGroup.value,
        bibleVerse: bibleVerse.value,
        summary: lessonSummary.value,
        activities: activities.value,
        prayer: prayer.value
    };

    lessons.push(lesson);

    localStorage.setItem("lessons", JSON.stringify(lessons));
     renderLessons();

    submittedMessage.textContent = "Lesson saved successfully!";
   
});


