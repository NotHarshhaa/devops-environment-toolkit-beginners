# 🚀 Quick Start Guide for Beginners

Welcome to the DevOps Environment Toolkit for Beginners! This guide will get you up and running on your local machine in just a few minutes.

## 📋 Prerequisites

- **Linux/macOS**: Bash shell
- **Windows**: PowerShell 5.1+ or PowerShell Core
- **Internet connection** for downloading tools
- **Administrator/Sudo access** (recommended)

## ⚡ Enhanced Installation Options

Perfect for beginners - choose from multiple installation modes with advanced features!

### 🚀 Standard Installation (All Tools)
```bash
# Linux/macOS
./install.sh

# Windows PowerShell
.\install.ps1
```

### 🎯 Selective Installation (Choose Your Tools)
```bash
# Linux/macOS - Interactive menu to choose tools
./install.sh --selective

# Windows PowerShell - Interactive menu to choose tools
.\install.ps1 -Selective
```

### 🔍 Preview Installation (See What Would Be Installed)
```bash
# Linux/macOS - Dry run mode
./install.sh --dry-run

# Windows PowerShell - Dry run mode
.\install.ps1 -DryRun
```

### 📋 Other Installation Options
```bash
# Linux/macOS
./install.sh --verbose --skip-confirmation  # Detailed output, no prompts
./install.sh --help                        # Show all options

# Windows PowerShell
.\install.ps1 -Verbose -SkipConfirmation   # Detailed output, no prompts
.\install.ps1 -Help                        # Show all options
```

### 🌐 Remote Installation
```bash
# Linux/macOS
curl -fsSL https://raw.githubusercontent.com/harshhaa/devops-environment-toolkit/main/install.sh | bash

# Windows PowerShell
iwr -useb https://raw.githubusercontent.com/harshhaa/devops-environment-toolkit/main/install.ps1 | iex
```

## 🆕 Enhanced Installation Features

The installation scripts now include advanced features for a better user experience:

### ✨ New Features
- **Interactive Menu**: Choose which tools to install
- **Progress Tracking**: Visual progress bars with percentage completion
- **Comprehensive Logging**: Detailed logs saved to files
- **Error Recovery**: Automatic backup and restore functionality
- **System Validation**: Checks disk space, memory, and internet connectivity
- **Health Checks**: Verifies all tools are working correctly after installation
- **Installation Reports**: Detailed reports with next steps and support links

### 📚 Support Documentation Links
After successful installation, you'll see helpful documentation links for each tool:
- **Git**: https://git-scm.com/doc
- **Docker**: https://docs.docker.com/
- **Docker Compose**: https://docs.docker.com/compose/
- **Kubernetes**: https://kubernetes.io/docs/
- **Minikube**: https://minikube.sigs.k8s.io/docs/
- **Terraform**: https://developer.hashicorp.com/terraform/docs
- **Ansible**: https://docs.ansible.com/
- **VS Code**: https://code.visualstudio.com/docs
- **AWS CLI**: https://docs.aws.amazon.com/cli/
- **Azure CLI**: https://docs.microsoft.com/en-us/cli/azure/

### 🔧 Installation Options
```bash
# Linux/macOS
./install.sh --help              # Show all options
./install.sh --verbose           # Detailed output
./install.sh --dry-run           # Preview installation
./install.sh --selective         # Choose tools interactively
./install.sh --skip-confirmation # Skip prompts
./install.sh --recover           # Restore from backup

# Windows PowerShell
.\install.ps1 -Help              # Show all options
.\install.ps1 -Verbose           # Detailed output
.\install.ps1 -DryRun            # Preview installation
.\install.ps1 -Selective         # Choose tools interactively
.\install.ps1 -SkipConfirmation  # Skip prompts
.\install.ps1 -Recover           # Restore from backup
```

## 🔍 Verify Installation

After installation, run the verification script:

```bash
# Linux/macOS
./verify.sh

# Windows PowerShell
.\verify.ps1
```

This will check all installed tools and generate a system report. You can also check the installation report:

```bash
# Linux/macOS
cat ~/.devops-toolkit-install-report-*.txt

# Windows PowerShell
Get-Content ~\.devops-toolkit-install-report-*.txt
```

## 🐳 Start Your Development Environment

1. **Start the Docker Compose stack:**
   ```bash
   docker-compose up -d
   ```

2. **Check running services:**
   ```bash
   docker-compose ps
   ```

3. **Access your applications:**
   - **DevOps Toolkit Website**: http://localhost:3002
   - **Web App**: http://localhost:3000
   - **Grafana**: http://localhost:3001 (admin/admin)
   - **Prometheus**: http://localhost:9090
   - **Jaeger**: http://localhost:16686
   - **Kibana**: http://localhost:5601

## 🛠️ What's Installed on Your Local Machine

All tools are installed and configured on your local machine, ready for learning:

### Core Tools
- **Git** - Version control with helpful aliases
- **Docker** & **Docker Compose** - Containerization platform

### Infrastructure Tools
- **Terraform** - Infrastructure as Code
- **Ansible** - Configuration management
- **Kubernetes (kubectl + Minikube)** - Container orchestration

### Cloud CLIs
- **AWS CLI** - Amazon Web Services
- **Azure CLI** - Microsoft Azure

### Development Tools
- **VS Code** with DevOps extensions

## 🎯 First Steps

### 1. Explore the Website
Visit the DevOps Toolkit website at http://localhost:3002 to see:
- Interactive installation commands
- Complete tools overview
- Structured learning path
- Feature highlights

### 2. Explore the Templates
```bash
ls templates/
# basic-web-app/     - Simple Node.js application
# microservices/     - Microservices architecture
# infrastructure/    - Infrastructure templates
```

### 3. Try the Sample Application
```bash
cd templates/basic-web-app
npm install
npm start
```

### 4. Practice with Docker
```bash
# Build the sample app
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app

# Use Docker Compose
docker-compose up -d
```

### 5. Experiment with Terraform
```bash
cd configs/terraform
terraform init
terraform plan
```

### 6. Test Ansible
```bash
cd configs/ansible
ansible-playbook -i inventory.ini playbook.yml
```

## 📚 Beginner Learning Path

Follow this structured path designed specifically for DevOps beginners with our focused toolset:

### Week 1: Version Control & Containerization Fundamentals
- [ ] Master Git workflows for beginners
- [ ] Learn Docker basics for beginners
- [ ] Create your first Dockerfile
- [ ] Use Docker Compose for multi-container apps
- [ ] Practice with the sample application

### Week 2: Infrastructure as Code Introduction
- [ ] Learn Terraform basics
- [ ] Deploy infrastructure to AWS
- [ ] Practice with Ansible
- [ ] Understand configuration management
- [ ] Create your first infrastructure templates

### Week 3: Kubernetes Fundamentals
- [ ] Learn kubectl commands
- [ ] Set up Minikube for local development
- [ ] Deploy applications to Kubernetes
- [ ] Practice with container orchestration
- [ ] Understand pods, services, and deployments

### Week 4: Cloud Platforms Introduction
- [ ] Explore AWS services with AWS CLI
- [ ] Try Azure resources with Azure CLI
- [ ] Learn cloud resource management
- [ ] Practice multi-cloud strategies
- [ ] Understand cloud-native applications

### Week 5: Advanced DevOps Practices
- [ ] Integrate all tools in a complete workflow
- [ ] Set up monitoring and logging
- [ ] Practice with CI/CD pipelines
- [ ] Learn about infrastructure automation
- [ ] Build end-to-end DevOps solutions

### Week 6: Real-World Projects
- [ ] Build a complete microservices application
- [ ] Deploy to cloud using Terraform
- [ ] Configure with Ansible
- [ ] Orchestrate with Kubernetes
- [ ] Monitor and maintain the system

## 🔧 Configuration

### VS Code Setup
The toolkit includes pre-configured VS Code settings and extensions. Your workspace will be automatically configured with:
- Docker extension
- Kubernetes tools
- Terraform support
- YAML support
- Git integration
- Ansible support

### Git Configuration
Git is pre-configured with helpful aliases:
- `git st` → `git status`
- `git co` → `git checkout`
- `git br` → `git branch`
- `git ci` → `git commit`
- `git lg` → Pretty log format

### Docker Configuration
Docker is configured with:
- Non-root user access
- Optimized settings
- Health checks
- Resource limits

## 🚨 Troubleshooting

### Common Issues

**Docker not starting:**
```bash
# Linux
sudo systemctl start docker
sudo systemctl enable docker

# macOS - Start Docker Desktop manually
```

**Permission denied errors:**
```bash
# Add user to docker group
sudo usermod -aG docker $USER
# Log out and log back in
```

**Port conflicts:**
```bash
# Check what's using a port
sudo lsof -i :3000
# Kill the process
sudo kill -9 <PID>
```

**Terraform errors:**
```bash
# Clean Terraform state
rm -rf .terraform
terraform init
```

### Getting Help

1. **Check the logs:**
   ```bash
   docker-compose logs
   ```

2. **Verify installation:**
   ```bash
   ./verify.sh
   ```

3. **Check system resources:**
   ```bash
   htop
   df -h
   ```

4. **Review configuration:**
   ```bash
   cat ~/.devops-toolkit/system-report.txt
   ```

## 🎉 Next Steps

1. **Visit the website** at http://localhost:3002 for interactive guides
2. **Explore the examples** in the `examples/` directory
3. **Try the project templates** in the `templates/` directory
4. **Customize configurations** in the `configs/` directory
5. **Join the community** and share your learning journey
6. **Contribute** to the toolkit by submitting issues and pull requests

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/harshhaa/devops-environment-toolkit/issues)
- **Discussions**: [Ask questions and share ideas](https://github.com/harshhaa/devops-environment-toolkit/discussions)
- **Email**: [harshhaa@example.com](mailto:harshhaa@example.com)

---

**Happy Learning! 🚀**

*Remember: The best way to learn DevOps is by doing. Start with the basics, practice regularly, and don't be afraid to experiment! Perfect for beginners starting their DevOps journey.*