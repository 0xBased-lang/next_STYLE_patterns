# Next Style Patterns - Python Integration

Python library for accessing the Next Style Patterns component registry with LangChain support.

## Features

- **TOON Format Support**: Uses efficient TOON format (33.6% smaller than JSON)
- **Semantic Search**: Find components by keywords, tags, and use cases
- **Smart Recommendations**: Get AI-powered component suggestions
- **LangChain Integration**: Ready-to-use tools and retrievers
- **Type-Safe**: Full dataclass models for all components
- **Zero Dependencies**: Works with just stdlib (LangChain optional)

## Installation

```bash
cd python

# Basic installation (no dependencies)
# Uses existing component-registry.json

# With LangChain support
pip install -r requirements.txt
```

## Quick Start

### 1. Basic Search

```python
from component_registry import load_registry

# Load registry
registry = load_registry()

# Search for components
results = registry.search("cyberpunk glitch", category="animation")

for result in results:
    comp = result['component']
    print(f"{comp.name} (score: {result['score']})")
    print(f"  {comp.description}")
```

**Output:**
```
Holographic Glitch: Cyberpunk (score: 4)
  Futuristic holographic glitch effect with RGB split scan lines
```

### 2. Get Recommendations

```python
# Get recommendations based on use case
recommendations = registry.recommend("hero section", min_confidence=0.9)

for rec in recommendations:
    print(f"{rec['name']} ({rec['confidence']:.0%} confidence)")
    print(f"  Presets: {', '.join(rec['presets'])}")
```

**Output:**
```
Aurora Flow: Ethereal (95% confidence)
  Presets: subtle, hero, energetic
```

### 3. Get Component Details

```python
# Get specific component
comp = registry.get_component("aurora-flow")

print(f"{comp.name}")
print(f"Semantic Tags: {', '.join(comp.semantic_tags)}")
print(f"Frameworks: {', '.join(comp.frameworks)}")
print(f"FPS: {comp.performance['fps']['avg']}")
```

### 4. GIF Templates

```python
# Get platform-specific GIF specs
template = registry.get_gif_template("twitter")

specs = template.specifications
print(f"Dimensions: {specs['dimensions']}")
print(f"Max Size: {specs['maxSize']}")
print(f"FPS: {specs['fps']}")
```

## LangChain Integration

### Tools for Agents

```python
from langchain_tool import create_component_tools
from langchain.agents import initialize_agent, AgentType
from langchain_anthropic import ChatAnthropic

# Create tools
tools = create_component_tools()

# Initialize agent
llm = ChatAnthropic(model="claude-3-5-sonnet-20241022")
agent = initialize_agent(
    tools,
    llm,
    agent=AgentType.OPENAI_FUNCTIONS,
    verbose=True
)

# Use agent
response = agent.run(
    "I need a cyberpunk glitch effect for my gaming website. "
    "What component should I use and which preset?"
)
```

### Retriever for RAG

```python
from langchain_tool import create_component_retriever
from langchain_anthropic import ChatAnthropic
from langchain.chains import RetrievalQA

# Create retriever
retriever = create_component_retriever(k=3)

# Create QA chain
llm = ChatAnthropic(model="claude-3-5-sonnet-20241022")
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    chain_type="stuff"
)

# Ask questions
answer = qa_chain.run(
    "What's the best component for a meditation app background?"
)
```

### Vector Store Integration

```python
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from component_registry import load_registry

# Load registry and convert to documents
registry = load_registry()
documents = registry.to_documents()

# Create vector store
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(
    documents=[
        Document(page_content=d['page_content'], metadata=d['metadata'])
        for d in documents
    ],
    embedding=embeddings
)

# Semantic search
results = vectorstore.similarity_search("particle animation", k=3)
for doc in results:
    print(f"Found: {doc.metadata['name']}")
```

## API Reference

### ComponentRegistry

Main class for accessing the component registry.

#### Methods

**`search(query, category=None, min_confidence=0.0)`**
- Search for components using semantic tags and keywords
- Returns list of results with scores and matches

**`get_component(component_id)`**
- Get specific component by ID
- Returns `Component` dataclass or `None`

**`list_components(category=None, include_presets=False)`**
- List all components with optional filters
- Returns list of `Component` objects

**`get_gif_template(platform)`**
- Get GIF template by platform ("twitter", "instagram", "linkedin")
- Returns `GifTemplate` dataclass or `None`

**`recommend(use_case, min_confidence=0.8)`**
- Get component recommendations based on use case
- Returns list of recommendations sorted by confidence

**`get_statistics()`**
- Get registry statistics
- Returns dict with counts and metrics

**`to_documents()`**
- Convert registry to LangChain document format
- Returns list of documents ready for vector stores

### Component Dataclass

```python
@dataclass
class Component:
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
    themes: Optional[List[Dict[str, str]]]
    versions: Optional[Dict[str, Any]]
```

### GifTemplate Dataclass

```python
@dataclass
class GifTemplate:
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
```

## LangChain Tools

### ComponentSearchTool

Search for components by keywords and tags.

```python
from langchain_tool import ComponentSearchTool

tool = ComponentSearchTool()
result = tool.run(query="aurora", category="animation")
```

### ComponentRecommendTool

Get component recommendations based on use case.

```python
from langchain_tool import ComponentRecommendTool

tool = ComponentRecommendTool()
result = tool.run(use_case="hero section", min_confidence=0.9)
```

### GifTemplateTool

Get GIF template specifications.

```python
from langchain_tool import GifTemplateTool

tool = GifTemplateTool()
result = tool.run(platform="twitter")
```

### ComponentRetriever

LangChain retriever for RAG applications.

```python
from langchain_tool import ComponentRetriever

retriever = ComponentRetriever(k=4)
docs = retriever.get_relevant_documents("particle animation")
```

## Examples

Run the comprehensive example suite:

```bash
python example_usage.py
```

This demonstrates:
1. Basic component search
2. Component recommendations
3. Detailed component information
4. GIF template lookup
5. LangChain tools integration
6. LangChain retriever usage
7. Document conversion
8. Registry statistics
9. Listing all components

## Data Structure

### Component Registry

The registry contains:
- **6 Animation Components**: Aurora Flow, Holographic Glitch, Matrix, Morphing Blob, Neon Trails, Particle Explosion
- **3 GIF Templates**: Twitter, Instagram, LinkedIn

Each component includes:
- **Semantic Tags**: 8-12 tags for AI discovery
- **Use Cases**: With confidence scores (0-1)
- **Frameworks**: React, Next.js, Astro, Vue support
- **Performance Metrics**: FPS, bundle size, CPU usage
- **Presets**: Pre-configured settings
- **AI Prompt Examples**: Sample prompts for each component

### Performance Benefits

**TOON vs JSON:**
- **File Size**: 12,719 bytes (TOON) vs 19,167 bytes (JSON)
- **Token Count**: ~3,180 (TOON) vs ~4,792 (JSON)
- **Savings**: 33.6% fewer tokens
- **Annual Cost Savings**: $1,765 at 1000 reads/day ($3/M tokens)

## Use Cases

### 1. Component Discovery Agent

```python
from langchain_tool import create_component_tools
from langchain_anthropic import ChatAnthropic
from langchain.agents import initialize_agent

tools = create_component_tools()
llm = ChatAnthropic(model="claude-3-5-sonnet-20241022")
agent = initialize_agent(tools, llm, verbose=True)

# User query
agent.run("What animation should I use for a luxury brand website?")
```

### 2. RAG-Based Recommendations

```python
from langchain_tool import create_component_retriever
from langchain.chains import RetrievalQA
from langchain_anthropic import ChatAnthropic

retriever = create_component_retriever(k=3)
llm = ChatAnthropic(model="claude-3-5-sonnet-20241022")
qa = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)

qa.run("I need a particle effect for a tech conference website")
```

### 3. Semantic Search API

```python
from component_registry import search_components

def search_api(query: str):
    results = search_components(query, min_confidence=0.8)
    return [{
        'id': r['id'],
        'name': r['name'],
        'score': r['score'],
        'description': r['component'].description
    } for r in results]
```

### 4. Automated Component Selection

```python
from component_registry import get_recommendations

def auto_select_component(use_case: str):
    recs = get_recommendations(use_case, min_confidence=0.9)
    if recs:
        best = recs[0]
        return {
            'component_id': best['id'],
            'preset': list(best['component'].presets.keys())[0],
            'confidence': best['confidence']
        }
    return None
```

## Troubleshooting

### JSON Not Found

If `component-registry.json` doesn't exist, it will be auto-generated from the TOON file using Node.js:

```bash
node convert-toon.mjs toon-to-json component-registry.toon component-registry.json
```

### LangChain Not Installed

The library works without LangChain for basic functionality. Install LangChain only if you need agent/RAG features:

```bash
pip install langchain langchain-core langchain-anthropic
```

### Import Errors

Ensure you're running from the correct directory:

```python
# Add parent directory to path if needed
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).parent))

from component_registry import load_registry
```

## Performance Tips

1. **Cache the Registry**: Load once and reuse
   ```python
   registry = load_registry()  # Cache this
   ```

2. **Use JSON**: JSON loading is faster than TOON parsing
   ```python
   # JSON file is used automatically if present
   ```

3. **Limit Search Results**: Use `[:n]` to limit results
   ```python
   results = registry.search("glitch")[:3]
   ```

4. **Filter by Category**: Reduce search space
   ```python
   results = registry.search("particle", category="animation")
   ```

## Testing

Run tests:

```bash
# Basic functionality
python -m component_registry

# Full examples
python example_usage.py

# LangChain demo (requires langchain installed)
python langchain_tool.py
```

## Contributing

The component registry is defined in `../component-registry.toon`. To add new components:

1. Edit `component-registry.toon`
2. Regenerate JSON: `node convert-toon.mjs toon-to-json ...`
3. Test: `python example_usage.py`

## License

MIT

## Resources

- **Component Registry**: `../component-registry.toon`
- **Conversion Utilities**: `../convert-toon.mjs`
- **MCP Server**: `../mcp-server/`
- **TOON Specification**: https://github.com/toon-format/spec

---

**Token Savings**: 33.6% | **Components**: 6 | **GIF Templates**: 3 | **Presets**: 18
