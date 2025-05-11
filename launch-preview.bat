@echo off
cd /d %~dp0
echo 🛠️ Running Git Snapshot Tool...
powershell -ExecutionPolicy Bypass -File git-snapshot.ps1

echo 🚀 Building the project...
npm run build

echo 🔥 Serving the build at http://localhost:3000
serve -s build
pause
