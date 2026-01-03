# 步骤

- 用 VS Code 打开这个文件夹 .../vs-code-cp
- 按 F5（或命令面板运行 Developer: Run Extension）
- 会弹出一个新的 VS Code 窗口（扩展宿主）
- 在新窗口里打开任意文件，选中几行，按 Cmd+Alt+C
- 粘贴即可看到格式化后的内容


# 生成 .vsix 文件
1. 在插件目录运行：
`npm install -g @vscode/vsce`

2. 在插件目录执行：
`vsce package`

3. 会生成一个 *.vsix 文件

安装
- VS Code 里 Extensions 面板 → 右上角 ... → Install from VSIX...
