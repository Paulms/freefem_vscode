import * as vscode from 'vscode';
import * as settings from './settings';
import * as vslc from 'vscode-languageclient';
import * as os from 'os';
import * as path from 'path';
import * as process from 'process';
import * as util from 'util';
import * as which from 'which';
var exec = require('child-process-promise').exec;
const whichAsync = util.promisify(which);

let g_context: vscode.ExtensionContext = null;
let g_settings: settings.ISettings = null;

let actualFreeFemExePath: string = null;

export async function getFreeFemExePath() {
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
                    var res = await exec(`"${p}"`);
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
            } else {
                // resolve full path
                actualFreeFemExePath = await whichAsync(g_settings.FreeFemExePath);
            }
        }
    }
    return actualFreeFemExePath;
}

export function activate(context: vscode.ExtensionContext, settings: settings.ISettings) {
    g_context = context;
    g_settings = settings;
}

export function onDidChangeConfiguration(newSettings: settings.ISettings) {
    if (g_settings.FreeFemExePath != newSettings.FreeFemExePath) {
        actualFreeFemExePath = null;
    }
}