# BMAD Method Quick Reference Guide

## 🚀 Quick Start (30 seconds)

```bash
# Navigate to project
cd /Users/seman/Desktop/graphic-animation-template

# Verify installation
ls bmad/
# Should show: _cfg  bmb  bmd  core  docs

# Check dependencies
npm list --depth=0
# Should show 158 packages
```

---

## 📁 Key Directories

| Directory | Purpose | Files |
|-----------|---------|-------|
| `bmad/core/` | Core framework & agents | Agents, workflows, config |
| `bmad/bmb/` | BMad Builder module | Agent creation tools |
| `bmad/bmd/` | Development utilities | Dev tools, release mgmt |
| `bmad/_cfg/` | Your customizations | Agent sidecars |
| `bmad/docs/` | Documentation | Integration guides |

---

## 🤖 Available Agents

### Core Agents
- **Location**: `bmad/core/agents/`
- **Primary Agent**: `bmad-master.md`
- **Usage**: Agent orchestration and management

### Builder Agents
- **Location**: `bmad/bmb/agents/`
- **Purpose**: Create custom agents and workflows

### Development Agents
- **Location**: `bmad/bmd/agents/`
- **Agent**: Release Chief
- **Purpose**: Release management and deployment

---

## 🔄 Available Workflows

### Brainstorming Workflow
```bash
Location: bmad/core/workflows/brainstorming/
Files: README.md, instructions.md, template.md
Usage: Creative problem-solving, project ideation
```

### Party Mode Workflow
```bash
Location: bmad/core/workflows/party-mode/
Files: instructions.md
Usage: Multi-agent collaboration simulation
```

---

## ⚙️ Configuration

### Main Config File
```yaml
# File: bmad/core/config.yaml

user_name: User
communication_language: English
document_output_language: English
output_folder: "{project-root}/docs"
technical_level: advanced
```

### Customize Settings
```bash
# Edit configuration
nano bmad/core/config.yaml

# Update user name, language, output preferences
```

---

## 🎨 Integration with Animation Templates

### Use BMAD for Animation Development

**Create New Animation**:
1. Use brainstorming workflow for ideas
2. Plan animation parameters
3. Generate component structure
4. Create demos and documentation

**Enhance Existing Animation**:
1. Analyze current template
2. Generate improvement ideas
3. Implement enhancements
4. Update documentation

**Automate Documentation**:
1. Use BMAD agents to document parameters
2. Generate usage examples
3. Create comprehensive guides

---

## 📚 Essential Documentation

### Getting Started
- `bmad/docs/claude-code-instructions.md` - IDE integration
- `bmad/docs/codex-instructions.md` - General usage
- `bmad/core/workflows/brainstorming/README.md` - Creative workflows

### Agent Creation
- `bmad/bmb/workflows/create-agent/` - Complete agent creation guide
- Agent types, architecture, patterns

### Quick Links
```bash
# View all documentation
find bmad -name "*.md" -type f

# Count documentation files
find bmad -name "*.md" -type f | wc -l
# Result: 59 files
```

---

## 🛠️ Common Commands

### Installation Verification
```bash
# Check BMAD structure
tree bmad -L 2

# Verify dependencies
npm list --depth=0

# Check for updates
npm outdated
```

### Customization
```bash
# Create agent sidecar
mkdir -p bmad/_cfg/agents/my-custom-agent

# Edit core config
nano bmad/core/config.yaml
```

### Update BMAD
```bash
# Backup customizations
cp -R bmad/_cfg bmad/_cfg.backup

# Pull latest source
cd /Users/seman/Desktop/BMAD-METHOD/BMAD-METHOD-SOURCE
git pull origin v6-alpha
npm install

# Re-copy BMAD
cd /Users/seman/Desktop/graphic-animation-template
rm -rf bmad/core bmad/bmb bmad/bmd bmad/docs
cp -R ../BMAD-METHOD/BMAD-METHOD-SOURCE/bmad/* bmad/

# Restore customizations
cp -R bmad/_cfg.backup/* bmad/_cfg/
```

---

## 🎯 Workflow Examples

### Example 1: Brainstorm New Animation
```markdown
1. Open: bmad/core/workflows/brainstorming/instructions.md
2. Follow the structured brainstorming process
3. Document ideas in template.md format
4. Implement animation using BMad Builder
```

### Example 2: Create Custom Agent for Animations
```markdown
1. Navigate: bmad/bmb/workflows/create-agent/
2. Choose agent type (standalone for animation-specific)
3. Follow agent creation guide
4. Test agent with animation workflow
```

### Example 3: Document Animation Parameters
```markdown
1. Use BMAD agents to analyze animation code
2. Extract parameter definitions
3. Generate parameter documentation
4. Create usage examples
5. Update README files
```

---

## 🔗 Useful Paths

### Configuration
```bash
bmad/core/config.yaml                    # Main configuration
bmad/_cfg/                               # User customizations
```

### Documentation
```bash
bmad/docs/claude-code-instructions.md    # Claude Code integration
bmad/docs/codex-instructions.md          # General instructions
bmad/core/workflows/brainstorming/       # Brainstorming guides
```

### Agents
```bash
bmad/core/agents/bmad-master.md          # Core orchestrator
bmad/bmb/agents/                         # Builder agents
bmad/bmd/agents/release-chief-sidecar/   # Release management
```

### Workflows
```bash
bmad/core/workflows/brainstorming/       # Creative workflows
bmad/core/workflows/party-mode/          # Agent collaboration
bmad/bmb/workflows/create-agent/         # Agent creation
```

---

## 🎓 Learning Resources

### BMAD Community
- Discord: [discord.gg/gk8jAdXWmj](https://discord.gg/gk8jAdXWmj)
- YouTube: [youtube.com/@BMadCode](https://www.youtube.com/@BMadCode)
- GitHub: [github.com/bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD)

### Your Project Docs
- `BMAD_INSTALLATION_SUCCESS.md` - Complete installation details
- `CLAUDE.md` - Project-specific instructions
- `START_HERE.md` - Quick start guide

---

## 📊 Installation Stats

```
✅ BMAD Version: 6.0.0-alpha.0
✅ Modules: 3 (core, bmb, bmd)
✅ Agents: Multiple (core + specialized)
✅ Workflows: Brainstorming, Party Mode, Agent Creation
✅ Dependencies: 158 packages
✅ Documentation: 59 markdown files
✅ Vulnerabilities: 0
```

---

## 🎉 You're Ready!

BMAD Method is now integrated with your graphic animation template project!

**Next Steps**:
1. ✅ Explore `bmad/docs/` for detailed guides
2. ✅ Try brainstorming workflow for new animations
3. ✅ Create custom agents for animation-specific tasks
4. ✅ Use BMAD to enhance existing templates

**Questions?**
- Check: `BMAD_INSTALLATION_SUCCESS.md`
- Join: BMAD Discord community
- Review: `bmad/docs/` documentation

---

**Happy Building with BMAD! 🚀**

*Build More, Architect Dreams™*
