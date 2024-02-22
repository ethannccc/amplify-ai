import * as vscode from "vscode";
import path from "path";

export function activate(context: vscode.ExtensionContext) {
    let currentPanel: vscode.WebviewPanel | undefined = undefined;

  context.subscriptions.push(
    vscode.commands.registerCommand("ai-mplify.start", () => {
        const columnDisplayed = vscode.window.activeTextEditor?.viewColumn || undefined;

    if (currentPanel) {
        currentPanel.reveal(columnDisplayed);
    } else {
        currentPanel = vscode.window.createWebviewPanel(
            "aiamplify",
            "AI-mplify",
            vscode.ViewColumn.One,
            {
              enableScripts: true,
              localResourceRoots: [
                vscode.Uri.file(path.join(context.extensionPath, "media")),
              ],
            }
          );
    }
      currentPanel.webview.html = getWebviewContent();
    })
  );
}

function getWebviewContent() {
  return /* html */ `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Amplify AI</title>
		</head>

		<body>
			<h1>AI-mplify</h1>
			<img src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg">
		</body>
		</html>`;
}

export function deactivate() {}
