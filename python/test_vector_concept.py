"""
Vector Store Concept Demo (No Dependencies Required)
Shows how semantic search works without requiring chromadb/embeddings
"""

import json
import math
from typing import List, Dict, Any
from component_registry import load_registry


def simple_cosine_similarity(text1: str, text2: str) -> float:
    """
    Simple word-based cosine similarity (educational demo)
    Real implementation uses neural network embeddings
    """
    # Tokenize
    words1 = set(text1.lower().split())
    words2 = set(text2.lower().split())

    # Calculate intersection
    intersection = words1.intersection(words2)

    if not words1 or not words2:
        return 0.0

    # Simple cosine similarity based on word overlap
    return len(intersection) / math.sqrt(len(words1) * len(words2))


def demo_semantic_concept():
    """Demonstrate semantic search concept"""
    print("\n" + "=" * 70)
    print("Vector Store Concept Demo")
    print("=" * 70)

    print("\n📚 Loading component registry...")
    registry = load_registry()

    # Create simple "embeddings" (in reality, these are 384-1536 dimensional vectors)
    print("\n🔧 Creating document representations...")

    components = []
    for comp_id, comp in registry.components.items():
        # Combine relevant text
        text = f"{comp.name} {comp.description} {' '.join(comp.semantic_tags)}"
        components.append({
            'id': comp_id,
            'name': comp.name,
            'text': text,
            'component': comp
        })

    print(f"✅ Created {len(components)} component documents")

    # Demo queries
    queries = [
        ("futuristic neon glow effect", "Finds components with neon/futuristic themes"),
        ("calming background for meditation", "Finds peaceful, subtle animations"),
        ("digital matrix rain code", "Finds Matrix-style falling code effects"),
        ("particle explosion fireworks", "Finds particle-based effects")
    ]

    for query, description in queries:
        print("\n" + "-" * 70)
        print(f"\n🔍 Query: \"{query}\"")
        print(f"   Goal: {description}")

        # Calculate similarity for each component
        results = []
        for comp in components:
            similarity = simple_cosine_similarity(query, comp['text'])
            if similarity > 0:
                results.append({
                    'component': comp,
                    'similarity': similarity
                })

        # Sort by similarity
        results.sort(key=lambda x: x['similarity'], reverse=True)

        # Show top 3 results
        print(f"\n   Results (top 3):")
        for i, result in enumerate(results[:3], 1):
            comp = result['component']
            sim = result['similarity']
            print(f"   {i}. {comp['name']} ({sim:.1%} similarity)")

    # Comparison section
    print("\n" + "=" * 70)
    print("Real vs Demo Comparison")
    print("=" * 70)

    print("\n📊 This Demo (Word Overlap):")
    print("   - Uses simple word matching")
    print("   - Similarity based on shared words")
    print("   - Fast but not semantically aware")
    print("   - Example: 'car' and 'automobile' have 0% similarity")

    print("\n🎯 Real Vector Store (Neural Embeddings):")
    print("   - Uses trained neural networks")
    print("   - Captures semantic meaning in 384-1536 dimensions")
    print("   - Understands synonyms and related concepts")
    print("   - Example: 'car' and 'automobile' have 95%+ similarity")

    # Show the difference
    print("\n" + "=" * 70)
    print("Semantic Understanding Example")
    print("=" * 70)

    examples = [
        ("glitch", "distortion", "Both mean visual errors"),
        ("calm", "peaceful", "Both mean tranquil"),
        ("neon", "glow", "Both mean bright light"),
        ("particle", "explosion", "Related concepts")
    ]

    print("\n📝 Word pairs that mean similar things:")
    for word1, word2, meaning in examples:
        word_sim = simple_cosine_similarity(word1, word2)
        print(f"\n   '{word1}' ↔ '{word2}' ({meaning})")
        print(f"   - Word overlap: {word_sim:.0%}")
        print(f"   - Real embedding similarity: ~85-95% ✅")

    print("\n" + "=" * 70)
    print("Why Use Real Embeddings?")
    print("=" * 70)

    print("\n✅ Benefits of Neural Network Embeddings:")
    print("   1. Semantic Understanding")
    print("      - 'glitch' and 'distortion' are understood as similar")
    print("      - 'calm' and 'peaceful' are recognized as synonyms")
    print("")
    print("   2. Context Awareness")
    print("      - 'light particle effect' vs 'light switch'")
    print("      - Understands 'particle' is about effects, not physics")
    print("")
    print("   3. Multi-lingual Support")
    print("      - Can match concepts across languages")
    print("")
    print("   4. Robustness")
    print("      - Handles typos, variations, different phrasings")
    print("      - 'northern lights' matches 'aurora borealis'")

    print("\n❌ Limitations of Word Overlap:")
    print("   1. No semantic understanding")
    print("   2. Exact word matching only")
    print("   3. Misses synonyms completely")
    print("   4. No context awareness")

    # Installation instructions
    print("\n" + "=" * 70)
    print("Try the Real Vector Store")
    print("=" * 70)

    print("\n📦 Installation:")
    print("   pip install chromadb langchain-community sentence-transformers torch")

    print("\n🚀 Usage:")
    print("   from vector_store import create_vector_store")
    print("   ")
    print("   store = create_vector_store()")
    print("   results = store.similarity_search('futuristic neon glow', k=3)")
    print("   ")
    print("   for result in results:")
    print("       similarity = max(0, 1 - (result['score'] / 2))")
    print("       print(f\"{result['component_name']} ({similarity:.0%})\")")

    print("\n📖 Documentation:")
    print("   See VECTOR_STORE_README.md for complete guide")

    print("\n" + "=" * 70)
    print("✅ Concept demo completed!")
    print("=" * 70)


if __name__ == "__main__":
    demo_semantic_concept()
