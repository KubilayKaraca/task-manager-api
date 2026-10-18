const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '../../data', 'tasks.json');

function readTasksFromFile() {
    try {
        const content = fs.readFileSync(FILE, 'utf8');
        return JSON.parse(content);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('File not found:', err.message);
            return [];
        }
        if (err instanceof SyntaxError) {
            console.error('Error parsing tasks from file:', err.message);
            return [];
        }
        console.error('Error reading tasks from file:', err.message);
        return [];
    }
}

function backupFile() {
    if (!fs.existsSync(FILE)) {
        return;
    }
    fs.copyFileSync(FILE, `${FILE}.bak`);
} 

function writeTasksToFile(tasks) {
    try {
        const temporaryFILE = FILE + '.tmp';
        const content_to_write = JSON.stringify(tasks, null, 2);
        fs.writeFileSync(temporaryFILE, content_to_write, 'utf8');
        fs.renameSync(temporaryFILE, FILE);
        return true;
    } catch (err) {
        console.error('Error writing tasks to file:', err.message);
        return false;
    }
}
module.exports = { readTasksFromFile, writeTasksToFile, backupFile };