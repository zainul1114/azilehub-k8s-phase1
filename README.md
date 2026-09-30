# Azilehub Academy — Kubernetes Platform

Kubernetes deployment project for the Azilehub Academy website and backend services.

## Architecture

The application consists of:

- Frontend — Nginx static website
- Content Service — tutorial API
- Contact Service — contact form API
- PostgreSQL — application database
- NGINX Ingress — external HTTPS routing
- Kubernetes HPA — application autoscaling
- PodDisruptionBudget — workload availability
- NetworkPolicy — workload network isolation
- Prometheus — metrics collection
- Grafana — monitoring dashboards

## Kubernetes Namespace

```text
azilehub
Application Services
Service	Port	Purpose
frontend	8080	Azilehub Academy website
content-service	8000	Tutorial API
contact-service	8000	Contact API
postgres	5432	PostgreSQL database
Ingress

Host:

azilehub.local

Routes:

/api/tutorials  -> content-service:8000
/api/contact    -> contact-service:8000
/               -> frontend:8080

HTTPS is enabled using the local TLS configuration.

Container Images
zainul1114/azilehub-frontend:1.0.7
zainul1114/azilehub-content:1.0.1
zainul1114/azilehub-contact:1.0.1
postgres:16-alpine
Kubernetes Structure

The current deployment uses Kustomize:

k8s/
├── base/
│   ├── configmap.yaml
│   ├── contact-service.yaml
│   ├── content-service.yaml
│   ├── frontend.yaml
│   ├── hpa.yaml
│   ├── ingress.yaml
│   ├── kustomization.yaml
│   ├── namespace.yaml
│   ├── networkpolicy.yaml
│   ├── pdb.yaml
│   ├── postgres.yaml
│   ├── secret.yaml
│   └── services.yaml
│
├── overlays/
│   ├── dev/
│   │   └── kustomization.yaml
│   └── prod/
│       └── kustomization.yaml
│
└── monitoring/
    ├── values.yaml
    └── rendered-monitoring.yaml
Kustomize Validation

Render the base:

kubectl kustomize k8s/base

Render development:

kubectl kustomize k8s/overlays/dev

Render production:

kubectl kustomize k8s/overlays/prod

Client-side validation:

kubectl apply --dry-run=client -k k8s/base
kubectl apply --dry-run=client -k k8s/overlays/dev
kubectl apply --dry-run=client -k k8s/overlays/prod
Monitoring

Monitoring is deployed in the monitoring namespace using kube-prometheus-stack.

Components include:

Prometheus
Grafana
Alertmanager
kube-state-metrics
Node Exporter
Prometheus Operator
Security

Application workloads use non-root security contexts where supported.

NetworkPolicies are configured for:

frontend
content-service
contact-service
PostgreSQL

Kubernetes Secret manifests and local TLS private keys are intentionally excluded from Git.

Project Phases
Phase 1

Initial Kubernetes application deployment.

Phase 2

Production configuration and hardening:

ConfigMap
Secrets
Security contexts
Resource requests/limits
HPA
NetworkPolicy
PDB
Scheduling considerations
Prometheus/Grafana monitoring
Phase 3

Production deployment workflow:

Kustomize
Dev/Prod overlays
Git repository
CI/CD
Container image scanning
GitOps with Argo CD
Advanced security
Advanced observability
