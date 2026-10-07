const saveLessonBtn = document.getElementById("save-lesson");

const lessonTitle = document.getElementById("lesson-title");
const ageGroup = document.getElementById("age-group");
const bibleVerse = document.getElementById("bible-verse");

saveLessonBtn.addEventListener("click", function() {
    console.log(lessonTitle.value);
    console.log(ageGroup.value);
    console.log(bibleVerse.value);
   const lesson = {
    title: lessonTitle.value,
    ageGroup: ageGroup.value,
    bibleVerse: bibleVerse.value
};
    console.log(lesson);
    localStorage.setItem("lesson", JSON.stringify(lesson));
});
console.log("script.js is running");

const saveLessonBtn = document.getElementById("save-lesson");
const savedLesson = localStorage.getItem("lesson");

if (savedLesson) {
    const lesson = JSON.parse(savedLesson);
    console.log(lesson);
}

