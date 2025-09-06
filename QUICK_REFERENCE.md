# DevOps Environment Toolkit - Quick Reference Guide

## 🚀 Quick Start

### Linux/macOS
```bash
# Make executable and run
chmod +x install.sh
./install.sh

# Or with options
./install.sh --selective --verbose
```

### Windows PowerShell
```powershell
# Run as Administrator
.\install.ps1

# Or with options
.\install.ps1 -Selective -Verbose
```

## 📋 Common Commands

### Installation Options
| Command | Description |
|---------|-------------|
| `./install.sh` | Standard installation (all tools) |
| `./install.sh --selective` | Choose which tools to install |
| `./install.sh --dry-run` | Preview installation without changes |
| `./install.sh --verbose` | Detailed output for troubleshooting |
| `./install.sh --skip-confirmation` | Skip all prompts |
| `./install.sh --recover` | Restore from backup |
| `./install.sh --help` | Show help message |

### PowerShell Options
| Command | Description |
|---------|-------------|
| `.\install.ps1` | Standard installation (all tools) |
| `.\install.ps1 -Selective` | Choose which tools to install |
| `.\install.ps1 -DryRun` | Preview installation without changes |
| `.\install.ps1 -Verbose` | Detailed output for troubleshooting |
| `.\install.ps1 -SkipConfirmation` | Skip all prompts |
| `.\install.ps1 -Recover` | Restore from backup |
| `.\install.ps1 -Help` | Show help message |

## 🛠️ Tool Categories

### 1. Docker & Containerization
- Docker Engine
- Docker Compose
- Docker Desktop (Windows/macOS)

### 2. Version Control
- Git
- GitHub CLI
- Git aliases and configuration

### 3. Infrastructure as Code
- Terraform
- Kubernetes CLI (kubectl)
- Helm package manager

### 4. Cloud Platforms
- AWS CLI
- Azure CLI
- Google Cloud CLI

### 5. Development Tools
- VS Code
- Node.js
- Python 3
- Essential utilities (curl, wget, jq, tree, htop)

### 6. VS Code Extensions
- Docker extension
- Kubernetes extension
- Terraform extension
- YAML extension
- Python extension
- PowerShell extension
- JSON extension
- Tailwind CSS extension
- Prettier extension
- GitHub Actions extension

## 📊 Installation Modes

### Standard Mode
```bash
./install.sh
```
Installs all tools with default settings.

### Selective Mode
```bash
./install.sh --selective
```
Interactive menu to choose specific tools.

### Custom Mode
```bash
./install.sh --selective
# Then choose "Custom Selection" (option 9)
```
Pick individual tools from a detailed list.

### Silent Mode
```bash
./install.sh --skip-confirmation
```
Skip all prompts and confirmations.

### Preview Mode
```bash
./install.sh --dry-run
```
See what would be installed without making changes.

## 🔍 Troubleshooting

### Check Log Files
- **Linux/macOS**: `~/.devops-toolkit-install.log`
- **Windows**: `%USERPROFILE%\.devops-toolkit-install.log`

### Common Issues

#### Permission Errors
```bash
# Linux/macOS
sudo ./install.sh

# Windows - Run PowerShell as Administrator
```

#### Network Issues
```bash
# Check connectivity
ping google.com

# Try with verbose output
./install.sh --verbose
```

#### Disk Space Issues
```bash
# Check available space
df -h  # Linux/macOS
Get-WmiObject -Class Win32_LogicalDisk  # Windows PowerShell
```

#### Installation Failures
```bash
# Restore from backup
./install.sh --recover

# Check logs for details
cat ~/.devops-toolkit-install.log
```

## 📁 File Locations

### Configuration Files
- **Linux/macOS**: `~/.devops-toolkit/`
- **Windows**: `%USERPROFILE%\.devops-toolkit\`

### Backup Files
- **Linux/macOS**: `~/.devops-toolkit-backup/`
- **Windows**: `%USERPROFILE%\.devops-toolkit-backup\`

### Log Files
- **Linux/macOS**: `~/.devops-toolkit-install.log`
- **Windows**: `%USERPROFILE%\.devops-toolkit-install.log`

### Installation Reports
- **Linux/macOS**: `~/.devops-toolkit-install-report-*.txt`
- **Windows**: `%USERPROFILE%\.devops-toolkit-install-report-*.txt`

## 🎯 Post-Installation

### Verify Installation
```bash
# Run verification script
./verify.sh  # Linux/macOS
.\verify.ps1  # Windows PowerShell
```

### Start Services
```bash
# Start Docker
sudo systemctl start docker  # Linux
# Or start Docker Desktop  # Windows/macOS
```

### Check Tool Versions
```bash
# Check installed tools
docker --version
git --version
terraform --version
kubectl version --client
aws --version
az --version
gcloud --version
```

## 🔄 Updates and Maintenance

### Update Tools
```bash
# Update package managers
sudo apt update && sudo apt upgrade  # Ubuntu/Debian
brew update && brew upgrade  # macOS
choco upgrade all  # Windows
```

### Clean Up
```bash
# Remove old backups (keep last 3)
ls -t ~/.devops-toolkit-backup/ | tail -n +4 | xargs rm -rf

# Clean log files
find ~/.devops-toolkit-install*.log -mtime +30 -delete
```

## 📞 Support

### Getting Help
1. Check log files for error details
2. Review documentation
3. Use `--help` for command-line options
4. Check project repository for updates

### Useful Commands
```bash
# Show version
./install.sh --version

# Show help
./install.sh --help

# Check system compatibility
./install.sh --dry-run
```

---

**Quick Tips:**
- Always run `--dry-run` first to preview installation
- Use `--verbose` for detailed troubleshooting
- Keep backups for easy recovery
- Check logs if installation fails
- Restart terminal after installation for PATH updates
