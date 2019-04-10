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
const os = require("os");
const path = require("path");
const process = require("process");
const util = require("util");
const which = require("which");
var exec = require('child-process-promise').exec;
const whichAsync = util.promisify(which);
let g_context = null;
let g_settings = null;
let actualFreeFemExePath = null;
function getFreeFemExePath() {
    return __awaiter(this, void 0, void 0, function* () {
        if (actualFreeFemExePath == null) {
            if (g_settings.FreeFemExePath == null) {
                let homedir = os.homedir();
                let pathsToSearch = [];
                if (process.platform == "win32") {
                    pathsToSearch = ["FreeFem++.exe"
                    ];
                }
                else if (process.platform == "darwin") {
                    pathsToSearch = ["FreeFem++"];
                }
                else {
                    pathsToSearch = ["FreeFem++"];
                }
                let foundFreeFem = false;
                for (let p of pathsToSearch) {
                    try {
                        var res = yield exec(`${p}`);
                        foundFreeFem = true;
                        break;
                    }
                    catch (e) {
                    }
                }
                if (!foundFreeFem) {
                    actualFreeFemExePath = g_settings.FreeFemExePath;
                }
            }
            else {
                if (g_settings.FreeFemExePath.includes(path.sep)) {
                    actualFreeFemExePath = g_settings.FreeFemExePath;
                }
                else {
                    // resolve full path
                    actualFreeFemExePath = yield whichAsync(g_settings.FreeFemExePath);
                }
            }
        }
        return actualFreeFemExePath;
    });
}
exports.getFreeFemExePath = getFreeFemExePath;
function activate(context, settings) {
    g_context = context;
    g_settings = settings;
}
exports.activate = activate;
function onDidChangeConfiguration(newSettings) {
    if (g_settings.FreeFemExePath != newSettings.FreeFemExePath) {
        actualFreeFemExePath = null;
    }
}
exports.onDidChangeConfiguration = onDidChangeConfiguration;
//# sourceMappingURL=execpath.js.map