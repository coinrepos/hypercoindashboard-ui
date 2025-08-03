Write-Host " Rewriting import paths..."

# Get all .js and .jsx files inside /src recursively
Get-ChildItem -Path "./src" -Include *.js, *.jsx -Recurse | ForEach-Object {
    $file = $_.FullName
    $content = Get-Content $file -Raw

    # Fix paths from './components/XYZ' to './XYZ'
    $newContent = $content -replace "from\s+'\.\/components\/", "from './"
    $newContent = $newContent -replace 'from\s+"\.\/components\/', 'from "./'

    # Save updated content
    if ($newContent -ne $content) {
        Set-Content -Path $file -Value $newContent
        Write-Host " Fixed: $file"
    }
}
Write-Host "Done: All imports rewritten successfully"



