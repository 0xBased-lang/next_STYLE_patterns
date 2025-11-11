"""
Template Loader
Loads and validates YAML templates, resolves variables and presets
"""

import yaml
from pathlib import Path
from typing import Dict, Any, Optional, List
from dataclasses import dataclass


@dataclass
class Template:
    """Represents a loaded template"""
    name: str
    description: str
    version: str
    category: str
    pipeline: List[Dict[str, Any]]
    presets: Dict[str, Dict[str, Any]]
    variables: Dict[str, Dict[str, Any]]
    validation: Dict[str, Any]
    metadata: Dict[str, Any]

    def get_preset(self, preset_name: str) -> Optional[Dict[str, Any]]:
        """Get preset configuration by name"""
        return self.presets.get(preset_name)

    def resolve_variables(self, user_vars: Dict[str, Any], preset_name: str = None) -> Dict[str, Any]:
        """Resolve variables with user values and preset defaults"""
        resolved = {}

        # Start with preset values if provided
        if preset_name and preset_name in self.presets:
            preset = self.presets[preset_name]
            resolved.update(preset)

        # Apply variable defaults
        for var_name, var_config in self.variables.items():
            if var_name not in resolved and 'default' in var_config:
                resolved[var_name] = var_config['default']

        # Apply user-provided values (highest priority)
        resolved.update(user_vars)

        return resolved


class TemplateLoader:
    """Loads templates from YAML files"""

    def __init__(self, templates_dir: Path):
        self.templates_dir = Path(templates_dir)

    def load_template(self, template_path: str) -> Template:
        """
        Load a template from path like 'social-media/twitter-demo'

        Args:
            template_path: Relative path to template (e.g., 'social-media/twitter-demo')

        Returns:
            Template object

        Raises:
            FileNotFoundError: If template not found
            ValueError: If template YAML is invalid
        """
        # Construct full path
        full_path = self.templates_dir / template_path / 'template.yaml'

        if not full_path.exists():
            raise FileNotFoundError(f"Template not found: {full_path}")

        # Load YAML
        with open(full_path, 'r') as f:
            data = yaml.safe_load(f)

        # Validate required fields
        required = ['name', 'description', 'version', 'category', 'pipeline', 'presets', 'variables']
        missing = [field for field in required if field not in data]
        if missing:
            raise ValueError(f"Template missing required fields: {missing}")

        # Handle pipeline format (can be list or dict with steps key)
        pipeline = data['pipeline']
        if isinstance(pipeline, dict) and 'steps' in pipeline:
            pipeline_steps = pipeline['steps']
        elif isinstance(pipeline, list):
            pipeline_steps = pipeline
        else:
            raise ValueError("Pipeline must be a list or dict with 'steps' key")

        # Create Template object
        template = Template(
            name=data['name'],
            description=data['description'],
            version=data['version'],
            category=data['category'],
            pipeline=pipeline_steps,
            presets=data['presets'],
            variables=data['variables'],
            validation=data.get('validation', {}),
            metadata={
                'tags': data.get('tags', []),
                'use_cases': data.get('use_cases', []),
                'platform': data.get('platform', {}),
            }
        )

        return template

    def list_templates(self) -> List[str]:
        """List all available templates"""
        templates = []

        for category_dir in self.templates_dir.iterdir():
            if category_dir.is_dir() and not category_dir.name.startswith('_'):
                for template_dir in category_dir.iterdir():
                    if template_dir.is_dir():
                        template_file = template_dir / 'template.yaml'
                        if template_file.exists():
                            rel_path = f"{category_dir.name}/{template_dir.name}"
                            templates.append(rel_path)

        return sorted(templates)

    def validate_template(self, template: Template, resolved_vars: Dict[str, Any]) -> List[str]:
        """
        Validate resolved variables against template requirements

        Returns:
            List of validation error messages (empty if valid)
        """
        errors = []

        # Check required variables
        for var_name, var_config in template.variables.items():
            if var_config.get('required', False):
                if var_name not in resolved_vars or resolved_vars[var_name] is None:
                    errors.append(f"Required variable missing: {var_name}")

        # Type validation
        for var_name, value in resolved_vars.items():
            if var_name in template.variables:
                var_config = template.variables[var_name]
                expected_type = var_config.get('type')

                if expected_type == 'integer' and not isinstance(value, int):
                    errors.append(f"Variable '{var_name}' should be integer, got {type(value).__name__}")
                elif expected_type == 'float' and not isinstance(value, (int, float)):
                    errors.append(f"Variable '{var_name}' should be float, got {type(value).__name__}")
                elif expected_type == 'boolean' and not isinstance(value, bool):
                    errors.append(f"Variable '{var_name}' should be boolean, got {type(value).__name__}")
                elif expected_type == 'string' and not isinstance(value, str):
                    errors.append(f"Variable '{var_name}' should be string, got {type(value).__name__}")

        return errors


def substitute_variables(text: str, variables: Dict[str, Any]) -> str:
    """
    Substitute variables in text like {{variable_name|default_value}}

    Args:
        text: Text with variable placeholders
        variables: Dictionary of variable values

    Returns:
        Text with variables substituted
    """
    import re

    def replace_var(match):
        var_expr = match.group(1)

        # Handle default values: {{var|default}}
        if '|' in var_expr:
            var_name, default = var_expr.split('|', 1)
            var_name = var_name.strip()
            default = default.strip()

            if var_name in variables:
                return str(variables[var_name])
            else:
                return default
        else:
            var_name = var_expr.strip()
            if var_name in variables:
                return str(variables[var_name])
            else:
                return match.group(0)  # Leave unchanged if not found

    # Replace {{variable}} or {{variable|default}}
    pattern = r'\{\{([^}]+)\}\}'
    return re.sub(pattern, replace_var, str(text))


# Example usage
if __name__ == '__main__':
    # Test template loading
    loader = TemplateLoader(Path(__file__).parent.parent.parent / 'templates')

    print("Available templates:")
    for template_path in loader.list_templates():
        print(f"  - {template_path}")

    print("\nLoading Twitter demo template...")
    template = loader.load_template('social-media/twitter-demo')

    print(f"Template: {template.name}")
    print(f"Description: {template.description}")
    print(f"Presets: {list(template.presets.keys())}")

    # Test variable resolution
    user_vars = {
        'video_path': 'demo.mp4',
        'product_name': 'Amazing Product'
    }

    resolved = template.resolve_variables(user_vars, preset_name='balanced')
    print(f"\nResolved variables: {resolved}")

    # Test validation
    errors = loader.validate_template(template, resolved)
    if errors:
        print(f"Validation errors: {errors}")
    else:
        print("✅ Template validation passed!")
