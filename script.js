
const savedLessons = localStorage.getItem("lessons");
const lessons = savedLessons ? JSON.parse(savedLessons) : [];


const lessonList = document.getElementById("lesson-list");

lessons.forEach(function(lesson) {
   const lessonElement = document.createElement("div");
   lessonElement.textContent = lesson.title;

   lessonList.appendChild(lessonElement);
});


const saveLessonBtn = document.getElementById("save-lesson");

const lessonTitle = document.getElementById("lesson-title");
const ageGroup = document.getElementById("age-group");
const bibleVerse = document.getElementById("bible-verse");
const lessonSummary= document.getElementById("lesson-summary");
const activities = document.getElementById("activities");
const prayer = document.getElementById("prayer");
const submittedMessage=document.getElementById("submmited");

saveLessonBtn.addEventListener("click", function() {
console.log("BUTTON CLICKED");

    submittedMessage.textContent = "Lesson saved successfully!";
   
});

const savedLesson = localStorage.getItem("lesson");

if (savedLesson) {
    const lesson = JSON.parse(savedLesson);

    lessonTitle.value = lesson.title;
    ageGroup.value = lesson.ageGroup;
    bibleVerse.value = lesson.bibleVerse;
    lessonSummary.value=lesson.summary;
    activities.value=lesson.activities;
    prayer.value=lesson.prayer;
}
