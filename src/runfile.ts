import * as vscode from 'vscode';
import * as path from 'path';
import * as os from 'os';
import * as vslc from 'vscode-languageclient';
import * as settings from './settings';
import * as execpath from './execpath';
import * as fs from 'async-file';

let g_context: vscode.ExtensionContext = null;
let g_settings: settings.ISettings = null;

let g_terminal: vscode.Terminal = null

async function executeFile() {
  var editor = vscode.window.activeTextEditor;
  if (!editor) {
      return;
  }
  let fname = editor.document.fileName;
  let isfile = await fs.exists(fname)
  if (g_terminal == null) {
    g_terminal = vscode.window.createTerminal(
        {
            name: "FreeFem++"});
    }
  let exepath = await execpath.getFreeFemExePath();
  g_terminal.show(true);
  g_terminal.sendText(exepath+"-cd "+fname);
}

export function activate(context: vscode.ExtensionContext, settings: settings.ISettings) {
  g_context = context;
  g_settings = settings;

  context.subscriptions.push(vscode.commands.registerCommand('languaje-freefem.executeFile', executeFile));

    vscode.window.onDidCloseTerminal(terminal => {
      if (terminal == g_terminal) {
          g_terminal = null;
      }
  })
}