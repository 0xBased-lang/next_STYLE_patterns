"""
Pytest configuration and fixtures
"""
import pytest
from pathlib import Path
import tempfile
import shutil


@pytest.fixture
def temp_dir():
    """Create a temporary directory for tests"""
    tmpdir = Path(tempfile.mkdtemp())
    yield tmpdir
    # Cleanup
    shutil.rmtree(tmpdir, ignore_errors=True)


@pytest.fixture
def templates_dir():
    """Return path to templates directory"""
    return Path(__file__).parent.parent / 'templates'


@pytest.fixture
def sample_template_data():
    """Sample template data for testing"""
    return {
        'name': 'Test Template',
        'description': 'A test template',
        'version': '1.0.0',
        'category': 'test',
        'pipeline': [
            {
                'tool': 'gifcurry',
                'config': {
                    'width': 640,
                    'fps': 15
                }
            },
            {
                'tool': 'gifsicle',
                'config': {
                    'optimization_level': 3
                }
            }
        ],
        'presets': {
            'quick': {'width': 480, 'fps': 10},
            'balanced': {'width': 640, 'fps': 15}
        },
        'variables': {
            'video_path': {
                'type': 'file',
                'required': True
            }
        }
    }


@pytest.fixture
def sample_new_format_template():
    """Sample new format template data"""
    return {
        'name': 'New Format Test',
        'description': 'A new format test template',
        'version': '1.0.0',
        'category': 'test',
        'pipeline': {
            'steps': [
                {
                    'tool': 'gifcurry',
                    'operation': 'create_gif',
                    'input': '{{video_path}}',
                    'output': 'temp.gif',
                    'params': {
                        'width': 640,
                        'fps': 15
                    }
                },
                {
                    'tool': 'gifsicle',
                    'operation': 'optimize',
                    'input': 'temp.gif',
                    'output': '{{output_path}}',
                    'params': {
                        'optimization_level': 3
                    }
                }
            ]
        },
        'presets': {
            'quick': {'width': 480, 'fps': 10}
        },
        'variables': {
            'video_path': {'type': 'file', 'required': True},
            'output_path': {'type': 'file', 'required': False}
        }
    }
