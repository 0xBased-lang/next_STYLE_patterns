"""
Next Style Patterns - Python Component Registry
Provides Python/LangChain integration for the TOON-based component registry
"""

import json
from pathlib import Path
from typing import List, Dict, Any, Optional
from dataclasses import dataclass
import subprocess


@dataclass
class Component:
    """Animation component with metadata"""
    id: str
    name: str
    category: str
    type: str
    description: str
    semantic_tags: List[str]
    use_cases: List[Dict[str, Any]]
    frameworks: List[str]
    performance: Dict[str, Any]
    presets: Dict[str, Any]
    ai_prompt_examples: List[str]
    themes: Optional[List[Dict[str, str]]] = None
    versions: Optional[Dict[str, Any]] = None


@dataclass
class GifTemplate:
    """GIF template with platform specifications"""
    id: str
    name: str
    category: str
    platform: str
    description: str
    semantic_tags: List[str]
    specifications: Dict[str, Any]
    use_cases: List[Dict[str, Any]]
    presets: List[Dict[str, str]]
    ai_prompt_examples: List[str]


class ComponentRegistry:
    """
    Component registry with TOON format support

    Provides semantic search, recommendations, and LangChain integration
    for Next Style Patterns component library.
    """

    def __init__(self, registry_path: Optional[str] = None):
        """Initialize registry with TOON file path"""
        if registry_path is None:
            # Default to component-registry.toon in parent directory
            registry_path = Path(__file__).parent.parent / "component-registry.toon"

        self.registry_path = Path(registry_path)
        self.registry_data = None
        self.components = {}
        self.gif_templates = {}

        # Load registry
        self._load_registry()

    def _load_registry(self):
        """Load and parse TOON registry file"""
        if not self.registry_path.exists():
            raise FileNotFoundError(f"Registry not found: {self.registry_path}")

        # Use JSON file if it exists (faster)
        json_path = self.registry_path.parent / "component-registry.json"
        if json_path.exists():
            with open(json_path, 'r') as f:
                self.registry_data = json.load(f)
        else:
            # Fallback: Use Node.js toon parser to convert to JSON
            self._load_via_nodejs()

        # Parse components
        if 'components' in self.registry_data:
            for comp_id, comp_data in self.registry_data['components'].items():
                self.components[comp_id] = Component(
                    id=comp_data['id'],
                    name=comp_data['name'],
                    category=comp_data['category'],
                    type=comp_data.get('type', ''),
                    description=comp_data['description'],
                    semantic_tags=comp_data.get('semanticTags', []),
                    use_cases=comp_data.get('useCases', []),
                    frameworks=comp_data.get('frameworks', []),
                    performance=comp_data.get('performance', {}),
                    presets=comp_data.get('presets', {}),
                    ai_prompt_examples=comp_data.get('aiPromptExamples', []),
                    themes=comp_data.get('themes'),
                    versions=comp_data.get('versions')
                )

        # Parse GIF templates
        if 'gifTemplates' in self.registry_data:
            for gif_id, gif_data in self.registry_data['gifTemplates'].items():
                self.gif_templates[gif_id] = GifTemplate(
                    id=gif_data['id'],
                    name=gif_data['name'],
                    category=gif_data['category'],
                    platform=gif_data['platform'],
                    description=gif_data['description'],
                    semantic_tags=gif_data.get('semanticTags', []),
                    specifications=gif_data.get('specifications', {}),
                    use_cases=gif_data.get('useCases', []),
                    presets=gif_data.get('presets', []),
                    ai_prompt_examples=gif_data.get('aiPromptExamples', [])
                )

    def _load_via_nodejs(self):
        """Fallback: Load TOON file via Node.js parser"""
        try:
            # Use the convert-toon.mjs utility to convert to JSON
            convert_script = self.registry_path.parent / "convert-toon.mjs"
            result = subprocess.run(
                ['node', str(convert_script), 'toon-to-json',
                 str(self.registry_path), '/tmp/registry.json'],
                capture_output=True,
                text=True
            )

            if result.returncode == 0:
                with open('/tmp/registry.json', 'r') as f:
                    self.registry_data = json.load(f)
            else:
                raise RuntimeError(f"Failed to parse TOON file: {result.stderr}")
        except Exception as e:
            raise RuntimeError(f"Could not load TOON file: {e}")

    def search(self, query: str, category: Optional[str] = None,
               min_confidence: float = 0.0) -> List[Dict[str, Any]]:
        """
        Search for components using semantic tags and keywords

        Args:
            query: Search query (e.g., "cyberpunk glitch", "aurora")
            category: Filter by category ("animation" or "gif")
            min_confidence: Minimum confidence score for use cases (0-1)

        Returns:
            List of matching components with scores
        """
        results = []
        search_terms = query.lower().split()

        for comp_id, component in self.components.items():
            if category and component.category != category:
                continue

            score = 0
            matches = []

            # Search in semantic tags
            for tag in component.semantic_tags:
                for term in search_terms:
                    if term in tag.lower():
                        score += 2
                        matches.append(f"tag: {tag}")

            # Search in name
            if query.lower() in component.name.lower():
                score += 3
                matches.append(f"name: {component.name}")

            # Search in description
            if query.lower() in component.description.lower():
                score += 1
                matches.append("description")

            # Check use cases
            for use_case in component.use_cases:
                if use_case.get('confidence', 0) >= min_confidence:
                    if query.lower() in use_case['name'].lower():
                        score += 2
                        matches.append(f"use case: {use_case['name']}")

            if score > 0:
                results.append({
                    'id': comp_id,
                    'name': component.name,
                    'category': component.category,
                    'score': score,
                    'matches': list(set(matches)),
                    'component': component
                })

        # Sort by score
        results.sort(key=lambda x: x['score'], reverse=True)
        return results

    def get_component(self, component_id: str) -> Optional[Component]:
        """Get component by ID"""
        return self.components.get(component_id)

    def list_components(self, category: Optional[str] = None,
                       include_presets: bool = False) -> List[Component]:
        """
        List all components with optional filters

        Args:
            category: Filter by category
            include_presets: Include preset configurations

        Returns:
            List of components
        """
        components = []
        for component in self.components.values():
            if category is None or component.category == category:
                components.append(component)

        return components

    def get_gif_template(self, platform: str) -> Optional[GifTemplate]:
        """Get GIF template by platform"""
        for template in self.gif_templates.values():
            if template.platform == platform:
                return template
        return None

    def recommend(self, use_case: str, min_confidence: float = 0.8) -> List[Dict[str, Any]]:
        """
        Get component recommendations based on use case

        Args:
            use_case: Use case description (e.g., "hero section background")
            min_confidence: Minimum confidence threshold (0-1)

        Returns:
            List of recommendations with confidence scores
        """
        recommendations = []

        for comp_id, component in self.components.items():
            for uc in component.use_cases:
                uc_name = uc['name'].lower()
                query = use_case.lower()
                confidence = uc.get('confidence', 0)

                if query in uc_name and confidence >= min_confidence:
                    recommendations.append({
                        'id': comp_id,
                        'name': component.name,
                        'category': component.category,
                        'description': component.description,
                        'use_case': uc['name'],
                        'confidence': confidence,
                        'presets': list(component.presets.keys()),
                        'ai_prompt_examples': component.ai_prompt_examples,
                        'component': component
                    })

        # Sort by confidence
        recommendations.sort(key=lambda x: x['confidence'], reverse=True)
        return recommendations

    def get_statistics(self) -> Dict[str, Any]:
        """Get registry statistics"""
        return self.registry_data.get('statistics', {})

    def to_documents(self) -> List[Dict[str, Any]]:
        """
        Convert registry to LangChain document format

        Returns:
            List of documents for vector store
        """
        documents = []

        for comp_id, component in self.components.items():
            # Create document for each component
            doc = {
                'page_content': f"""
Component: {component.name}
Category: {component.category}
Description: {component.description}

Semantic Tags: {', '.join(component.semantic_tags)}

Use Cases:
{chr(10).join(f"- {uc['name']} (confidence: {uc.get('confidence', 'N/A')})" for uc in component.use_cases)}

Frameworks: {', '.join(component.frameworks)}

Performance: {component.performance.get('fps', {}).get('avg', 'N/A')} FPS avg

Presets: {', '.join(component.presets.keys())}

AI Prompt Examples:
{chr(10).join(f"- {ex}" for ex in component.ai_prompt_examples)}
                """.strip(),
                'metadata': {
                    'id': comp_id,
                    'name': component.name,
                    'category': component.category,
                    'type': component.type,
                    'semantic_tags': component.semantic_tags,
                    'frameworks': component.frameworks,
                    'source': 'component_registry'
                }
            }
            documents.append(doc)

        # Add GIF templates
        for gif_id, template in self.gif_templates.items():
            doc = {
                'page_content': f"""
GIF Template: {template.name}
Platform: {template.platform}
Description: {template.description}

Specifications:
- Dimensions: {template.specifications.get('dimensions', 'N/A')}
- Max Size: {template.specifications.get('maxSize', 'N/A')}
- FPS: {template.specifications.get('fps', 'N/A')}
- Duration: {template.specifications.get('duration', 'N/A')}

Use Cases:
{chr(10).join(f"- {uc['name']} (confidence: {uc.get('confidence', 'N/A')})" for uc in template.use_cases)}

AI Prompt Examples:
{chr(10).join(f"- {ex}" for ex in template.ai_prompt_examples)}
                """.strip(),
                'metadata': {
                    'id': gif_id,
                    'name': template.name,
                    'category': template.category,
                    'platform': template.platform,
                    'semantic_tags': template.semantic_tags,
                    'source': 'gif_template'
                }
            }
            documents.append(doc)

        return documents


# Convenience functions
def load_registry(path: Optional[str] = None) -> ComponentRegistry:
    """Load component registry from TOON file"""
    return ComponentRegistry(path)


def search_components(query: str, **kwargs) -> List[Dict[str, Any]]:
    """Search for components"""
    registry = load_registry()
    return registry.search(query, **kwargs)


def get_recommendations(use_case: str, **kwargs) -> List[Dict[str, Any]]:
    """Get component recommendations"""
    registry = load_registry()
    return registry.recommend(use_case, **kwargs)
