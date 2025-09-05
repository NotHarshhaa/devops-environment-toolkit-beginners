# DevOps Environment Toolkit - Windows Installation Script
# Author: H A R S H H A A
# License: MIT

# Set execution policy for current session
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force

# Colors for output
$Red = "Red"
$Green = "Green"
$Yellow = "Yellow"
$Blue = "Blue"
$Magenta = "Magenta"
$Cyan = "Cyan"

# ASCII Art Banner
function Show-Banner {
    Write-Host ""
    Write-Host "    ╔══════════════════════════════════════════════════════════════╗" -ForegroundColor $Cyan
    Write-Host "    ║                                                              ║" -ForegroundColor $Cyan
    Write-Host "    ║    🚀 DevOps Environment Toolkit - Installation Script 🚀    ║" -ForegroundColor $Cyan
    Write-Host "    ║                                                              ║" -ForegroundColor $Cyan
    Write-Host "    ║    One-click setup for your DevOps journey!                 ║" -ForegroundColor $Cyan
    Write-Host "    ║                                                              ║" -ForegroundColor $Cyan
    Write-Host "    ╚══════════════════════════════════════════════════════════════╝" -ForegroundColor $Cyan
    Write-Host ""
}

# Logging functions
function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor $Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor $Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor $Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor $Red
}

# Check if running as administrator
function Test-Administrator {
    $currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
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

# Install GitHub CLI
function Install-GitHubCLI {
    if (Test-CommandExists "gh") {
        Write-Info "GitHub CLI is already installed"
        return
    }
    
    Write-Info "Installing GitHub CLI..."
    choco install gh -y
    
    Write-Success "GitHub CLI installed successfully"
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

# Install Helm
function Install-Helm {
    if (Test-CommandExists "helm") {
        Write-Info "Helm is already installed"
        return
    }
    
    Write-Info "Installing Helm..."
    choco install kubernetes-helm -y
    
    Write-Success "Helm installed successfully"
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

# Install Google Cloud CLI
function Install-GCloudCLI {
    if (Test-CommandExists "gcloud") {
        Write-Info "Google Cloud CLI is already installed"
        return
    }
    
    Write-Info "Installing Google Cloud CLI..."
    choco install gcloudsdk -y
    
    Write-Success "Google Cloud CLI installed successfully"
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

# Main installation function
function Main {
    Show-Banner
    
    Write-Info "Starting DevOps Environment Toolkit installation..."
    
    # Check if running as administrator
    if (-not (Test-Administrator)) {
        Write-Warning "This script should be run as Administrator for best results"
        $response = Read-Host "Do you want to continue? (y/N)"
        if ($response -ne "y" -and $response -ne "Y") {
            Write-Info "Installation cancelled"
            exit 1
        }
    }
    
    # Install Chocolatey first
    Install-Chocolatey
    
    # Install core tools
    Install-Git
    Install-DockerDesktop
    Install-VSCode
    Install-GitHubCLI
    
    # Install infrastructure tools (basic)
    Install-Terraform
    Install-Kubectl
    Install-Helm
    
    # Install cloud CLIs
    Install-AWSCLI
    Install-AzureCLI
    Install-GCloudCLI
    
    # Install utilities
    Install-Utilities
    
    # Create configuration structure
    New-ConfigDirectories
    
    # Install VS Code extensions
    Install-VSCodeExtensions
    
    # Final message
    Write-Host ""
    Write-Success "🎉 Installation completed successfully!"
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor $Magenta
    Write-Host "1. Restart your computer" -ForegroundColor $Cyan
    Write-Host "2. Start Docker Desktop" -ForegroundColor $Cyan
    Write-Host "3. Run verification script: .\verify.ps1" -ForegroundColor $Cyan
    Write-Host "4. Configure your tools: Check the configs\ directory" -ForegroundColor $Cyan
    Write-Host "5. Explore templates: Check the templates\ directory" -ForegroundColor $Cyan
    Write-Host ""
    Write-Host "Happy DevOps learning! 🚀" -ForegroundColor $Green
}

# Run main function
Main
