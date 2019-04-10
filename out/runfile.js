"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const execpath = require("./execpath");
const fs = require("async-file");
let g_context = null;
let g_settings = null;
let g_terminal = null;
function executeFile() {
    return __awaiter(this, void 0, void 0, function* () {
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        let fname = editor.document.fileName;
        let isfile = yield fs.exists(fname);
        if (g_terminal == null) {
            g_terminal = vscode.window.createTerminal({
                name: "FreeFem++"
            });
        }
        let exepath = yield execpath.getFreeFemExePath();
        g_terminal.show(true);
        g_terminal.sendText(exepath + "-cd " + fname);
    });
}
function activate(context, settings) {
    g_context = context;
    g_settings = settings;
    context.subscriptions.push(vscode.commands.registerCommand('languaje-freefem.executeFile', executeFile));
    vscode.window.onDidCloseTerminal(terminal => {
        if (terminal == g_terminal) {
            g_terminal = null;
        }
    });
}
exports.activate = activate;
//# sourceMappingURL=runfile.js.map