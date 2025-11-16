# Template Format Migration

## Overview

The GIF generator template system supports two template formats through **automatic transparent migration**:

- **Old Format**: Uses `config` key (legacy, automatically migrated at load time)
- **New Format**: Uses `operation`, `input`, `output`, `params` keys (recommended for new templates)

## Auto-Migration

Old format templates are **automatically converted** to new format when loaded by the template system. No manual intervention or template file changes are required.

**Key Benefits**:
- ✅ Backward compatible - old templates continue to work
- ✅ No breaking changes - existing templates don't need updates
- ✅ Transparent - users don't need to know which format a template uses
- ✅ Future-proof - can support additional formats as needed

## Format Comparison

### Old Format (Legacy)

```yaml
name: "Twitter Product Demo"
pipeline:
  - tool: "gifcurry"
    config:                    # ← Old key name
      start_time: 0
      width: 600
      fps: 15
      text_overlay:
        text: "{{product_name}}"
        position: "bottom"

  - tool: "gifsicle"
    config:                    # ← Old key name
      optimization_level: 3
      colors: 128
      lossy: 80
```

**Characteristics**:
- Uses `config` for parameters
- No explicit `operation` specified
- No explicit `input`/`output` paths
- Simpler, more concise syntax
- **14 of 25 templates use this format**

### New Format (Recommended)

```yaml
name: "Simple GIF Demo"
pipeline:
  steps:
    - tool: "gifcurry"
      operation: "create_gif"   # ← Explicit operation
      input: "{{video_path}}"    # ← Explicit input
      output: "temp_output.gif"  # ← Explicit output
      params:                    # ← New key name
        start_time: 0
        width: 640
        fps: 15

    - tool: "gifsicle"
      operation: "optimize"
      input: "temp_output.gif"
      output: "{{output_path}}"
      params:
        optimization_level: 3
        colors: 128
        lossy: 20
```

**Characteristics**:
- Uses `params` for parameters
- Explicit `operation` name
- Explicit `input` and `output` paths
- Clear data flow between steps
- Better for validation and debugging
- **11 of 25 templates use this format**

## How Migration Works

### 1. Operation Inference

The system automatically infers the operation name from the tool and configuration:

| Tool | Configuration | Inferred Operation |
|------|---------------|-------------------|
| `gifcurry` | Has `text_overlay` | `create_gif_with_text` |
| `gifcurry` | No text overlay | `create_gif` |
| `gifsicle` | Any | `optimize` |
| `liveportrait` | Any | `animate_portrait` |
| `first-order-model` | Any | `transfer_motion` |
| `animated_drawings` | Any | `animate_character` |

### 2. Input/Output Path Inference

For multi-step pipelines:

- **Step 1**: Input from `{{video_path}}`, output to temp file
- **Step 2+**: Input from previous step output, output to temp file
- **Last step**: Output to `{{output_path}}`

### 3. Configuration Rename

`config` → `params` (parameter dictionary is preserved, just renamed)

## Migration Examples

### Example 1: Twitter Demo (Old → New)

**Before (Old Format)**:
```yaml
- tool: "gifcurry"
  config:
    width: 600
    text_overlay:
      text: "Demo"
```

**After Migration (New Format)**:
```yaml
- tool: "gifcurry"
  operation: "create_gif_with_text"  # ← Inferred from text_overlay
  input: "{{video_path}}"             # ← Inferred (first step)
  output: "{{temp_step_0.gif}}"       # ← Inferred (temp file)
  params:                             # ← Renamed from 'config'
    width: 600
    text_overlay:
      text: "Demo"
  _migrated: true                     # ← Debug flag
```

### Example 2: Multi-Step Pipeline

**Before (Old Format)**:
```yaml
pipeline:
  - tool: "gifcurry"
    config:
      width: 800
  - tool: "gifsicle"
    config:
      lossy: 20
```

**After Migration**:
```yaml
pipeline:
  steps:
    - tool: "gifcurry"
      operation: "create_gif"
      input: "{{video_path}}"
      output: "{{temp_step_0.gif}}"
      params:
        width: 800
      _migrated: true

    - tool: "gifsicle"
      operation: "optimize"
      input: "{{previous_output}}"     # ← Uses output from step 1
      output: "{{output_path}}"        # ← Final output
      params:
        lossy: 20
      _migrated: true
```

## For Template Authors

### Creating New Templates

**Recommendation**: Use the **new format** for all new templates.

**Reasons**:
- Explicit operations are clearer
- Better validation and error messages
- Easier to understand data flow
- Future-proof

### Example New Template

```yaml
name: "My Custom Template"
description: "Description here"
version: "1.0.0"
category: "custom"

pipeline:
  steps:
    - tool: "gifcurry"
      operation: "create_gif"
      input: "{{video_path}}"
      output: "temp.gif"
      params:
        width: "{{width|640}}"
        fps: "{{fps|15}}"

    - tool: "gifsicle"
      operation: "optimize"
      input: "temp.gif"
      output: "{{output_path}}"
      params:
        optimization_level: 3
        colors: "{{colors|256}}"

presets:
  balanced:
    width: 640
    fps: 15
    colors: 128

variables:
  video_path:
    type: "file"
    required: true
  output_path:
    type: "file"
    required: false
    default: "output.gif"
```

### Maintaining Old Format Templates

Old format templates **do not need to be updated**. They will continue to work through automatic migration.

However, if you want to manually migrate:

1. Add `steps:` wrapper around pipeline list
2. For each step:
   - Rename `config` → `params`
   - Add `operation` (see inference table)
   - Add `input` (use `{{video_path}}` for first step, `{{previous_output}}` for others)
   - Add `output` (use temp file or `{{output_path}}`)

## Verification

### Check Migration Status

```bash
# Load a template and check if steps were migrated
python3 -c "
from generator.core.template import TemplateLoader
from pathlib import Path

loader = TemplateLoader(Path('templates'))
template = loader.load_template('social-media/twitter-demo')

for i, step in enumerate(template.pipeline, 1):
    migrated = '(migrated)' if step.get('_migrated') else '(new format)'
    print(f'Step {i}: {step[\"tool\"]} -> {step[\"operation\"]} {migrated}')
"
```

### Test Template Loading

```bash
# Test all templates load correctly
python3 -c "
from generator.core.template import TemplateLoader
from pathlib import Path

loader = TemplateLoader(Path('templates'))
for template_path in loader.list_templates():
    try:
        template = loader.load_template(template_path)
        print(f'✅ {template_path}')
    except Exception as e:
        print(f'❌ {template_path}: {e}')
"
```

## Technical Details

### Implementation Location

Migration logic is implemented in:
- **Template Loader**: `generator/core/template.py`
  - `infer_operation()` - Operation name inference
  - `normalize_pipeline_step()` - Format conversion
  - Called automatically in `load_template()`

- **Orchestrator**: `generator/core/orchestrator.py`
  - Enhanced path resolution for temp files
  - Handles both old and new format paths

### Migration Flags

Migrated steps include debug metadata:
- `_migrated`: `true` if step was auto-migrated
- `_original_format`: `"old"` or `"new"`

These fields are for debugging only and not used in execution.

## Troubleshooting

### "Unknown operation" Error

**Cause**: Operation inference failed for a tool/config combination

**Solution**: Either:
1. Add the tool to `infer_operation()` in `template.py`
2. Manually migrate the template to new format with explicit operation

### Template Validation Fails

**Cause**: Required fields missing after migration

**Solution**: Check that the template has all required fields:
- `name`, `description`, `version`, `category`
- `pipeline` (list or dict with `steps`)
- `presets`, `variables`

### Path Resolution Issues

**Cause**: Input/output paths not resolving correctly

**Solution**:
- Use `{{video_path}}` for first step input
- Use `{{previous_output}}` or temp filenames for subsequent inputs
- Use `{{output_path}}` for final step output

## FAQ

### Q: Do I need to update my old templates?

**A**: No! Old templates work automatically through migration. Only update if you want to use new features or prefer the explicit syntax.

### Q: Will migration break my existing templates?

**A**: No. Migration is designed to be fully backward compatible. All 25 existing templates (both old and new format) work correctly.

### Q: Can I mix old and new format steps in one template?

**A**: The migration system handles this, but it's not recommended. Stick to one format per template for clarity.

### Q: How do I know which format my template uses?

**A**: Check for `config` (old) vs `operation`/`params` (new) in pipeline steps. Or run the verification script above.

### Q: What if I want to disable migration?

**A**: Migration cannot be disabled as it's fundamental to backward compatibility. However, new format templates pass through unchanged.

## Version History

- **v1.0.0** (2025-11-16): Initial implementation
  - Automatic migration of old → new format
  - Operation inference for 6 tools
  - Path resolution for temp files
  - 25/25 templates working (14 old, 11 new)

## See Also

- [Template Catalog](../TEMPLATE_CATALOG.md) - All available templates
- [Implementation Plan](../IMPLEMENTATION_PLAN.md) - Development roadmap
- [Quick Start Guide](../QUICKSTART.md) - Getting started
