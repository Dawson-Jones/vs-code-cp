const path = require("path");
const vscode = require("vscode");

function getRelativePath(uri) {
  if (!uri) {
    return "";
  }
  const relative = vscode.workspace.asRelativePath(uri, false);
  if (relative && relative !== uri.fsPath) {
    return relative;
  }
  return path.basename(uri.fsPath);
}

function getLineRange(selection) {
  let startLine = selection.start.line + 1;
  let endLine = selection.end.line + 1;
  if (selection.end.character === 0 && selection.end.line > selection.start.line) {
    endLine -= 1;
  }
  if (endLine < startLine) {
    endLine = startLine;
  }
  return { startLine, endLine };
}

function buildBlock(relativePath, range, text) {
  let cleaned = text.replace(/\r?\n$/, "");
  return `${relativePath}:${range.startLine}-${range.endLine}\n\`\`\`\n${cleaned}\n\`\`\`\n\n`;
}

function activate(context) {
  const disposable = vscode.commands.registerCommand(
    "copySelectionWithLocation.copy",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage("No active editor.");
        return;
      }

      const selection = editor.selection;
      if (!selection || selection.isEmpty) {
        vscode.window.showInformationMessage("No selection to copy.");
        return;
      }

      const doc = editor.document;
      const relativePath = getRelativePath(doc.uri);
      const text = doc.getText(selection);
      const range = getLineRange(selection);
      const output = buildBlock(relativePath, range, text);

      await vscode.env.clipboard.writeText(output);
      vscode.window.showInformationMessage("Copied selection with location.");
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
