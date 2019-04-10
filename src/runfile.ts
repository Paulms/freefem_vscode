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
  if (isfile && !(editor.document.isDirty)) {
    executeCode('include(raw"' + fname + '")')
  }

  if (g_terminal == null) {
    startREPLConn()
    let exepath = await execpath.getFreeFemExePath();
    g_terminal = vscode.window.createTerminal(
        {
            name: "FreeFem++", 
            shellArgs: ['-cd', fname],
            env: {
                FREEFEM_EDITOR: `"${fname}"`
            }});
    }
g_terminal.show(true);
}