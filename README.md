# 🚀 DevOps Environment Toolkit

> **One-click setup for your DevOps journey** - Get all essential tools installed and configured in minutes!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/platform-Linux%20%7C%20macOS%20%7C%20Windows-blue)](https://github.com/harshhaa/devops-environment-toolkit)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

## ✨ What This Toolkit Does

This lightweight toolkit automatically installs and configures all the essential DevOps tools you need to start your journey, without any complex setup or configuration headaches.

### 🛠️ Tools Included

| Category | Tools | Purpose |
|----------|-------|---------|
| **Containerization** | Docker, Docker Compose | Container management and orchestration |
| **Version Control** | Git, GitHub CLI | Code versioning and GitHub integration |
| **CI/CD** | GitHub Actions (templates) | Automated testing and deployment |
| **Infrastructure** | Terraform | Infrastructure as Code (basic) |
| **Monitoring** | Prometheus, Grafana | System and application monitoring |
| **Development** | VS Code, extensions | Enhanced development experience |
| **Cloud CLI** | AWS CLI, Azure CLI, GCP CLI | Multi-cloud management |
| **Utilities** | jq, curl, wget, tree | Essential command-line tools |

## 🚀 Quick Start

### Linux/macOS
```bash
curl -fsSL https://raw.githubusercontent.com/harshhaa/devops-environment-toolkit/main/install.sh | bash
```

### Windows (PowerShell)
```powershell
iwr -useb https://raw.githubusercontent.com/harshhaa/devops-environment-toolkit/main/install.ps1 | iex
```

### Manual Installation
```bash
git clone https://github.com/harshhaa/devops-environment-toolkit.git
cd devops-environment-toolkit
chmod +x install.sh
./install.sh
```

## 🎯 Features

- **🔄 One-Click Installation**: Automated setup for all major platforms
- **⚡ Lightning Fast**: Optimized installation process
- **🎨 Pre-configured**: Tools come with sensible defaults and configurations
- **🔧 Customizable**: Easy to modify and extend
- **📱 Cross-Platform**: Works on Linux, macOS, and Windows
- **🛡️ Safe**: Non-destructive installation with rollback options
- **📚 Beginner-Friendly**: Clear documentation and examples

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

### 1. **Docker Environment**
- Docker Engine with optimized settings
- Docker Compose for multi-container applications
- Pre-configured Dockerfiles for common languages

### 2. **Development Setup**
- VS Code with essential DevOps extensions
- Git configuration with helpful aliases
- Terminal enhancements and themes

### 3. **Infrastructure Tools (Basic)**
- Terraform for learning Infrastructure as Code
- Kubernetes tools (kubectl, helm) for container orchestration

### 4. **Monitoring Stack**
- Prometheus for metrics collection
- Grafana for visualization
- Pre-configured dashboards

### 5. **Learning Resources**
- Sample web application
- Docker Compose setup
- VS Code workspace

## 🔧 Customization

The toolkit is designed to be easily customizable. You can:

- Modify `configs/` directory to change tool configurations
- Add new tools by editing the installation scripts
- Create custom project templates in `templates/`
- Extend the verification script to check additional tools

## 🎓 Learning Path

After installation, follow this recommended learning path:

1. **Week 1**: Docker basics and containerization
2. **Week 2**: Git workflows and GitHub integration
3. **Week 3**: Local development with Docker Compose
4. **Week 4**: Basic Infrastructure as Code with Terraform
5. **Week 5**: Monitoring with Prometheus and Grafana
6. **Week 6**: Kubernetes basics with kubectl and Helm

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Quick Contribution Ideas
- Add support for new tools
- Improve installation scripts
- Create new project templates
- Add more configuration examples
- Improve documentation

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/harshhaa/devops-environment-toolkit/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/harshhaa/devops-environment-toolkit/discussions)
- 📧 **Email**: [harshhaa@example.com](mailto:harshhaa@example.com)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the DevOps community
- Built with ❤️ for beginners
- Special thanks to all contributors

---

**Ready to start your DevOps journey?** 🚀

[![Install Now](https://img.shields.io/badge/Install%20Now-FF6B6B?style=for-the-badge&logo=docker&logoColor=white)](https://github.com/harshhaa/devops-environment-toolkit)

*Star ⭐ this repo if you found it helpful!*
