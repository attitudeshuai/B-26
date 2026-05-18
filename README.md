# Folder Jar Packer Extension

这是一个简单的 VS Code 插件，允许你直接在资源管理器中右键点击文件夹，将其打包为 JAR 文件。

## ✨ 功能特性

- **右键打包**：在任意文件夹上右键，选择 `打包为补丁 JAR`。
- **自动命名**：生成的 JAR 文件会自动以 `文件夹名-patch-时间戳.jar` 格式命名，避免文件名冲突。
- **路径智能**：JAR 文件会生成在所选文件夹的 **同级目录**（父目录）中。

## 📋 环境要求

- **JDK**: 你的系统必须安装 JDK，并且 `jar` 命令必须在系统的环境变量 `PATH` 中可用。
    - 验证方法：在终端运行 `jar --version` 或 `jar`，如果有输出说明已就绪。
- **自定义配置**: 如果系统 PATH 中找不到 jar，可以在 VS Code 设置中搜索 `Folder Jar Packer`，手动指定 `Jar Path`。

## 🧑‍💻 开发者指南 (如何调试源码)

如果你拿到了本项目的源码包，请按以下步骤开始开发调试：

### 1. 环境准备
确保你的电脑安装了：
- **Node.js**: [下载安装](https://nodejs.org/)
- **Visual Studio Code**: [下载安装](https://code.visualstudio.com/)
- **JDK**: 如果你要测试打包功能，需要安装 Java (见上文环境要求)。

### 2. 初始化项目
解压源码包后，在终端进入项目根目录，运行命令安装依赖：
```bash
npm install
```

### 3. 启动调试 (F5)
1. 用 VS Code 打开项目文件夹 (`folder-jar-packer`)。
2. 直接按键盘上的 **F5** 键。
3. 等待编译完成，VS Code 会自动打开一个新的「扩展开发宿主」窗口。
4. 在新窗口中，你可以像普通用户一样使用这插件（右KeyListener键文件夹 -> 打包）来验证代码修改。

### 4. 重新打包插件 (生成 .vsix)
如果你开发完成并想生成安装包分享给别人：
```bash
npm install -g @vscode/vsce  # 如果没安装过 vsce
vsce package
```

## 📦 目录结构说明

- `src/extension.ts`: **核心代码**。插件的主要逻辑都在这里，包括命令注册和 `jar` 命令调用。
- `package.json`: **插件配置**。定义了插件名称、命令 (`commands`)、菜单 (`menus`) 和配置项。
- `tsconfig.json`: TypeScript 编译配置。

## 🚀 如何使用 (用户篇)

### 方法一：开发调试模式 (无需安装)
如果你想直接运行源码：
1. 用 VS Code 打开 `folder-jar-packer` 文件夹。
2. 按 **F5** 键。这会启动一个新的 VS Code 窗口（扩展开发宿主）。
3. 在新窗口中，打开你的 Java 项目文件夹。
4. 右键点击你想打包的文件夹。
5. 选择 **打包为补丁 JAR**。

### 方法二：打包安装 (推荐)
如果你想在日常工作中一直使用这个插件：
1. **安装打包工具** (只需一次):
   ```bash
   npm install -g @vscode/vsce
   ```
2. **打包插件**:
   在 `folder-jar-packer` 根目录下运行：
   ```bash
   vsce package
   ```
   这会生成一个 `.vsix` 文件（例如 `folder-jar-packer-0.0.1.vsix`）。
3. **安装插件**:
   - 打开 VS Code 扩展视图 (快捷键 `Ctrl+Shift+X` 或 `Cmd+Shift+X`)。
   - 点击右上角的三个点图标 `...`。
   - 选择 **安装 VSIX... (Install from VSIX...)**。
   - 选择刚才生成的 `.vsix` 文件。

## ❓ 常见问题

**Q: 报错 `Unable to locate a Java Runtime`？**
A: 这是因为通过 VS Code 启动时无法找到系统安装的 Java。
   - **解决方法 1**: 确保安装了 JDK (推荐 JDK 17+)。
   - **解决方法 2**: 在 VS Code 设置中搜索 `folderJarPacker.jarPath`，填入你 `jar` 可执行文件的完整路径（例如 `/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home/bin/jar`）。

**Q: 报错 `spawn jar ENOENT`？**
A: 这意味着 VS Code 找不到 `jar` 命令。请确保你安装了 JDK，或者按照上述方法 2 配置路径。

**Q: 生成的 JAR 包里是空的？**
A: 请确保你右键点击的是包含文件的文件夹。插件会打包文件夹内的所有内容。
