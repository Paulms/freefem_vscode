import * as vscode from 'vscode';
import * as settings from './settings';
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
                pathsToSearch = ["FreeFem++.exe",
                path.join("C:", "Programs Files", "FreeFem++", "FreeFem++.exe")      
                ];
            }
            else if (process.platform == "darwin") {
                pathsToSearch = ["FreeFem++",
                path.join("/", "usr", "local", "bin", "FreeFem++"),
                path.join("/", "usr", "local", "share", "frefem++", "FreeFem++"),
                path.join("/", "usr", "local", "lib", "f++", "FreeFem++")
                ];
            }
            else {
                pathsToSearch = ["FreeFem++",
                path.join("/", "usr", "local", "bin", "FreeFem++"),
                path.join("/", "usr", "local", "share", "frefem++", "FreeFem++"),
                path.join("/", "usr", "local", "lib", "f++", "FreeFem++")
                ];
            }
            let foundFreeFem = false;
            let testFile = path.join(g_context.extensionPath, 'scripts', 'dummy.edp');
            for (let p of pathsToSearch) {
                try {
                    var res = await exec(p + " -v 0 " + testFile);
                    foundFreeFem = true;
                    actualFreeFemExePath = p;
                    break;
                }
                catch (e) {
                }
            }
            if (!foundFreeFem) {
                actualFreeFemExePath = "FreeFem++"
                vscode.window.showErrorMessage( 'Path to FreeFem++ executable has not been set.' )
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