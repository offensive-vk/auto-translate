const { readFileSync, writeFileSync, readdirSync } = require("fs");
const { join } = require("path");
const core = require("@actions/core");
const githubToken = core.getInput("github-token");
const committer = core.getInput("committer") || "github-actions[bot]";
const commitMessage = core.getInput("commit-message") || `Translated and Added README`;
const commitOptions = core.getInput("commit-options") || "";
const filePath = core.getInput("file") || "README.md";
const lang = core.getInput("language") || "es";  // Default is 'es' if not provided
const $ = require("@iamtraction/google-translate");
const simpleGit = require("simple-git");
const git = simpleGit();
const unified = require("unified");
const parse = require("remark-parse");
const stringify = require("remark-stringify");
const visit = require("unist-util-visit");

// Convert markdown to Abstract Syntax Tree (AST) and vice versa
const toAst = (markdown) => unified().use(parse).parse(markdown);
const toMarkdown = (ast) => unified().use(stringify).stringify(ast);

// Identify README file
const mainDir = ".";
let README = readdirSync(mainDir).includes(filePath || "readme.md") ? "readme.md" : "README.md";
const readme = readFileSync(join(mainDir, README), { encoding: "utf8" });
const readmeAST = toAst(readme);

console.log("File Found and Started Processing...");

// Translate individual nodes asynchronously
async function translateNode(node) {
  if (node.type === "text") {
    const translated = await $(node.value, { to: lang });
    node.value = translated.text;
  }
}

// Main translation function
async function translateReadme() {
  try {
    visit(readmeAST, async (node) => await translateNode(node));
    await writeFileSync(
      join(mainDir, `README.${lang}.md`),
      toMarkdown(readmeAST),
      "utf8"
    );
    console.log(`README.${lang}.md Translated.`);
    await commitChanges();
    console.log("*** Script Terminated Successfully ***");
  } catch (error) {
    console.error("Error during translation:", error.message);
    process.exit(1);
  }
}

// Commit translated file using provided options and committer details
async function commitChanges() {
  try {
    console.log("*** Commit and Push ***");
    await git.addConfig("user.name", committer);
    await git.addConfig("user.email", `${committer}@users.noreply.github.com`);
    await git.add(".");
    await git.commit(`${commitMessage} (${commitOptions})`);
    console.log("*** Committed Successfully ***");
    await git.push(`https://${githubToken}@github.com/${process.env.GITHUB_REPOSITORY}.git`);
    console.log("*** Pushed to Remote Repository ***");
  } catch (error) {
    console.error("Git commit/push failed:", error.message);
    throw error;
  }
}

// Execute the translation process
translateReadme();
