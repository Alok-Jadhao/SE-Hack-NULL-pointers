const Quiz = require('../models/Quiz');
const Course = require('../models/Course');
const upload = require('../utils/fileUpload');
const xlsx = require('xlsx');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

// Create a new quiz
exports.createQuiz = async (req, res) => {
    try {
        const quiz = new Quiz({
            ...req.body,
            course: req.body.courseId
        });
        await quiz.save();
        
        // Update the course with the quiz reference
        await Course.findByIdAndUpdate(
            req.body.courseId,
            { 
                $push: { 
                    'content.$[elem].quiz': quiz._id 
                }
            },
            { 
                arrayFilters: [{ 'elem._id': req.body.contentId }],
                new: true 
            }
        );

        res.status(201).json(quiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all quizzes for a course
exports.getCourseQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find({ course: req.params.courseId });
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific quiz
exports.getQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a quiz
exports.updateQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updated: Date.now() },
            { new: true }
        );
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a quiz
exports.deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        
        // Remove quiz reference from course
        await Course.findByIdAndUpdate(
            quiz.course,
            { 
                $unset: { 
                    'content.$[].quiz': 1 
                }
            }
        );

        res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Submit quiz attempt
exports.submitQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        // Calculate score
        const score = calculateScore(quiz.questions, req.body.answers);
        const passed = score >= quiz.passingScore;

        res.json({ score, passed });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Helper function to calculate quiz score
function calculateScore(questions, answers) {
    let totalPoints = 0;
    let earnedPoints = 0;

    questions.forEach((question, index) => {
        totalPoints += question.points;
        if (answers[index] && 
            question.options[answers[index]].isCorrect) {
            earnedPoints += question.points;
        }
    });

    return (earnedPoints / totalPoints) * 100;
}

// Upload a quiz
exports.uploadQuiz = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const filePath = req.file.path;
        const fileType = path.extname(req.file.originalname).toLowerCase();
        let quizData;

        // Parse file based on type
        if (fileType === '.json') {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            quizData = JSON.parse(fileContent);
        } else if (fileType === '.csv') {
            const results = [];
            await new Promise((resolve, reject) => {
                fs.createReadStream(filePath)
                    .pipe(csv())
                    .on('data', (data) => results.push(data))
                    .on('end', () => {
                        quizData = processCSVData(results);
                        resolve();
                    })
                    .on('error', reject);
            });
        } else if (['.xlsx', '.xls'].includes(fileType)) {
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(worksheet);
            quizData = processExcelData(data);
        }

        // Create new quiz with uploaded data
        const quiz = new Quiz({
            ...req.body,
            uploadedQuizData: quizData,
            attachments: [{
                fileName: req.file.originalname,
                fileUrl: req.file.path,
                fileType: fileType
            }]
        });

        await quiz.save();
        res.status(201).json(quiz);

    } catch (error) {
        console.error('Error uploading quiz:', error);
        res.status(400).json({ message: error.message });
    }
};

// Helper functions to process different file formats
function processCSVData(data) {
    // Transform CSV data into quiz format
    // Implement based on your CSV structure
    return {
        questions: data.map(row => ({
            questionText: row.question,
            options: [
                { text: row.option1, isCorrect: row.correct === '1' },
                { text: row.option2, isCorrect: row.correct === '2' },
                { text: row.option3, isCorrect: row.correct === '3' },
                { text: row.option4, isCorrect: row.correct === '4' }
            ],
            points: parseInt(row.points) || 1
        }))
    };
}

function processExcelData(data) {
    // Similar to CSV processing but for Excel format
    return {
        questions: data.map(row => ({
            questionText: row.Question,
            options: [
                { text: row.Option1, isCorrect: row.CorrectAnswer === 1 },
                { text: row.Option2, isCorrect: row.CorrectAnswer === 2 },
                { text: row.Option3, isCorrect: row.CorrectAnswer === 3 },
                { text: row.Option4, isCorrect: row.CorrectAnswer === 4 }
            ],
            points: row.Points || 1
        }))
    };
} 