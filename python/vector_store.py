"""
Vector Store Integration for Next Style Patterns
Provides semantic similarity search using embeddings and vector databases
"""

import json
from pathlib import Path
from typing import List, Dict, Any, Optional, Tuple
from component_registry import ComponentRegistry, load_registry


# Vector store imports (optional - gracefully degrade if not installed)
try:
    from langchain_community.vectorstores import Chroma
    from langchain_core.documents import Document
    CHROMA_AVAILABLE = True
except ImportError:
    CHROMA_AVAILABLE = False

try:
    from langchain_openai import OpenAIEmbeddings
    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False

try:
    from langchain_community.embeddings import HuggingFaceEmbeddings
    HUGGINGFACE_AVAILABLE = True
except ImportError:
    HUGGINGFACE_AVAILABLE = False


class ComponentVectorStore:
    """
    Vector store for semantic component search using embeddings

    Supports multiple embedding providers:
    - OpenAI (ada-002)
    - HuggingFace (sentence-transformers)
    - Custom embeddings
    """

    def __init__(
        self,
        registry: Optional[ComponentRegistry] = None,
        embedding_provider: str = "huggingface",
        persist_directory: Optional[str] = None,
        collection_name: str = "next_style_patterns"
    ):
        """
        Initialize vector store

        Args:
            registry: ComponentRegistry instance (or None to auto-load)
            embedding_provider: "openai" or "huggingface" (default)
            persist_directory: Directory to persist vector store
            collection_name: Name for the vector store collection
        """
        if not CHROMA_AVAILABLE:
            raise ImportError(
                "Chroma is not installed. "
                "Install with: pip install chromadb langchain-community"
            )

        self.registry = registry or load_registry()
        self.embedding_provider = embedding_provider
        self.persist_directory = persist_directory or str(
            Path(__file__).parent / "vector_store"
        )
        self.collection_name = collection_name

        # Initialize embeddings
        self.embeddings = self._create_embeddings()

        # Initialize or load vector store
        self.vectorstore = None
        self._initialize_vectorstore()

    def _create_embeddings(self):
        """Create embeddings based on provider"""
        if self.embedding_provider == "openai":
            if not OPENAI_AVAILABLE:
                raise ImportError(
                    "OpenAI embeddings not available. "
                    "Install with: pip install langchain-openai"
                )
            return OpenAIEmbeddings(model="text-embedding-3-small")

        elif self.embedding_provider == "huggingface":
            if not HUGGINGFACE_AVAILABLE:
                raise ImportError(
                    "HuggingFace embeddings not available. "
                    "Install with: pip install sentence-transformers"
                )
            return HuggingFaceEmbeddings(
                model_name="all-MiniLM-L6-v2",
                model_kwargs={'device': 'cpu'},
                encode_kwargs={'normalize_embeddings': True}
            )

        else:
            raise ValueError(
                f"Unknown embedding provider: {self.embedding_provider}. "
                "Use 'openai' or 'huggingface'"
            )

    def _initialize_vectorstore(self):
        """Initialize or load existing vector store"""
        persist_path = Path(self.persist_directory)

        # Check if vector store already exists
        if persist_path.exists() and list(persist_path.glob("*")):
            print(f"📚 Loading existing vector store from {self.persist_directory}")
            self.vectorstore = Chroma(
                collection_name=self.collection_name,
                embedding_function=self.embeddings,
                persist_directory=self.persist_directory
            )
            print(f"✅ Loaded {self.vectorstore._collection.count()} documents")
        else:
            print("🔧 Creating new vector store...")
            self._create_vectorstore()

    def _create_vectorstore(self):
        """Create vector store from registry documents"""
        # Get documents from registry
        registry_docs = self.registry.to_documents()

        # Convert to LangChain Document format
        documents = [
            Document(
                page_content=doc['page_content'],
                metadata=doc['metadata']
            )
            for doc in registry_docs
        ]

        print(f"📄 Creating embeddings for {len(documents)} documents...")

        # Create vector store
        self.vectorstore = Chroma.from_documents(
            documents=documents,
            embedding=self.embeddings,
            collection_name=self.collection_name,
            persist_directory=self.persist_directory
        )

        print(f"✅ Vector store created with {len(documents)} documents")
        print(f"💾 Persisted to {self.persist_directory}")

    def similarity_search(
        self,
        query: str,
        k: int = 3,
        filter_metadata: Optional[Dict[str, Any]] = None
    ) -> List[Dict[str, Any]]:
        """
        Perform semantic similarity search

        Args:
            query: Search query
            k: Number of results to return
            filter_metadata: Optional metadata filters (e.g., {"category": "animation"})

        Returns:
            List of results with documents and scores
        """
        # Perform similarity search with scores
        results = self.vectorstore.similarity_search_with_score(
            query,
            k=k,
            filter=filter_metadata
        )

        # Format results
        formatted_results = []
        for doc, score in results:
            formatted_results.append({
                'document': doc,
                'score': score,
                'metadata': doc.metadata,
                'content': doc.page_content,
                'component_id': doc.metadata.get('id'),
                'component_name': doc.metadata.get('name'),
                'category': doc.metadata.get('category')
            })

        return formatted_results

    def hybrid_search(
        self,
        query: str,
        k: int = 5,
        vector_weight: float = 0.7,
        keyword_weight: float = 0.3
    ) -> List[Dict[str, Any]]:
        """
        Hybrid search combining vector similarity and keyword matching

        Args:
            query: Search query
            k: Number of results to return
            vector_weight: Weight for vector similarity (0-1)
            keyword_weight: Weight for keyword matching (0-1)

        Returns:
            List of results with combined scores
        """
        # Normalize weights
        total_weight = vector_weight + keyword_weight
        vector_weight = vector_weight / total_weight
        keyword_weight = keyword_weight / total_weight

        # Get vector similarity results
        vector_results = self.similarity_search(query, k=k)

        # Get keyword search results
        keyword_results = self.registry.search(query)

        # Combine and re-rank
        combined_scores = {}

        # Add vector similarity scores (invert because lower is better)
        for i, result in enumerate(vector_results):
            comp_id = result['component_id']
            # Normalize vector score: convert distance to similarity (0-1)
            # Typical distances are 0-2, so we invert and normalize
            similarity = max(0, 1 - (result['score'] / 2))
            combined_scores[comp_id] = {
                'vector_score': similarity * vector_weight,
                'keyword_score': 0,
                'result': result
            }

        # Add keyword search scores
        max_keyword_score = max([r['score'] for r in keyword_results]) if keyword_results else 1
        for result in keyword_results:
            comp_id = result['id']
            normalized_score = result['score'] / max_keyword_score

            if comp_id in combined_scores:
                combined_scores[comp_id]['keyword_score'] = normalized_score * keyword_weight
            else:
                # Get component data for keyword-only results
                comp = self.registry.get_component(comp_id)
                combined_scores[comp_id] = {
                    'vector_score': 0,
                    'keyword_score': normalized_score * keyword_weight,
                    'result': {
                        'component_id': comp_id,
                        'component_name': comp.name,
                        'category': comp.category,
                        'metadata': {'id': comp_id, 'name': comp.name}
                    }
                }

        # Calculate combined scores
        for comp_id in combined_scores:
            combined_scores[comp_id]['total_score'] = (
                combined_scores[comp_id]['vector_score'] +
                combined_scores[comp_id]['keyword_score']
            )

        # Sort by combined score
        sorted_results = sorted(
            combined_scores.items(),
            key=lambda x: x[1]['total_score'],
            reverse=True
        )

        # Format results
        formatted_results = []
        for comp_id, scores in sorted_results[:k]:
            formatted_results.append({
                'component_id': comp_id,
                'component_name': scores['result'].get('component_name'),
                'category': scores['result'].get('category'),
                'total_score': scores['total_score'],
                'vector_score': scores['vector_score'],
                'keyword_score': scores['keyword_score'],
                'metadata': scores['result'].get('metadata', {})
            })

        return formatted_results

    def find_similar_components(
        self,
        component_id: str,
        k: int = 3
    ) -> List[Dict[str, Any]]:
        """
        Find components similar to a given component

        Args:
            component_id: ID of the reference component
            k: Number of similar components to return

        Returns:
            List of similar components with scores
        """
        # Get the component
        component = self.registry.get_component(component_id)
        if not component:
            raise ValueError(f"Component not found: {component_id}")

        # Create query from component description and tags
        query = f"{component.description} {' '.join(component.semantic_tags)}"

        # Search for similar components
        results = self.similarity_search(query, k=k+1)  # +1 because it might include itself

        # Filter out the original component
        similar = [r for r in results if r['component_id'] != component_id]

        return similar[:k]

    def semantic_filter(
        self,
        description: str,
        threshold: float = 0.7,
        category: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """
        Filter components by semantic similarity threshold

        Args:
            description: Description to match against
            threshold: Minimum similarity threshold (0-1)
            category: Optional category filter

        Returns:
            List of components above threshold
        """
        filter_metadata = {"category": category} if category else None

        # Get all potential matches
        results = self.similarity_search(
            description,
            k=20,  # Get more to apply threshold filter
            filter_metadata=filter_metadata
        )

        # Filter by threshold (convert distance to similarity)
        filtered_results = []
        for result in results:
            similarity = max(0, 1 - (result['score'] / 2))
            if similarity >= threshold:
                result['similarity'] = similarity
                filtered_results.append(result)

        return filtered_results

    def get_statistics(self) -> Dict[str, Any]:
        """Get vector store statistics"""
        collection = self.vectorstore._collection
        return {
            'total_documents': collection.count(),
            'collection_name': self.collection_name,
            'embedding_provider': self.embedding_provider,
            'persist_directory': self.persist_directory
        }


# Convenience functions
def create_vector_store(
    embedding_provider: str = "huggingface",
    persist_directory: Optional[str] = None
) -> ComponentVectorStore:
    """Create or load vector store"""
    return ComponentVectorStore(
        embedding_provider=embedding_provider,
        persist_directory=persist_directory
    )


def semantic_search(query: str, k: int = 3) -> List[Dict[str, Any]]:
    """Quick semantic search"""
    store = create_vector_store()
    return store.similarity_search(query, k=k)


def find_similar(component_id: str, k: int = 3) -> List[Dict[str, Any]]:
    """Quick similar component search"""
    store = create_vector_store()
    return store.find_similar_components(component_id, k=k)


# Demo functions
def demo_similarity_search():
    """Demo: Semantic similarity search"""
    print("\n🔍 Demo: Semantic Similarity Search")
    print("=" * 70)

    store = create_vector_store()

    # Example queries
    queries = [
        "futuristic neon glow effect",
        "calming background for meditation",
        "explosive particle effects",
        "retro digital aesthetic"
    ]

    for query in queries:
        print(f"\n📝 Query: \"{query}\"")
        print("-" * 70)

        results = store.similarity_search(query, k=2)

        for i, result in enumerate(results, 1):
            similarity = max(0, 1 - (result['score'] / 2))
            print(f"{i}. {result['component_name']} ({similarity:.1%} similarity)")
            print(f"   Distance: {result['score']:.4f}")
            print(f"   Category: {result['category']}")


def demo_hybrid_search():
    """Demo: Hybrid search"""
    print("\n\n🔀 Demo: Hybrid Search (Vector + Keyword)")
    print("=" * 70)

    store = create_vector_store()

    queries = [
        "cyberpunk digital effects",
        "smooth flowing animations",
        "particle systems"
    ]

    for query in queries:
        print(f"\n📝 Query: \"{query}\"")
        print("-" * 70)

        results = store.hybrid_search(query, k=3)

        for i, result in enumerate(results, 1):
            print(f"{i}. {result['component_name']}")
            print(f"   Total: {result['total_score']:.3f} "
                  f"(Vector: {result['vector_score']:.3f}, "
                  f"Keyword: {result['keyword_score']:.3f})")


def demo_find_similar():
    """Demo: Find similar components"""
    print("\n\n🔗 Demo: Find Similar Components")
    print("=" * 70)

    store = create_vector_store()

    # Find components similar to Aurora Flow
    print("\n📝 Components similar to 'aurora-flow':")
    print("-" * 70)

    similar = store.find_similar_components("aurora-flow", k=3)

    for i, result in enumerate(similar, 1):
        similarity = max(0, 1 - (result['score'] / 2))
        print(f"{i}. {result['component_name']} ({similarity:.1%} similarity)")
        print(f"   Category: {result['category']}")


if __name__ == "__main__":
    print("\n" + "=" * 70)
    print("🚀 Vector Store Demo - Semantic Component Search")
    print("=" * 70)

    # Run demos
    demo_similarity_search()
    demo_hybrid_search()
    demo_find_similar()

    print("\n" + "=" * 70)
    print("✅ All demos completed!")
    print("=" * 70)
