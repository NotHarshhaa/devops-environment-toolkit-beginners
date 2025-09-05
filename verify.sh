#!/bin/bash

# DevOps Environment Toolkit - Verification Script
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
    ║    🔍 DevOps Environment Toolkit - Verification Script 🔍    ║
    ║                                                              ║
    ║    Checking your DevOps environment setup...                ║
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
    echo -e "${GREEN}[✓]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

log_error() {
    echo -e "${RED}[✗]${NC} $1"
}

# Check if command exists and get version
check_command() {
    local cmd=$1
    local name=$2
    local required_version=$3
    
    if command -v "$cmd" >/dev/null 2>&1; then
        local version=$(get_version "$cmd")
        if [[ -n "$version" ]]; then
            log_success "$name: $version"
            return 0
        else
            log_success "$name: Installed (version unknown)"
            return 0
        fi
    else
        log_error "$name: Not installed"
        return 1
    fi
}

# Get version of a command
get_version() {
    local cmd=$1
    case $cmd in
        "docker")
            docker --version 2>/dev/null | head -n1 | sed 's/Docker version //' | sed 's/,.*//'
            ;;
        "docker-compose")
            docker-compose --version 2>/dev/null | sed 's/docker-compose version //' | sed 's/,.*//'
            ;;
        "git")
            git --version 2>/dev/null | sed 's/git version //'
            ;;
        "gh")
            gh --version 2>/dev/null | head -n1 | sed 's/gh version //'
            ;;
        "terraform")
            terraform --version 2>/dev/null | head -n1 | sed 's/Terraform v//'
            ;;
        "ansible")
            ansible --version 2>/dev/null | head -n1 | sed 's/ansible //' | sed 's/ .*//'
            ;;
        "kubectl")
            kubectl version --client 2>/dev/null | grep "Client Version" | sed 's/.*GitVersion:"v//' | sed 's/".*//'
            ;;
        "helm")
            helm version --short 2>/dev/null | sed 's/v//'
            ;;
        "aws")
            aws --version 2>/dev/null | sed 's/aws-cli\///' | sed 's/ .*//'
            ;;
        "az")
            az --version 2>/dev/null | head -n1 | sed 's/azure-cli //'
            ;;
        "gcloud")
            gcloud --version 2>/dev/null | head -n1 | sed 's/Google Cloud SDK //'
            ;;
        "jq")
            jq --version 2>/dev/null | sed 's/jq-//'
            ;;
        "curl")
            curl --version 2>/dev/null | head -n1 | sed 's/curl //' | sed 's/ .*//'
            ;;
        "wget")
            wget --version 2>/dev/null | head -n1 | sed 's/GNU Wget //' | sed 's/ .*//'
            ;;
        "tree")
            tree --version 2>/dev/null | sed 's/tree v//' | sed 's/ .*//'
            ;;
        "htop")
            htop --version 2>/dev/null | sed 's/htop //' | sed 's/ .*//'
            ;;
        *)
            $cmd --version 2>/dev/null | head -n1 || echo "Unknown"
            ;;
    esac
}

# Check Docker daemon status
check_docker_daemon() {
    if command -v docker >/dev/null 2>&1; then
        if docker info >/dev/null 2>&1; then
            log_success "Docker daemon: Running"
            return 0
        else
            log_warning "Docker daemon: Not running (start with 'sudo systemctl start docker' or start Docker Desktop)"
            return 1
        fi
    else
        log_error "Docker: Not installed"
        return 1
    fi
}

# Check VS Code extensions
check_vscode_extensions() {
    if command -v code >/dev/null 2>&1; then
        log_info "Checking VS Code extensions..."
        local extensions=(
            "ms-vscode.vscode-docker"
            "ms-kubernetes-tools.vscode-kubernetes-tools"
            "hashicorp.terraform"
            "redhat.vscode-yaml"
            "ms-python.python"
            "ms-vscode.powershell"
            "ms-vscode.vscode-json"
            "bradlc.vscode-tailwindcss"
            "esbenp.prettier-vscode"
            "ms-vscode.vscode-github-actions"
        )
        
        local installed_count=0
        for ext in "${extensions[@]}"; do
            if code --list-extensions | grep -q "^$ext$"; then
                ((installed_count++))
            fi
        done
        
        if [[ $installed_count -eq ${#extensions[@]} ]]; then
            log_success "VS Code extensions: All installed ($installed_count/${#extensions[@]})"
        else
            log_warning "VS Code extensions: $installed_count/${#extensions[@]} installed"
        fi
    else
        log_warning "VS Code: Not installed"
    fi
}

# Check configuration files
check_config_files() {
    local config_dir="$HOME/.devops-toolkit"
    
    if [[ -d "$config_dir" ]]; then
        log_success "Configuration directory: $config_dir exists"
        
        local subdirs=("configs" "templates" "scripts" "examples")
        for dir in "${subdirs[@]}"; do
            if [[ -d "$config_dir/$dir" ]]; then
                log_success "  └─ $dir/ directory exists"
            else
                log_warning "  └─ $dir/ directory missing"
            fi
        done
    else
        log_warning "Configuration directory: $config_dir not found"
    fi
}

# Check system resources
check_system_resources() {
    log_info "Checking system resources..."
    
    # Check available memory
    if command -v free >/dev/null 2>&1; then
        local total_mem=$(free -h | awk '/^Mem:/ {print $2}')
        local available_mem=$(free -h | awk '/^Mem:/ {print $7}')
        log_info "Memory: $available_mem available of $total_mem total"
    elif command -v vm_stat >/dev/null 2>&1; then
        # macOS
        local page_size=$(vm_stat | grep "page size" | awk '{print $8}')
        local free_pages=$(vm_stat | grep "Pages free" | awk '{print $3}' | sed 's/\.//')
        local total_pages=$(vm_stat | grep "Pages active" | awk '{print $3}' | sed 's/\.//')
        log_info "Memory: Available (macOS - detailed check needed)"
    fi
    
    # Check disk space
    local disk_usage=$(df -h / | awk 'NR==2 {print $4}')
    log_info "Disk space: $disk_usage available"
    
    # Check CPU cores
    local cpu_cores=$(nproc 2>/dev/null || sysctl -n hw.ncpu 2>/dev/null || echo "Unknown")
    log_info "CPU cores: $cpu_cores"
}

# Generate system report
generate_report() {
    local report_file="$HOME/.devops-toolkit/system-report.txt"
    
    log_info "Generating system report..."
    
    {
        echo "DevOps Environment Toolkit - System Report"
        echo "Generated on: $(date)"
        echo "=========================================="
        echo
        
        echo "Operating System:"
        if [[ -f /etc/os-release ]]; then
            . /etc/os-release
            echo "  Name: $NAME"
            echo "  Version: $VERSION"
        elif [[ "$OSTYPE" == "darwin"* ]]; then
            echo "  Name: macOS"
            echo "  Version: $(sw_vers -productVersion)"
        fi
        echo
        
        echo "Installed Tools:"
        local tools=("docker" "docker-compose" "git" "gh" "terraform" "ansible" "kubectl" "helm" "aws" "az" "gcloud" "jq" "curl" "wget" "tree" "htop")
        for tool in "${tools[@]}"; do
            if command -v "$tool" >/dev/null 2>&1; then
                local version=$(get_version "$tool")
                echo "  ✓ $tool: $version"
            else
                echo "  ✗ $tool: Not installed"
            fi
        done
        echo
        
        echo "Docker Status:"
        if command -v docker >/dev/null 2>&1; then
            if docker info >/dev/null 2>&1; then
                echo "  Status: Running"
                echo "  Version: $(docker --version)"
                echo "  Containers: $(docker ps -q | wc -l) running"
                echo "  Images: $(docker images -q | wc -l) available"
            else
                echo "  Status: Not running"
            fi
        else
            echo "  Status: Not installed"
        fi
        echo
        
        echo "System Resources:"
        if command -v free >/dev/null 2>&1; then
            free -h
        fi
        echo
        
        echo "Disk Usage:"
        df -h
        echo
        
    } > "$report_file"
    
    log_success "System report saved to: $report_file"
}

# Main verification function
main() {
    print_banner
    
    local total_checks=0
    local passed_checks=0
    
    log_info "Starting verification of DevOps environment..."
    echo
    
    # Core tools
    log_info "Checking core tools..."
    local core_tools=("docker" "docker-compose" "git" "gh")
    for tool in "${core_tools[@]}"; do
        ((total_checks++))
        if check_command "$tool" "$tool"; then
            ((passed_checks++))
        fi
    done
    echo
    
    # Infrastructure tools (basic)
    log_info "Checking infrastructure tools..."
    local infra_tools=("terraform" "kubectl" "helm")
    for tool in "${infra_tools[@]}"; do
        ((total_checks++))
        if check_command "$tool" "$tool"; then
            ((passed_checks++))
        fi
    done
    echo
    
    # Cloud CLIs
    log_info "Checking cloud CLIs..."
    local cloud_tools=("aws" "az" "gcloud")
    for tool in "${cloud_tools[@]}"; do
        ((total_checks++))
        if check_command "$tool" "$tool"; then
            ((passed_checks++))
        fi
    done
    echo
    
    # Utilities
    log_info "Checking utilities..."
    local util_tools=("jq" "curl" "wget" "tree" "htop")
    for tool in "${util_tools[@]}"; do
        ((total_checks++))
        if check_command "$tool" "$tool"; then
            ((passed_checks++))
        fi
    done
    echo
    
    # Docker daemon
    log_info "Checking Docker daemon..."
    ((total_checks++))
    if check_docker_daemon; then
        ((passed_checks++))
    fi
    echo
    
    # VS Code extensions
    check_vscode_extensions
    echo
    
    # Configuration files
    check_config_files
    echo
    
    # System resources
    check_system_resources
    echo
    
    # Generate report
    generate_report
    echo
    
    # Summary
    local success_rate=$((passed_checks * 100 / total_checks))
    
    echo "=========================================="
    echo -e "${PURPLE}Verification Summary:${NC}"
    echo -e "  Total checks: $total_checks"
    echo -e "  Passed: $passed_checks"
    echo -e "  Failed: $((total_checks - passed_checks))"
    echo -e "  Success rate: $success_rate%"
    echo "=========================================="
    
    if [[ $success_rate -ge 80 ]]; then
        log_success "🎉 Your DevOps environment is ready to go!"
    elif [[ $success_rate -ge 60 ]]; then
        log_warning "⚠️  Your environment is mostly ready, but some tools are missing"
    else
        log_error "❌ Your environment needs more setup. Please run the installation script again."
    fi
    
    echo
    echo -e "${CYAN}Next steps:${NC}"
    echo -e "1. Check the system report: ${YELLOW}cat ~/.devops-toolkit/system-report.txt${NC}"
    echo -e "2. Start Docker if not running: ${YELLOW}sudo systemctl start docker${NC} (Linux) or start Docker Desktop (macOS)"
    echo -e "3. Explore the templates: ${YELLOW}ls ~/.devops-toolkit/templates/${NC}"
    echo -e "4. Check out the examples: ${YELLOW}ls ~/.devops-toolkit/examples/${NC}"
    echo
}

# Run main function
main "$@"
