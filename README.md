# 🚀 DevOps Environment Toolkit for Beginners

> **One-click setup for your DevOps learning journey** - Get all essential tools installed and configured on your local machine in minutes!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/platform-Linux%20%7C%20macOS%20%7C%20Windows-blue)](https://github.com/NotHarshhaa/devops-environment-toolkit-beginners)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

## ✨ What This Toolkit Does

This lightweight toolkit automatically installs and configures all the essential DevOps tools you need to start your learning journey on your local machine, without any complex setup or configuration headaches. Perfect for beginners who want to dive into DevOps without spending weeks on environment setup.

### 🛠️ Tools Included

| Category | Tools | Purpose |
|----------|-------|---------|
| **Version Control** | Git | Code versioning with helpful aliases |
| **Containerization** | Docker, Docker Compose | Container management and orchestration |
| **Orchestration** | Kubernetes (kubectl + Minikube) | Container orchestration and local development |
| **Infrastructure** | Terraform | Infrastructure as Code |
| **Configuration** | Ansible | Configuration management and automation |
| **Development** | VS Code | Enhanced development experience with DevOps extensions |
| **Cloud CLI** | AWS CLI, Azure CLI | Multi-cloud management |

## 🚀 Quick Start

### 🌟 Enhanced Installation Options

Choose from multiple installation modes with advanced features:

#### Standard Installation (All Tools)
```bash
# Linux/macOS
./install.sh

# Windows PowerShell
.\install.ps1
```

#### Selective Installation (Choose Your Tools)
```bash
# Linux/macOS - Interactive menu to choose tools
./install.sh --selective

# Windows PowerShell - Interactive menu to choose tools
.\install.ps1 -Selective
```

#### Preview Installation (See What Would Be Installed)
```bash
# Linux/macOS - Dry run mode
./install.sh --dry-run

# Windows PowerShell - Dry run mode
.\install.ps1 -DryRun
```

#### Remote Installation
```bash
# Linux/macOS
curl -fsSL https://raw.githubusercontent.com/NotHarshhaa/devops-environment-toolkit-beginners/master/install.sh | bash

# Windows PowerShell
iwr -useb https://raw.githubusercontent.com/NotHarshhaa/devops-environment-toolkit-beginners/master/install.ps1 | iex
```

#### Manual Installation
```bash
git clone https://github.com/NotHarshhaa/devops-environment-toolkit-beginners.git
cd devops-environment-toolkit
chmod +x install.sh
./install.sh
```

## 🎯 Features

### 🚀 Core Features
- **🔄 One-Click Local Installation**: Automated setup for all major platforms on your local machine
- **⚡ Lightning Fast**: Optimized installation process - ready in minutes
- **🎨 Pre-configured**: Tools come with sensible defaults and configurations for beginners
- **🔧 Customizable**: Easy to modify and extend as you learn
- **📱 Cross-Platform**: Works on Linux, macOS, and Windows
- **🛡️ Safe**: Non-destructive installation with rollback options
- **📚 Beginner-Friendly**: Clear documentation, examples, and learning resources
- **🎓 Learning-Focused**: Designed specifically for DevOps beginners starting their journey

### ✨ Advanced Installation Features
- **🎯 Selective Installation**: Choose which tools to install with interactive menus
- **📊 Progress Tracking**: Visual progress bars with percentage completion
- **📝 Comprehensive Logging**: Detailed logs saved to files for troubleshooting
- **🔄 Error Recovery**: Automatic backup and restore functionality
- **✅ System Validation**: Checks disk space, memory, and internet connectivity
- **🏥 Health Checks**: Verifies all tools are working correctly after installation
- **📋 Installation Reports**: Detailed reports with next steps and support links
- **🔍 Dry Run Mode**: Preview installation without making changes
- **📚 Support Documentation**: Direct links to official documentation for each tool

## 📁 Project Structure

```
devops-environment-toolkit/
├── install.sh              # Main installation script (Linux/macOS)
├── install.ps1             # Windows installation script
├── verify.sh               # Tool verification script
├── configs/                # Configuration files
│   ├── docker/             # Docker configurations
│   └── vscode/             # VS Code settings
├── templates/              # Project templates
│   └── basic-web-app/      # Simple web application
├── scripts/                # Utility scripts
└── examples/               # Example configurations
```

## 🎨 What You Get

### 1. **Version Control Setup**
- Git with helpful aliases and configuration
- Pre-configured Git settings for beginners

### 2. **Containerization Environment**
- Docker Engine with optimized settings
- Docker Compose for multi-container applications
- Pre-configured Dockerfiles for common languages

### 3. **Kubernetes Development**
- kubectl for Kubernetes management
- Minikube for local Kubernetes development
- Pre-configured Kubernetes manifests

### 4. **Infrastructure as Code**
- Terraform for learning Infrastructure as Code
- Sample Terraform configurations
- AWS and Azure provider examples

### 5. **Configuration Management**
- Ansible for automation and configuration
- Sample playbooks and inventory files
- Best practices for beginners

### 6. **Development Environment**
- VS Code with essential DevOps extensions
- Pre-configured workspace settings
- Integrated terminal enhancements

### 7. **Cloud Management**
- AWS CLI for Amazon Web Services
- Azure CLI for Microsoft Azure
- Pre-configured cloud profiles

### 8. **Learning Resources**
- Sample web application
- Docker Compose setup
- VS Code workspace
- Comprehensive documentation

## 🔧 Customization

The toolkit is designed to be easily customizable. You can:

- Modify `configs/` directory to change tool configurations
- Add new tools by editing the installation scripts
- Create custom project templates in `templates/`
- Extend the verification script to check additional tools

## 🎓 Beginner Learning Path

After installation, follow this structured learning path designed specifically for DevOps beginners with our focused toolset:

1. **Week 1**: Version Control & Containerization Fundamentals
   - Master Git workflows for beginners
   - Learn Docker basics and containerization
   - Create your first Dockerfile and Docker Compose setup

2. **Week 2**: Infrastructure as Code Introduction
   - Learn Terraform basics and best practices
   - Deploy infrastructure to AWS and Azure
   - Practice with configuration management using Ansible

3. **Week 3**: Kubernetes Fundamentals
   - Learn kubectl commands and Kubernetes concepts
   - Set up Minikube for local development
   - Deploy applications to Kubernetes clusters

4. **Week 4**: Cloud Platforms Introduction
   - Explore AWS services with AWS CLI
   - Try Azure resources with Azure CLI
   - Learn cloud resource management and best practices

5. **Week 5**: Advanced DevOps Practices
   - Integrate all tools in a complete workflow
   - Build end-to-end DevOps solutions
   - Practice with infrastructure automation

6. **Week 6**: Real-World Projects
   - Build a complete microservices application
   - Deploy to cloud using Terraform
   - Configure with Ansible and orchestrate with Kubernetes

> **Perfect for beginners**: Each week builds upon the previous, taking you from complete beginner to confident DevOps practitioner with our focused, essential toolset.

## 📚 Support Documentation

After installation, you'll have access to comprehensive support documentation for each tool:

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

These links are automatically displayed after successful installation, making it easy to get started with each tool.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Quick Contribution Ideas
- Add support for new tools
- Improve installation scripts
- Create new project templates
- Add more configuration examples
- Improve documentation

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/NotHarshhaa/devops-environment-toolkit-beginners/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/NotHarshhaa/devops-environment-toolkit-beginners/discussions)
- 📧 **Email**: [harshhaa@gmail.com](mailto:harshhaa@gmail.com)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the DevOps community
- Built with ❤️ for beginners
- Special thanks to all contributors

---

**Ready to start your DevOps learning journey?** 🚀

[![Install Now](https://img.shields.io/badge/Install%20Now-FF6B6B?style=for-the-badge&logo=docker&logoColor=white)](https://github.com/NotHarshhaa/devops-environment-toolkit-beginners)

*Perfect for beginners - Star ⭐ this repo if you found it helpful!*
