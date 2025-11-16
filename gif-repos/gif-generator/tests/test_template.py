"""
Tests for template loading and migration
"""
import pytest
import yaml
from pathlib import Path
from generator.core.template import (
    TemplateLoader,
    Template,
    infer_operation,
    normalize_pipeline_step,
    substitute_variables
)


class TestInferOperation:
    """Test operation inference"""

    def test_gifcurry_without_text(self):
        """Test gifcurry operation inference without text overlay"""
        config = {'width': 640, 'fps': 15}
        assert infer_operation('gifcurry', config) == 'create_gif'

    def test_gifcurry_with_text(self):
        """Test gifcurry operation inference with text overlay"""
        config = {'width': 640, 'text_overlay': {'text': 'Hello'}}
        assert infer_operation('gifcurry', config) == 'create_gif_with_text'

    def test_gifsicle(self):
        """Test gifsicle operation inference"""
        config = {'optimization_level': 3}
        assert infer_operation('gifsicle', config) == 'optimize'

    def test_ffmpeg_with_filter(self):
        """Test ffmpeg operation inference with filter"""
        config = {'filter': 'scale=640:-1'}
        assert infer_operation('ffmpeg', config) == 'apply_filter'

    def test_ffmpeg_without_filter(self):
        """Test ffmpeg operation inference without filter"""
        config = {'width': 640}
        assert infer_operation('ffmpeg', config) == 'convert'

    def test_unknown_tool(self):
        """Test unknown tool returns process"""
        config = {}
        assert infer_operation('unknown_tool', config) == 'process'


class TestNormalizePipelineStep:
    """Test pipeline step normalization"""

    def test_new_format_passthrough(self):
        """Test that new format steps pass through unchanged"""
        step = {
            'tool': 'gifcurry',
            'operation': 'create_gif',
            'input': '{{video_path}}',
            'output': 'out.gif',
            'params': {'width': 640}
        }
        normalized = normalize_pipeline_step(step, 0, 2)

        assert normalized['tool'] == 'gifcurry'
        assert normalized['operation'] == 'create_gif'
        assert normalized['input'] == '{{video_path}}'
        assert normalized['output'] == 'out.gif'
        assert normalized['params'] == {'width': 640}

    def test_old_format_migration_first_step(self):
        """Test old format migration for first step"""
        step = {
            'tool': 'gifcurry',
            'config': {'width': 640, 'fps': 15}
        }
        normalized = normalize_pipeline_step(step, 0, 2)

        assert normalized['tool'] == 'gifcurry'
        assert normalized['operation'] == 'create_gif'
        assert normalized['input'] == '{{video_path}}'
        assert '{{temp_step_0.gif}}' in normalized['output']
        assert normalized['params'] == {'width': 640, 'fps': 15}
        assert normalized['_migrated'] is True

    def test_old_format_migration_middle_step(self):
        """Test old format migration for middle step"""
        step = {
            'tool': 'gifsicle',
            'config': {'optimization_level': 3}
        }
        normalized = normalize_pipeline_step(step, 1, 3)

        assert normalized['input'] == '{{previous_output}}'
        assert '{{temp_step_1.gif}}' in normalized['output']

    def test_old_format_migration_last_step(self):
        """Test old format migration for last step"""
        step = {
            'tool': 'gifsicle',
            'config': {'optimization_level': 3}
        }
        normalized = normalize_pipeline_step(step, 1, 2)

        assert normalized['input'] == '{{previous_output}}'
        assert normalized['output'] == '{{output_path}}'


class TestTemplateLoader:
    """Test TemplateLoader class"""

    def test_load_actual_template(self, templates_dir):
        """Test loading an actual template from the templates directory"""
        loader = TemplateLoader(templates_dir)

        # Load a known template
        template = loader.load_template('demo/simple-gif')

        assert isinstance(template, Template)
        assert template.name == 'Simple GIF Demo'
        assert template.category == 'demo'
        assert len(template.pipeline) > 0

    def test_list_templates(self, templates_dir):
        """Test listing all templates"""
        loader = TemplateLoader(templates_dir)
        templates = loader.list_templates()

        assert len(templates) >= 25
        assert 'demo/simple-gif' in templates
        assert 'social-media/twitter-demo' in templates

    def test_old_format_template_migration(self, templates_dir):
        """Test that old format templates are migrated"""
        loader = TemplateLoader(templates_dir)

        # twitter-demo is old format
        template = loader.load_template('social-media/twitter-demo')

        # Check that pipeline steps are migrated
        for step in template.pipeline:
            assert 'operation' in step
            assert 'input' in step
            assert 'output' in step
            assert 'params' in step

    def test_new_format_template(self, templates_dir):
        """Test loading new format template"""
        loader = TemplateLoader(templates_dir)

        # simple-gif is new format
        template = loader.load_template('demo/simple-gif')

        for step in template.pipeline:
            assert 'operation' in step
            assert 'params' in step


class TestVariableSubstitution:
    """Test variable substitution"""

    def test_simple_substitution(self):
        """Test simple variable substitution"""
        text = "{{name}}"
        variables = {'name': 'John'}
        result = substitute_variables(text, variables)
        assert result == 'John'

    def test_multiple_substitutions(self):
        """Test multiple variable substitutions"""
        text = "{{first}} {{last}}"
        variables = {'first': 'John', 'last': 'Doe'}
        result = substitute_variables(text, variables)
        assert result == 'John Doe'

    def test_default_value(self):
        """Test default value when variable not provided"""
        text = "{{name|Unknown}}"
        variables = {}
        result = substitute_variables(text, variables)
        assert result == 'Unknown'

    def test_default_value_with_variable(self):
        """Test that actual value overrides default"""
        text = "{{name|Unknown}}"
        variables = {'name': 'John'}
        result = substitute_variables(text, variables)
        assert result == 'John'

    def test_missing_variable_preserved(self):
        """Test that missing variables without defaults are preserved"""
        text = "{{missing}}"
        variables = {}
        result = substitute_variables(text, variables)
        assert result == '{{missing}}'


class TestTemplateValidation:
    """Test template validation"""

    def test_validate_complete_variables(self, templates_dir):
        """Test validation with complete variables"""
        loader = TemplateLoader(templates_dir)
        template = loader.load_template('demo/simple-gif')

        resolved_vars = {
            'video_path': 'test.mp4',
            'output_path': 'out.gif'
        }

        errors = loader.validate_template(template, resolved_vars)
        assert len(errors) == 0

    def test_validate_missing_required(self, templates_dir):
        """Test validation with missing required variables"""
        loader = TemplateLoader(templates_dir)
        template = loader.load_template('demo/simple-gif')

        resolved_vars = {}  # Missing video_path

        errors = loader.validate_template(template, resolved_vars)
        assert len(errors) > 0
        assert any('video_path' in error for error in errors)


@pytest.mark.integration
class TestTemplateIntegration:
    """Integration tests for template system"""

    def test_load_all_templates(self, templates_dir):
        """Test that all templates load without error"""
        loader = TemplateLoader(templates_dir)
        templates = loader.list_templates()

        failed = []
        for template_path in templates:
            try:
                template = loader.load_template(template_path)
                assert isinstance(template, Template)
            except Exception as e:
                failed.append((template_path, str(e)))

        assert len(failed) == 0, f"Failed to load: {failed}"

    def test_all_templates_have_operations(self, templates_dir):
        """Test that all loaded templates have operations in pipeline"""
        loader = TemplateLoader(templates_dir)
        templates = loader.list_templates()

        for template_path in templates:
            template = loader.load_template(template_path)

            for i, step in enumerate(template.pipeline):
                assert 'operation' in step, f"{template_path} step {i} missing operation"
                assert 'tool' in step, f"{template_path} step {i} missing tool"
