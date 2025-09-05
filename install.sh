#!/bin/bash

# DevOps Environment Toolkit - Installation Script
# Author: H A R S H H A A
# License: MIT

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ASCII Art Banner
print_banner() {
    echo -e "${CYAN}"
    cat << "EOF"
    ╔══════════════════════════════════════════════════════════════╗
    ║                                                              ║
    ║    🚀 DevOps Environment Toolkit - Installation Script 🚀    ║
    ║                                                              ║
    ║    One-click setup for your DevOps journey!                  ║
    ║                                                              ║
    ╚══════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"
}

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        log_warning "Running as root. This is not recommended for security reasons."
        read -p "Do you want to continue? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log_info "Installation cancelled."
            exit 1
        fi
    fi
}

# Detect OS
detect_os() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if [ -f /etc/os-release ]; then
            . /etc/os-release
            OS=$NAME
            VER=$VERSION_ID
        elif type lsb_release >/dev/null 2>&1; then
            OS=$(lsb_release -si)
            VER=$(lsb_release -sr)
        else
            OS=$(uname -s)
            VER=$(uname -r)
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        OS="macOS"
        VER=$(sw_vers -productVersion)
    else
        log_error "Unsupported operating system: $OSTYPE"
        exit 1
    fi
    
    log_info "Detected OS: $OS $VER"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Install package manager dependencies
install_package_manager() {
    log_info "Setting up package manager..."
    
    if [[ "$OS" == "Ubuntu" ]] || [[ "$OS" == "Debian"* ]]; then
        sudo apt-get update
        sudo apt-get install -y curl wget git unzip jq tree htop
    elif [[ "$OS" == "CentOS"* ]] || [[ "$OS" == "Red Hat"* ]] || [[ "$OS" == "Fedora"* ]]; then
        sudo yum update -y
        sudo yum install -y curl wget git unzip jq tree htop
    elif [[ "$OS" == "macOS" ]]; then
        if ! command_exists brew; then
            log_info "Installing Homebrew..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        fi
        brew install curl wget git jq tree htop
    else
        log_warning "Unknown OS. Please install curl, wget, git, unzip, jq, tree, and htop manually."
    fi
}

# Install Docker
install_docker() {
    if command_exists docker; then
        log_info "Docker is already installed"
        return
    fi
    
    log_info "Installing Docker..."
    
    if [[ "$OS" == "Ubuntu" ]] || [[ "$OS" == "Debian"* ]]; then
        # Remove old versions
        sudo apt-get remove -y docker docker-engine docker.io containerd runc
        
        # Install Docker
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        sudo usermod -aG docker $USER
        rm get-docker.sh
        
    elif [[ "$OS" == "CentOS"* ]] || [[ "$OS" == "Red Hat"* ]] || [[ "$OS" == "Fedora"* ]]; then
        sudo yum install -y yum-utils
        sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
        sudo yum install -y docker-ce docker-ce-cli containerd.io
        sudo systemctl start docker
        sudo systemctl enable docker
        sudo usermod -aG docker $USER
        
    elif [[ "$OS" == "macOS" ]]; then
        brew install --cask docker
        log_warning "Please start Docker Desktop manually after installation"
    fi
    
    log_success "Docker installed successfully"
}

# Install Docker Compose
install_docker_compose() {
    if command_exists docker-compose; then
        log_info "Docker Compose is already installed"
        return
    fi
    
    log_info "Installing Docker Compose..."
    
    if [[ "$OS" == "macOS" ]]; then
        brew install docker-compose
    else
        sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
    fi
    
    log_success "Docker Compose installed successfully"
}

# Install Git and configure
install_git() {
    if command_exists git; then
        log_info "Git is already installed"
    else
        log_info "Installing Git..."
        if [[ "$OS" == "macOS" ]]; then
            brew install git
        else
            sudo apt-get install -y git || sudo yum install -y git
        fi
    fi
    
    # Configure Git with helpful aliases
    log_info "Configuring Git aliases..."
    git config --global alias.st status
    git config --global alias.co checkout
    git config --global alias.br branch
    git config --global alias.ci commit
    git config --global alias.unstage 'reset HEAD --'
    git config --global alias.last 'log -1 HEAD'
    git config --global alias.visual '!gitk'
    git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
    
    log_success "Git configured successfully"
}

# Install GitHub CLI
install_gh_cli() {
    if command_exists gh; then
        log_info "GitHub CLI is already installed"
        return
    fi
    
    log_info "Installing GitHub CLI..."
    
    if [[ "$OS" == "macOS" ]]; then
        brew install gh
    else
        curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
        sudo apt-get update
        sudo apt-get install -y gh
    fi
    
    log_success "GitHub CLI installed successfully"
}

# Install Terraform (basic version for learning)
install_terraform() {
    if command_exists terraform; then
        log_info "Terraform is already installed"
        return
    fi
    
    log_info "Installing Terraform..."
    
    if [[ "$OS" == "macOS" ]]; then
        brew install terraform
    else
        wget https://releases.hashicorp.com/terraform/1.6.0/terraform_1.6.0_linux_amd64.zip
        unzip terraform_1.6.0_linux_amd64.zip
        sudo mv terraform /usr/local/bin/
        rm terraform_1.6.0_linux_amd64.zip
    fi
    
    log_success "Terraform installed successfully"
}

# Install kubectl
install_kubectl() {
    if command_exists kubectl; then
        log_info "kubectl is already installed"
        return
    fi
    
    log_info "Installing kubectl..."
    
    if [[ "$OS" == "macOS" ]]; then
        brew install kubectl
    else
        curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
        sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
        rm kubectl
    fi
    
    log_success "kubectl installed successfully"
}

# Install Helm
install_helm() {
    if command_exists helm; then
        log_info "Helm is already installed"
        return
    fi
    
    log_info "Installing Helm..."
    
    curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
    
    log_success "Helm installed successfully"
}

# Install AWS CLI
install_aws_cli() {
    if command_exists aws; then
        log_info "AWS CLI is already installed"
        return
    fi
    
    log_info "Installing AWS CLI..."
    
    if [[ "$OS" == "macOS" ]]; then
        brew install awscli
    else
        curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
        unzip awscliv2.zip
        sudo ./aws/install
        rm -rf aws awscliv2.zip
    fi
    
    log_success "AWS CLI installed successfully"
}

# Install Azure CLI
install_azure_cli() {
    if command_exists az; then
        log_info "Azure CLI is already installed"
        return
    fi
    
    log_info "Installing Azure CLI..."
    
    if [[ "$OS" == "macOS" ]]; then
        brew install azure-cli
    else
        curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
    fi
    
    log_success "Azure CLI installed successfully"
}

# Install Google Cloud CLI
install_gcloud_cli() {
    if command_exists gcloud; then
        log_info "Google Cloud CLI is already installed"
        return
    fi
    
    log_info "Installing Google Cloud CLI..."
    
    if [[ "$OS" == "macOS" ]]; then
        brew install --cask google-cloud-sdk
    else
        echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
        curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
        sudo apt-get update && sudo apt-get install -y google-cloud-cli
    fi
    
    log_success "Google Cloud CLI installed successfully"
}

# Create configuration directories
create_config_dirs() {
    log_info "Creating configuration directories..."
    
    mkdir -p ~/.devops-toolkit/{configs,templates,scripts,examples}
    mkdir -p ~/.devops-toolkit/configs/{docker,terraform,ansible,vscode}
    mkdir -p ~/.devops-toolkit/templates/{basic-web-app,microservices,infrastructure}
    mkdir -p ~/.devops-toolkit/scripts
    mkdir -p ~/.devops-toolkit/examples
    
    log_success "Configuration directories created"
}

# Install VS Code (if not already installed)
install_vscode() {
    if command_exists code; then
        log_info "VS Code is already installed"
        return
    fi
    
    log_info "Installing VS Code..."
    
    if [[ "$OS" == "macOS" ]]; then
        brew install --cask visual-studio-code
    elif [[ "$OS" == "Ubuntu" ]] || [[ "$OS" == "Debian"* ]]; then
        wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
        sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
        sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
        sudo apt-get update
        sudo apt-get install -y code
        rm packages.microsoft.gpg
    else
        log_warning "Please install VS Code manually for your OS"
    fi
    
    log_success "VS Code installed successfully"
}

# Main installation function
main() {
    print_banner
    
    log_info "Starting DevOps Environment Toolkit installation..."
    
    check_root
    detect_os
    
    # Update package lists
    install_package_manager
    
    # Install core tools
    install_docker
    install_docker_compose
    install_git
    install_gh_cli
    
    # Install infrastructure tools (basic)
    install_terraform
    install_kubectl
    install_helm
    
    # Install cloud CLIs
    install_aws_cli
    install_azure_cli
    install_gcloud_cli
    
    # Install development tools
    install_vscode
    
    # Create configuration structure
    create_config_dirs
    
    # Final message
    echo
    log_success "🎉 Installation completed successfully!"
    echo
    echo -e "${PURPLE}Next steps:${NC}"
    echo -e "1. ${CYAN}Restart your terminal${NC} or run ${YELLOW}source ~/.bashrc${NC}"
    echo -e "2. ${CYAN}Run verification script:${NC} ${YELLOW}./verify.sh${NC}"
    echo -e "3. ${CYAN}Start Docker:${NC} ${YELLOW}sudo systemctl start docker${NC} (Linux) or start Docker Desktop (macOS)"
    echo -e "4. ${CYAN}Configure your tools:${NC} Check the ${YELLOW}configs/${NC} directory"
    echo -e "5. ${CYAN}Explore templates:${NC} Check the ${YELLOW}templates/${NC} directory"
    echo
    echo -e "${GREEN}Happy DevOps learning! 🚀${NC}"
}

# Run main function
main "$@"
