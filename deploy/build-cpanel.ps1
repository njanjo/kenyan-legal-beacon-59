# Packages the site for cPanel's "Setup Node.js App" (full steps: deploy/CPANEL.md).
#
# Usage:
#   powershell -ExecutionPolicy Bypass -File deploy\build-cpanel.ps1
#       Recommended. Builds the frontend + API and produces
#       deploy\out\cpanel-app.zip with node_modules included, so cPanel needs
#       no npm install.
#
#   powershell -ExecutionPolicy Bypass -File deploy\build-cpanel.ps1 -HostInstall
#       Small zip without node_modules. You must then click "Run NPM Install"
#       in cPanel after uploading.
#
# The zip extracts (via File Manager) to the layout below:
#   mwaura-app/
#     package.json          <- cPanel requires one in the application root
#     dist/                 <- built SPA
#     server/
#       package.json, package-lock.json
#       dist/               <- compiled API
#       node_modules/       <- production dependencies (omitted with -HostInstall)

param(
    [switch]$HostInstall
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$outRoot = Join-Path $root 'deploy\out'
$stage = Join-Path $outRoot 'mwaura-app'
$stageServer = Join-Path $stage 'server'
$zip = Join-Path $outRoot 'cpanel-app.zip'

Push-Location $root
try {
    Write-Host '==> Checking prerequisites'
    if (-not (Test-Path (Join-Path $root 'node_modules'))) {
        throw 'Frontend dependencies are missing. Run: npm i'
    }
    if (-not (Test-Path (Join-Path $root 'server\node_modules'))) {
        Write-Host '    Installing API dependencies...'
        npm ci --prefix server
        if ($LASTEXITCODE -ne 0) { throw 'npm ci --prefix server failed' }
    }

    $nodeVersion = (& node -v)
    $nodeMajor = [int](($nodeVersion -replace '^v', '') -split '\.')[0]
    if ($nodeMajor -lt 18) {
        throw "Node >= 18 is required to build (found $nodeVersion)"
    }

    # The Turnstile site key is baked into the bundle at build time.
    $frontendEnv = Join-Path $root '.env'
    if ((Test-Path $frontendEnv) -and ((Get-Content $frontendEnv -Raw) -match 'VITE_TURNSTILE_SITE_KEY=\S')) {
        Write-Host '    Turnstile site key: present in .env'
    } else {
        Write-Warning 'VITE_TURNSTILE_SITE_KEY is not set - the built site will hide the Turnstile widget (the honeypot field still protects the form). Create Cloudflare Turnstile keys and put the site key in .env to enable it.'
    }

    Write-Host '==> Building frontend (dist/)'
    npm run build
    if ($LASTEXITCODE -ne 0) { throw 'Frontend build failed' }

    Write-Host '==> Building API (server/dist/)'
    Push-Location (Join-Path $root 'server')
    try {
        npm run build
        if ($LASTEXITCODE -ne 0) { throw 'API build failed' }
    } finally {
        Pop-Location
    }

    Write-Host '==> Staging package'
    if (Test-Path $outRoot) { Remove-Item $outRoot -Recurse -Force }
    New-Item -ItemType Directory -Path $stage | Out-Null

    Copy-Item (Join-Path $root 'dist') (Join-Path $stage 'dist') -Recurse
    New-Item -ItemType Directory -Path $stageServer | Out-Null
    Copy-Item (Join-Path $root 'server\dist') (Join-Path $stageServer 'dist') -Recurse
    Copy-Item (Join-Path $root 'server\package.json') (Join-Path $stageServer 'package.json')
    Copy-Item (Join-Path $root 'server\package-lock.json') (Join-Path $stageServer 'package-lock.json')
    Copy-Item (Join-Path $root 'server\package.json') (Join-Path $stage 'package.json')

    if (-not $HostInstall) {
        Write-Host '==> Installing production-only dependencies into the package'
        # Fresh install straight into the stage so devDependencies never ship.
        Push-Location $stageServer
        try {
            npm ci --omit=dev
            if ($LASTEXITCODE -ne 0) { throw 'npm ci --omit=dev failed in the staging folder' }
        } finally {
            Pop-Location
        }
    } else {
        Write-Host '==> -HostInstall: omitting node_modules (click "Run NPM Install" in cPanel)'
    }

    Write-Host '==> Creating cpanel-app.zip'
    # NB: Compress-Archive and .NET's CreateFromDirectory both write "\" as the
    # directory separator inside the zip on Windows PowerShell 5.1, which Linux
    # extractors (cPanel's File Manager) mishandle. Build the archive manually
    # and force forward slashes so it extracts correctly on the server.
    Add-Type -AssemblyName System.IO.Compression
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    if (Test-Path $zip) { Remove-Item $zip -Force }
    $stageFull = (Resolve-Path $stage).Path
    $archive = [System.IO.Compression.ZipFile]::Open($zip, [System.IO.Compression.ZipArchiveMode]::Create)
    try {
        foreach ($file in (Get-ChildItem -Path $stageFull -Recurse -File -Force)) {
            $entryName = $file.FullName.Substring($stageFull.Length + 1).Replace('\', '/')
            [void][System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
                $archive, $file.FullName, $entryName, [System.IO.Compression.CompressionLevel]::Optimal)
        }
    } finally {
        $archive.Dispose()
    }

    $sizeMb = [math]::Round((Get-Item $zip).Length / 1MB, 1)
    Write-Host ''
    Write-Host "Done: $zip  ($sizeMb MB)"
    if ($HostInstall) {
        Write-Host 'Next: follow deploy\CPANEL.md - remember to click "Run NPM Install" in cPanel.'
    } else {
        Write-Host 'Next: follow deploy\CPANEL.md - upload this zip and extract it into the application root.'
    }
} finally {
    Pop-Location
}
