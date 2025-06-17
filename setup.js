import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filename = `projectId.js`;
const filepath1 = path.join(__dirname, filename);
const filepath2 = path.join(__dirname, "sanity", filename);
const filepath3 = path.join(__dirname, "comment-api", filename);

const filepaths = [filepath1, filepath2, filepath3];

const fileContent = `
    const projectId = "${process.env.PROJECT_ID}" ;

    export default projectId;
`;

const secretFileContent = `
  const projectId = "${process.env.PROJECT_ID}" ;
  const token     = "${process.env.TOKEN}" ;

  export { projectId, token };
`;


for (const [index, filepath] of filepaths.entries()) {
  const toWrite = index !== 2 ? fileContent : secretFileContent;
  
  if (fs.existsSync(filepath)) {
    console.error(`\x1b[31mFile ${filename} at ${filepath} already exists.\x1b[0m`);
  } else {
    try {
      fs.writeFileSync(filepath, toWrite);
      console.log(`File ${filename} created successfully.`);
    } catch (error) {
      console.error(`Error creating file: ${error.message}`);
      process.exit(1);
    }
  }
}
