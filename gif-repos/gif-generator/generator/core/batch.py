"""
Batch Processing
Process multiple inputs with the same template
"""

from pathlib import Path
from typing import List, Dict, Any, Optional
from dataclasses import dataclass
import json
import concurrent.futures
import time

from .template import Template
from .orchestrator import PipelineOrchestrator, ExecutionResult


@dataclass
class BatchJob:
    """Single batch job"""
    input_path: Path
    output_path: Path
    variables: Dict[str, Any]
    job_id: str = None

    def __post_init__(self):
        if self.job_id is None:
            self.job_id = self.input_path.stem


@dataclass
class BatchResult:
    """Result of batch processing"""
    total_jobs: int
    successful: int
    failed: int
    duration_seconds: float
    job_results: List[Dict[str, Any]]


class BatchProcessor:
    """Process multiple inputs with the same template"""

    def __init__(self, max_workers: int = 4):
        """
        Initialize batch processor

        Args:
            max_workers: Maximum number of parallel workers
        """
        self.max_workers = max_workers
        self.orchestrator = PipelineOrchestrator()

    def process_batch(self, template: Template, jobs: List[BatchJob],
                     preset_name: str = 'balanced',
                     parallel: bool = True) -> BatchResult:
        """
        Process batch of jobs

        Args:
            template: Template to use
            jobs: List of batch jobs
            preset_name: Preset to use
            parallel: Process jobs in parallel

        Returns:
            BatchResult with processing statistics
        """
        start_time = time.time()
        job_results = []

        print(f"\n🎬 Batch Processing")
        print(f"   Template: {template.name}")
        print(f"   Jobs: {len(jobs)}")
        print(f"   Mode: {'parallel' if parallel else 'sequential'}")
        print(f"   Workers: {self.max_workers if parallel else 1}")
        print()

        if parallel:
            # Parallel processing
            with concurrent.futures.ThreadPoolExecutor(max_workers=self.max_workers) as executor:
                futures = {
                    executor.submit(
                        self._process_single_job,
                        template,
                        job,
                        preset_name
                    ): job
                    for job in jobs
                }

                for i, future in enumerate(concurrent.futures.as_completed(futures), 1):
                    job = futures[future]
                    try:
                        result = future.result()
                        job_results.append(result)

                        status = "✅" if result['success'] else "❌"
                        print(f"[{i}/{len(jobs)}] {status} {job.job_id}")

                    except Exception as e:
                        print(f"[{i}/{len(jobs)}] ❌ {job.job_id} - Error: {e}")
                        job_results.append({
                            'job_id': job.job_id,
                            'success': False,
                            'error': str(e)
                        })

        else:
            # Sequential processing
            for i, job in enumerate(jobs, 1):
                print(f"\n[{i}/{len(jobs)}] Processing: {job.job_id}")

                try:
                    result = self._process_single_job(template, job, preset_name)
                    job_results.append(result)

                    status = "✅" if result['success'] else "❌"
                    print(f"           {status} Complete")

                except Exception as e:
                    print(f"           ❌ Error: {e}")
                    job_results.append({
                        'job_id': job.job_id,
                        'success': False,
                        'error': str(e)
                    })

        # Calculate statistics
        duration = time.time() - start_time
        successful = sum(1 for r in job_results if r['success'])
        failed = len(job_results) - successful

        print(f"\n{'='*60}")
        print(f"BATCH PROCESSING COMPLETE")
        print(f"{'='*60}")
        print(f"Total jobs: {len(jobs)}")
        print(f"✅ Successful: {successful}")
        print(f"❌ Failed: {failed}")
        print(f"⏱️  Duration: {duration:.1f}s")
        print(f"⚡ Avg time per job: {duration/len(jobs):.1f}s")
        print()

        return BatchResult(
            total_jobs=len(jobs),
            successful=successful,
            failed=failed,
            duration_seconds=duration,
            job_results=job_results
        )

    def _process_single_job(self, template: Template, job: BatchJob,
                           preset_name: str) -> Dict[str, Any]:
        """Process a single job"""
        # Resolve variables with job-specific variables
        user_vars = {
            'video_path': str(job.input_path),
            'output_path': str(job.output_path),
            **job.variables
        }

        try:
            resolved = template.resolve_variables(user_vars, preset_name=preset_name)

            # Execute
            result: ExecutionResult = self.orchestrator.execute(
                template,
                resolved,
                job.output_path
            )

            return {
                'job_id': job.job_id,
                'success': result.success,
                'output_path': str(result.output_path) if result.output_path else None,
                'duration_seconds': result.duration_seconds,
                'error': result.error_message
            }

        except Exception as e:
            return {
                'job_id': job.job_id,
                'success': False,
                'error': str(e)
            }

    def process_from_config(self, config_path: Path) -> BatchResult:
        """
        Process batch from config file

        Config format (JSON):
        {
            "template": "social-media/twitter-demo",
            "preset": "balanced",
            "jobs": [
                {
                    "input": "video1.mp4",
                    "output": "output1.gif",
                    "variables": {"product_name": "Product 1"}
                },
                ...
            ]
        }

        Args:
            config_path: Path to batch config file

        Returns:
            BatchResult
        """
        # Load config
        with open(config_path) as f:
            config = json.load(f)

        # Load template
        from .template import TemplateLoader

        templates_dir = Path(__file__).parent.parent.parent / 'templates'
        loader = TemplateLoader(templates_dir)
        template = loader.load_template(config['template'])

        # Create jobs
        jobs = []
        for job_config in config['jobs']:
            job = BatchJob(
                input_path=Path(job_config['input']),
                output_path=Path(job_config['output']),
                variables=job_config.get('variables', {}),
                job_id=job_config.get('id', Path(job_config['input']).stem)
            )
            jobs.append(job)

        # Process
        preset = config.get('preset', 'balanced')
        parallel = config.get('parallel', True)

        return self.process_batch(template, jobs, preset, parallel)

    def process_directory(self, template: Template, input_dir: Path,
                         output_dir: Path, preset_name: str = 'balanced',
                         pattern: str = '*.mp4', **common_vars) -> BatchResult:
        """
        Process all files in a directory

        Args:
            template: Template to use
            input_dir: Input directory
            output_dir: Output directory
            preset_name: Preset to use
            pattern: File pattern to match (default: *.mp4)
            **common_vars: Variables to apply to all jobs

        Returns:
            BatchResult
        """
        # Ensure output directory exists
        output_dir.mkdir(parents=True, exist_ok=True)

        # Find input files
        input_files = list(input_dir.glob(pattern))

        if not input_files:
            raise ValueError(f"No files matching pattern '{pattern}' found in {input_dir}")

        # Create jobs
        jobs = []
        for input_file in input_files:
            output_file = output_dir / f"{input_file.stem}.gif"

            job = BatchJob(
                input_path=input_file,
                output_path=output_file,
                variables=common_vars.copy(),
                job_id=input_file.stem
            )
            jobs.append(job)

        # Process
        return self.process_batch(template, jobs, preset_name, parallel=True)


# CLI interface for batch processing
if __name__ == '__main__':
    import sys

    if len(sys.argv) < 2:
        print("Usage: python -m generator.core.batch <config.json>")
        sys.exit(1)

    config_path = Path(sys.argv[1])

    if not config_path.exists():
        print(f"Error: Config file not found: {config_path}")
        sys.exit(1)

    processor = BatchProcessor()
    result = processor.process_from_config(config_path)

    sys.exit(0 if result.failed == 0 else 1)
