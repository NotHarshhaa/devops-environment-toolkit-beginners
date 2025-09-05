#!/bin/bash

# DevOps Environment Toolkit - Setup Script
# This script sets up the development environment after installation

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

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

# Create necessary directories
create_directories() {
    log_info "Creating necessary directories..."
    
    mkdir -p ~/.devops-toolkit/{configs,templates,scripts,examples}
    mkdir -p ~/.devops-toolkit/configs/{docker,vscode}
    mkdir -p ~/.devops-toolkit/templates/basic-web-app
    mkdir -p ~/.devops-toolkit/scripts
    mkdir -p ~/.devops-toolkit/examples
    
    log_success "Directories created successfully"
}

# Copy configuration files
copy_configs() {
    log_info "Copying configuration files..."
    
    # Copy Docker configurations
    cp -r configs/docker/* ~/.devops-toolkit/configs/docker/ 2>/dev/null || true
    
    # Note: Terraform and Ansible configs removed for beginner focus
    
    # Copy VS Code configurations
    cp -r configs/vscode/* ~/.devops-toolkit/configs/vscode/ 2>/dev/null || true
    
    log_success "Configuration files copied successfully"
}

# Copy templates
copy_templates() {
    log_info "Copying project templates..."
    
    # Copy basic web app template
    cp -r templates/basic-web-app/* ~/.devops-toolkit/templates/basic-web-app/ 2>/dev/null || true
    
    # Note: Microservices and infrastructure templates removed for beginner focus
    
    log_success "Templates copied successfully"
}

# Copy scripts
copy_scripts() {
    log_info "Copying utility scripts..."
    
    cp scripts/* ~/.devops-toolkit/scripts/ 2>/dev/null || true
    chmod +x ~/.devops-toolkit/scripts/*.sh 2>/dev/null || true
    
    log_success "Scripts copied successfully"
}

# Set up Git configuration
setup_git() {
    log_info "Setting up Git configuration..."
    
    # Set up Git aliases if not already configured
    git config --global alias.st status || true
    git config --global alias.co checkout || true
    git config --global alias.br branch || true
    git config --global alias.ci commit || true
    git config --global alias.unstage 'reset HEAD --' || true
    git config --global alias.last 'log -1 HEAD' || true
    git config --global alias.visual '!gitk' || true
    git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit" || true
    
    log_success "Git configuration updated"
}

# Create sample project
create_sample_project() {
    log_info "Creating sample project..."
    
    local project_dir="$HOME/devops-sample-project"
    
    if [[ -d "$project_dir" ]]; then
        log_warning "Sample project directory already exists: $project_dir"
        return
    fi
    
    mkdir -p "$project_dir"
    cd "$project_dir"
    
    # Copy basic web app template
    cp -r ~/.devops-toolkit/templates/basic-web-app/* .
    
    # Initialize Git repository
    git init
    git add .
    git commit -m "Initial commit: Sample DevOps project"
    
    log_success "Sample project created at: $project_dir"
}

# Set up VS Code workspace
setup_vscode_workspace() {
    log_info "Setting up VS Code workspace..."
    
    local workspace_file="$HOME/devops-sample-project/devops-sample.code-workspace"
    
    cat > "$workspace_file" << 'EOF'
{
  "folders": [
    {
      "name": "DevOps Sample Project",
      "path": "."
    }
  ],
  "settings": {
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll": true
    },
    "files.autoSave": "afterDelay",
    "files.autoSaveDelay": 1000
  },
  "extensions": {
    "recommendations": [
      "ms-vscode.vscode-docker",
      "ms-kubernetes-tools.vscode-kubernetes-tools",
      "hashicorp.terraform",
      "redhat.vscode-yaml"
    ]
  }
}
EOF
    
    log_success "VS Code workspace created"
}

# Create useful aliases
create_aliases() {
    log_info "Creating useful aliases..."
    
    local aliases_file="$HOME/.devops-aliases"
    
    cat > "$aliases_file" << 'EOF'
# DevOps Environment Toolkit Aliases

# Docker aliases
alias d='docker'
alias dc='docker-compose'
alias dps='docker ps'
alias dpsa='docker ps -a'
alias di='docker images'
alias drm='docker rm'
alias drmi='docker rmi'
alias dstop='docker stop'
alias dstart='docker start'
alias dlogs='docker logs'
alias dexec='docker exec -it'

# Docker Compose aliases
alias dcup='docker-compose up'
alias dcdown='docker-compose down'
alias dcbuild='docker-compose build'
alias dclogs='docker-compose logs'
alias dcexec='docker-compose exec'

# Git aliases
alias gst='git status'
alias gco='git checkout'
alias gbr='git branch'
alias gci='git commit'
alias gadd='git add'
alias gpush='git push'
alias gpull='git pull'
alias glog='git log --oneline'

# Kubernetes aliases
alias k='kubectl'
alias kgp='kubectl get pods'
alias kgs='kubectl get services'
alias kgd='kubectl get deployments'
alias kd='kubectl describe'
alias kl='kubectl logs'

# Terraform aliases
alias tf='terraform'
alias tfi='terraform init'
alias tfp='terraform plan'
alias tfa='terraform apply'
alias tfd='terraform destroy'

# System aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'

# DevOps toolkit aliases
alias devops-verify='~/.devops-toolkit/scripts/verify.sh'
alias devops-start='cd ~/devops-sample-project && docker-compose up -d'
alias devops-stop='cd ~/devops-sample-project && docker-compose down'
alias devops-logs='cd ~/devops-sample-project && docker-compose logs -f'
EOF
    
    # Add aliases to bashrc if not already present
    if ! grep -q "devops-aliases" ~/.bashrc; then
        echo "" >> ~/.bashrc
        echo "# Load DevOps aliases" >> ~/.bashrc
        echo "source ~/.devops-aliases" >> ~/.bashrc
    fi
    
    log_success "Aliases created and added to ~/.bashrc"
}

# Main setup function
main() {
    echo -e "${CYAN}Setting up DevOps Environment Toolkit...${NC}"
    echo
    
    create_directories
    copy_configs
    copy_templates
    copy_scripts
    setup_git
    create_sample_project
    setup_vscode_workspace
    create_aliases
    
    echo
    log_success "🎉 Setup completed successfully!"
    echo
    echo -e "${PURPLE}Next steps:${NC}"
    echo -e "1. ${CYAN}Reload your shell:${NC} ${YELLOW}source ~/.bashrc${NC}"
    echo -e "2. ${CYAN}Navigate to sample project:${NC} ${YELLOW}cd ~/devops-sample-project${NC}"
    echo -e "3. ${CYAN}Start the development environment:${NC} ${YELLOW}devops-start${NC}"
    echo -e "4. ${CYAN}Open VS Code workspace:${NC} ${YELLOW}code devops-sample.code-workspace${NC}"
    echo -e "5. ${CYAN}View logs:${NC} ${YELLOW}devops-logs${NC}"
    echo
    echo -e "${GREEN}Happy DevOps learning! 🚀${NC}"
}

# Run main function
main "$@"
