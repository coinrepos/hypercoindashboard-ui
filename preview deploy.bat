@echo off
echo 📦 Running Git Snapshot...
powershell -ExecutionPolicy Bypass -File git-snapshot.ps1

echo 🛠️ Building app...
npm run build

echo 🚀 Preview available at http://localhost:3000
serve -s build
pause
