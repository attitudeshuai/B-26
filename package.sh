#!/bin/bash

# 退出脚本如果任何命令失败
set -e

echo "📦 开始打包 Folder Jar Packer 插件..."

# 1. 检查并安装依赖
if [ ! -d "node_modules" ]; then
    echo "📥 未检测到 node_modules，正在安装依赖..."
    npm install
else
    echo "✅ 依赖已安装"
fi

# 2. 清理构建产物 (为了打出纯净的源码包)
echo "🧹 清理构建产物..."
rm -rf out
rm -f *.vsix
rm -f *.zip

# 3. 打包源码
ZIP_NAME="folder-jar-packer-source.zip"
echo "� 正在打包源码到 $ZIP_NAME ..."

# 使用 zip 命令打包，排除 unnecessary files
# -r: 递归
# -x: 排除模式
zip -r "$ZIP_NAME" . \
    -x "node_modules/*" \
    -x ".git/*" \
    -x ".vscode-test/*" \
    -x ".DS_Store" \
    -x "*.vsix" \
    -x "out/*"

echo "🎉 源码包已生成: $ZIP_NAME"
echo "👉 你可以将此文件发送给他人，他们解压后运行 'npm install' 即可开始调试。"
