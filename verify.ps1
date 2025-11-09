# DevOps Environment Toolkit - Verification Script (Windows PowerShell)
# Author: H A R S H H A A
# License: MIT

# Set error action preference
$ErrorActionPreference = "Stop"

# Colors for output
$Colors = @{
    Red = "Red"
    Green = "Green"
    Yellow = "Yellow"
    Blue = "Cyan"
    Purple = "Magenta"
    Cyan = "Cyan"
    White = "White"
}

# ASCII Art Banner
function Show-Banner {
    Write-Host ""
    Write-Host "    ╔══════════════════════════════════════════════════════════════╗" -ForegroundColor $Colors.Cyan
    Write-Host "    ║                                                              ║" -ForegroundColor $Colors.Cyan
    Write-Host "    ║    🔍 DevOps Environment Toolkit - Verification Script 🔍    ║" -ForegroundColor $Colors.Cyan
    Write-Host "    ║                                                              ║" -ForegroundColor $Colors.Cyan
    Write-Host "    ║    Checking your DevOps environment setup...                ║" -ForegroundColor $Colors.Cyan
    Write-Host "    ║                                                              ║" -ForegroundColor $Colors.Cyan
    Write-Host "    ╚══════════════════════════════════════════════════════════════╝" -ForegroundColor $Colors.Cyan
    Write-Host ""
}

# Logging functions
function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor $Colors.Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[✓] $Message" -ForegroundColor $Colors.Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[!] $Message" -ForegroundColor $Colors.Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[✗] $Message" -ForegroundColor $Colors.Red
}

# Check if command exists and get version
function Test-Command {
    param(
        [string]$Command,
        [string]$Name,
        [string]$RequiredVersion = $null
    )
    
    try {
        if (Get-Command $Command -ErrorAction SilentlyContinue) {
            $version = Get-CommandVersion -Command $Command
            if ($version) {
                Write-Success "$Name`: $version"
                return $true
            } else {
                Write-Success "$Name`: Installed (version unknown)"
                return $true
            }
        } else {
            Write-Error "$Name`: Not installed"
            return $false
        }
    } catch {
        Write-Error "$Name`: Not installed"
        return $false
    }
}

# Get version of a command
function Get-CommandVersion {
    param([string]$Command)
    
    try {
        switch ($Command) {
            "docker" {
                $version = docker --version 2>$null
                if ($version -match '(\d+\.\d+\.\d+)') {
                    return $Matches[1]
                }
            }
            "docker-compose" {
                $version = docker-compose --version 2>$null
                if ($version -match '(\d+\.\d+\.\d+)') {
                    return $Matches[1]
                }
            }
            "git" {
                $version = git --version 2>$null
                if ($version -match '(\d+\.\d+\.\d+)') {
                    return $Matches[1]
                }
            }
            "terraform" {
                $version = terraform --version 2>$null
                if ($version -match 'Terraform v(\d+\.\d+\.\d+)') {
                    return $Matches[1]
                }
            }
            "ansible" {
                $version = ansible --version 2>$null
                if ($version -match '(\d+\.\d+\.\d+)') {
                    return $Matches[1]
                }
            }
            "kubectl" {
                $version = kubectl version --client 2>$null
                if ($version -match 'GitVersion:"v([\d.]+)') {
                    return $Matches[1]
                }
                # Try alternative format
                if ($version -match '(\d+\.\d+\.\d+)') {
                    return $Matches[1]
                }
            }
            "minikube" {
                $version = minikube version 2>$null
                if ($version -match 'v([\d.]+)') {
                    return $Matches[1]
                }
            }
            "aws" {
                $version = aws --version 2>$null
                if ($version -match 'aws-cli/([\d.]+)') {
                    return $Matches[1]
                }
            }
            "az" {
                $version = az version 2>$null | ConvertFrom-Json -ErrorAction SilentlyContinue
                if ($version.'azure-cli') {
                    return $version.'azure-cli'
                }
                # Fallback to --version
                $version = az --version 2>$null
                if ($version -match '(\d+\.\d+\.\d+)') {
                    return $Matches[1]
                }
            }
            "code" {
                $version = code --version 2>$null
                if ($version) {
                    return $version.Split("`n")[0].Trim()
                }
            }
            default {
                try {
                    $version = & $Command --version 2>$null
                    if ($version -match '(\d+\.\d+\.\d+)') {
                        return $Matches[1]
                    }
                    if ($version) {
                        return $version.Split("`n")[0].Trim()
                    }
                } catch {
                    return "Unknown"
                }
            }
        }
    } catch {
        return "Unknown"
    }
    return "Unknown"
}

# Check Docker daemon status
function Test-DockerDaemon {
    try {
        if (Get-Command docker -ErrorAction SilentlyContinue) {
            $dockerInfo = docker info 2>$null
            if ($LASTEXITCODE -eq 0) {
                $containersRunning = (docker ps -q 2>$null | Measure-Object).Count
                $imagesCount = (docker images -q 2>$null | Measure-Object).Count
                Write-Success "Docker daemon: Running (Containers: $containersRunning, Images: $imagesCount)"
                return $true
            } else {
                Write-Warning "Docker daemon: Not running"
                Write-Info "  Start Docker Desktop application"
                return $false
            }
        } else {
            Write-Error "Docker: Not installed"
            return $false
        }
    } catch {
        Write-Warning "Docker daemon: Not running"
        Write-Info "  Start Docker Desktop application"
        return $false
    }
}

# Check VS Code extensions
function Test-VSCodeExtensions {
    try {
        if (Get-Command code -ErrorAction SilentlyContinue) {
            Write-Info "Checking VS Code extensions..."
            $extensions = @(
                "ms-vscode.vscode-docker",
                "ms-kubernetes-tools.vscode-kubernetes-tools",
                "hashicorp.terraform",
                "redhat.vscode-yaml",
                "ms-vscode.vscode-json",
                "ms-vscode.powershell"
            )
            
            $installedCount = 0
            $installedExtensions = code --list-extensions 2>$null
            
            foreach ($ext in $extensions) {
                if ($installedExtensions -contains $ext) {
                    $installedCount++
                }
            }
            
            if ($installedCount -eq $extensions.Count) {
                Write-Success "VS Code extensions: All installed ($installedCount/$($extensions.Count))"
            } else {
                Write-Warning "VS Code extensions: $installedCount/$($extensions.Count) installed"
            }
        } else {
            Write-Warning "VS Code: Not installed"
        }
    } catch {
        Write-Warning "VS Code: Not installed"
    }
}

# Check configuration files
function Test-ConfigFiles {
    $configDir = "$env:USERPROFILE\.devops-toolkit"
    
    if (Test-Path $configDir) {
        Write-Success "Configuration directory: $configDir exists"
        
        $subdirs = @("configs", "templates", "scripts", "examples")
        foreach ($dir in $subdirs) {
            $dirPath = Join-Path $configDir $dir
            if (Test-Path $dirPath) {
                Write-Success "  └─ $dir/ directory exists"
            } else {
                Write-Warning "  └─ $dir/ directory missing"
            }
        }
    } else {
        Write-Warning "Configuration directory: $configDir not found"
    }
}

# Check system resources
function Test-SystemResources {
    Write-Info "Checking system resources..."
    
    # Check available memory
    try {
        $memory = Get-WmiObject -Class Win32_OperatingSystem
        $totalMemory = [math]::Round($memory.TotalVisibleMemorySize / 1MB, 2)
        $freeMemory = [math]::Round($memory.FreePhysicalMemory / 1MB, 2)
        $usedMemory = [math]::Round($totalMemory - $freeMemory, 2)
        $memoryPercent = [math]::Round(($usedMemory / $totalMemory) * 100, 1)
        Write-Info "Memory: $usedMemory GB used, $freeMemory GB available of $totalMemory GB total ($memoryPercent% used)"
    } catch {
        Write-Warning "Memory: Unable to determine"
    }
    
    # Check disk space
    try {
        $disk = Get-WmiObject -Class Win32_LogicalDisk -Filter "DeviceID='C:'"
        $totalSpace = [math]::Round($disk.Size / 1GB, 2)
        $freeSpace = [math]::Round($disk.FreeSpace / 1GB, 2)
        $usedSpace = [math]::Round($totalSpace - $freeSpace, 2)
        $diskPercent = [math]::Round(($usedSpace / $totalSpace) * 100, 1)
        Write-Info "Disk space: $usedSpace GB used, $freeSpace GB available of $totalSpace GB total ($diskPercent% used)"
    } catch {
        Write-Warning "Disk space: Unable to determine"
    }
    
    # Check CPU cores
    try {
        $cpu = Get-WmiObject -Class Win32_Processor
        $cpuCores = $cpu.NumberOfCores
        $cpuThreads = $cpu.NumberOfLogicalProcessors
        Write-Info "CPU: $cpuCores cores, $cpuThreads logical processors"
    } catch {
        Write-Warning "CPU: Unable to determine"
    }
    
    # Check Windows version
    try {
        $os = Get-WmiObject -Class Win32_OperatingSystem
        Write-Info "OS: $($os.Caption) (Build: $($os.BuildNumber))"
    } catch {
        Write-Warning "OS: Unable to determine"
    }
}

# Generate system report
function New-SystemReport {
    $reportFile = "$env:USERPROFILE\.devops-toolkit\system-report.txt"
    
    Write-Info "Generating system report..."
    
    try {
        $reportContent = @"
DevOps Environment Toolkit - System Report
Generated on: $(Get-Date)
==========================================

Operating System:
  Name: $((Get-WmiObject -Class Win32_OperatingSystem).Caption)
  Version: $((Get-WmiObject -Class Win32_OperatingSystem).Version)
  Architecture: $((Get-WmiObject -Class Win32_OperatingSystem).OSArchitecture)

Installed Tools:
"@

        $tools = @("docker", "docker-compose", "git", "terraform", "ansible", "kubectl", "minikube", "aws", "az", "code")
        foreach ($tool in $tools) {
            if (Get-Command $tool -ErrorAction SilentlyContinue) {
                $version = Get-CommandVersion -Command $tool
                $reportContent += "`n  ✓ $tool`: $version"
            } else {
                $reportContent += "`n  ✗ $tool`: Not installed"
            }
        }

        $reportContent += @"

Docker Status:
"@

        if (Get-Command docker -ErrorAction SilentlyContinue) {
            $dockerInfo = docker info 2>$null
            if ($LASTEXITCODE -eq 0) {
                $reportContent += @"
  Status: Running
  Version: $(docker --version)
  Containers: $((docker ps -q 2>$null | Measure-Object).Count) running
  Images: $((docker images -q 2>$null | Measure-Object).Count) available
"@
            } else {
                $reportContent += "`n  Status: Not running"
            }
        } else {
            $reportContent += "`n  Status: Not installed"
        }

        $reportContent += @"

System Resources:
"@

        try {
            $memory = Get-WmiObject -Class Win32_OperatingSystem
            $totalMemory = [math]::Round($memory.TotalVisibleMemorySize / 1MB, 2)
            $freeMemory = [math]::Round($memory.FreePhysicalMemory / 1MB, 2)
            $reportContent += "`n  Total Memory: $totalMemory GB"
            $reportContent += "`n  Free Memory: $freeMemory GB"
        } catch {
            $reportContent += "`n  Memory: Unable to determine"
        }

        try {
            $disk = Get-WmiObject -Class Win32_LogicalDisk -Filter "DeviceID='C:'"
            $totalSpace = [math]::Round($disk.Size / 1GB, 2)
            $freeSpace = [math]::Round($disk.FreeSpace / 1GB, 2)
            $reportContent += "`n  Total Disk Space: $totalSpace GB"
            $reportContent += "`n  Free Disk Space: $freeSpace GB"
        } catch {
            $reportContent += "`n  Disk Space: Unable to determine"
        }

        # Ensure directory exists
        $reportDir = Split-Path $reportFile -Parent
        if (!(Test-Path $reportDir)) {
            New-Item -ItemType Directory -Path $reportDir -Force | Out-Null
        }

        $reportContent | Out-File -FilePath $reportFile -Encoding UTF8
        Write-Success "System report saved to: $reportFile"
    } catch {
        Write-Warning "Failed to generate system report: $($_.Exception.Message)"
    }
}

# Main verification function
function Start-Verification {
    Show-Banner
    
    $totalChecks = 0
    $passedChecks = 0
    
    Write-Info "Starting verification of DevOps environment..."
    Write-Host ""
    
    # Core tools
    Write-Info "Checking core tools..."
    $coreTools = @("docker", "docker-compose", "git")
    foreach ($tool in $coreTools) {
        $totalChecks++
        if (Test-Command -Command $tool -Name $tool) {
            $passedChecks++
        }
    }
    Write-Host ""
    
    # Infrastructure tools
    Write-Info "Checking infrastructure tools..."
    $infraTools = @("terraform", "ansible", "kubectl", "minikube")
    foreach ($tool in $infraTools) {
        $totalChecks++
        if (Test-Command -Command $tool -Name $tool) {
            $passedChecks++
        }
    }
    Write-Host ""
    
    # Cloud CLIs
    Write-Info "Checking cloud CLIs..."
    $cloudTools = @("aws", "az")
    foreach ($tool in $cloudTools) {
        $totalChecks++
        if (Test-Command -Command $tool -Name $tool) {
            $passedChecks++
        }
    }
    Write-Host ""
    
    # Development tools
    Write-Info "Checking development tools..."
    $devTools = @("code")
    foreach ($tool in $devTools) {
        $totalChecks++
        if (Test-Command -Command $tool -Name $tool) {
            $passedChecks++
        }
    }
    Write-Host ""
    
    # Docker daemon
    Write-Info "Checking Docker daemon..."
    $totalChecks++
    if (Test-DockerDaemon) {
        $passedChecks++
    }
    Write-Host ""
    
    # VS Code extensions
    Test-VSCodeExtensions
    Write-Host ""
    
    # Configuration files
    Test-ConfigFiles
    Write-Host ""
    
    # System resources
    Test-SystemResources
    Write-Host ""
    
    # Generate report
    New-SystemReport
    Write-Host ""
    
    # Summary
    $successRate = [math]::Round(($passedChecks * 100) / $totalChecks)
    
    Write-Host "==========================================" -ForegroundColor $Colors.Purple
    Write-Host "Verification Summary:" -ForegroundColor $Colors.Purple
    Write-Host "  Total checks: $totalChecks"
    Write-Host "  Passed: $passedChecks"
    Write-Host "  Failed: $($totalChecks - $passedChecks)"
    Write-Host "  Success rate: $successRate%"
    Write-Host "==========================================" -ForegroundColor $Colors.Purple
    
    if ($successRate -ge 80) {
        Write-Success "🎉 Your DevOps environment is ready to go!"
    } elseif ($successRate -ge 60) {
        Write-Warning "⚠️  Your environment is mostly ready, but some tools are missing"
    } else {
        Write-Error "❌ Your environment needs more setup. Please run the installation script again."
    }
    
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor $Colors.Cyan
    Write-Host "1. Check the system report: " -NoNewline
    Write-Host "Get-Content `$env:USERPROFILE\.devops-toolkit\system-report.txt" -ForegroundColor $Colors.Yellow
    Write-Host "2. Start Docker Desktop if not running"
    Write-Host "3. Explore the templates: " -NoNewline
    Write-Host "Get-ChildItem `$env:USERPROFILE\.devops-toolkit\templates\" -ForegroundColor $Colors.Yellow
    Write-Host "4. Check out the examples: " -NoNewline
    Write-Host "Get-ChildItem `$env:USERPROFILE\.devops-toolkit\examples\" -ForegroundColor $Colors.Yellow
    Write-Host ""
}

# Run main function
try {
    Start-Verification
} catch {
    Write-Error "Verification failed: $($_.Exception.Message)"
    exit 1
}
