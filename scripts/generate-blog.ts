import Markdoc from "@markdoc/markdoc";
import { PathLike } from "fs";
import { formatDateShort } from "./date";
import * as fs from "fs/promises";
import * as path from "path";
import * as yaml from "js-yaml";

const BLOG_POST_DIR = path.join(__dirname, "../blog");
const BLOG_POST_TEMPLATE_FILE = path.join(__dirname, "./template.html");

async function* getFiles(dir) {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
        const res = path.resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            yield* getFiles(res);
        } else {
            yield res;
        }
    }
}

async function gatherMarkdocPosts() {
    const directoryPath = path.join(__dirname, "../content");
    const markdown = [];
    for await (const f of getFiles(directoryPath)) {
        if (f.endsWith(".md") && !f.includes("node_modules")) {
            markdown.push(f);
        }
    }
    return markdown;
}

type HTMLPage = { fileName: string; contents: string };
async function renderHTML() {
    const markdown = await gatherMarkdocPosts();
    const TEMPLATE = await fs.readFile(BLOG_POST_TEMPLATE_FILE, "utf-8");
    const fullHTMLPages: HTMLPage[] = [];

    const promises = markdown.map(async (fullFileName) => {
        const contents = await fs.readFile(fullFileName, "utf-8");
        const fileName = path.parse(fullFileName).base;

        const ast = Markdoc.parse(contents);
        const content = Markdoc.transform(ast);
        const html = Markdoc.renderers.html(content);

        const frontmatter = ast.attributes.frontmatter
            ? yaml.load(ast.attributes.frontmatter)
            : {};

        const fullHTML = TEMPLATE.replace(/{{ TITLE }}/g, frontmatter.title)
            .replace(/{{ SUBTITLE }}/g, frontmatter.subtitle)
            .replace("{{ CONTENT }}", html)
            .replace("{{ DATE }}", formatDateShort(frontmatter.date))
            .replace(
                "window.INITIAL_STATE = {}",
                `window.INITIAL_STATE = { fileName: "${fileName}", ...(${JSON.stringify(
                    frontmatter
                )})}`
            );

        fullHTMLPages.push({ fileName, contents: fullHTML });
    });

    await Promise.all(promises);

    return fullHTMLPages;
}

async function saveHTML() {
    // Clear all html files in blog folder
    for (const file of await fs.readdir(BLOG_POST_DIR)) {
        await fs.unlink(path.join(BLOG_POST_DIR, file));
    }

    const htmlPages = await renderHTML();
    htmlPages.forEach(async (htmlPage) => {
        const toWritePath = path
            .join(BLOG_POST_DIR, htmlPage.fileName)
            .replace(".md", ".html");
        console.log("Writing ", toWritePath);
        fs.writeFile(toWritePath, htmlPage.contents, "utf-8");
    });
}

async function run() {
    saveHTML();
}

run();
