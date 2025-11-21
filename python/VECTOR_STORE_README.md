# Vector Store - Semantic Component Search

Advanced semantic search for Next Style Patterns using embeddings and vector databases.

## Overview

The vector store enables **semantic similarity search** - finding components based on **meaning** rather than just keyword matching. This is powered by:

- **Embeddings**: Convert text to high-dimensional vectors that capture semantic meaning
- **Vector Database**: Efficiently store and search vectors (using Chroma)
- **Hybrid Search**: Combine semantic similarity with keyword matching

## Features

- 🔍 **Semantic Similarity Search**: Find components by meaning, not just keywords
- 🔀 **Hybrid Search**: Combine vector and keyword search (best of both worlds)
- 🔗 **Similar Component Discovery**: Find components similar to a reference
- 🎯 **Semantic Filtering**: Filter by minimum similarity threshold
- 📊 **Performance Optimized**: Fast in-memory and persistent storage
- 🌐 **Multiple Embedding Providers**: OpenAI, HuggingFace (local), or custom

## Installation

### Basic Installation

```bash
pip install chromadb langchain-community sentence-transformers torch
```

### Full Installation (with all features)

```bash
pip install -r requirements.txt
```

## Quick Start

### 1. Create Vector Store

```python
from vector_store import create_vector_store

# Create with HuggingFace embeddings (free, local)
store = create_vector_store(embedding_provider="huggingface")

# Or use OpenAI embeddings (requires API key, more accurate)
store = create_vector_store(embedding_provider="openai")
```

**First run output:**
```
🔧 Creating new vector store...
📄 Creating embeddings for 9 documents...
✅ Vector store created with 9 documents
💾 Persisted to /path/to/vector_store
```

### 2. Semantic Search

```python
# Search by meaning, not just keywords
results = store.similarity_search("futuristic neon glow effect", k=3)

for result in results:
    similarity = max(0, 1 - (result['score'] / 2))
    print(f"{result['component_name']} ({similarity:.1%} match)")
```

**Output:**
```
Neon Trails: Tron (87% match)
Holographic Glitch: Cyberpunk (82% match)
Particle Explosion: Cosmic (75% match)
```

### 3. Hybrid Search

Combines semantic similarity + keyword matching:

```python
results = store.hybrid_search(
    "cyberpunk digital glitch",
    k=3,
    vector_weight=0.7,   # 70% semantic
    keyword_weight=0.3   # 30% exact match
)

for result in results:
    print(f"{result['component_name']}")
    print(f"  Total: {result['total_score']:.3f}")
    print(f"  - Vector: {result['vector_score']:.3f}")
    print(f"  - Keyword: {result['keyword_score']:.3f}")
```

### 4. Find Similar Components

```python
# Find components similar to Aurora Flow
similar = store.find_similar_components("aurora-flow", k=3)

for result in similar:
    similarity = max(0, 1 - (result['score'] / 2))
    print(f"{result['component_name']} ({similarity:.1%} similar)")
```

**Output:**
```
Morphing Blob: Organic (78% similar)
Particle Explosion: Cosmic (72% similar)
Neon Trails: Tron (65% similar)
```

## How It Works

### Semantic vs Keyword Search

**Keyword Search** (traditional):
```python
# Only matches if query contains exact words
query = "glitch"
# ✅ Finds: "Holographic Glitch" (contains "glitch")
# ❌ Misses: "Matrix: Conspiracy" (similar concept, different words)
```

**Semantic Search** (vector-based):
```python
# Matches based on meaning
query = "digital distortion effect"
# ✅ Finds: "Holographic Glitch" (semantic match)
# ✅ Finds: "Matrix: Conspiracy" (conceptually similar)
# ✅ Finds: "Neon Trails" (related aesthetic)
```

### Architecture

```
User Query: "futuristic neon glow"
       ↓
[Embedding Model] → Vector: [0.23, -0.45, 0.67, ...]
       ↓
[Vector Database (Chroma)]
       ↓
[Similarity Search] → Find closest vectors
       ↓
Results: [Neon Trails (0.87), Holographic Glitch (0.82), ...]
```

### Embedding Models

**HuggingFace (Default):**
- Model: `all-MiniLM-L6-v2`
- Pros: Free, runs locally, no API key needed
- Cons: Slightly less accurate than OpenAI
- Vector dim: 384
- Speed: ~50ms per query

**OpenAI:**
- Model: `text-embedding-3-small`
- Pros: More accurate, optimized for semantic search
- Cons: Requires API key, costs money (~$0.00002 per query)
- Vector dim: 1536
- Speed: ~100-200ms per query (network latency)

## API Reference

### ComponentVectorStore

Main class for vector-based component search.

#### Methods

**`similarity_search(query, k=3, filter_metadata=None)`**

Semantic similarity search using embeddings.

```python
results = store.similarity_search(
    "calming background animation",
    k=3,
    filter_metadata={"category": "animation"}
)
```

**Returns:**
```python
[
    {
        'document': Document(...),
        'score': 0.234,  # Lower = more similar (distance)
        'metadata': {'id': 'aurora-flow', 'name': 'Aurora Flow', ...},
        'component_id': 'aurora-flow',
        'component_name': 'Aurora Flow: Ethereal',
        'category': 'animation'
    },
    ...
]
```

**`hybrid_search(query, k=5, vector_weight=0.7, keyword_weight=0.3)`**

Hybrid search combining vector similarity and keyword matching.

```python
results = store.hybrid_search(
    "particle explosion",
    k=3,
    vector_weight=0.8,  # Prioritize semantic similarity
    keyword_weight=0.2
)
```

**Returns:**
```python
[
    {
        'component_id': 'particle-explosion',
        'component_name': 'Particle Explosion: Cosmic',
        'total_score': 0.856,
        'vector_score': 0.712,
        'keyword_score': 0.144
    },
    ...
]
```

**`find_similar_components(component_id, k=3)`**

Find components similar to a reference component.

```python
similar = store.find_similar_components("holographic-glitch", k=3)
```

**`semantic_filter(description, threshold=0.7, category=None)`**

Filter components by semantic similarity threshold.

```python
results = store.semantic_filter(
    "smooth flowing animations",
    threshold=0.7,  # 70% minimum similarity
    category="animation"
)
```

**Returns only components with similarity ≥ 0.7**

**`get_statistics()`**

Get vector store statistics.

```python
stats = store.get_statistics()
# {
#     'total_documents': 9,
#     'collection_name': 'next_style_patterns',
#     'embedding_provider': 'huggingface',
#     'persist_directory': '/path/to/vector_store'
# }
```

## Examples

### Example 1: Natural Language Query

```python
from vector_store import create_vector_store

store = create_vector_store()

# User asks in natural language
query = "I need something that looks like the Matrix movie"

results = store.similarity_search(query, k=2)

for result in results:
    similarity = max(0, 1 - (result['score'] / 2))
    print(f"✅ {result['component_name']} ({similarity:.0%})")
```

**Output:**
```
✅ Matrix: Conspiracy (94%)
✅ Holographic Glitch: Cyberpunk (76%)
```

### Example 2: Recommendation System

```python
def recommend_for_use_case(description: str, min_similarity: float = 0.7):
    """Recommend components based on use case description"""
    store = create_vector_store()

    results = store.semantic_filter(
        description,
        threshold=min_similarity,
        category="animation"
    )

    return [
        {
            'name': r['component_name'],
            'similarity': r['similarity'],
            'id': r['component_id']
        }
        for r in results
    ]

# Example usage
recommendations = recommend_for_use_case(
    "I'm building a meditation app and need a calming background"
)

for rec in recommendations:
    print(f"{rec['name']}: {rec['similarity']:.0%} match")
```

**Output:**
```
Aurora Flow: Ethereal: 89% match
Morphing Blob: Organic: 73% match
```

### Example 3: RAG (Retrieval Augmented Generation)

```python
from langchain.chains import RetrievalQA
from langchain_anthropic import ChatAnthropic

store = create_vector_store()

# Create retriever
retriever = store.vectorstore.as_retriever(search_kwargs={"k": 3})

# Create QA chain
llm = ChatAnthropic(model="claude-3-5-sonnet-20241022")
qa = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    return_source_documents=True
)

# Ask question
result = qa.invoke({
    "query": "What's the best animation for a tech startup landing page?"
})

print(result['result'])
print(f"\nSources: {[doc.metadata['name'] for doc in result['source_documents']]}")
```

### Example 4: Similar Component Discovery

```python
# User is viewing "Holographic Glitch"
# Show them similar components

store = create_vector_store()
current_component = "holographic-glitch"

similar = store.find_similar_components(current_component, k=3)

print("You might also like:")
for result in similar:
    similarity = max(0, 1 - (result['score'] / 2))
    print(f"  • {result['component_name']} ({similarity:.0%} similar)")
```

## Performance

### Speed Benchmarks

**Vector Search:**
- First query (cold): ~200-500ms (loading embeddings)
- Subsequent queries: ~20-50ms
- Bulk search (10 queries): ~100-200ms total

**Keyword Search:**
- All queries: <1ms

**Hybrid Search:**
- Combined: ~25-55ms

### Accuracy Comparison

Query: "futuristic neon glow effect"

**Vector Search (Semantic):**
```
1. Neon Trails: Tron (87% - ✅ Perfect match)
2. Holographic Glitch (82% - ✅ Related aesthetic)
3. Particle Explosion (75% - ✅ Conceptually similar)
```

**Keyword Search (Exact):**
```
1. Neon Trails: Tron (score: 4 - ✅ Contains "neon")
2. No other matches (❌ Missed "Holographic" - doesn't contain keywords)
```

**Hybrid Search (Best of both):**
```
1. Neon Trails: Tron (0.92 - ✅ High on both)
2. Holographic Glitch (0.78 - ✅ Semantic match)
3. Particle Explosion (0.71 - ✅ Glow/effect keywords)
```

## Storage & Persistence

### Default Storage

Vector store is automatically persisted to disk:

```
python/vector_store/
├── chroma.sqlite3         # Vector database
└── [uuid]/                # Collection data
    ├── data_level0.bin    # Vector embeddings
    ├── header.bin         # Metadata
    └── length.bin         # Document lengths
```

### Custom Storage Location

```python
store = create_vector_store(
    persist_directory="/custom/path/vector_store"
)
```

### Re-using Existing Store

On subsequent runs, the vector store is loaded from disk:

```python
store = create_vector_store()
# 📚 Loading existing vector store from python/vector_store
# ✅ Loaded 9 documents
```

### Rebuilding Store

To rebuild from scratch (e.g., after updating components):

```bash
rm -rf python/vector_store
python -c "from vector_store import create_vector_store; create_vector_store()"
```

## Use Cases

### 1. Component Discovery

**User Query:** "I need something with organic flowing movement"

**Traditional Keyword Search:**
- Matches: None (doesn't contain "organic" or "flowing")

**Semantic Vector Search:**
- ✅ Morphing Blob: Organic (95% match)
- ✅ Aurora Flow: Ethereal (83% match)
- ✅ Neon Trails: Tron (72% match)

### 2. Visual Style Matching

**User:** "Show me components with a cyberpunk aesthetic"

```python
results = store.similarity_search("cyberpunk aesthetic", k=5)
# Returns: Holographic Glitch, Matrix, Neon Trails
```

### 3. Mood-Based Search

**User:** "I want a calming, peaceful background"

```python
results = store.similarity_search("calming peaceful background", k=3)
# Returns: Aurora Flow, Morphing Blob
```

### 4. Technical Requirement Matching

**User:** "I need high-performance particle effects"

```python
results = store.hybrid_search(
    "high performance particle effects",
    vector_weight=0.6,
    keyword_weight=0.4  # Boost exact "particle" matches
)
# Returns: Particle Explosion, Neon Trails
```

## Troubleshooting

### ImportError: chromadb not installed

```bash
pip install chromadb langchain-community
```

### ImportError: sentence-transformers not installed

```bash
pip install sentence-transformers torch
```

### Slow first query

The first query loads the embedding model into memory (~90MB for HuggingFace). Subsequent queries are fast.

### OpenAI embeddings failing

Make sure `OPENAI_API_KEY` is set:

```bash
export OPENAI_API_KEY="sk-..."
```

Or use HuggingFace (local, free):

```python
store = create_vector_store(embedding_provider="huggingface")
```

### Vector store corruption

Rebuild from scratch:

```bash
rm -rf python/vector_store
python -c "from vector_store import create_vector_store; create_vector_store()"
```

## Advanced Usage

### Custom Embedding Model

```python
from langchain_community.embeddings import HuggingFaceEmbeddings

# Use a different HuggingFace model
custom_embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-mpnet-base-v2",
    model_kwargs={'device': 'cpu'}
)

store = ComponentVectorStore(
    embedding_provider="huggingface",  # Overridden by custom embeddings
)
store.embeddings = custom_embeddings
```

### Filtering by Multiple Metadata

```python
# Search only animation components with specific type
results = store.similarity_search(
    "particle effects",
    filter_metadata={
        "category": "animation",
        "type": "canvas-effect"
    }
)
```

### Adjusting Hybrid Search Weights

```python
# Heavily favor semantic similarity
results = store.hybrid_search(
    query,
    vector_weight=0.9,
    keyword_weight=0.1
)

# Heavily favor keyword matching
results = store.hybrid_search(
    query,
    vector_weight=0.3,
    keyword_weight=0.7
)

# Equal balance
results = store.hybrid_search(
    query,
    vector_weight=0.5,
    keyword_weight=0.5
)
```

## Comparison with Other Search Methods

| Feature | Keyword Search | Vector Search | Hybrid Search |
|---------|---------------|---------------|---------------|
| **Speed** | ⚡ <1ms | 🟢 20-50ms | 🟢 25-55ms |
| **Exact Match** | ✅ Perfect | ❌ May miss | ✅ Good |
| **Semantic Match** | ❌ Poor | ✅ Excellent | ✅ Excellent |
| **Natural Language** | ❌ Limited | ✅ Great | ✅ Great |
| **Setup** | ✅ None | 🟡 Requires embeddings | 🟡 Requires embeddings |
| **Disk Space** | ✅ None | 🟡 ~5MB | 🟡 ~5MB |
| **Dependencies** | ✅ None | 🟡 Several | 🟡 Several |

**Recommendation:**
- Use **Keyword** for: Exact term matching, autocomplete
- Use **Vector** for: Natural language queries, semantic discovery
- Use **Hybrid** for: Best overall results, production systems

## Next Steps

- ✅ Basic semantic search
- ✅ Hybrid search implementation
- ✅ Similar component discovery
- ⏳ Multi-modal search (text + image)
- ⏳ Personalized recommendations (user preferences)
- ⏳ A/B testing framework
- ⏳ Analytics integration

## Resources

- **Vector Store Code**: `vector_store.py`
- **Examples**: `example_vector_store.py`
- **Component Registry**: `component_registry.py`
- **Chroma Documentation**: https://docs.trychroma.com
- **Sentence Transformers**: https://www.sbert.net

---

**Semantic Search**: Finding by meaning, not just keywords | **Embeddings**: all-MiniLM-L6-v2 | **Vector DB**: Chroma
