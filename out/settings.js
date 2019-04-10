"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function loadSettings() {
    let section = vscode.workspace.getConfiguration('FreeFem++');
    let fflpath = section ? section.get('executablePath', null) : null;
    if (fflpath === "") {
        fflpath = null;
    }
    return {
        FreeFemExePath: fflpath
    };
}
exports.loadSettings = loadSettings;
//# sourceMappingURL=settings.js.map