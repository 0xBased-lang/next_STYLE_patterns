"""
LangChain Integration for Next Style Patterns
Provides LangChain tools and retrievers for component discovery
"""

from typing import Optional, Type, List, Dict, Any
from pydantic import BaseModel, Field
from component_registry import ComponentRegistry, load_registry


# LangChain imports (optional - gracefully degrade if not installed)
try:
    from langchain.tools import BaseTool
    from langchain.callbacks.manager import CallbackManagerForToolRun
    from langchain_core.documents import Document
    from langchain_core.retrievers import BaseRetriever
    from langchain_core.callbacks import CallbackManagerForRetrieverRun
    LANGCHAIN_AVAILABLE = True
except ImportError:
    LANGCHAIN_AVAILABLE = False
    BaseTool = object
    BaseRetriever = object


class ComponentSearchInput(BaseModel):
    """Input for component search tool"""
    query: str = Field(description="Search query for finding components (e.g., 'cyberpunk glitch', 'aurora')")
    category: Optional[str] = Field(
        default=None,
        description="Filter by category: 'animation' or 'gif'"
    )


class ComponentRecommendInput(BaseModel):
    """Input for component recommendation tool"""
    use_case: str = Field(description="Use case description (e.g., 'hero section background', 'gaming website')")
    min_confidence: float = Field(
        default=0.8,
        description="Minimum confidence threshold (0-1)"
    )


class GifTemplateInput(BaseModel):
    """Input for GIF template tool"""
    platform: str = Field(description="Platform name: 'twitter', 'instagram', or 'linkedin'")


# LangChain Tools
if LANGCHAIN_AVAILABLE:
    class ComponentSearchTool(BaseTool):
        """Tool for searching animation components"""
        name: str = "search_components"
        description: str = """
        Search for animation components using semantic tags and keywords.
        Useful for finding components by theme, style, or visual effect.

        Examples:
        - "cyberpunk glitch" → Finds Holographic Glitch component
        - "aurora northern lights" → Finds Aurora Flow component
        - "particle explosion" → Finds Particle Explosion component
        """
        args_schema: Type[BaseModel] = ComponentSearchInput
        registry: ComponentRegistry = None

        def __init__(self, **kwargs):
            super().__init__(**kwargs)
            if self.registry is None:
                self.registry = load_registry()

        def _run(
            self,
            query: str,
            category: Optional[str] = None,
            run_manager: Optional[CallbackManagerForToolRun] = None
        ) -> str:
            """Search for components"""
            results = self.registry.search(query, category=category)

            if not results:
                return f"No components found matching '{query}'"

            # Format results
            output = f"Found {len(results)} component(s) matching '{query}':\n\n"
            for i, result in enumerate(results[:3], 1):  # Top 3 results
                comp = result['component']
                output += f"{i}. **{comp.name}** (score: {result['score']})\n"
                output += f"   - Category: {comp.category}\n"
                output += f"   - Description: {comp.description}\n"
                output += f"   - Frameworks: {', '.join(comp.frameworks)}\n"
                output += f"   - Performance: {comp.performance.get('fps', {}).get('avg', 'N/A')} FPS\n"
                output += f"   - Presets: {', '.join(comp.presets.keys())}\n"
                output += f"   - Matches: {', '.join(result['matches'][:3])}\n\n"

            return output

        async def _arun(
            self,
            query: str,
            category: Optional[str] = None,
            run_manager: Optional[CallbackManagerForToolRun] = None
        ) -> str:
            """Async version"""
            return self._run(query, category, run_manager)


    class ComponentRecommendTool(BaseTool):
        """Tool for getting component recommendations based on use case"""
        name: str = "recommend_component"
        description: str = """
        Get component recommendations based on use case description.
        Returns components with high confidence scores for the specified use case.

        Examples:
        - "hero section background" → Aurora Flow (95% confidence)
        - "gaming website" → Holographic Glitch, Neon Trails
        - "meditation app" → Aurora Flow with subtle preset
        """
        args_schema: Type[BaseModel] = ComponentRecommendInput
        registry: ComponentRegistry = None

        def __init__(self, **kwargs):
            super().__init__(**kwargs)
            if self.registry is None:
                self.registry = load_registry()

        def _run(
            self,
            use_case: str,
            min_confidence: float = 0.8,
            run_manager: Optional[CallbackManagerForToolRun] = None
        ) -> str:
            """Get recommendations"""
            recommendations = self.registry.recommend(use_case, min_confidence=min_confidence)

            if not recommendations:
                return f"No recommendations found for '{use_case}' with confidence >= {min_confidence}"

            # Format results
            output = f"Found {len(recommendations)} recommendation(s) for '{use_case}':\n\n"
            for i, rec in enumerate(recommendations, 1):
                output += f"{i}. **{rec['name']}** (confidence: {rec['confidence']:.0%})\n"
                output += f"   - Use Case: {rec['use_case']}\n"
                output += f"   - Description: {rec['description']}\n"
                output += f"   - Presets: {', '.join(rec['presets'])}\n"
                output += f"   - Example Prompt: {rec['ai_prompt_examples'][0]}\n\n"

            return output

        async def _arun(
            self,
            use_case: str,
            min_confidence: float = 0.8,
            run_manager: Optional[CallbackManagerForToolRun] = None
        ) -> str:
            """Async version"""
            return self._run(use_case, min_confidence, run_manager)


    class GifTemplateTool(BaseTool):
        """Tool for getting GIF template specifications"""
        name: str = "get_gif_template"
        description: str = """
        Get GIF template specifications for social media platforms.
        Returns dimensions, file size limits, FPS, and duration specs.

        Platforms: twitter, instagram, linkedin
        """
        args_schema: Type[BaseModel] = GifTemplateInput
        registry: ComponentRegistry = None

        def __init__(self, **kwargs):
            super().__init__(**kwargs)
            if self.registry is None:
                self.registry = load_registry()

        def _run(
            self,
            platform: str,
            run_manager: Optional[CallbackManagerForToolRun] = None
        ) -> str:
            """Get GIF template"""
            template = self.registry.get_gif_template(platform)

            if not template:
                return f"No GIF template found for platform '{platform}'"

            # Format result
            specs = template.specifications
            output = f"**{template.name}**\n\n"
            output += f"Platform: {template.platform}\n"
            output += f"Description: {template.description}\n\n"
            output += "Specifications:\n"
            output += f"- Dimensions: {specs.get('dimensions', 'N/A')}\n"
            output += f"- Max Size: {specs.get('maxSize', 'N/A')}\n"
            output += f"- FPS: {specs.get('fps', 'N/A')}\n"
            output += f"- Duration: {specs.get('duration', 'N/A')}\n\n"
            output += "Use Cases:\n"
            for uc in template.use_cases:
                output += f"- {uc['name']} ({uc.get('confidence', 0):.0%} confidence)\n"

            return output

        async def _arun(
            self,
            platform: str,
            run_manager: Optional[CallbackManagerForToolRun] = None
        ) -> str:
            """Async version"""
            return self._run(platform, run_manager)


    class ComponentRetriever(BaseRetriever):
        """LangChain retriever for component registry"""
        registry: ComponentRegistry = None
        k: int = 4  # Number of results to return

        def __init__(self, **kwargs):
            super().__init__(**kwargs)
            if self.registry is None:
                self.registry = load_registry()

        def _get_relevant_documents(
            self,
            query: str,
            *,
            run_manager: Optional[CallbackManagerForRetrieverRun] = None
        ) -> List[Document]:
            """Get relevant documents for query"""
            # Search components
            results = self.registry.search(query)

            # Convert to LangChain Documents
            documents = []
            for result in results[:self.k]:
                comp = result['component']
                doc = Document(
                    page_content=f"""
{comp.name}

{comp.description}

Semantic Tags: {', '.join(comp.semantic_tags)}

Use Cases:
{chr(10).join(f"- {uc['name']} ({uc.get('confidence', 0):.0%} confidence)" for uc in comp.use_cases)}

Frameworks: {', '.join(comp.frameworks)}
Performance: {comp.performance.get('fps', {}).get('avg', 'N/A')} FPS avg

Presets: {', '.join(comp.presets.keys())}

Example Prompts:
{chr(10).join(f"- {ex}" for ex in comp.ai_prompt_examples)}
                    """.strip(),
                    metadata={
                        'id': comp.id,
                        'name': comp.name,
                        'category': comp.category,
                        'type': comp.type,
                        'score': result['score'],
                        'matches': result['matches']
                    }
                )
                documents.append(doc)

            return documents

        async def _aget_relevant_documents(
            self,
            query: str,
            *,
            run_manager: Optional[CallbackManagerForRetrieverRun] = None
        ) -> List[Document]:
            """Async version"""
            return self._get_relevant_documents(query, run_manager=run_manager)


# Factory functions
def create_component_tools() -> List[BaseTool]:
    """Create all component tools for LangChain agent"""
    if not LANGCHAIN_AVAILABLE:
        raise ImportError("LangChain is not installed. Install with: pip install langchain")

    return [
        ComponentSearchTool(),
        ComponentRecommendTool(),
        GifTemplateTool()
    ]


def create_component_retriever(k: int = 4) -> BaseRetriever:
    """Create component retriever for RAG"""
    if not LANGCHAIN_AVAILABLE:
        raise ImportError("LangChain is not installed. Install with: pip install langchain")

    return ComponentRetriever(k=k)


# Example usage functions (work without LangChain)
def demo_search():
    """Demo: Search for components"""
    print("🔍 Demo: Component Search\n")
    print("=" * 60)

    registry = load_registry()

    # Example searches
    queries = [
        ("cyberpunk glitch", "animation"),
        ("aurora", None),
        ("particle", None)
    ]

    for query, category in queries:
        print(f"\nQuery: '{query}'" + (f" (category: {category})" if category else ""))
        print("-" * 60)

        results = registry.search(query, category=category)

        if results:
            for i, result in enumerate(results[:2], 1):
                comp = result['component']
                print(f"{i}. {comp.name} (score: {result['score']})")
                print(f"   {comp.description}")
                print(f"   Frameworks: {', '.join(comp.frameworks)}")
        else:
            print("No results found")


def demo_recommend():
    """Demo: Component recommendations"""
    print("\n\n💡 Demo: Component Recommendations\n")
    print("=" * 60)

    registry = load_registry()

    # Example use cases
    use_cases = [
        ("hero section", 0.9),
        ("gaming website", 0.9),
        ("meditation app", 0.85)
    ]

    for use_case, min_conf in use_cases:
        print(f"\nUse Case: '{use_case}' (min confidence: {min_conf})")
        print("-" * 60)

        recommendations = registry.recommend(use_case, min_confidence=min_conf)

        if recommendations:
            for i, rec in enumerate(recommendations, 1):
                print(f"{i}. {rec['name']} ({rec['confidence']:.0%} confidence)")
                print(f"   {rec['use_case']}")
                print(f"   Presets: {', '.join(rec['presets'])}")
        else:
            print("No recommendations found")


def demo_gif_template():
    """Demo: GIF template lookup"""
    print("\n\n🎬 Demo: GIF Templates\n")
    print("=" * 60)

    registry = load_registry()

    platforms = ["twitter", "instagram", "linkedin"]

    for platform in platforms:
        print(f"\nPlatform: {platform}")
        print("-" * 60)

        template = registry.get_gif_template(platform)

        if template:
            specs = template.specifications
            print(f"{template.name}")
            print(f"Dimensions: {specs.get('dimensions')}")
            print(f"Max Size: {specs.get('maxSize')}")
            print(f"FPS: {specs.get('fps')}")
        else:
            print("Template not found")


if __name__ == "__main__":
    # Run demos
    demo_search()
    demo_recommend()
    demo_gif_template()

    print("\n\n" + "=" * 60)
    print("✅ All demos completed!")
    print("=" * 60)
