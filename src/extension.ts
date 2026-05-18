import * as vscode from 'vscode';
import * as path from 'path';
import { exec } from 'child_process';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "folder-jar-packer" is now active!');

    let disposable = vscode.commands.registerCommand('extension.packageToPatchJar', (folderUri: vscode.Uri) => {
        // 1. Get the path of the right-clicked folder
        if (!folderUri || !folderUri.fsPath) {
             vscode.window.showErrorMessage('请右键点击一个文件夹使用此命令。');
             return;
        }

        const folderPath = folderUri.fsPath;
        const folderName = path.basename(folderPath);
        const parentDir = path.dirname(folderPath);

        vscode.window.showInformationMessage(`准备打包文件夹: ${folderName}`);

        // 2. Construct the JAR command
        // Get jar path from configuration
        const config = vscode.workspace.getConfiguration('folderJarPacker');
        const jarCommand = config.get<string>('jarPath') || 'jar';
        
        // We want to create the jar in the PARENT directory of the selected folder
        // The jar will contain the contents OF the selected folder
        const timestamp = new Date().getTime();
        const jarName = `${folderName}-patch-${timestamp}.jar`;
        const jarPath = path.join(parentDir, jarName);
        
        // Command interpretation:
        // jar -cf [jarPath] -C [folderPath] .
        // buffer max size 10MB to be safe
        const command = `"${jarCommand}" -cf "${jarPath}" -C "${folderPath}" .`;

        exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
            if (error) {
                const errorMessage = error.message;
                if (errorMessage.includes("Unable to locate a Java Runtime")) {
                     vscode.window.showErrorMessage(`打包失败: 未找到 Java 运行环境。请安装 Java 或在设置中配置 'folderJarPacker.jarPath'。`);
                } else {
                     vscode.window.showErrorMessage(`打包 JAR 失败: ${error.message}`);
                }
                console.error(stderr);
                return;
            }
            
            vscode.window.showInformationMessage(`成功创建补丁包: ${jarName}`);
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
