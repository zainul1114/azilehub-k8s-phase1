from fastapi import FastAPI
from pydantic import BaseModel
from typing import List


app = FastAPI(
    title="Azilehub Content Service",
    version="1.0.0"
)


class Tutorial(BaseModel):
    name: str
    description: str


tutorials: List[Tutorial] = [
    Tutorial(
        name="Linux & Git",
        description="Learn Linux administration, shell commands, Git and Git workflows."
    ),
    Tutorial(
        name="Docker & Portainer",
        description="Learn containers, Docker images, networks, volumes and Portainer."
    ),
    Tutorial(
        name="Kubernetes",
        description="Learn Pods, Deployments, Services, ConfigMaps, Secrets and Kubernetes administration."
    ),
    Tutorial(
        name="DevOps",
        description="Learn CI/CD, Jenkins, Ansible, infrastructure automation and DevOps practices."
    ),
    Tutorial(
        name="MLOps",
        description="Learn MLflow, model lifecycle, model deployment and MLOps infrastructure."
    ),
    Tutorial(
        name="AI Infrastructure",
        description="Learn GPUs, CUDA, NVIDIA GPU Operator, vLLM, Ollama and AI infrastructure."
    ),
    Tutorial(
        name="OpenShift",
        description="Learn OpenShift architecture, workloads, networking, storage, security and operators."
    ),
    Tutorial(
        name="Monitoring",
        description="Learn Prometheus, Grafana, metrics, logging and Kubernetes observability."
    )
]


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "content-service"
    }


@app.get("/api/tutorials")
def get_tutorials():
    return {
        "tutorials": tutorials
    }
