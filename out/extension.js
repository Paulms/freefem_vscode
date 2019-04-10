'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const settings = require("./settings");
const execpath = require("./execpath");
const runfile = require("./runfile");
let g_settings = null;
let g_context = null;
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        g_context = context;
        console.log('Activating extension FreeFem');
        g_settings = settings.loadSettings();
        // Config change
        context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(configChanged));
        // Active features from other files
        execpath.activate(context, g_settings);
        runfile.activate(context, g_settings);
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
function configChanged(params) {
    let newSettings = settings.loadSettings();
    execpath.onDidChangeConfiguration(newSettings);
}
//# sourceMappingURL=extension.js.map