Write-Host "🔍 GIT STATUS"
git status
Write-Host ""

Write-Host "📜 LAST 5 COMMITS"
git log --oneline -n 5
Write-Host ""

Write-Host "🗂️  TRACKED FILES CHANGED"
git diff --name-only
Write-Host ""

Write-Host "🧪 ESLINT CHECK (src/)"
npx eslint "src/**/*.jsx"
