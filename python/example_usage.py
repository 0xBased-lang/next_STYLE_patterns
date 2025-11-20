"""
Example Usage: Next Style Patterns Python Integration

Demonstrates how to use the component registry with:
- Direct API
- LangChain Tools
- LangChain RAG (Retrieval Augmented Generation)
- Vector Store Integration
"""

from component_registry import ComponentRegistry, load_registry
import json


def example_1_basic_search():
    """Example 1: Basic component search"""
    print("\n" + "=" * 70)
    print("EXAMPLE 1: Basic Component Search")
    print("=" * 70)

    # Load registry
    registry = load_registry()

    # Search for cyberpunk-themed components
    print("\n🔍 Searching for 'cyberpunk glitch'...")
    results = registry.search("cyberpunk glitch", category="animation")

    for result in results:
        comp = result['component']
        print(f"\n✅ {comp.name} (score: {result['score']})")
        print(f"   Description: {comp.description}")
        print(f"   Tags: {', '.join(comp.semantic_tags[:5])}...")
        print(f"   Frameworks: {', '.join(comp.frameworks)}")
        print(f"   FPS: {comp.performance.get('fps', {}).get('avg', 'N/A')}")


def example_2_recommendations():
    """Example 2: Get component recommendations"""
    print("\n" + "=" * 70)
    print("EXAMPLE 2: Component Recommendations")
    print("=" * 70)

    registry = load_registry()

    # Get recommendations for specific use case
    print("\n💡 Finding components for 'hero section background'...")
    recommendations = registry.recommend("hero section", min_confidence=0.9)

    for rec in recommendations:
        print(f"\n✅ {rec['name']} ({rec['confidence']:.0%} confidence)")
        print(f"   Use Case: {rec['use_case']}")
        print(f"   Description: {rec['description']}")
        print(f"   Presets: {', '.join(rec['presets'])}")
        print(f"   Example Prompt: {rec['ai_prompt_examples'][0]}")


def example_3_component_details():
    """Example 3: Get detailed component information"""
    print("\n" + "=" * 70)
    print("EXAMPLE 3: Detailed Component Information")
    print("=" * 70)

    registry = load_registry()

    # Get specific component
    comp = registry.get_component("aurora-flow")

    if comp:
        print(f"\n📦 {comp.name}")
        print(f"   ID: {comp.id}")
        print(f"   Category: {comp.category}")
        print(f"   Type: {comp.type}")
        print(f"\n   Description:")
        print(f"   {comp.description}")

        print(f"\n   Semantic Tags ({len(comp.semantic_tags)}):")
        print(f"   {', '.join(comp.semantic_tags)}")

        print(f"\n   Use Cases:")
        for uc in comp.use_cases:
            print(f"   - {uc['name']} ({uc.get('confidence', 0):.0%} confidence)")

        print(f"\n   Frameworks:")
        print(f"   {', '.join(comp.frameworks)}")

        print(f"\n   Performance:")
        fps = comp.performance.get('fps', {})
        print(f"   - FPS: {fps.get('min')}-{fps.get('max')} (avg: {fps.get('avg')})")
        print(f"   - Bundle Size: {comp.performance.get('bundleSize', 'N/A')}")
        print(f"   - CPU Usage: {comp.performance.get('cpuUsage', 'N/A')}")
        print(f"   - Mobile: {comp.performance.get('mobileCompatible', 'N/A')}")

        print(f"\n   Presets ({len(comp.presets)}):")
        for preset_name, preset_config in comp.presets.items():
            print(f"   - {preset_name}: {preset_config.get('description', 'N/A')}")

        print(f"\n   AI Prompt Examples:")
        for example in comp.ai_prompt_examples:
            print(f"   - \"{example}\"")


def example_4_gif_templates():
    """Example 4: Work with GIF templates"""
    print("\n" + "=" * 70)
    print("EXAMPLE 4: GIF Template Specifications")
    print("=" * 70)

    registry = load_registry()

    platforms = ["twitter", "instagram", "linkedin"]

    for platform in platforms:
        template = registry.get_gif_template(platform)

        if template:
            print(f"\n🎬 {template.name}")
            print(f"   Platform: {template.platform}")
            print(f"   Description: {template.description}")

            specs = template.specifications
            print(f"\n   Specifications:")
            print(f"   - Dimensions: {specs.get('dimensions')}")
            print(f"   - Max Size: {specs.get('maxSize')}")
            print(f"   - FPS: {specs.get('fps')}")
            print(f"   - Duration: {specs.get('duration')}")

            print(f"\n   Use Cases:")
            for uc in template.use_cases[:2]:
                print(f"   - {uc['name']} ({uc.get('confidence', 0):.0%})")


def example_5_langchain_tools():
    """Example 5: Use with LangChain tools"""
    print("\n" + "=" * 70)
    print("EXAMPLE 5: LangChain Tools Integration")
    print("=" * 70)

    try:
        from langchain_tool import create_component_tools

        print("\n🔧 Creating LangChain tools...")
        tools = create_component_tools()

        print(f"✅ Created {len(tools)} tools:")
        for tool in tools:
            print(f"   - {tool.name}: {tool.description.strip().split('.')[0]}")

        # Example: Use search tool
        print("\n🔍 Testing search tool...")
        search_tool = tools[0]
        result = search_tool._run(query="aurora", category="animation")
        print("\n" + result[:500] + "..." if len(result) > 500 else result)

    except ImportError:
        print("\n⚠️  LangChain not installed. Skipping this example.")
        print("   Install with: pip install langchain langchain-core")


def example_6_langchain_retriever():
    """Example 6: Use with LangChain RAG"""
    print("\n" + "=" * 70)
    print("EXAMPLE 6: LangChain Retriever (RAG)")
    print("=" * 70)

    try:
        from langchain_tool import create_component_retriever

        print("\n📚 Creating component retriever...")
        retriever = create_component_retriever(k=3)

        print("✅ Retriever created")

        # Example query
        print("\n🔍 Retrieving documents for 'particle animation'...")
        documents = retriever.get_relevant_documents("particle animation")

        print(f"\n✅ Retrieved {len(documents)} documents:")
        for i, doc in enumerate(documents, 1):
            print(f"\n   {i}. {doc.metadata['name']} (score: {doc.metadata.get('score', 'N/A')})")
            print(f"      Category: {doc.metadata['category']}")
            print(f"      Type: {doc.metadata['type']}")
            print(f"      Matches: {', '.join(doc.metadata.get('matches', [])[:3])}")

    except ImportError:
        print("\n⚠️  LangChain not installed. Skipping this example.")
        print("   Install with: pip install langchain langchain-core")


def example_7_to_documents():
    """Example 7: Convert to LangChain document format"""
    print("\n" + "=" * 70)
    print("EXAMPLE 7: Export to LangChain Documents")
    print("=" * 70)

    registry = load_registry()

    print("\n📄 Converting registry to documents...")
    documents = registry.to_documents()

    print(f"✅ Created {len(documents)} documents:")
    print(f"   - {len([d for d in documents if d['metadata']['source'] == 'component_registry'])} components")
    print(f"   - {len([d for d in documents if d['metadata']['source'] == 'gif_template'])} GIF templates")

    # Show example document
    print(f"\n📝 Example document (Aurora Flow):")
    aurora_doc = [d for d in documents if d['metadata']['id'] == 'aurora-flow'][0]
    print(f"   Length: {len(aurora_doc['page_content'])} characters")
    print(f"   Metadata: {json.dumps(aurora_doc['metadata'], indent=2)}")
    print(f"\n   Content preview:")
    print(f"   {aurora_doc['page_content'][:300]}...")


def example_8_statistics():
    """Example 8: Get registry statistics"""
    print("\n" + "=" * 70)
    print("EXAMPLE 8: Registry Statistics")
    print("=" * 70)

    registry = load_registry()
    stats = registry.get_statistics()

    print("\n📊 Registry Statistics:")
    print(f"   Total Components: {stats.get('totalComponents', 0)}")
    print(f"   Total GIF Templates: {stats.get('totalGifTemplates', 0)}")
    print(f"   Total Presets: {stats.get('totalPresets', 0)}")
    print(f"   Average Params: {stats.get('averageParams', 0)}")
    print(f"   Target FPS: {stats.get('targetFPS', 0)}")
    print(f"   Token Savings: {stats.get('tokenSavings', 'N/A')}")


def example_9_list_all():
    """Example 9: List all components"""
    print("\n" + "=" * 70)
    print("EXAMPLE 9: List All Components")
    print("=" * 70)

    registry = load_registry()

    # List animation components
    print("\n🎨 Animation Components:")
    animations = registry.list_components(category="animation")

    for i, comp in enumerate(animations, 1):
        print(f"\n   {i}. {comp.name}")
        print(f"      {comp.description}")
        print(f"      Frameworks: {', '.join(comp.frameworks)}")
        print(f"      Presets: {', '.join(comp.presets.keys())}")


def run_all_examples():
    """Run all examples"""
    print("\n" + "=" * 70)
    print("🚀 Next Style Patterns - Python Integration Examples")
    print("=" * 70)

    examples = [
        example_1_basic_search,
        example_2_recommendations,
        example_3_component_details,
        example_4_gif_templates,
        example_5_langchain_tools,
        example_6_langchain_retriever,
        example_7_to_documents,
        example_8_statistics,
        example_9_list_all
    ]

    for example_func in examples:
        try:
            example_func()
        except Exception as e:
            print(f"\n❌ Error in {example_func.__name__}: {e}")
            import traceback
            traceback.print_exc()

    print("\n" + "=" * 70)
    print("✅ All examples completed!")
    print("=" * 70)
    print("\n💡 Next steps:")
    print("   - Integrate with your LangChain agent")
    print("   - Build a vector store for semantic search")
    print("   - Create custom tools for your use case")
    print("   - Connect to Claude or other LLMs")
    print("\n")


if __name__ == "__main__":
    run_all_examples()
