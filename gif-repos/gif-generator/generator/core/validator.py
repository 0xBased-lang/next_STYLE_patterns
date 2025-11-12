"""
Template Validator
Validates template structure, parameters, and completeness
"""

from pathlib import Path
from typing import Dict, List, Any, Optional
import yaml


class ValidationError(Exception):
    """Raised when validation fails"""
    pass


class TemplateValidator:
    """Validates GIF generator templates"""

    REQUIRED_FIELDS = ['name', 'description', 'version', 'category', 'pipeline']
    VALID_CATEGORIES = [
        'demo', 'social-media', 'portrait-animation', 'character-animation',
        'web-animation', 'creative-effects', 'professional', 'technical-docs',
        'ecommerce', 'ai-enhancement'
    ]
    VALID_TOOLS = [
        'gifcurry', 'gifsicle', 'liveportrait', 'first-order-model',
        'ffmpeg', 'imagemagick'
    ]

    def __init__(self):
        self.errors = []
        self.warnings = []

    def validate_template_file(self, template_path: Path) -> bool:
        """
        Validate a template file

        Args:
            template_path: Path to template.yaml file

        Returns:
            True if valid, False otherwise

        Raises:
            ValidationError: If validation fails
        """
        self.errors = []
        self.warnings = []

        # Check file exists
        if not template_path.exists():
            self.errors.append(f"Template file not found: {template_path}")
            raise ValidationError("\n".join(self.errors))

        # Load YAML
        try:
            with open(template_path) as f:
                template_data = yaml.safe_load(f)
        except yaml.YAMLError as e:
            self.errors.append(f"Invalid YAML: {e}")
            raise ValidationError("\n".join(self.errors))

        # Validate structure
        self._validate_structure(template_data)

        # Validate fields
        self._validate_fields(template_data)

        # Validate pipeline
        self._validate_pipeline(template_data.get('pipeline'))

        # Validate presets
        if 'presets' in template_data:
            self._validate_presets(template_data['presets'])

        # Validate variables
        if 'variables' in template_data:
            self._validate_variables(template_data['variables'])

        # Report results
        if self.errors:
            raise ValidationError("\n".join(self.errors))

        return True

    def _validate_structure(self, data: Dict[str, Any]):
        """Validate template has required structure"""
        # Check required fields
        for field in self.REQUIRED_FIELDS:
            if field not in data:
                self.errors.append(f"Missing required field: {field}")

    def _validate_fields(self, data: Dict[str, Any]):
        """Validate field values"""
        # Validate name
        if 'name' in data:
            if not isinstance(data['name'], str) or not data['name']:
                self.errors.append("Field 'name' must be a non-empty string")

        # Validate description
        if 'description' in data:
            if not isinstance(data['description'], str) or not data['description']:
                self.errors.append("Field 'description' must be a non-empty string")

        # Validate version
        if 'version' in data:
            if not isinstance(data['version'], str):
                self.errors.append("Field 'version' must be a string")

        # Validate category
        if 'category' in data:
            if data['category'] not in self.VALID_CATEGORIES:
                self.warnings.append(
                    f"Category '{data['category']}' is not in standard categories: "
                    f"{', '.join(self.VALID_CATEGORIES)}"
                )

    def _validate_pipeline(self, pipeline: Any):
        """Validate pipeline structure"""
        if not pipeline:
            self.errors.append("Pipeline is empty")
            return

        # Pipeline can be list or dict with 'steps' key
        steps = []
        if isinstance(pipeline, dict):
            if 'steps' not in pipeline:
                self.errors.append("Pipeline dict must have 'steps' key")
                return
            steps = pipeline['steps']
        elif isinstance(pipeline, list):
            steps = pipeline
        else:
            self.errors.append("Pipeline must be a list or dict with 'steps' key")
            return

        if not steps:
            self.errors.append("Pipeline has no steps")
            return

        # Validate each step
        for i, step in enumerate(steps, 1):
            self._validate_step(step, i)

    def _validate_step(self, step: Dict[str, Any], step_num: int):
        """Validate a single pipeline step"""
        if not isinstance(step, dict):
            self.errors.append(f"Step {step_num} must be a dictionary")
            return

        # Required step fields
        required = ['tool', 'operation', 'input', 'output']
        for field in required:
            if field not in step:
                self.errors.append(f"Step {step_num} missing required field: {field}")

        # Validate tool
        if 'tool' in step:
            tool = step['tool']
            if tool not in self.VALID_TOOLS:
                self.warnings.append(
                    f"Step {step_num} uses non-standard tool: {tool}. "
                    f"Valid tools: {', '.join(self.VALID_TOOLS)}"
                )

        # Validate operation
        if 'operation' in step and not step['operation']:
            self.errors.append(f"Step {step_num} operation cannot be empty")

        # Validate params
        if 'params' in step:
            if not isinstance(step['params'], dict):
                self.errors.append(f"Step {step_num} params must be a dictionary")

    def _validate_presets(self, presets: Dict[str, Any]):
        """Validate presets"""
        if not isinstance(presets, dict):
            self.errors.append("Presets must be a dictionary")
            return

        if not presets:
            self.warnings.append("Presets dictionary is empty")
            return

        # Validate each preset
        for preset_name, preset_data in presets.items():
            if not isinstance(preset_data, dict):
                self.errors.append(f"Preset '{preset_name}' must be a dictionary")

            if 'description' not in preset_data:
                self.warnings.append(f"Preset '{preset_name}' missing description")

    def _validate_variables(self, variables: Dict[str, Any]):
        """Validate variables"""
        if not isinstance(variables, dict):
            self.errors.append("Variables must be a dictionary")
            return

        # Validate each variable
        for var_name, var_data in variables.items():
            if not isinstance(var_data, dict):
                self.errors.append(f"Variable '{var_name}' must be a dictionary")
                continue

            # Check for type
            if 'type' not in var_data:
                self.warnings.append(f"Variable '{var_name}' missing type")

            # Check for description
            if 'description' not in var_data:
                self.warnings.append(f"Variable '{var_name}' missing description")

    def validate_directory(self, templates_dir: Path) -> Dict[str, List[str]]:
        """
        Validate all templates in a directory

        Args:
            templates_dir: Path to templates directory

        Returns:
            Dict mapping template paths to validation errors (empty list if valid)
        """
        results = {}

        # Find all template.yaml files
        for template_file in templates_dir.rglob('template.yaml'):
            # Skip _base directory
            if '_base' in template_file.parts:
                continue

            relative_path = template_file.relative_to(templates_dir)

            try:
                self.validate_template_file(template_file)
                results[str(relative_path.parent)] = []
            except ValidationError as e:
                results[str(relative_path.parent)] = str(e).split('\n')

        return results

    def print_validation_report(self, results: Dict[str, List[str]]):
        """Print a validation report"""
        print("\n" + "="*60)
        print("TEMPLATE VALIDATION REPORT")
        print("="*60 + "\n")

        valid_count = sum(1 for errors in results.values() if not errors)
        invalid_count = len(results) - valid_count

        print(f"Total templates: {len(results)}")
        print(f"✅ Valid: {valid_count}")
        print(f"❌ Invalid: {invalid_count}")
        print()

        if invalid_count > 0:
            print("INVALID TEMPLATES:")
            print("-" * 60)
            for template_path, errors in results.items():
                if errors:
                    print(f"\n❌ {template_path}")
                    for error in errors:
                        print(f"   • {error}")

        if valid_count > 0:
            print("\nVALID TEMPLATES:")
            print("-" * 60)
            for template_path, errors in results.items():
                if not errors:
                    print(f"✅ {template_path}")

        print("\n" + "="*60)

    def get_summary(self) -> str:
        """Get validation summary"""
        if not self.errors and not self.warnings:
            return "✅ Template is valid"

        summary = []
        if self.errors:
            summary.append(f"❌ {len(self.errors)} error(s):")
            summary.extend(f"  • {e}" for e in self.errors)

        if self.warnings:
            summary.append(f"⚠️  {len(self.warnings)} warning(s):")
            summary.extend(f"  • {w}" for w in self.warnings)

        return "\n".join(summary)


# CLI interface for validation
if __name__ == '__main__':
    import sys

    if len(sys.argv) < 2:
        print("Usage: python -m generator.core.validator <template_path_or_directory>")
        sys.exit(1)

    path = Path(sys.argv[1])
    validator = TemplateValidator()

    if path.is_file():
        # Validate single template
        try:
            validator.validate_template_file(path)
            print(validator.get_summary())
        except ValidationError:
            print(validator.get_summary())
            sys.exit(1)

    elif path.is_dir():
        # Validate all templates in directory
        results = validator.validate_directory(path)
        validator.print_validation_report(results)

        # Exit with error if any templates invalid
        if any(errors for errors in results.values()):
            sys.exit(1)

    else:
        print(f"Error: Path not found: {path}")
        sys.exit(1)
