'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as settings from './settings';
import * as execpath from './execpath';

let g_settings: settings.ISettings = null;
let g_context: vscode.ExtensionContext = null;

export async function activate(context: vscode.ExtensionContext) {  
    g_context = context;

    console.log('Activating extension FreeFem');

    g_settings = settings.loadSettings();

    // Config change
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(configChanged));

    // Language settings
    vscode.languages.setLanguageConfiguration('FreeFem++');

    // Active features from other files
    execpath.activate(context, g_settings);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

function configChanged(params) {
    let newSettings = settings.loadSettings();

    execpath.onDidChangeConfiguration(newSettings);    
}