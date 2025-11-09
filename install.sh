#!/bin/bash

# DevOps Environment Toolkit - Enhanced Installation Script
# Author: H A R S H H A A
# License: MIT
# Version: 2.0.0

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Global variables
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="$HOME/.devops-toolkit-install.log"
BACKUP_DIR="$HOME/.devops-toolkit-backup"
INSTALL_TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
VERBOSE=false
DRY_RUN=false
SKIP_CONFIRMATION=false
SELECTIVE_INSTALL=false

# ASCII Art Banner
print_banner() {
    echo -e "${CYAN}"
    cat << "EOF"
    ╔══════════════════════════════════════════════════════════════╗
    ║                                                              ║
    ║    🚀 DevOps Environment Toolkit - Enhanced Installer 🚀     ║
    ║                                                              ║
    ║    Version 2.0.0 - Advanced Features & Error Recovery       ║
    ║                                                              ║
    ╚══════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"
}

# Enhanced logging system
init_logging() {
    mkdir -p "$(dirname "$LOG_FILE")"
    echo "=== DevOps Toolkit Installation Log - $(date) ===" > "$LOG_FILE"
    echo "Script Version: 2.0.0" >> "$LOG_FILE"
    echo "OS: $(uname -s) $(uname -r)" >> "$LOG_FILE"
    echo "User: $(whoami)" >> "$LOG_FILE"
    echo "===============================================" >> "$LOG_FILE"
}

log_to_file() {
    local level="$1"
    local message="$2"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] [$level] $message" >> "$LOG_FILE"
}

# Progress tracking
PROGRESS_TOTAL=0
PROGRESS_CURRENT=0

init_progress() {
    PROGRESS_TOTAL="$1"
    PROGRESS_CURRENT=0
}

update_progress() {
    PROGRESS_CURRENT=$((PROGRESS_CURRENT + 1))
    local percentage=$((PROGRESS_CURRENT * 100 / PROGRESS_TOTAL))
    printf "\r${BLUE}[PROGRESS]${NC} %d/%d (%d%%) - " "$PROGRESS_CURRENT" "$PROGRESS_TOTAL" "$percentage"
    
    # Create a simple progress bar
    local bar_length=30
    local filled_length=$((percentage * bar_length / 100))
    printf "["
    for ((i=0; i<filled_length; i++)); do printf "█"; done
    for ((i=filled_length; i<bar_length; i++)); do printf "░"; done
    printf "]"
}

# Error handling and recovery
error_handler() {
    local exit_code=$?
    local line_number=$1
    local command="$2"
    
    log_error "Error occurred at line $line_number: $command (exit code: $exit_code)"
    log_to_file "ERROR" "Installation failed at line $line_number: $command (exit code: $exit_code)"
    
    if [[ "$exit_code" -ne 0 ]]; then
        echo
        log_error "Installation failed! Check the log file: $LOG_FILE"
        log_error "You can try to recover by running: $0 --recover"
        exit "$exit_code"
    fi
}

trap 'error_handler $LINENO "$BASH_COMMAND"' ERR

# Backup and restore functionality
create_backup() {
    log_info "Creating backup of existing configurations..."
    mkdir -p "$BACKUP_DIR/$INSTALL_TIMESTAMP"
    
    # Backup existing configurations
    if [[ -d "$HOME/.devops-toolkit" ]]; then
        cp -r "$HOME/.devops-toolkit" "$BACKUP_DIR/$INSTALL_TIMESTAMP/" 2>/dev/null || true
    fi
    
    # Backup shell configuration files
    for file in ~/.bashrc ~/.zshrc ~/.profile; do
        if [[ -f "$file" ]]; then
            cp "$file" "$BACKUP_DIR/$INSTALL_TIMESTAMP/" 2>/dev/null || true
        fi
    done
    
    log_success "Backup created at: $BACKUP_DIR/$INSTALL_TIMESTAMP"
    log_to_file "INFO" "Backup created at: $BACKUP_DIR/$INSTALL_TIMESTAMP"
}

restore_backup() {
    local backup_path="$1"
    if [[ -z "$backup_path" ]]; then
        # Find the latest backup
        backup_path=$(ls -t "$BACKUP_DIR" 2>/dev/null | head -1)
    fi
    
    if [[ -z "$backup_path" ]] || [[ ! -d "$BACKUP_DIR/$backup_path" ]]; then
        log_error "No backup found to restore"
        return 1
    fi
    
    log_info "Restoring from backup: $backup_path"
    
    # Restore configurations
    if [[ -d "$BACKUP_DIR/$backup_path/.devops-toolkit" ]]; then
        rm -rf "$HOME/.devops-toolkit"
        cp -r "$BACKUP_DIR/$backup_path/.devops-toolkit" "$HOME/"
    fi
    
    # Restore shell configuration files
    for file in bashrc zshrc profile; do
        if [[ -f "$BACKUP_DIR/$backup_path/.$file" ]]; then
            cp "$BACKUP_DIR/$backup_path/.$file" "$HOME/.$file"
        fi
    done
    
    log_success "Backup restored successfully"
    log_to_file "INFO" "Backup restored from: $backup_path"
}

# System validation and compatibility checks
validate_system() {
    log_info "Validating system compatibility..."
    
    # Check available disk space (need at least 5GB)
    local available_space=$(df "$HOME" | awk 'NR==2 {print $4}')
    local required_space=5242880  # 5GB in KB
    
    if [[ "$available_space" -lt "$required_space" ]]; then
        log_error "Insufficient disk space. Need at least 5GB, have $(($available_space / 1024 / 1024))GB"
        return 1
    fi
    
    # Check available memory (need at least 4GB)
    if command -v free >/dev/null 2>&1; then
        local available_memory=$(free -m | awk 'NR==2{print $7}')
        if [[ "$available_memory" -lt 4096 ]]; then
            log_warning "Low available memory: ${available_memory}MB. Recommended: 4GB+"
        fi
    elif command -v vm_stat >/dev/null 2>&1; then
        # macOS memory check
        local page_size=$(vm_stat | grep "page size" | awk '{print $8}')
        local free_pages=$(vm_stat | grep "Pages free" | awk '{print $3}' | sed 's/\.//')
        local available_memory=$((free_pages * page_size / 1024 / 1024))
        if [[ "$available_memory" -lt 4096 ]]; then
            log_warning "Low available memory: ${available_memory}MB. Recommended: 4GB+"
        fi
    else
        log_warning "Cannot determine available memory"
    fi
    
    # Check internet connectivity
    log_info "Checking internet connectivity..."
    if command -v curl >/dev/null 2>&1; then
        if ! curl -s --connect-timeout 5 https://www.google.com > /dev/null 2>&1; then
            log_warning "No internet connection detected. Some installations may fail."
            log_info "Continuing with installation - some tools may need manual installation"
        fi
    elif command -v wget >/dev/null 2>&1; then
        if ! wget -q --spider --timeout=5 https://www.google.com 2>&1; then
            log_warning "No internet connection detected. Some installations may fail."
            log_info "Continuing with installation - some tools may need manual installation"
        fi
    elif command -v ping >/dev/null 2>&1; then
        if ! ping -c 1 -W 2 8.8.8.8 &>/dev/null; then
            log_warning "No internet connection detected. Some installations may fail."
            log_info "Continuing with installation - some tools may need manual installation"
        fi
    else
        log_warning "Cannot verify internet connectivity. Proceeding with installation."
    fi
    
    # Check if running in a supported environment
    if [[ -n "$WSL_DISTRO_NAME" ]]; then
        log_info "WSL environment detected: $WSL_DISTRO_NAME"
    elif [[ -n "$DOCKER_CONTAINER" ]]; then
        log_warning "Running inside Docker container. Some features may be limited."
    fi
    
    log_success "System validation completed"
    log_to_file "INFO" "System validation passed"
}

# Enhanced logging functions with file logging
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
    log_to_file "INFO" "$1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
    log_to_file "SUCCESS" "$1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
    log_to_file "WARNING" "$1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
    log_to_file "ERROR" "$1"
}

log_debug() {
    if [[ "$VERBOSE" == true ]]; then
        echo -e "${PURPLE}[DEBUG]${NC} $1"
        log_to_file "DEBUG" "$1"
    fi
}

# Command line argument parsing
parse_arguments() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            --verbose|-v)
                VERBOSE=true
                shift
                ;;
            --dry-run|-d)
                DRY_RUN=true
                shift
                ;;
            --skip-confirmation|-y)
                SKIP_CONFIRMATION=true
                shift
                ;;
            --selective|-s)
                SELECTIVE_INSTALL=true
                shift
                ;;
            --recover|-r)
                restore_backup
                exit 0
                ;;
            --help|-h)
                show_help
                exit 0
                ;;
            --version)
                echo "DevOps Environment Toolkit Installer v2.0.0"
                exit 0
                ;;
            *)
                log_error "Unknown option: $1"
                show_help
                exit 1
                ;;
        esac
    done
}

show_help() {
    echo -e "${BOLD}DevOps Environment Toolkit - Enhanced Installer${NC}"
    echo
    echo -e "${CYAN}Usage:${NC} $0 [OPTIONS]"
    echo
    echo -e "${CYAN}Options:${NC}"
    echo -e "  ${YELLOW}-v, --verbose${NC}           Enable verbose output"
    echo -e "  ${YELLOW}-d, --dry-run${NC}           Show what would be installed without actually installing"
    echo -e "  ${YELLOW}-y, --skip-confirmation${NC} Skip confirmation prompts"
    echo -e "  ${YELLOW}-s, --selective${NC}          Enable selective installation menu"
    echo -e "  ${YELLOW}-r, --recover${NC}            Restore from backup"
    echo -e "  ${YELLOW}-h, --help${NC}               Show this help message"
    echo -e "  ${YELLOW}--version${NC}                 Show version information"
    echo
    echo -e "${CYAN}Examples:${NC}"
    echo -e "  ${YELLOW}$0${NC}                       # Standard installation"
    echo -e "  ${YELLOW}$0 --verbose --selective${NC} # Verbose selective installation"
    echo -e "  ${YELLOW}$0 --dry-run${NC}             # Preview installation"
    echo -e "  ${YELLOW}$0 --recover${NC}             # Restore from backup"
}

# Interactive menu system
show_interactive_menu() {
    echo
    echo -e "${BOLD}${CYAN}Selective Installation Menu${NC}"
    echo -e "${YELLOW}Choose which tools to install:${NC}"
    echo
    
    # Define installation options
    declare -A install_options=(
        ["1"]="Git"
        ["2"]="Docker & Docker Compose"
        ["3"]="Kubernetes (kubectl + Minikube)"
        ["4"]="Terraform"
        ["5"]="Ansible"
        ["6"]="VS Code"
        ["7"]="AWS CLI"
        ["8"]="Azure CLI"
        ["9"]="All Tools (Full Installation)"
        ["0"]="Exit"
    )
    
    # Show menu options
    for key in "${!install_options[@]}"; do
        echo -e "  ${YELLOW}$key)${NC} ${install_options[$key]}"
    done
    
    echo
    read -p "Enter your choice (comma-separated for multiple): " -r choices
    
    # Process choices
    IFS=',' read -ra choice_array <<< "$choices"
    for choice in "${choice_array[@]}"; do
        choice=$(echo "$choice" | xargs) # trim whitespace
        case "$choice" in
            "1") INSTALL_GIT=true ;;
            "2") INSTALL_DOCKER=true ;;
            "3") INSTALL_K8S=true ;;
            "4") INSTALL_TERRAFORM=true ;;
            "5") INSTALL_ANSIBLE=true ;;
            "6") INSTALL_VSCODE=true ;;
            "7") INSTALL_AWS_CLI=true ;;
            "8") INSTALL_AZURE_CLI=true ;;
            "9") 
                INSTALL_GIT=true
                INSTALL_DOCKER=true
                INSTALL_K8S=true
                INSTALL_TERRAFORM=true
                INSTALL_ANSIBLE=true
                INSTALL_VSCODE=true
                INSTALL_AWS_CLI=true
                INSTALL_AZURE_CLI=true
                ;;
            "0") 
                log_info "Installation cancelled by user"
                exit 0
                ;;
            *) log_warning "Invalid choice: $choice" ;;
        esac
    done
}


# Confirmation prompt with enhanced options
confirm_installation() {
    if [[ "$SKIP_CONFIRMATION" == true ]]; then
        return 0
    fi
    
    echo
    echo -e "${BOLD}${YELLOW}Installation Summary${NC}"
    echo -e "${CYAN}The following tools will be installed:${NC}"
    
    # Show what will be installed
    if [[ "$INSTALL_GIT" == true ]]; then echo -e "  ${GREEN}✓${NC} Git"; fi
    if [[ "$INSTALL_DOCKER" == true ]]; then echo -e "  ${GREEN}✓${NC} Docker & Docker Compose"; fi
    if [[ "$INSTALL_K8S" == true ]]; then echo -e "  ${GREEN}✓${NC} Kubernetes (kubectl + Minikube)"; fi
    if [[ "$INSTALL_TERRAFORM" == true ]]; then echo -e "  ${GREEN}✓${NC} Terraform"; fi
    if [[ "$INSTALL_ANSIBLE" == true ]]; then echo -e "  ${GREEN}✓${NC} Ansible"; fi
    if [[ "$INSTALL_VSCODE" == true ]]; then echo -e "  ${GREEN}✓${NC} VS Code"; fi
    if [[ "$INSTALL_AWS_CLI" == true ]]; then echo -e "  ${GREEN}✓${NC} AWS CLI"; fi
    if [[ "$INSTALL_AZURE_CLI" == true ]]; then echo -e "  ${GREEN}✓${NC} Azure CLI"; fi
    
    echo
    echo -e "${CYAN}Installation options:${NC}"
    echo -e "  ${YELLOW}•${NC} Log file: $LOG_FILE"
    echo -e "  ${YELLOW}•${NC} Backup: $BACKUP_DIR/$INSTALL_TIMESTAMP"
    echo -e "  ${YELLOW}•${NC} Verbose: $VERBOSE"
    echo -e "  ${YELLOW}•${NC} Dry run: $DRY_RUN"
    
    echo
    read -p "Do you want to proceed with the installation? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_info "Installation cancelled by user"
        exit 0
    fi
}

# Check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        log_warning "Running as root. This is not recommended for security reasons."
        if [[ "$SKIP_CONFIRMATION" != true ]]; then
            read -p "Do you want to continue? (y/N): " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                log_info "Installation cancelled."
                exit 1
            fi
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

# Enhanced installation functions with dry-run support
run_command() {
    local command="$1"
    local description="$2"
    
    if [[ "$DRY_RUN" == true ]]; then
        log_info "[DRY RUN] Would execute: $command"
        log_debug "Description: $description"
        return 0
    fi
    
    log_debug "Executing: $command"
    if eval "$command"; then
        log_success "$description"
        return 0
    else
        log_error "Failed to execute: $command"
        return 1
    fi
}

# Install package manager dependencies
install_package_manager() {
    log_info "Setting up package manager..."
    update_progress
    
    if [[ "$OS" == "Ubuntu" ]] || [[ "$OS" == "Debian"* ]]; then
        run_command "sudo apt-get update" "Updated package lists"
        run_command "sudo apt-get install -y curl wget git unzip jq tree htop vim nano" "Installed essential packages"
    elif [[ "$OS" == "CentOS"* ]] || [[ "$OS" == "Red Hat"* ]] || [[ "$OS" == "Fedora"* ]]; then
        run_command "sudo yum update -y" "Updated package lists"
        run_command "sudo yum install -y curl wget git unzip jq tree htop vim nano" "Installed essential packages"
    elif [[ "$OS" == "macOS" ]]; then
        if ! command_exists brew; then
            log_info "Installing Homebrew..."
            run_command '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"' "Installed Homebrew"
        fi
        run_command "brew install curl wget git jq tree htop vim nano" "Installed essential packages via Homebrew"
    else
        log_warning "Unknown OS. Please install curl, wget, git, unzip, jq, tree, and htop manually."
    fi
}

# Install Docker
install_docker() {
    if command_exists docker; then
        local docker_version=$(docker --version 2>/dev/null | grep -oP '\d+\.\d+\.\d+' | head -1)
        log_info "Docker is already installed (version: ${docker_version:-unknown})"
        return
    fi
    
    log_info "Installing Docker..."
    
    if [[ "$OS" == "Ubuntu" ]] || [[ "$OS" == "Debian"* ]]; then
        # Remove old versions
        sudo apt-get remove -y docker docker-engine docker.io containerd runc 2>/dev/null || true
        
        # Install Docker
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        sudo usermod -aG docker $USER
        rm -f get-docker.sh
        
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
        local compose_version=$(docker-compose --version 2>/dev/null | grep -oP '\d+\.\d+\.\d+' | head -1)
        log_info "Docker Compose is already installed (version: ${compose_version:-unknown})"
        return
    fi
    
    log_info "Installing Docker Compose..."
    
    if [[ "$OS" == "macOS" ]]; then
        brew install docker-compose
    else
        log_debug "Downloading latest Docker Compose..."
        if sudo curl -fsSL "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose; then
            sudo chmod +x /usr/local/bin/docker-compose
        else
            log_error "Failed to download Docker Compose. Please install manually."
            return 1
        fi
    fi
    
    log_success "Docker Compose installed successfully"
}

# Install Git
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

# Install Terraform (basic version for learning)
install_terraform() {
    if command_exists terraform; then
        local tf_version=$(terraform --version 2>/dev/null | head -1 | grep -oP '\d+\.\d+\.\d+' | head -1)
        log_info "Terraform is already installed (version: ${tf_version:-unknown})"
        return
    fi
    
    log_info "Installing Terraform..."
    
    if [[ "$OS" == "macOS" ]]; then
        brew install terraform
    else
        local TERRAFORM_VERSION="1.7.0"
        log_debug "Downloading Terraform version $TERRAFORM_VERSION..."
        if wget -q "https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip" -O terraform.zip; then
            unzip -q terraform.zip
            sudo mv terraform /usr/local/bin/
            sudo chmod +x /usr/local/bin/terraform
            rm -f terraform.zip
        else
            log_error "Failed to download Terraform. Please install manually."
            return 1
        fi
    fi
    
    log_success "Terraform installed successfully"
}

# Install kubectl
install_kubectl() {
    if command_exists kubectl; then
        local kubectl_version=$(kubectl version --client 2>/dev/null | grep -oP 'GitVersion:"v\K[^"]+' | head -1)
        log_info "kubectl is already installed (version: ${kubectl_version:-unknown})"
        return
    fi
    
    log_info "Installing kubectl..."
    
    if [[ "$OS" == "macOS" ]]; then
        brew install kubectl
    else
        log_debug "Fetching latest kubectl version..."
        local KUBECTL_VERSION=$(curl -L -s https://dl.k8s.io/release/stable.txt 2>/dev/null || echo "v1.29.0")
        if curl -fsSLO "https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl"; then
            sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
            rm -f kubectl
        else
            log_error "Failed to download kubectl. Please install manually."
            return 1
        fi
    fi
    
    log_success "kubectl installed successfully"
}

# Install Minikube
install_minikube() {
    if command_exists minikube; then
        log_info "Minikube is already installed"
        return
    fi
    
    log_info "Installing Minikube..."
    
    if [[ "$OS" == "macOS" ]]; then
        brew install minikube
    else
        curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
        sudo install minikube-linux-amd64 /usr/local/bin/minikube
        rm -f minikube-linux-amd64
    fi
    
    log_success "Minikube installed successfully"
}

# Install Ansible
install_ansible() {
    if command_exists ansible; then
        log_info "Ansible is already installed"
        return
    fi
    
    log_info "Installing Ansible..."
    
    if [[ "$OS" == "macOS" ]]; then
        brew install ansible
    else
        sudo apt-get update
        sudo apt-get install -y ansible || sudo yum install -y ansible
    fi
    
    log_success "Ansible installed successfully"
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
        rm -f packages.microsoft.gpg
    else
        log_warning "Please install VS Code manually for your OS"
    fi
    
    log_success "VS Code installed successfully"
}

# Post-installation health checks
run_health_checks() {
    log_info "Running post-installation health checks..."
    
    local checks_passed=0
    local total_checks=0
    
    # Check Git
    if [[ "$INSTALL_GIT" == true ]]; then
        total_checks=$((total_checks + 1))
        if command_exists git && git --version &>/dev/null; then
            log_success "Git is working correctly"
            checks_passed=$((checks_passed + 1))
        else
            log_error "Git health check failed"
        fi
    fi
    
    # Check Docker
    if [[ "$INSTALL_DOCKER" == true ]]; then
        total_checks=$((total_checks + 1))
        if command_exists docker && docker --version &>/dev/null; then
            log_success "Docker is working correctly"
            checks_passed=$((checks_passed + 1))
        else
            log_error "Docker health check failed"
        fi
    fi
    
    # Check kubectl
    if [[ "$INSTALL_K8S" == true ]]; then
        total_checks=$((total_checks + 1))
        if command_exists kubectl && kubectl version --client &>/dev/null; then
            log_success "kubectl is working correctly"
            checks_passed=$((checks_passed + 1))
        else
            log_error "kubectl health check failed"
        fi
    fi
    
    # Check Minikube
    if [[ "$INSTALL_K8S" == true ]]; then
        total_checks=$((total_checks + 1))
        if command_exists minikube && minikube version &>/dev/null; then
            log_success "Minikube is working correctly"
            checks_passed=$((checks_passed + 1))
        else
            log_error "Minikube health check failed"
        fi
    fi
    
    # Check Terraform
    if [[ "$INSTALL_TERRAFORM" == true ]]; then
        total_checks=$((total_checks + 1))
        if command_exists terraform && terraform --version &>/dev/null; then
            log_success "Terraform is working correctly"
            checks_passed=$((checks_passed + 1))
        else
            log_error "Terraform health check failed"
        fi
    fi
    
    # Check Ansible
    if [[ "$INSTALL_ANSIBLE" == true ]]; then
        total_checks=$((total_checks + 1))
        if command_exists ansible && ansible --version &>/dev/null; then
            log_success "Ansible is working correctly"
            checks_passed=$((checks_passed + 1))
        else
            log_error "Ansible health check failed"
        fi
    fi
    
    # Check AWS CLI
    if [[ "$INSTALL_AWS_CLI" == true ]]; then
        total_checks=$((total_checks + 1))
        if command_exists aws && aws --version &>/dev/null; then
            log_success "AWS CLI is working correctly"
            checks_passed=$((checks_passed + 1))
        else
            log_error "AWS CLI health check failed"
        fi
    fi
    
    # Check Azure CLI
    if [[ "$INSTALL_AZURE_CLI" == true ]]; then
        total_checks=$((total_checks + 1))
        if command_exists az && az --version &>/dev/null; then
            log_success "Azure CLI is working correctly"
            checks_passed=$((checks_passed + 1))
        else
            log_error "Azure CLI health check failed"
        fi
    fi
    
    # Summary
    echo
    log_info "Health check summary: $checks_passed/$total_checks checks passed"
    
    if [[ "$checks_passed" -eq "$total_checks" ]]; then
        log_success "All health checks passed!"
        return 0
    else
        log_warning "Some health checks failed. Check the log file for details."
        return 1
    fi
}

# Generate installation report
generate_report() {
    local report_file="$HOME/.devops-toolkit-install-report-$INSTALL_TIMESTAMP.txt"
    
    log_info "Generating installation report..."
    
    cat > "$report_file" << EOF
DevOps Environment Toolkit - Installation Report
===============================================
Installation Date: $(date)
Script Version: 2.0.0
OS: $OS $VER
User: $(whoami)
Installation Mode: $([ "$DRY_RUN" == true ] && echo "Dry Run" || echo "Live Installation")

Installed Tools:
EOF
    
    if [[ "$INSTALL_GIT" == true ]]; then echo "- Git" >> "$report_file"; fi
    if [[ "$INSTALL_DOCKER" == true ]]; then echo "- Docker & Docker Compose" >> "$report_file"; fi
    if [[ "$INSTALL_K8S" == true ]]; then echo "- Kubernetes (kubectl + Minikube)" >> "$report_file"; fi
    if [[ "$INSTALL_TERRAFORM" == true ]]; then echo "- Terraform" >> "$report_file"; fi
    if [[ "$INSTALL_ANSIBLE" == true ]]; then echo "- Ansible" >> "$report_file"; fi
    if [[ "$INSTALL_VSCODE" == true ]]; then echo "- VS Code" >> "$report_file"; fi
    if [[ "$INSTALL_AWS_CLI" == true ]]; then echo "- AWS CLI" >> "$report_file"; fi
    if [[ "$INSTALL_AZURE_CLI" == true ]]; then echo "- Azure CLI" >> "$report_file"; fi
    
    cat >> "$report_file" << EOF

Configuration Files:
- Log file: $LOG_FILE
- Backup: $BACKUP_DIR/$INSTALL_TIMESTAMP
- Config directory: ~/.devops-toolkit

Next Steps:
1. Restart your terminal or run: source ~/.bashrc
2. Run verification script: ./verify.sh
3. Start Docker: sudo systemctl start docker (Linux) or start Docker Desktop (macOS)
4. Configure your tools: Check the configs/ directory
5. Explore templates: Check the templates/ directory

For support and updates, visit: https://github.com/your-repo/devops-environment-toolkit
EOF
    
    log_success "Installation report generated: $report_file"
}

# Main installation function
main() {
    # Parse command line arguments
    parse_arguments "$@"
    
    # Initialize logging
    init_logging
    
    print_banner
    
    log_info "Starting DevOps Environment Toolkit installation..."
    log_to_file "INFO" "Installation started with options: VERBOSE=$VERBOSE, DRY_RUN=$DRY_RUN, SELECTIVE=$SELECTIVE_INSTALL"
    
    # System validation
    if ! validate_system; then
        log_error "System validation failed. Please check the requirements."
        exit 1
    fi
    
    # Create backup
    if [[ "$DRY_RUN" != true ]]; then
        create_backup
    fi
    
    # Check root privileges
    check_root
    
    # Detect OS
    detect_os
    
    # Show interactive menu if selective install is enabled
    if [[ "$SELECTIVE_INSTALL" == true ]]; then
        show_interactive_menu
    else
        # Default to full installation
        INSTALL_GIT=true
        INSTALL_DOCKER=true
        INSTALL_K8S=true
        INSTALL_TERRAFORM=true
        INSTALL_ANSIBLE=true
        INSTALL_VSCODE=true
        INSTALL_AWS_CLI=true
        INSTALL_AZURE_CLI=true
    fi
    
    # Confirm installation
    confirm_installation
    
    # Calculate total steps for progress tracking
    local total_steps=0
    [[ "$INSTALL_GIT" == true ]] && total_steps=$((total_steps + 1))
    [[ "$INSTALL_DOCKER" == true ]] && total_steps=$((total_steps + 2))
    [[ "$INSTALL_K8S" == true ]] && total_steps=$((total_steps + 2))
    [[ "$INSTALL_TERRAFORM" == true ]] && total_steps=$((total_steps + 1))
    [[ "$INSTALL_ANSIBLE" == true ]] && total_steps=$((total_steps + 1))
    [[ "$INSTALL_VSCODE" == true ]] && total_steps=$((total_steps + 1))
    [[ "$INSTALL_AWS_CLI" == true ]] && total_steps=$((total_steps + 1))
    [[ "$INSTALL_AZURE_CLI" == true ]] && total_steps=$((total_steps + 1))
    total_steps=$((total_steps + 3)) # package manager, configs, health checks
    
    init_progress "$total_steps"
    
    # Update package lists
    install_package_manager
    
    # Install core tools
    if [[ "$INSTALL_GIT" == true ]]; then
        install_git
        update_progress
    fi
    
    if [[ "$INSTALL_DOCKER" == true ]]; then
        install_docker
        update_progress
        install_docker_compose
        update_progress
    fi
    
    # Install infrastructure tools
    if [[ "$INSTALL_K8S" == true ]]; then
        install_kubectl
        update_progress
        install_minikube
        update_progress
    fi
    
    if [[ "$INSTALL_TERRAFORM" == true ]]; then
        install_terraform
        update_progress
    fi
    
    if [[ "$INSTALL_ANSIBLE" == true ]]; then
        install_ansible
        update_progress
    fi
    
    # Install cloud CLIs
    if [[ "$INSTALL_AWS_CLI" == true ]]; then
        install_aws_cli
        update_progress
    fi
    
    if [[ "$INSTALL_AZURE_CLI" == true ]]; then
        install_azure_cli
        update_progress
    fi
    
    # Install development tools
    if [[ "$INSTALL_VSCODE" == true ]]; then
        install_vscode
        update_progress
    fi
    
    # Create configuration structure
    create_config_dirs
    update_progress
    
    # Run health checks
    if [[ "$DRY_RUN" != true ]]; then
        run_health_checks
        update_progress
    fi
    
    # Generate report
    if [[ "$DRY_RUN" != true ]]; then
        generate_report
        update_progress
    fi
    
    echo
    log_success "🎉 Installation completed successfully!"
    echo
    
    if [[ "$DRY_RUN" == true ]]; then
        echo -e "${PURPLE}Dry run completed. No changes were made.${NC}"
        echo -e "Run without ${YELLOW}--dry-run${NC} to perform the actual installation."
    else
        echo -e "${PURPLE}Next steps:${NC}"
        echo -e "1. ${CYAN}Restart your terminal${NC} or run ${YELLOW}source ~/.bashrc${NC}"
        echo -e "2. ${CYAN}Run verification script:${NC} ${YELLOW}./verify.sh${NC}"
        echo -e "3. ${CYAN}Start Docker:${NC} ${YELLOW}sudo systemctl start docker${NC} (Linux) or start Docker Desktop (macOS)"
        echo -e "4. ${CYAN}Configure your tools:${NC} Check the ${YELLOW}configs/${NC} directory"
        echo -e "5. ${CYAN}Explore templates:${NC} Check the ${YELLOW}templates/${NC} directory"
        echo -e "6. ${CYAN}Check installation report:${NC} ${YELLOW}cat ~/.devops-toolkit-install-report-*.txt${NC}"
        echo
        echo -e "${BOLD}${CYAN}📚 Support Documentation Links:${NC}"
        echo -e "${YELLOW}• Git:${NC} https://git-scm.com/doc"
        echo -e "${YELLOW}• Docker:${NC} https://docs.docker.com/"
        echo -e "${YELLOW}• Docker Compose:${NC} https://docs.docker.com/compose/"
        echo -e "${YELLOW}• Kubernetes:${NC} https://kubernetes.io/docs/"
        echo -e "${YELLOW}• Minikube:${NC} https://minikube.sigs.k8s.io/docs/"
        echo -e "${YELLOW}• Terraform:${NC} https://developer.hashicorp.com/terraform/docs"
        echo -e "${YELLOW}• Ansible:${NC} https://docs.ansible.com/"
        echo -e "${YELLOW}• VS Code:${NC} https://code.visualstudio.com/docs"
        echo -e "${YELLOW}• AWS CLI:${NC} https://docs.aws.amazon.com/cli/"
        echo -e "${YELLOW}• Azure CLI:${NC} https://docs.microsoft.com/en-us/cli/azure/"
        echo
        echo -e "${GREEN}Happy DevOps learning! 🚀${NC}"
    fi
    
    log_to_file "INFO" "Installation completed successfully"
}

# Run main function
main "$@"
