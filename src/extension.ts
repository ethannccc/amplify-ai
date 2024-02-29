import * as vscode from "vscode";
import path from "path";

export function activate(context: vscode.ExtensionContext) {
  let currentPanel: vscode.WebviewPanel | undefined = undefined;

  context.subscriptions.push(
    vscode.commands.registerCommand("ai-mplify.start", () => {
      const columnDisplayed =
        vscode.window.activeTextEditor?.viewColumn || undefined;

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
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Amplify AI</title>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0,0"
      />
      <style>
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Oswald:wght@200..700&display=swap");
  
        * {
          font-family: "Inter", sans-serif;
          margin: 0;
          padding: 0;
        }
  
        .chat-container {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          background-color: #202124;
        }
  
        input {
          color: #8b8e8f;
          font-size: 14px;
          font-weight: 500;
          border: 1px solid #7b8285;
        }
  
        .chat-messages {
          width: 140vh;
          display: flex;
          justify-content: center;
          align-items: end;
          padding: 1rem;
        }
  
        .chat-message.received {
          background-color: #f1f0f0;
          padding: 8px 12px;
        }
  
        .chat-message.sent {
          color: #fff;
          padding: 8px 12px;
          text-align: right;
        }
  
        .chat-send {
          position: relative;
          margin-bottom: 1rem;
        }
  
        input[type="text"] {
          color: #8b8e8f;
          font-size: 14px;
          font-weight: 600;
          border: 1px solid #7b8285;
          padding-right: 80px;
          border-radius: 15px;
          background-color: #202124;
          width: 35vw;
          padding: 1rem;
        }
  
        button {
          position: absolute;
          top: 50%;
          right: 0.5rem;
          transform: translateY(-50%);
          width: 50px;
          padding: 6px;
          border: none;
          border-radius: 8px;
          background-color: #3d3e42;
          color: #fff;
          cursor: pointer;
          transition: background-color 0.3s;
          display: flex;
          justify-content: center;
          align-items: center;
        }
  
        button:hover {
          background-color: #2f3032;
        }
      </style>
    </head>
  
    <body>
      <div class="chat-container">
        <!--<header>
          <h1>
            AI-mplify
          </h1>
        </header>-->
        <div class="chat-messages">
          <div class="chat-send">
            <input type="text" id="user-input" placeholder="Ask a question..." />
            <button onclick="sendMessage()">
              <span class="material-symbols-outlined"> arrow_forward </span>
            </button>
          </div>
          <!--<p>Property of Amplify Education</p>-->
        </div>
      </div>
    </body>
  
    <script>
      function handleUserInput(event) {
        if (event.key === "Enter") {
          sendMessage();
        }
      }
  
      function sendMessage() {}
    </script>
  </html>
  `;
}

export function deactivate() {}
