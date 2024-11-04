const { readFileSync, writeFileSync, readdirSync } = require("fs");
const { join } = require("path");
const core = require("@actions/core");
const github = require("@actions/github");
const githubToken = core.getInput("github-token", { required: true });
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

const toAst = (markdown) => unified().use(parse).parse(markdown);
const toMarkdown = (ast) => unified().use(stringify).stringify(ast);

const mainDir = ".";
let README = readdirSync(mainDir).includes(filePath) ? filePath : "README.md";
const readme = readFileSync(join(mainDir, README), { encoding: "utf8" });
const readmeAST = toAst(readme);

console.log("File Found and Started Processing...");

async function translateNode(node) {
  if (node.type === "text") {
    const translated = await $(node.value, { to: lang });
    node.value = translated.text;
  }
}

async function translateReadme() {
  try {
    const nodes = [];
    visit(readmeAST, (node) => {
      nodes.push(translateNode(node));
    });
    await Promise.all(nodes);

    writeFileSync(
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

async function commitChanges() {
  try {
    console.log("*** Commit and Push ***");
    await git.addConfig("user.name", committer);
    await git.addConfig("user.email", `${committer}@users.noreply.github.com`);
    await git.add(".");
    await git.commit(`${commitMessage} (${commitOptions})`);
    console.log("*** Committed Successfully ***");
    
    // Access the full repository name
    const fullRepoName = `${github.context.repo.owner}/${github.context.repo.repo}`;
    
    await git.push(`https://${encodeURIComponent(githubToken)}@github.com/${fullRepoName}.git`);
    console.log("*** Pushed to Remote Repository ***");
  } catch (error) {
    console.error("*** Git Push Failed *** ", error.message);
    throw error;
  }
}

// Execute the translation process
translateReadme();
