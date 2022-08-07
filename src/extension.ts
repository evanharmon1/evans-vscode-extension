// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { getCurrentXPath } from "./xml/getCurrentXPath";
const fs = require('fs');
const path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "evans-vscode-extension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// Convert the selected text to dot notation - e.g. convert this/is/a/path to this.is.a.path
	let dotNotation = vscode.commands.registerCommand('extension.dotNotation', () => {
		let editor = vscode.window.activeTextEditor;

		if (editor) {
			let document = editor.document;
			let selection = editor.selection;

			// Get the text of the selection
			let textSelection = document.getText(selection);
			let dotNotation = textSelection.split('/').join('.');
			editor.edit(editBuilder => {
				editBuilder.replace(selection, dotNotation);
			});
		}
	});
	context.subscriptions.push(dotNotation);

	let splitTextIntoFilesUserInput = vscode.commands.registerCommand('extension.splitTextIntoFilesUserInput', async () => {
		let editor = vscode.window.activeTextEditor;

		if (editor) {
			let document = editor.document;
			let selection = editor.selection;
			// Get the text of the selection
			let textSelection = document.getText(selection);

			// Get pattern to split the text on from user input box
			let splitOnPattern = await vscode.window.showInputBox({
				prompt: "Enter text pattern that you want the text selection to be split on."
			});
			
			// Split the selected text on the splitOnPattern and store in array
			let arr = textSelection.split(splitOnPattern);

			 // save items as new files
			arr.forEach((data, idx)=> {
				let firstRow = data.split(splitOnPattern, 1);
				const filePath = path.join(vscode.workspace.rootPath, `${firstRow}.md`);

				// write to file
				fs.writeFileSync(`${filePath}`, data, 'utf8');

				const openPath = vscode.Uri.file(filePath);
				vscode.workspace.openTextDocument(openPath).then(doc => {
					vscode.window.showTextDocument(doc, vscode.ViewColumn.Beside);
				});
			});
		}
	});
	context.subscriptions.push(splitTextIntoFilesUserInput);

	let splitTextIntoDoubleNewLine = vscode.commands.registerCommand('extension.splitTextIntoDoubleNewLine', async () => {
		let editor = vscode.window.activeTextEditor;

		if (editor) {
			let document = editor.document;
			let selection = editor.selection;
			// Get the text of the selection
			let textSelection = document.getText(selection);

			// Pattern to split the text on
			let splitOnPattern = '\n\n';
			
			// Split the selected text on the splitOnPattern and store in array
			let arr = textSelection.split(splitOnPattern);

			 // save items as new files
			arr.forEach((data, idx)=> {
				let firstRow = data.split(splitOnPattern, 1);
				const filePath = path.join(vscode.workspace.rootPath, `${firstRow}.md`);

				// write to file
				fs.writeFileSync(`${filePath}`, data, 'utf8');

				const openPath = vscode.Uri.file(filePath);
				vscode.workspace.openTextDocument(openPath).then(doc => {
					vscode.window.showTextDocument(doc, vscode.ViewColumn.Beside);
				});
			});
		}
	});
	context.subscriptions.push(splitTextIntoDoubleNewLine);

	let splitTextIntoTripleNewLine = vscode.commands.registerCommand('extension.splitTextIntoTripleNewLine', async () => {
		let editor = vscode.window.activeTextEditor;

		if (editor) {
			let document = editor.document;
			let selection = editor.selection;
			// Get the text of the selection
			let textSelection = document.getText(selection);

			// Pattern to split the text on
			let splitOnPattern = '\n\n\n';
			
			// Split the selected text on the splitOnPattern and store in array
			let arr = textSelection.split(splitOnPattern);

			 // save items as new files
			arr.forEach((data, idx)=> {
				let firstRow = data.split(splitOnPattern, 1);
				const filePath = path.join(vscode.workspace.rootPath, `${firstRow}.md`);

				// write to file
				fs.writeFileSync(`${filePath}`, data, 'utf8');

				const openPath = vscode.Uri.file(filePath);
				vscode.workspace.openTextDocument(openPath).then(doc => {
					vscode.window.showTextDocument(doc, vscode.ViewColumn.Beside);
				});
			});
		}
	});
	context.subscriptions.push(splitTextIntoTripleNewLine);

	// Function for getting the current XPath of an XML document
    context.subscriptions.push(
        vscode.commands.registerTextEditorCommand('extension.getCurrentXPath', getCurrentXPath)
    );
}

// this method is called when your extension is deactivated
export function deactivate() {}
