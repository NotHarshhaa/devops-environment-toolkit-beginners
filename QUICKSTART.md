# 🚀 Quick Start Guide

Welcome to the DevOps Environment Toolkit! This guide will get you up and running in just a few minutes.

## 📋 Prerequisites

- **Linux/macOS**: Bash shell
- **Windows**: PowerShell 5.1+ or PowerShell Core
- **Internet connection** for downloading tools
- **Administrator/Sudo access** (recommended)

## ⚡ One-Command Installation

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

## 🔍 Verify Installation

After installation, run the verification script:

```bash
./verify.sh
```

This will check all installed tools and generate a system report.

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
   - **Web App**: http://localhost:3000
   - **Grafana**: http://localhost:3001 (admin/admin)
   - **Prometheus**: http://localhost:9090
   - **Jaeger**: http://localhost:16686
   - **Kibana**: http://localhost:5601

## 🛠️ What's Installed

### Core Tools
- **Docker** & **Docker Compose** - Containerization
- **Git** - Version control with helpful aliases
- **GitHub CLI** - GitHub integration

### Infrastructure Tools
- **Terraform** - Infrastructure as Code
- **Ansible** - Configuration management
- **kubectl** - Kubernetes management
- **Helm** - Kubernetes package manager

### Cloud CLIs
- **AWS CLI** - Amazon Web Services
- **Azure CLI** - Microsoft Azure
- **Google Cloud CLI** - Google Cloud Platform

### Development Tools
- **VS Code** with DevOps extensions
- **Node.js** - JavaScript runtime
- **Python 3** - Python runtime

### Utilities
- **jq** - JSON processor
- **curl** - HTTP client
- **wget** - File downloader
- **tree** - Directory structure viewer
- **htop** - System monitor

## 🎯 First Steps

### 1. Explore the Templates
```bash
ls templates/
# basic-web-app/     - Simple Node.js application
# microservices/     - Microservices architecture
# infrastructure/    - Infrastructure templates
```

### 2. Try the Sample Application
```bash
cd templates/basic-web-app
npm install
npm start
```

### 3. Practice with Docker
```bash
# Build the sample app
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app

# Use Docker Compose
docker-compose up -d
```

### 4. Experiment with Terraform
```bash
cd configs/terraform
terraform init
terraform plan
```

### 5. Test Ansible
```bash
cd configs/ansible
ansible-playbook -i inventory.ini playbook.yml
```

## 📚 Learning Path

### Week 1: Containerization
- [ ] Learn Docker basics
- [ ] Create your first Dockerfile
- [ ] Use Docker Compose for multi-container apps
- [ ] Practice with the sample application

### Week 2: Version Control & CI/CD
- [ ] Master Git workflows
- [ ] Set up GitHub Actions
- [ ] Learn about automated testing
- [ ] Explore the CI/CD pipeline

### Week 3: Infrastructure as Code
- [ ] Learn Terraform basics
- [ ] Deploy infrastructure to AWS
- [ ] Practice with Ansible
- [ ] Understand configuration management

### Week 4: Monitoring & Observability
- [ ] Set up Prometheus and Grafana
- [ ] Learn about metrics and dashboards
- [ ] Practice with logging (ELK stack)
- [ ] Understand distributed tracing

### Week 5: Kubernetes
- [ ] Learn kubectl commands
- [ ] Deploy applications to Kubernetes
- [ ] Use Helm for package management
- [ ] Practice with microservices

### Week 6: Cloud Platforms
- [ ] Explore AWS services
- [ ] Try Azure resources
- [ ] Learn Google Cloud Platform
- [ ] Practice multi-cloud strategies

## 🔧 Configuration

### VS Code Setup
The toolkit includes pre-configured VS Code settings and extensions. Your workspace will be automatically configured with:
- Docker extension
- Kubernetes tools
- Terraform support
- YAML support
- Python development tools

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

1. **Explore the examples** in the `examples/` directory
2. **Try the project templates** in the `templates/` directory
3. **Customize configurations** in the `configs/` directory
4. **Join the community** and share your learning journey
5. **Contribute** to the toolkit by submitting issues and pull requests

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/harshhaa/devops-environment-toolkit/issues)
- **Discussions**: [Ask questions and share ideas](https://github.com/harshhaa/devops-environment-toolkit/discussions)
- **Email**: [harshhaa@example.com](mailto:harshhaa@example.com)

---

**Happy Learning! 🚀**

*Remember: The best way to learn DevOps is by doing. Start with the basics, practice regularly, and don't be afraid to experiment!*
