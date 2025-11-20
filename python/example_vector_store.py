"""
Vector Store Examples - Advanced Semantic Search

Demonstrates:
1. Basic semantic similarity search
2. Hybrid search (vector + keyword)
3. Finding similar components
4. Semantic filtering
5. RAG with vector retriever
6. Multi-query search
"""

from vector_store import ComponentVectorStore, create_vector_store
from component_registry import load_registry


def example_1_basic_similarity():
    """Example 1: Basic semantic similarity search"""
    print("\n" + "=" * 70)
    print("EXAMPLE 1: Semantic Similarity Search")
    print("=" * 70)

    # Create vector store
    print("\n🔧 Initializing vector store...")
    store = create_vector_store(embedding_provider="huggingface")

    # Semantic search - finds conceptually similar components
    print("\n🔍 Searching for 'futuristic neon glow effect'...")
    results = store.similarity_search("futuristic neon glow effect", k=3)

    for i, result in enumerate(results, 1):
        # Convert distance to similarity percentage
        similarity = max(0, 1 - (result['score'] / 2))
        print(f"\n{i}. {result['component_name']} ({similarity:.1%} match)")
        print(f"   Category: {result['category']}")
        print(f"   Distance: {result['score']:.4f}")
        print(f"   Preview: {result['content'][:150]}...")


def example_2_hybrid_search():
    """Example 2: Hybrid search combining vector and keyword"""
    print("\n" + "=" * 70)
    print("EXAMPLE 2: Hybrid Search (Vector + Keyword)")
    print("=" * 70)

    store = create_vector_store()

    # Hybrid search gives best of both worlds
    print("\n🔀 Hybrid search for 'cyberpunk digital glitch'...")
    results = store.hybrid_search(
        "cyberpunk digital glitch",
        k=4,
        vector_weight=0.7,  # 70% semantic similarity
        keyword_weight=0.3   # 30% keyword matching
    )

    for i, result in enumerate(results, 1):
        print(f"\n{i}. {result['component_name']}")
        print(f"   Total Score: {result['total_score']:.3f}")
        print(f"   - Vector (semantic): {result['vector_score']:.3f}")
        print(f"   - Keyword (exact): {result['keyword_score']:.3f}")
        print(f"   Category: {result['category']}")


def example_3_find_similar():
    """Example 3: Find components similar to a specific component"""
    print("\n" + "=" * 70)
    print("EXAMPLE 3: Find Similar Components")
    print("=" * 70)

    store = create_vector_store()
    registry = load_registry()

    # Get reference component
    comp = registry.get_component("aurora-flow")
    print(f"\n📦 Reference Component: {comp.name}")
    print(f"   Description: {comp.description}")

    # Find similar components
    print(f"\n🔗 Finding similar components...")
    similar = store.find_similar_components("aurora-flow", k=3)

    for i, result in enumerate(similar, 1):
        similarity = max(0, 1 - (result['score'] / 2))
        print(f"\n{i}. {result['component_name']} ({similarity:.1%} similar)")
        print(f"   Category: {result['category']}")
        print(f"   Why similar: Both have flowing, atmospheric effects")


def example_4_semantic_filtering():
    """Example 4: Filter components by semantic similarity threshold"""
    print("\n" + "=" * 70)
    print("EXAMPLE 4: Semantic Filtering")
    print("=" * 70)

    store = create_vector_store()

    # Filter by minimum similarity threshold
    description = "smooth flowing organic animations"
    threshold = 0.6  # 60% minimum similarity

    print(f"\n🎯 Filtering for: \"{description}\"")
    print(f"   Minimum similarity: {threshold:.0%}")

    results = store.semantic_filter(
        description,
        threshold=threshold,
        category="animation"
    )

    print(f"\n✅ Found {len(results)} components above threshold:")
    for i, result in enumerate(results, 1):
        print(f"\n{i}. {result['component_name']} ({result['similarity']:.1%})")
        print(f"   Category: {result['category']}")


def example_5_category_filtering():
    """Example 5: Search within specific category"""
    print("\n" + "=" * 70)
    print("EXAMPLE 5: Category-Specific Search")
    print("=" * 70)

    store = create_vector_store()

    # Search only within animation category
    print("\n🎨 Searching animations for 'particle effects'...")
    results = store.similarity_search(
        "particle effects",
        k=3,
        filter_metadata={"category": "animation"}
    )

    for i, result in enumerate(results, 1):
        similarity = max(0, 1 - (result['score'] / 2))
        print(f"\n{i}. {result['component_name']} ({similarity:.1%})")
        print(f"   Type: {result['metadata'].get('type', 'N/A')}")


def example_6_multi_query():
    """Example 6: Multiple query comparison"""
    print("\n" + "=" * 70)
    print("EXAMPLE 6: Multi-Query Comparison")
    print("=" * 70)

    store = create_vector_store()

    queries = [
        "calming meditation background",
        "high energy gaming effects",
        "professional business animation"
    ]

    print("\n📊 Comparing different search queries:\n")

    for query in queries:
        print(f"\n🔍 Query: \"{query}\"")
        print("-" * 70)

        results = store.similarity_search(query, k=2)

        for i, result in enumerate(results, 1):
            similarity = max(0, 1 - (result['score'] / 2))
            print(f"   {i}. {result['component_name']} ({similarity:.1%})")


def example_7_rag_with_vector_store():
    """Example 7: RAG (Retrieval Augmented Generation) with vector store"""
    print("\n" + "=" * 70)
    print("EXAMPLE 7: RAG with Vector Store")
    print("=" * 70)

    try:
        from langchain.chains import RetrievalQA
        from langchain_anthropic import ChatAnthropic
        from langchain_community.vectorstores import Chroma

        store = create_vector_store()

        # Create retriever from vector store
        retriever = store.vectorstore.as_retriever(
            search_kwargs={"k": 3}
        )

        print("\n🤖 Setting up RAG chain...")
        print("   Note: Requires ANTHROPIC_API_KEY environment variable")

        # Create QA chain
        llm = ChatAnthropic(
            model="claude-3-5-sonnet-20241022",
            temperature=0
        )

        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            retriever=retriever,
            chain_type="stuff",
            return_source_documents=True
        )

        # Ask question
        question = "What's the best component for a meditation app background?"
        print(f"\n❓ Question: {question}")

        result = qa_chain.invoke({"query": question})

        print(f"\n💡 Answer:")
        print(f"   {result['result']}")

        print(f"\n📚 Sources used:")
        for i, doc in enumerate(result['source_documents'], 1):
            print(f"   {i}. {doc.metadata['name']}")

    except ImportError:
        print("\n⚠️  LangChain or Anthropic not installed. Skipping RAG example.")
        print("   Install with: pip install langchain langchain-anthropic")
    except Exception as e:
        print(f"\n⚠️  Could not run RAG example: {e}")
        print("   Make sure ANTHROPIC_API_KEY is set")


def example_8_performance_comparison():
    """Example 8: Compare vector vs keyword search performance"""
    print("\n" + "=" * 70)
    print("EXAMPLE 8: Vector vs Keyword Performance")
    print("=" * 70)

    import time

    store = create_vector_store()
    registry = load_registry()

    query = "glowing particle effects"

    # Vector search
    print(f"\n📝 Query: \"{query}\"")
    print("-" * 70)

    start = time.time()
    vector_results = store.similarity_search(query, k=3)
    vector_time = time.time() - start

    print(f"\n🔮 Vector Search (semantic):")
    print(f"   Time: {vector_time*1000:.2f}ms")
    for i, result in enumerate(vector_results, 1):
        similarity = max(0, 1 - (result['score'] / 2))
        print(f"   {i}. {result['component_name']} ({similarity:.1%})")

    # Keyword search
    start = time.time()
    keyword_results = registry.search(query)
    keyword_time = time.time() - start

    print(f"\n🔤 Keyword Search (exact matching):")
    print(f"   Time: {keyword_time*1000:.2f}ms")
    for i, result in enumerate(keyword_results[:3], 1):
        print(f"   {i}. {result['name']} (score: {result['score']})")

    print(f"\n⚡ Speed Comparison:")
    print(f"   Vector: {vector_time*1000:.2f}ms")
    print(f"   Keyword: {keyword_time*1000:.2f}ms")
    print(f"   Difference: {abs(vector_time-keyword_time)*1000:.2f}ms")


def example_9_statistics():
    """Example 9: Vector store statistics"""
    print("\n" + "=" * 70)
    print("EXAMPLE 9: Vector Store Statistics")
    print("=" * 70)

    store = create_vector_store()
    stats = store.get_statistics()

    print("\n📊 Vector Store Statistics:")
    print(f"   Total Documents: {stats['total_documents']}")
    print(f"   Collection Name: {stats['collection_name']}")
    print(f"   Embedding Provider: {stats['embedding_provider']}")
    print(f"   Persist Directory: {stats['persist_directory']}")

    # Component breakdown
    registry = load_registry()
    print(f"\n📦 Content Breakdown:")
    print(f"   Animation Components: {len(registry.list_components(category='animation'))}")
    print(f"   GIF Templates: {len(list(registry.gif_templates.values()))}")


def run_all_examples():
    """Run all vector store examples"""
    print("\n" + "=" * 70)
    print("🚀 Vector Store Examples - Advanced Semantic Search")
    print("=" * 70)

    examples = [
        example_1_basic_similarity,
        example_2_hybrid_search,
        example_3_find_similar,
        example_4_semantic_filtering,
        example_5_category_filtering,
        example_6_multi_query,
        example_7_rag_with_vector_store,
        example_8_performance_comparison,
        example_9_statistics
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
    print("\n💡 Key Takeaways:")
    print("   - Vector search finds semantically similar components")
    print("   - Hybrid search combines semantic + exact matching")
    print("   - RAG enables natural language component discovery")
    print("   - Filtering by category/threshold refines results")
    print("\n")


if __name__ == "__main__":
    run_all_examples()
