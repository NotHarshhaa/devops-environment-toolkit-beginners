# DevOps Environment Toolkit - Enhanced Windows Installation Script
# Author: H A R S H H A A
# License: MIT
# Version: 2.0.0

# Set execution policy for current session
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force

# Global variables
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$LogFile = "$env:USERPROFILE\.devops-toolkit-install.log"
$BackupDir = "$env:USERPROFILE\.devops-toolkit-backup"
$InstallTimestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$Verbose = $false
$DryRun = $false
$SkipConfirmation = $false
$SelectiveInstall = $false

# Colors for output
$Red = "Red"
$Green = "Green"
$Yellow = "Yellow"
$Blue = "Blue"
$Magenta = "Magenta"
$Cyan = "Cyan"
$White = "White"

# ASCII Art Banner
function Show-Banner {
    Write-Host ""
    Write-Host "    ╔══════════════════════════════════════════════════════════════╗" -ForegroundColor $Cyan
    Write-Host "    ║                                                              ║" -ForegroundColor $Cyan
    Write-Host "    ║    🚀 DevOps Environment Toolkit - Enhanced Installer 🚀     ║" -ForegroundColor $Cyan
    Write-Host "    ║                                                              ║" -ForegroundColor $Cyan
    Write-Host "    ║    Version 2.0.0 - Advanced Features & Error Recovery       ║" -ForegroundColor $Cyan
    Write-Host "    ║                                                              ║" -ForegroundColor $Cyan
    Write-Host "    ╚══════════════════════════════════════════════════════════════╝" -ForegroundColor $Cyan
    Write-Host ""
}

# Enhanced logging system
function Initialize-Logging {
    $LogDir = Split-Path -Parent $LogFile
    if (-not (Test-Path $LogDir)) {
        New-Item -ItemType Directory -Path $LogDir -Force | Out-Null
    }
    
    $LogHeader = @"
=== DevOps Toolkit Installation Log - $(Get-Date) ===
Script Version: 2.0.0
OS: $([System.Environment]::OSVersion.VersionString)
User: $env:USERNAME
===============================================
"@
    
    $LogHeader | Out-File -FilePath $LogFile -Encoding UTF8
}

function Write-LogFile {
    param(
        [string]$Level,
        [string]$Message
    )
    
    $LogEntry = "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] [$Level] $Message"
    $LogEntry | Out-File -FilePath $LogFile -Append -Encoding UTF8
}

# Progress tracking
$ProgressTotal = 0
$ProgressCurrent = 0

function Initialize-Progress {
    param([int]$Total)
    $script:ProgressTotal = $Total
    $script:ProgressCurrent = 0
}

function Update-Progress {
    $script:ProgressCurrent++
    $Percentage = [math]::Round(($ProgressCurrent * 100) / $ProgressTotal)
    
    Write-Host "`r[PROGRESS] $ProgressCurrent/$ProgressTotal ($Percentage%) - " -NoNewline -ForegroundColor $Blue
    
    # Create progress bar
    $BarLength = 30
    $FilledLength = [math]::Round(($Percentage * $BarLength) / 100)
    Write-Host "[" -NoNewline
    for ($i = 0; $i -lt $FilledLength; $i++) { Write-Host "█" -NoNewline }
    for ($i = $FilledLength; $i -lt $BarLength; $i++) { Write-Host "░" -NoNewline }
    Write-Host "]" -NoNewline
}

# Error handling and recovery
function Handle-Error {
    param(
        [string]$ErrorMessage,
        [string]$Command
    )
    
    Write-Error "Error occurred: $ErrorMessage"
    Write-LogFile "ERROR" "Installation failed: $ErrorMessage (Command: $Command)"
    
    Write-Host "Installation failed! Check the log file: $LogFile" -ForegroundColor $Red
    Write-Host "You can try to recover by running: $($MyInvocation.MyCommand.Path) -Recover" -ForegroundColor $Yellow
    exit 1
}

# Backup and restore functionality
function New-Backup {
    Write-Info "Creating backup of existing configurations..."
    
    $BackupPath = "$BackupDir\$InstallTimestamp"
    if (-not (Test-Path $BackupPath)) {
        New-Item -ItemType Directory -Path $BackupPath -Force | Out-Null
    }
    
    # Backup existing configurations
    if (Test-Path "$env:USERPROFILE\.devops-toolkit") {
        Copy-Item -Path "$env:USERPROFILE\.devops-toolkit" -Destination $BackupPath -Recurse -Force -ErrorAction SilentlyContinue
    }
    
    # Backup PowerShell profile
    if (Test-Path $PROFILE) {
        Copy-Item -Path $PROFILE -Destination "$BackupPath\profile.ps1" -Force -ErrorAction SilentlyContinue
    }
    
    Write-Success "Backup created at: $BackupPath"
    Write-LogFile "INFO" "Backup created at: $BackupPath"
}

function Restore-Backup {
    param([string]$BackupPath)
    
    if (-not $BackupPath) {
        # Find the latest backup
        $BackupPath = Get-ChildItem -Path $BackupDir -Directory | Sort-Object LastWriteTime -Descending | Select-Object -First 1
        if ($BackupPath) {
            $BackupPath = $BackupPath.FullName
        }
    }
    
    if (-not $BackupPath -or -not (Test-Path $BackupPath)) {
        Write-Error "No backup found to restore"
        return $false
    }
    
    Write-Info "Restoring from backup: $BackupPath"
    
    # Restore configurations
    if (Test-Path "$BackupPath\.devops-toolkit") {
        Remove-Item -Path "$env:USERPROFILE\.devops-toolkit" -Recurse -Force -ErrorAction SilentlyContinue
        Copy-Item -Path "$BackupPath\.devops-toolkit" -Destination $env:USERPROFILE -Recurse -Force
    }
    
    # Restore PowerShell profile
    if (Test-Path "$BackupPath\profile.ps1") {
        Copy-Item -Path "$BackupPath\profile.ps1" -Destination $PROFILE -Force
    }
    
    Write-Success "Backup restored successfully"
    Write-LogFile "INFO" "Backup restored from: $BackupPath"
    return $true
}

# System validation and compatibility checks
function Test-SystemCompatibility {
    Write-Info "Validating system compatibility..."
    
    # Check available disk space (need at least 5GB)
    $Drive = Get-WmiObject -Class Win32_LogicalDisk -Filter "DeviceID='C:'"
    $AvailableSpaceGB = [math]::Round($Drive.FreeSpace / 1GB, 2)
    $RequiredSpaceGB = 5
    
    if ($AvailableSpaceGB -lt $RequiredSpaceGB) {
        Write-Error "Insufficient disk space. Need at least $RequiredSpaceGB GB, have $AvailableSpaceGB GB"
        return $false
    }
    
    # Check available memory (need at least 4GB)
    $Memory = Get-WmiObject -Class Win32_ComputerSystem
    $TotalMemoryGB = [math]::Round($Memory.TotalPhysicalMemory / 1GB, 2)
    if ($TotalMemoryGB -lt 4) {
        Write-Warning "Low available memory: $TotalMemoryGB GB. Recommended: 4GB+"
    }
    
    # Check internet connectivity
    try {
        $null = Test-NetConnection -ComputerName "google.com" -Port 80 -InformationLevel Quiet
    }
    catch {
        Write-Error "No internet connection detected. This installer requires internet access."
        return $false
    }
    
    # Check Windows version
    $OSVersion = [System.Environment]::OSVersion.Version
    if ($OSVersion.Major -lt 10) {
        Write-Warning "Windows 10 or later is recommended for best compatibility"
    }
    
    Write-Success "System validation completed"
    Write-LogFile "INFO" "System validation passed"
    return $true
}

# Enhanced logging functions with file logging
function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor $Blue
    Write-LogFile "INFO" $Message
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor $Green
    Write-LogFile "SUCCESS" $Message
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor $Yellow
    Write-LogFile "WARNING" $Message
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor $Red
    Write-LogFile "ERROR" $Message
}

function Write-Debug {
    param([string]$Message)
    if ($Verbose) {
        Write-Host "[DEBUG] $Message" -ForegroundColor $Magenta
        Write-LogFile "DEBUG" $Message
    }
}

# Command line argument parsing
function Parse-Arguments {
    param([string[]]$Arguments)
    
    for ($i = 0; $i -lt $Arguments.Length; $i++) {
        switch ($Arguments[$i]) {
            "-Verbose" { $script:Verbose = $true }
            "-DryRun" { $script:DryRun = $true }
            "-SkipConfirmation" { $script:SkipConfirmation = $true }
            "-Selective" { $script:SelectiveInstall = $true }
            "-Recover" { 
                Restore-Backup
                exit 0
            }
            "-Help" { 
                Show-Help
                exit 0
            }
            "-Version" {
                Write-Host "DevOps Environment Toolkit Installer v2.0.0"
                exit 0
            }
            default {
                Write-Error "Unknown option: $($Arguments[$i])"
                Show-Help
                exit 1
            }
        }
    }
}

function Show-Help {
    Write-Host "DevOps Environment Toolkit - Enhanced Installer" -ForegroundColor $White
    Write-Host ""
    Write-Host "Usage: .\install.ps1 [OPTIONS]" -ForegroundColor $Cyan
    Write-Host ""
    Write-Host "Options:" -ForegroundColor $Cyan
    Write-Host "  -Verbose           Enable verbose output" -ForegroundColor $Yellow
    Write-Host "  -DryRun            Show what would be installed without actually installing" -ForegroundColor $Yellow
    Write-Host "  -SkipConfirmation  Skip confirmation prompts" -ForegroundColor $Yellow
    Write-Host "  -Selective         Enable selective installation menu" -ForegroundColor $Yellow
    Write-Host "  -Recover           Restore from backup" -ForegroundColor $Yellow
    Write-Host "  -Help              Show this help message" -ForegroundColor $Yellow
    Write-Host "  -Version           Show version information" -ForegroundColor $Yellow
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor $Cyan
    Write-Host "  .\install.ps1                      # Standard installation" -ForegroundColor $Yellow
    Write-Host "  .\install.ps1 -Verbose -Selective # Verbose selective installation" -ForegroundColor $Yellow
    Write-Host "  .\install.ps1 -DryRun             # Preview installation" -ForegroundColor $Yellow
    Write-Host "  .\install.ps1 -Recover            # Restore from backup" -ForegroundColor $Yellow
}

# Interactive menu system
function Show-InteractiveMenu {
    Write-Host ""
    Write-Host "Selective Installation Menu" -ForegroundColor $Cyan
    Write-Host "Choose which tools to install:" -ForegroundColor $Yellow
    Write-Host ""
    
    $MenuOptions = @{
        "1" = "Git"
        "2" = "Docker & Docker Compose"
        "3" = "Kubernetes (kubectl + Minikube)"
        "4" = "Terraform"
        "5" = "Ansible"
        "6" = "VS Code"
        "7" = "AWS CLI"
        "8" = "Azure CLI"
        "9" = "All Tools (Full Installation)"
        "0" = "Exit"
    }
    
    # Show menu options
    foreach ($key in $MenuOptions.Keys | Sort-Object) {
        Write-Host "  $key) $($MenuOptions[$key])" -ForegroundColor $Yellow
    }
    
    Write-Host ""
    $Choices = Read-Host "Enter your choice (comma-separated for multiple)"
    
    # Process choices
    $ChoiceArray = $Choices -split ","
    foreach ($Choice in $ChoiceArray) {
        $Choice = $Choice.Trim()
        switch ($Choice) {
            "1" { $script:InstallGit = $true }
            "2" { $script:InstallDocker = $true }
            "3" { $script:InstallK8s = $true }
            "4" { $script:InstallTerraform = $true }
            "5" { $script:InstallAnsible = $true }
            "6" { $script:InstallVSCode = $true }
            "7" { $script:InstallAwsCli = $true }
            "8" { $script:InstallAzureCli = $true }
            "9" { 
                $script:InstallGit = $true
                $script:InstallDocker = $true
                $script:InstallK8s = $true
                $script:InstallTerraform = $true
                $script:InstallAnsible = $true
                $script:InstallVSCode = $true
                $script:InstallAwsCli = $true
                $script:InstallAzureCli = $true
            }
            "0" { 
                Write-Info "Installation cancelled by user"
                exit 0
            }
            default { Write-Warning "Invalid choice: $Choice" }
        }
    }
}


# Confirmation prompt with enhanced options
function Confirm-Installation {
    if ($SkipConfirmation) {
        return
    }
    
    Write-Host ""
    Write-Host "Installation Summary" -ForegroundColor $Yellow
    Write-Host "The following tools will be installed:" -ForegroundColor $Cyan
    
    # Show what will be installed
    if ($InstallGit) { Write-Host "  ✓ Git" -ForegroundColor $Green }
    if ($InstallDocker) { Write-Host "  ✓ Docker & Docker Compose" -ForegroundColor $Green }
    if ($InstallK8s) { Write-Host "  ✓ Kubernetes (kubectl + Minikube)" -ForegroundColor $Green }
    if ($InstallTerraform) { Write-Host "  ✓ Terraform" -ForegroundColor $Green }
    if ($InstallAnsible) { Write-Host "  ✓ Ansible" -ForegroundColor $Green }
    if ($InstallVSCode) { Write-Host "  ✓ VS Code" -ForegroundColor $Green }
    if ($InstallAwsCli) { Write-Host "  ✓ AWS CLI" -ForegroundColor $Green }
    if ($InstallAzureCli) { Write-Host "  ✓ Azure CLI" -ForegroundColor $Green }
    
    Write-Host ""
    Write-Host "Installation options:" -ForegroundColor $Cyan
    Write-Host "  • Log file: $LogFile" -ForegroundColor $Yellow
    Write-Host "  • Backup: $BackupDir\$InstallTimestamp" -ForegroundColor $Yellow
    Write-Host "  • Verbose: $Verbose" -ForegroundColor $Yellow
    Write-Host "  • Dry run: $DryRun" -ForegroundColor $Yellow
    
    Write-Host ""
    $Response = Read-Host "Do you want to proceed with the installation? (y/N)"
    if ($Response -ne "y" -and $Response -ne "Y") {
        Write-Info "Installation cancelled by user"
        exit 0
    }
}

# Enhanced installation functions with dry-run support
function Invoke-Command {
    param(
        [string]$Command,
        [string]$Description
    )
    
    if ($DryRun) {
        Write-Info "[DRY RUN] Would execute: $Command"
        Write-Debug "Description: $Description"
        return $true
    }
    
    Write-Debug "Executing: $Command"
    try {
        Invoke-Expression $Command
        Write-Success $Description
        return $true
    }
    catch {
        Write-Error "Failed to execute: $Command"
        return $false
    }
}

# Check if command exists
function Test-CommandExists {
    param([string]$Command)
    $null = Get-Command $Command -ErrorAction SilentlyContinue
    return $?
}

# Install Chocolatey if not present
function Install-Chocolatey {
    if (Test-CommandExists "choco") {
        Write-Info "Chocolatey is already installed"
        return
    }
    
    Write-Info "Installing Chocolatey package manager..."
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    
    # Refresh environment variables
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    
    Write-Success "Chocolatey installed successfully"
}

# Install Git
function Install-Git {
    if (Test-CommandExists "git") {
        Write-Info "Git is already installed"
    } else {
        Write-Info "Installing Git..."
        choco install git -y
    }
    
    # Configure Git with helpful aliases
    Write-Info "Configuring Git aliases..."
    git config --global alias.st status
    git config --global alias.co checkout
    git config --global alias.br branch
    git config --global alias.ci commit
    git config --global alias.unstage 'reset HEAD --'
    git config --global alias.last 'log -1 HEAD'
    git config --global alias.visual '!gitk'
    git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
    
    Write-Success "Git configured successfully"
}

# Install Docker Desktop
function Install-DockerDesktop {
    if (Test-CommandExists "docker") {
        Write-Info "Docker is already installed"
        return
    }
    
    Write-Info "Installing Docker Desktop..."
    choco install docker-desktop -y
    
    Write-Warning "Please restart your computer and start Docker Desktop manually after installation"
    Write-Success "Docker Desktop installed successfully"
}

# Install VS Code
function Install-VSCode {
    if (Test-CommandExists "code") {
        Write-Info "VS Code is already installed"
        return
    }
    
    Write-Info "Installing VS Code..."
    choco install vscode -y
    
    Write-Success "VS Code installed successfully"
}

# Install Minikube
function Install-Minikube {
    if (Test-CommandExists "minikube") {
        Write-Info "Minikube is already installed"
        return
    }
    
    Write-Info "Installing Minikube..."
    choco install minikube -y
    
    Write-Success "Minikube installed successfully"
}

# Install Ansible
function Install-Ansible {
    if (Test-CommandExists "ansible") {
        Write-Info "Ansible is already installed"
        return
    }
    
    Write-Info "Installing Ansible..."
    choco install ansible -y
    
    Write-Success "Ansible installed successfully"
}

# Install Terraform (basic version for learning)
function Install-Terraform {
    if (Test-CommandExists "terraform") {
        Write-Info "Terraform is already installed"
        return
    }
    
    Write-Info "Installing Terraform..."
    choco install terraform -y
    
    Write-Success "Terraform installed successfully"
}

# Install kubectl
function Install-Kubectl {
    if (Test-CommandExists "kubectl") {
        Write-Info "kubectl is already installed"
        return
    }
    
    Write-Info "Installing kubectl..."
    choco install kubernetes-cli -y
    
    Write-Success "kubectl installed successfully"
}


# Install AWS CLI
function Install-AWSCLI {
    if (Test-CommandExists "aws") {
        Write-Info "AWS CLI is already installed"
        return
    }
    
    Write-Info "Installing AWS CLI..."
    choco install awscli -y
    
    Write-Success "AWS CLI installed successfully"
}

# Install Azure CLI
function Install-AzureCLI {
    if (Test-CommandExists "az") {
        Write-Info "Azure CLI is already installed"
        return
    }
    
    Write-Info "Installing Azure CLI..."
    choco install azure-cli -y
    
    Write-Success "Azure CLI installed successfully"
}


# Install additional utilities
function Install-Utilities {
    Write-Info "Installing additional utilities..."
    
    $utilities = @(
        "curl",
        "wget",
        "jq",
        "tree",
        "7zip",
        "nodejs",
        "python3",
        "yarn"
    )
    
    foreach ($util in $utilities) {
        if (-not (Test-CommandExists $util)) {
            Write-Info "Installing $util..."
            choco install $util -y
        }
    }
    
    Write-Success "Utilities installed successfully"
}

# Create configuration directories
function New-ConfigDirectories {
    Write-Info "Creating configuration directories..."
    
    $configPath = "$env:USERPROFILE\.devops-toolkit"
    $directories = @(
        "$configPath",
        "$configPath\configs",
        "$configPath\configs\docker",
        "$configPath\configs\terraform",
        "$configPath\configs\ansible",
        "$configPath\configs\vscode",
        "$configPath\templates",
        "$configPath\templates\basic-web-app",
        "$configPath\templates\microservices",
        "$configPath\templates\infrastructure",
        "$configPath\scripts",
        "$configPath\examples"
    )
    
    foreach ($dir in $directories) {
        if (-not (Test-Path $dir)) {
            New-Item -ItemType Directory -Path $dir -Force | Out-Null
        }
    }
    
    Write-Success "Configuration directories created"
}

# Install VS Code extensions
function Install-VSCodeExtensions {
    Write-Info "Installing VS Code extensions..."
    
    $extensions = @(
        "ms-vscode.vscode-docker",
        "ms-kubernetes-tools.vscode-kubernetes-tools",
        "hashicorp.terraform",
        "redhat.vscode-yaml",
        "ms-python.python",
        "ms-vscode.powershell",
        "ms-vscode.vscode-json",
        "bradlc.vscode-tailwindcss",
        "esbenp.prettier-vscode",
        "ms-vscode.vscode-github-actions"
    )
    
    foreach ($extension in $extensions) {
        Write-Info "Installing extension: $extension"
        code --install-extension $extension --force
    }
    
    Write-Success "VS Code extensions installed successfully"
}

# Post-installation health checks
function Test-HealthChecks {
    Write-Info "Running post-installation health checks..."
    
    $ChecksPassed = 0
    $TotalChecks = 0
    
    # Check Git
    if ($InstallGit) {
        $TotalChecks++
        if ((Test-CommandExists "git") -and (git --version 2>$null)) {
            Write-Success "Git is working correctly"
            $ChecksPassed++
        } else {
            Write-Error "Git health check failed"
        }
    }
    
    # Check Docker
    if ($InstallDocker) {
        $TotalChecks++
        if ((Test-CommandExists "docker") -and (docker --version 2>$null)) {
            Write-Success "Docker is working correctly"
            $ChecksPassed++
        } else {
            Write-Error "Docker health check failed"
        }
    }
    
    # Check kubectl
    if ($InstallK8s) {
        $TotalChecks++
        if ((Test-CommandExists "kubectl") -and (kubectl version --client 2>$null)) {
            Write-Success "kubectl is working correctly"
            $ChecksPassed++
        } else {
            Write-Error "kubectl health check failed"
        }
    }
    
    # Check Minikube
    if ($InstallK8s) {
        $TotalChecks++
        if ((Test-CommandExists "minikube") -and (minikube version 2>$null)) {
            Write-Success "Minikube is working correctly"
            $ChecksPassed++
        } else {
            Write-Error "Minikube health check failed"
        }
    }
    
    # Check Terraform
    if ($InstallTerraform) {
        $TotalChecks++
        if ((Test-CommandExists "terraform") -and (terraform --version 2>$null)) {
            Write-Success "Terraform is working correctly"
            $ChecksPassed++
        } else {
            Write-Error "Terraform health check failed"
        }
    }
    
    # Check Ansible
    if ($InstallAnsible) {
        $TotalChecks++
        if ((Test-CommandExists "ansible") -and (ansible --version 2>$null)) {
            Write-Success "Ansible is working correctly"
            $ChecksPassed++
        } else {
            Write-Error "Ansible health check failed"
        }
    }
    
    # Check AWS CLI
    if ($InstallAwsCli) {
        $TotalChecks++
        if ((Test-CommandExists "aws") -and (aws --version 2>$null)) {
            Write-Success "AWS CLI is working correctly"
            $ChecksPassed++
        } else {
            Write-Error "AWS CLI health check failed"
        }
    }
    
    # Check Azure CLI
    if ($InstallAzureCli) {
        $TotalChecks++
        if ((Test-CommandExists "az") -and (az --version 2>$null)) {
            Write-Success "Azure CLI is working correctly"
            $ChecksPassed++
        } else {
            Write-Error "Azure CLI health check failed"
        }
    }
    
    # Summary
    Write-Host ""
    Write-Info "Health check summary: $ChecksPassed/$TotalChecks checks passed"
    
    if ($ChecksPassed -eq $TotalChecks) {
        Write-Success "All health checks passed!"
        return $true
    } else {
        Write-Warning "Some health checks failed. Check the log file for details."
        return $false
    }
}

# Generate installation report
function New-InstallationReport {
    $ReportFile = "$env:USERPROFILE\.devops-toolkit-install-report-$InstallTimestamp.txt"
    
    Write-Info "Generating installation report..."
    
    $ReportContent = @"
DevOps Environment Toolkit - Installation Report
===============================================
Installation Date: $(Get-Date)
Script Version: 2.0.0
OS: $([System.Environment]::OSVersion.VersionString)
User: $env:USERNAME
Installation Mode: $(if ($DryRun) { "Dry Run" } else { "Live Installation" })

Installed Tools:
"@
    
    if ($InstallGit) { $ReportContent += "`n- Git" }
    if ($InstallDocker) { $ReportContent += "`n- Docker & Docker Compose" }
    if ($InstallK8s) { $ReportContent += "`n- Kubernetes (kubectl + Minikube)" }
    if ($InstallTerraform) { $ReportContent += "`n- Terraform" }
    if ($InstallAnsible) { $ReportContent += "`n- Ansible" }
    if ($InstallVSCode) { $ReportContent += "`n- VS Code" }
    if ($InstallAwsCli) { $ReportContent += "`n- AWS CLI" }
    if ($InstallAzureCli) { $ReportContent += "`n- Azure CLI" }
    
    $ReportContent += @"

Configuration Files:
- Log file: $LogFile
- Backup: $BackupDir\$InstallTimestamp
- Config directory: $env:USERPROFILE\.devops-toolkit

Next Steps:
1. Restart your computer
2. Start Docker Desktop
3. Run verification script: .\verify.ps1
4. Configure your tools: Check the configs\ directory
5. Explore templates: Check the templates\ directory

For support and updates, visit: https://github.com/your-repo/devops-environment-toolkit
"@
    
    $ReportContent | Out-File -FilePath $ReportFile -Encoding UTF8
    Write-Success "Installation report generated: $ReportFile"
}

# Check if running as administrator
function Test-Administrator {
    $currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

# Main installation function
function Main {
    param([string[]]$Arguments)
    
    # Parse command line arguments
    Parse-Arguments $Arguments
    
    # Initialize logging
    Initialize-Logging
    
    Show-Banner
    
    Write-Info "Starting DevOps Environment Toolkit installation..."
    Write-LogFile "INFO" "Installation started with options: VERBOSE=$Verbose, DRY_RUN=$DryRun, SELECTIVE=$SelectiveInstall"
    
    # System validation
    if (-not (Test-SystemCompatibility)) {
        Write-Error "System validation failed. Please check the requirements."
        exit 1
    }
    
    # Create backup
    if (-not $DryRun) {
        New-Backup
    }
    
    # Check if running as administrator
    if (-not (Test-Administrator)) {
        Write-Warning "This script should be run as Administrator for best results"
        if (-not $SkipConfirmation) {
            $Response = Read-Host "Do you want to continue? (y/N)"
            if ($Response -ne "y" -and $Response -ne "Y") {
                Write-Info "Installation cancelled"
                exit 1
            }
        }
    }
    
    # Show interactive menu if selective install is enabled
    if ($SelectiveInstall) {
        Show-InteractiveMenu
    } else {
        # Default to full installation
        $InstallGit = $true
        $InstallDocker = $true
        $InstallK8s = $true
        $InstallTerraform = $true
        $InstallAnsible = $true
        $InstallVSCode = $true
        $InstallAwsCli = $true
        $InstallAzureCli = $true
    }
    
    # Confirm installation
    Confirm-Installation
    
    # Calculate total steps for progress tracking
    $TotalSteps = 0
    if ($InstallGit) { $TotalSteps += 1 }
    if ($InstallDocker) { $TotalSteps += 1 }
    if ($InstallK8s) { $TotalSteps += 2 }
    if ($InstallTerraform) { $TotalSteps += 1 }
    if ($InstallAnsible) { $TotalSteps += 1 }
    if ($InstallVSCode) { $TotalSteps += 1 }
    if ($InstallAwsCli) { $TotalSteps += 1 }
    if ($InstallAzureCli) { $TotalSteps += 1 }
    $TotalSteps += 3 # Chocolatey, configs, health checks
    
    Initialize-Progress $TotalSteps
    
    # Install Chocolatey first
    Install-Chocolatey
    Update-Progress
    
    # Install core tools
    if ($InstallGit) {
        Install-Git
        Update-Progress
    }
    
    if ($InstallDocker) {
        Install-DockerDesktop
        Update-Progress
    }
    
    # Install infrastructure tools
    if ($InstallK8s) {
        Install-Kubectl
        Update-Progress
        Install-Minikube
        Update-Progress
    }
    
    if ($InstallTerraform) {
        Install-Terraform
        Update-Progress
    }
    
    if ($InstallAnsible) {
        Install-Ansible
        Update-Progress
    }
    
    # Install cloud CLIs
    if ($InstallAwsCli) {
        Install-AWSCLI
        Update-Progress
    }
    
    if ($InstallAzureCli) {
        Install-AzureCLI
        Update-Progress
    }
    
    # Install development tools
    if ($InstallVSCode) {
        Install-VSCode
        Update-Progress
    }
    
    # Create configuration structure
    New-ConfigDirectories
    Update-Progress
    
    # Install VS Code extensions
    if ($InstallVSCode) {
        Install-VSCodeExtensions
    }
    
    # Run health checks
    if (-not $DryRun) {
        Test-HealthChecks
        Update-Progress
    }
    
    # Generate report
    if (-not $DryRun) {
        New-InstallationReport
        Update-Progress
    }
    
    Write-Host ""
    Write-Success "🎉 Installation completed successfully!"
    Write-Host ""
    
    if ($DryRun) {
        Write-Host "Dry run completed. No changes were made." -ForegroundColor $Magenta
        Write-Host "Run without -DryRun to perform the actual installation." -ForegroundColor $Yellow
    } else {
        Write-Host "Next steps:" -ForegroundColor $Magenta
        Write-Host "1. Restart your computer" -ForegroundColor $Cyan
        Write-Host "2. Start Docker Desktop" -ForegroundColor $Cyan
        Write-Host "3. Run verification script: .\verify.ps1" -ForegroundColor $Cyan
        Write-Host "4. Configure your tools: Check the configs\ directory" -ForegroundColor $Cyan
        Write-Host "5. Explore templates: Check the templates\ directory" -ForegroundColor $Cyan
        Write-Host "6. Check installation report: Get-Content ~\.devops-toolkit-install-report-*.txt" -ForegroundColor $Cyan
        Write-Host ""
        Write-Host "📚 Support Documentation Links:" -ForegroundColor $Cyan
        Write-Host "• Git: https://git-scm.com/doc" -ForegroundColor $Yellow
        Write-Host "• Docker: https://docs.docker.com/" -ForegroundColor $Yellow
        Write-Host "• Docker Compose: https://docs.docker.com/compose/" -ForegroundColor $Yellow
        Write-Host "• Kubernetes: https://kubernetes.io/docs/" -ForegroundColor $Yellow
        Write-Host "• Minikube: https://minikube.sigs.k8s.io/docs/" -ForegroundColor $Yellow
        Write-Host "• Terraform: https://developer.hashicorp.com/terraform/docs" -ForegroundColor $Yellow
        Write-Host "• Ansible: https://docs.ansible.com/" -ForegroundColor $Yellow
        Write-Host "• VS Code: https://code.visualstudio.com/docs" -ForegroundColor $Yellow
        Write-Host "• AWS CLI: https://docs.aws.amazon.com/cli/" -ForegroundColor $Yellow
        Write-Host "• Azure CLI: https://docs.microsoft.com/en-us/cli/azure/" -ForegroundColor $Yellow
        Write-Host ""
        Write-Host "Happy DevOps learning! 🚀" -ForegroundColor $Green
    }
    
    Write-LogFile "INFO" "Installation completed successfully"
}

# Run main function
Main $args
