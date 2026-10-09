let editingIndex = null;

const isPlannerPage = document.getElementById("lesson-list") !== null;

if (isPlannerPage) {
const savedLessons = localStorage.getItem("lessons");
const lessons = savedLessons ? JSON.parse(savedLessons) : [];


const lessonList = document.getElementById("lesson-list");
const shareLessonBtn = document.getElementById("share-lesson");
const saveLessonBtn = document.getElementById("save-lesson");

// Form elements
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

// Create text for WhatsApp sharing
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


// Download a lesson as a PDF
function downloadLessonPDF(lessonData) {
    if (!window.jspdf || !window.jspdf.jsPDF) {
        alert("The PDF library did not load. Please check the jsPDF script in index.html.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    const bottomMargin = 20;

    const navy = [6, 20, 43];
    const gold = [230, 184, 68];
    const white = [255, 255, 255];
    const darkText = [45, 52, 65];

    let y = 55;

    function addMainHeader() {
        doc.setFillColor(...navy);
        doc.rect(0, 0, pageWidth, 42, "F");

        doc.setTextColor(...gold);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(17);
        doc.text("GOD'S PRESENCE MINISTRIES", margin, 17);

        doc.setTextColor(...white);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.text("All Life in God's Presence", margin, 25);

        doc.setDrawColor(...gold);
        doc.setLineWidth(0.8);
        doc.line(margin, 32, pageWidth - margin, 32);

        doc.setFontSize(10);
        doc.text("CHILDREN'S CHURCH LESSON", margin, 38);
    }

    function addPageHeader() {
        doc.setFillColor(...navy);
        doc.rect(0, 0, pageWidth, 15, "F");

        doc.setTextColor(...gold);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text("GOD'S PRESENCE MINISTRIES", margin, 10);
    }

    function newPage() {
        doc.addPage();
        addPageHeader();
        y = 25;
    }

    addMainHeader();

    // Lesson title
    doc.setTextColor(...navy);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);

    const titleLines = doc.splitTextToSize(
        lessonData.lesson || "Untitled Lesson",
        contentWidth
    );

    const titleHeight = titleLines.length * 8;

    if (y + titleHeight > pageHeight - bottomMargin) {
        newPage();
    }

    doc.text(titleLines, margin, y);
    y += titleHeight + 7;

    // Information card
    const labelX = margin + 5;
    const valueX = margin + 35;
    const valueWidth = contentWidth - 40;
    const lineHeight = 5;
    const infoPadding = 7;
    const rowGap = 4;

    const ageLines = doc.splitTextToSize(
        String(lessonData.ageGroup || "Not specified"),
        valueWidth
    );

    const verseLines = doc.splitTextToSize(
        String(lessonData.bibleVerse || "Not specified"),
        valueWidth
    );

    const ageHeight = ageLines.length * lineHeight;
    const verseHeight = verseLines.length * lineHeight;

    const infoHeight =
        infoPadding * 2 +
        ageHeight +
        verseHeight +
        rowGap;

    if (y + infoHeight > pageHeight - bottomMargin) {
        newPage();
    }

    doc.setFillColor(248, 249, 252);
    doc.roundedRect(
        margin,
        y,
        contentWidth,
        infoHeight,
        2,
        2,
        "F"
    );

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...navy);

    doc.text("Age group:", labelX, y + infoPadding + 1);

    doc.text(
        "Bible verse:",
        labelX,
        y + infoPadding + ageHeight + rowGap + 1
    );

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...darkText);

    doc.text(ageLines, valueX, y + infoPadding + 1);

    doc.text(
        verseLines,
        valueX,
        y + infoPadding + ageHeight + rowGap + 1
    );

    y += infoHeight + 11;

    // Lesson sections
    const sections = [
        ["RECAP", lessonData.recap],
        ["OBJECTIVE", lessonData.objective],
        ["EXAMPLE / DEMONSTRATION", lessonData.example],
        ["ACTIVITIES", lessonData.activities],
        ["OUTCOMES / CONCLUSION", lessonData.outcomes],
        ["DECLARATIONS", lessonData.declarations]
    ];

    const headingLineHeight = 6;
    const bodyLineHeight = 5.5;

    sections.forEach(([heading, content]) => {
        if (typeof content !== "string" || !content.trim()) {
            return;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);

        const headingLines = doc.splitTextToSize(
            heading,
            contentWidth - 5
        );

        const headingHeight =
            headingLines.length * headingLineHeight;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        const bodyLines = doc.splitTextToSize(
            content.trim(),
            contentWidth
        );

        if (
            y + headingHeight + 3 + bodyLineHeight >
            pageHeight - bottomMargin
        ) {
            newPage();
        }

        function drawHeading() {
            doc.setFillColor(...gold);
            doc.rect(
                margin,
                y - 4,
                2,
                headingHeight + 1,
                "F"
            );

            doc.setTextColor(...navy);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.text(headingLines, margin + 5, y);

            y += headingHeight + 3;
        }

        drawHeading();

        bodyLines.forEach(line => {
            if (y + bodyLineHeight > pageHeight - bottomMargin) {
                newPage();
                drawHeading();
            }

            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(...darkText);

            doc.text(line, margin, y);
            y += bodyLineHeight;
        });

        y += 7;
    });

    // Add footer to every page
    const totalPages = doc.internal.getNumberOfPages();

    for (let page = 1; page <= totalPages; page++) {
        doc.setPage(page);

        doc.setDrawColor(...gold);
        doc.setLineWidth(0.5);

        doc.line(
            margin,
            pageHeight - 13,
            pageWidth - margin,
            pageHeight - 13
        );

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(...darkText);

        doc.text(
            "The presence of God finds its fullest expression in humanity",
            margin,
            pageHeight - 7
        );

        doc.text(
            `Page ${page} of ${totalPages}`,
            pageWidth - margin,
            pageHeight - 7,
            { align: "right" }
        );
    }

    // Save once, after the footer is complete
    const safeTitle = (lessonData.lesson || "GPM-Lesson")
        .trim()
        .replace(/[<>:"/\\|?*\x00-\x1F]+/g, "-")
        .replace(/\s+/g, "-");

    doc.save(`${safeTitle || "GPM-Lesson"}.pdf`);
}

// Render saved lessons
function renderLessons() {
    lessonList.textContent = "";

    lessons.forEach(function (lessonData) {
        const lessonElement = document.createElement("div");
        lessonElement.classList.add("lesson-card");

        const titleElement = document.createElement("h3");
        titleElement.textContent =
            lessonData.lesson || "Untitled Lesson";

        const ageElement = document.createElement("p");
        ageElement.textContent =
            `Age Group: ${lessonData.ageGroup || ""}`;

        const verseElement = document.createElement("p");
        verseElement.textContent =
            `Bible Verse: ${lessonData.bibleVerse || ""}`;

        const recapElement = document.createElement("p");
        recapElement.textContent =
            `Recap: ${lessonData.recap || ""}`;

        const objectiveElement = document.createElement("p");
        objectiveElement.textContent =
            `Objective: ${lessonData.objective || ""}`;

        const exampleElement = document.createElement("p");
        exampleElement.textContent =
            `Example/Demonstration: ${lessonData.example || ""}`;

        const activitiesElement = document.createElement("p");
        activitiesElement.textContent =
            `Activities: ${lessonData.activities || ""}`;

        const outcomesElement = document.createElement("p");
        outcomesElement.textContent =
            `Outcomes/Conclusion: ${lessonData.outcomes || ""}`;

        const declarationsElement = document.createElement("p");
        declarationsElement.textContent =
            `Declarations: ${lessonData.declarations || ""}`;

        const hiddenElements = [
            recapElement,
            objectiveElement,
            exampleElement,
            activitiesElement,
            outcomesElement,
            declarationsElement
        ];

        hiddenElements.forEach(element => {
            element.style.display = "none";
        });

        const viewElement = document.createElement("button");
        viewElement.classList.add("view-lesson");
        viewElement.textContent = "View Lesson";

        const deleteElement = document.createElement("button");
        deleteElement.classList.add("delete-lesson");
        deleteElement.textContent = "Delete Lesson";

        const editElement = document.createElement("button");
        editElement.classList.add("edit-lesson");
        editElement.textContent = "Edit Lesson";

        const shareElement = document.createElement("button");
        shareElement.classList.add("share-lesson");
        shareElement.textContent = "Share on WhatsApp";

        const pdfElement = document.createElement("button");
        pdfElement.classList.add("pdf-lesson");
        pdfElement.textContent = "Download PDF";

        // View or hide lesson details
        viewElement.addEventListener("click", function () {
            const shouldShow =
                recapElement.style.display === "none";

            hiddenElements.forEach(element => {
                element.style.display =
                    shouldShow ? "block" : "none";
            });

            viewElement.textContent =
                shouldShow ? "Hide Lesson" : "View Lesson";
        });

        // Delete lesson
        deleteElement.addEventListener("click", function () {
            const index = lessons.indexOf(lessonData);

            if (index === -1) {
                return;
            }

            if (!confirm("Are you sure you want to delete this lesson?")) {
                return;
            }

            lessons.splice(index, 1);
            localStorage.setItem("lessons", JSON.stringify(lessons));
            renderLessons();
        });

        // Edit lesson
        editElement.addEventListener("click", function () {
            editingIndex = lessons.indexOf(lessonData);

            lesson.value = lessonData.lesson || "";
            ageGroup.value = lessonData.ageGroup || "";
            bibleVerse.value = lessonData.bibleVerse || "";
            recap.value = lessonData.recap || "";
            objective.value = lessonData.objective || "";
            example.value = lessonData.example || "";
            activities.value = lessonData.activities || "";
            outcomes.value = lessonData.outcomes || "";
            declarations.value = lessonData.declarations || "";

            lesson.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        });

        // Share this saved lesson
        shareElement.addEventListener("click", function () {
            const message = createLessonMessage(lessonData);
            const whatsappURL =
                `https://wa.me/?text=${encodeURIComponent(message)}`;

            window.open(whatsappURL, "_blank", "noopener");
        });

        // Download this saved lesson
        pdfElement.addEventListener("click", function () {
            downloadLessonPDF(lessonData);
        });

        const elements = [
            titleElement,
            ageElement,
            verseElement,
            recapElement,
            objectiveElement,
            exampleElement,
            activitiesElement,
            outcomesElement,
            declarationsElement,
            viewElement,
            deleteElement,
            editElement,
            shareElement,
            pdfElement
        ];

        elements.forEach(element => {
            lessonElement.appendChild(element);
        });

        lessonList.appendChild(lessonElement);
    });
}

// Show saved lessons when the page loads
renderLessons();

// Save a new lesson or update an existing one
if (saveLessonBtn) {
    saveLessonBtn.addEventListener("click", function (event) {
        event.preventDefault();

        const lessonData = {
            lesson: lesson.value.trim(),
            ageGroup: ageGroup.value,
            bibleVerse: bibleVerse.value.trim(),
            recap: recap.value.trim(),
            objective: objective.value.trim(),
            example: example.value.trim(),
            activities: activities.value.trim(),
            outcomes: outcomes.value.trim(),
            declarations: declarations.value.trim()
        };

        if (!lessonData.lesson) {
            if (submittedMessage) {
                submittedMessage.textContent =
                    "Please enter a lesson title.";
            }
            return;
        }

        if (editingIndex === null) {
            lessons.push(lessonData);
        } else {
            lessons[editingIndex] = lessonData;
        }

        localStorage.setItem("lessons", JSON.stringify(lessons));
        renderLessons();

        editingIndex = null;

        if (submittedMessage) {
            submittedMessage.textContent =
                "Lesson saved successfully!";
        }

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
}

// Share the lesson currently in the form
if (shareLessonBtn) {
    shareLessonBtn.addEventListener("click", function (event) {
        event.preventDefault();

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
        const whatsappURL =
            `https://wa.me/?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank", "noopener");
    });
}


}
