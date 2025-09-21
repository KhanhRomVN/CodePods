# VSCode Container Manager

**Công cụ quản lý nhiều VSCode instances thông qua Docker containers - giải pháp thay thế cho Multi Account Container của Firefox nhưng dành cho development environment.**

![Main Window](docs/images/main_window.png)

## ✨ Tính năng

- 🚀 **Mở đồng thời nhiều VSCode windows** - mỗi project một cửa sổ riêng
- 🐳 **Container-based isolation** - môi trường phát triển hoàn toàn cô lập
- 💾 **Tiết kiệm RAM** - chia sẻ Docker engine và VSCode extensions
- 🎯 **GUI thân thiện** - quản lý projects dễ dàng
- ⚡ **Templates có sẵn** - Python, Node.js, Go, Full-stack
- 🔧 **CLI support** - automation và scripting
- 📦 **Reproducible environments** - đảm bảo consistency across team

## 🎯 Giải quyết vấn đề gì?

**Vấn đề:** Khi làm việc với nhiều projects khác nhau, developers thường gặp:

- Conflict giữa các dependencies
- Phải chuyển đổi workspace liên tục
- Không thể làm việc đồng thời trên multiple projects
- Environment setup phức tạp

**Giải pháp:** VSCode Container Manager cho phép:

- Mỗi project chạy trong container riêng biệt
- Mở nhiều VSCode windows cùng lúc
- Cô lập hoàn toàn environments
- Setup project chỉ với vài click

## 📋 Yêu cầu hệ thống

### Bắt buộc:

- **Ubuntu 20.04+** (hoặc các Linux distros tương tự)
- **Docker 20.10+**
- **VSCode 1.60+**
- **Python 3.8+**

### Extensions VSCode:

- `ms-vscode-remote.remote-containers` (Remote - Containers)

## 🚀 Cài đặt

### 1. Cài đặt tự động (Khuyến nghị)

```bash
curl -fsSL https://raw.githubusercontent.com/your-repo/vscode-container-manager/main/scripts/install.sh | bash
```

### 2. Cài đặt thủ công

#### Bước 1: Clone repository

```bash
git clone https://github.com/your-repo/vscode-container-manager.git
cd vscode-container-manager
```

#### Bước 2: Cài đặt dependencies

```bash
# Cài đặt Docker (nếu chưa có)
sudo apt update
sudo apt install docker.io docker-compose
sudo usermod -aG docker $USER
# Logout và login lại

# Cài đặt Python dependencies
pip install -r requirements.txt

# Cài đặt VSCode extensions
code --install-extension ms-vscode-remote.remote-containers
```

#### Bước 3: Setup application

```bash
# Make scripts executable
chmod +x scripts/*.sh

# Run setup
./scripts/setup_docker.sh

# Install application
python setup.py install
```

## 🎮 Sử dụng

### GUI Mode (Khuyến nghị)

#### Khởi động application:

```bash
vscode-container-manager
# hoặc
python -m src.main
```

#### Workflow cơ bản:

1. **Add Project**: Click "Add Project" → điền thông tin → chọn template
2. **Launch Project**: Select project → click "Launch Selected"
3. **Manage**: View running containers, add/remove projects

![Add Project Dialog](docs/images/add_project.png)

### CLI Mode

#### Các lệnh cơ bản:

```bash
# List all projects
vcm list

# Add new project
vcm add "My Project" /path/to/project --template python

# Launch project
vcm launch my-project

# Remove project
vcm remove my-project

# Show running containers
vcm status
```

#### Advanced usage:

```bash
# Launch multiple projects
vcm launch project1 project2 project3

# Add project with custom Docker image
vcm add "Custom Project" /path/to/project --image ubuntu:20.04

# Batch operations
vcm launch --all  # Launch all projects
vcm stop --all    # Stop all containers
```

## 📖 Cấu hình

### Project Configuration

Mỗi project được lưu với cấu trúc:

```json
{
  "name": "My Python Project",
  "path": "/home/user/projects/my-python-project",
  "template": "python",
  "image": "mcr.microsoft.com/vscode/devcontainers/python:3.9",
  "extensions": ["ms-python.python", "ms-python.pylint", "ms-toolsai.jupyter"],
  "settings": {
    "python.defaultInterpreterPath": "/usr/local/bin/python"
  },
  "ports": [8000, 8080],
  "environment": {
    "DEBUG": "1"
  }
}
```

### Global Settings

File cấu hình: `~/.vscode-container-manager/settings.json`

```json
{
  "default_template": "base",
  "auto_start_containers": false,
  "max_concurrent_containers": 10,
  "resource_limits": {
    "memory": "2g",
    "cpus": "2"
  },
  "gui_theme": "dark"
}
```

## 🎨 Templates có sẵn

### Base Template

- Ubuntu 20.04
- Basic development tools
- Git, curl, wget

### Python Template

```json
{
  "name": "Python Development",
  "image": "mcr.microsoft.com/vscode/devcontainers/python:3.9",
  "extensions": [
    "ms-python.python",
    "ms-python.pylint",
    "ms-toolsai.jupyter",
    "ms-python.black-formatter"
  ],
  "settings": {
    "python.defaultInterpreterPath": "/usr/local/bin/python",
    "python.linting.enabled": true,
    "python.linting.pylintEnabled": true
  }
}
```

### Node.js Template

```json
{
  "name": "Node.js Development",
  "image": "mcr.microsoft.com/vscode/devcontainers/javascript-node:16",
  "extensions": [
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss"
  ],
  "settings": {
    "typescript.preferences.importModuleSpecifier": "relative"
  }
}
```

### Full-Stack Template

- Node.js + Python + PostgreSQL
- Redis, Docker-in-Docker
- Full development stack

## 🔧 Troubleshooting

### Lỗi thường gặp:

#### 1. "Docker daemon not running"

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

#### 2. "Permission denied"

```bash
sudo usermod -aG docker $USER
# Logout và login lại
```

#### 3. "VSCode not found"

```bash
# Cài đặt VSCode
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" | sudo tee /etc/apt/sources.list.d/vscode.list
sudo apt update
sudo apt install code
```

#### 4. "Container fails to start"

```bash
# Check Docker logs
docker logs <container_name>

# Check available resources
docker system df
docker system prune  # Clean up if needed
```

#### 5. "Extensions not loading"

```bash
# Rebuild container
vcm rebuild <project_name>

# Or manually in VSCode
# Ctrl+Shift+P → "Remote-Containers: Rebuild Container"
```

### Performance tuning:

#### Tối ưu Docker:

```bash
# Increase Docker resources
sudo nano /etc/docker/daemon.json
```

```json
{
  "default-runtime": "runc",
  "storage-driver": "overlay2",
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

## 📊 So sánh với các giải pháp khác

| Tính năng        | VCM         | Native VSCode | Docker Desktop | Vagrant      |
| ---------------- | ----------- | ------------- | -------------- | ------------ |
| Multiple windows | ✅          | ❌            | ❌             | ✅           |
| Resource sharing | ✅          | ❌            | ⚠️             | ❌           |
| Setup time       | ⚡ Fast     | ⚡ Fast       | 🐌 Slow        | 🐌 Very slow |
| Isolation        | ✅ Complete | ❌ None       | ✅ Complete    | ✅ Complete  |
| GUI Management   | ✅          | ⚠️ Limited    | ⚠️ Limited     | ❌           |

## 🤝 Đóng góp

### Development setup:

```bash
git clone https://github.com/your-repo/vscode-container-manager.git
cd vscode-container-manager

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install development dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Run tests
python -m pytest tests/

# Run linting
flake8 src/
black src/
```

### Contribution guidelines:

1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

MIT License - xem file [LICENSE](LICENSE) để biết chi tiết.

## 🙏 Acknowledgments

- **VSCode Remote-Containers** - Core container technology
- **Docker** - Containerization platform
- **Tkinter** - GUI framework
- Inspired by **Firefox Multi-Account Containers**

## 📞 Hỗ trợ

- 🐛 **Bug reports**: [GitHub Issues](https://github.com/your-repo/vscode-container-manager/issues)
- 💡 **Feature requests**: [GitHub Discussions](https://github.com/your-repo/vscode-container-manager/discussions)
- 📧 **Email**: support@vscode-container-manager.com
- 💬 **Discord**: [Join our community](https://discord.gg/vscode-container-manager)

## 🗺️ Roadmap

### v1.1.0

- [ ] Web-based GUI
- [ ] Team collaboration features
- [ ] Cloud sync của configurations

### v1.2.0

- [ ] Kubernetes support
- [ ] Advanced resource monitoring
- [ ] Plugin system

### v2.0.0

- [ ] Multi-platform support (Windows, macOS)
- [ ] AI-powered environment suggestions
- [ ] Enterprise features

---

**Made with ❤️ for developers who want to work smarter, not harder.**
