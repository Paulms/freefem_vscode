import * as vscode from 'vscode';

export interface ISettings {
    FreeFemExePath?: string;
}

export function loadSettings(): ISettings {
    let section = vscode.workspace.getConfiguration('FreeFem++');

    let fflpath = section ? section.get<string>('executablePath', null) : null

    if (fflpath==="") {
        fflpath = null
    }

    return {        
        FreeFemExePath: fflpath
    };
}