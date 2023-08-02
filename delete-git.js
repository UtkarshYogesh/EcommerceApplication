const fs = require('fs');
const path = require('path');

const gitDir = path.join(__dirname, '.git');

// Function to delete a directory and its contents recursively
function deleteDirectory(directory) {
  if (fs.existsSync(directory)) {
    fs.readdirSync(directory).forEach((file) => {
      const filePath = path.join(directory, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        deleteDirectory(filePath); // Recursive call for subdirectories
      } else {
        fs.unlinkSync(filePath); // Delete files
      }
    });
    fs.rmdirSync(directory); // Delete the empty directory
    console.log(`Deleted: ${directory}`);
  } else {
    console.log(`Directory not found: ${directory}`);
  }
}

// Call the deleteDirectory function to remove .git directory
deleteDirectory(gitDir);
