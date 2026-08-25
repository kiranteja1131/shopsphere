# ShopSphere — Cloud-Native E-Commerce Platform

ShopSphere is a full-stack e-commerce application that was containerized and deployed using a complete DevOps workflow. The project demonstrates automated CI/CD, container orchestration with Kubernetes, and application monitoring using Prometheus and Grafana.

## 🏗️ Architecture

```text
                         GitHub
                            │
                            ▼
                         Jenkins
                            │
                    ┌───────┴───────┐
                    ▼               ▼
              Docker Build      Automated CD
                    │               │
                    ▼               ▼
                Docker Hub      Kubernetes
                                    │
                 ┌──────────────────┼─────────────────┐
                 ▼                  ▼                 ▼
             Frontend            Backend           MongoDB
                Pods                Pods               Pod
                 │                  │
                 └──────────┬───────┘
                            ▼
                       ShopSphere
                            │
                            ▼
                       Prometheus
                            │
                            ▼
                         Grafana
```

## 🚀 Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Version Control:** Git, GitHub
* **Containerization:** Docker, Docker Compose
* **CI/CD:** Jenkins
* **Container Registry:** Docker Hub
* **Orchestration:** Kubernetes, Minikube
* **Monitoring:** Prometheus, Grafana
* **Package Management:** Helm

## 🔄 CI/CD Workflow

The project follows this automated workflow:

```text
Developer
    ↓
GitHub
    ↓
Jenkins
    ↓
Checkout Source Code
    ↓
Build Docker Images
    ↓
Push Images to Docker Hub
    ↓
Deploy to Kubernetes
    ↓
Verify Kubernetes Rollout
    ↓
Application Running
```

## 🐳 Docker

The frontend and backend applications are containerized using Docker.

Docker Compose was also used during development to run the application components together.

Example services:

```text
Frontend → Port 8080
Backend  → Port 5000
MongoDB  → Port 27017
```

## ☸️ Kubernetes Deployment

The application was deployed to a local Kubernetes cluster using Minikube.

Kubernetes resources include:

* Deployments
* Services
* Pods
* MongoDB Deployment
* MongoDB Service

The application architecture consists of:

```text
Frontend Service
       ↓
Frontend Pods

Backend Service
       ↓
Backend Pods
       ↓
MongoDB Service
       ↓
MongoDB Pod
```

Kubernetes Services provide stable networking between the application components instead of relying directly on changing Pod IP addresses.

## 🔧 Jenkins Pipeline

Jenkins automates the CI/CD process.

Pipeline stages include:

```text
Checkout
   ↓
Build Backend Image
   ↓
Build Frontend Image
   ↓
Push Images to Docker Hub
   ↓
Deploy to Kubernetes
   ↓
Check Rollout Status
```

Docker Hub credentials are stored securely in Jenkins Credentials rather than being hardcoded into the Jenkinsfile.

Kubernetes access is configured through the Jenkins environment using `KUBECONFIG`.

## 📊 Monitoring

Prometheus and Grafana were deployed using Helm.

```text
Kubernetes
    ↓
Prometheus
    ↓
Metrics
    ↓
Grafana
```

The monitoring setup provides visibility into:

* Kubernetes nodes
* Pod resources
* CPU usage
* Memory usage
* Network activity
* Workload health

Grafana dashboards are used to visualize the collected Kubernetes metrics.

## 🛠️ Useful Commands

### Check Kubernetes resources

```bash
kubectl get pods
kubectl get deployments
kubectl get services
```

### Check application logs

```bash
kubectl logs deployment/shopsphere-backend
```

### Check Pod details

```bash
kubectl describe pod <pod-name>
```

### Check Kubernetes rollout

```bash
kubectl rollout status deployment/shopsphere-backend
kubectl rollout status deployment/shopsphere-frontend
```

### Scale the backend

```bash
kubectl scale deployment shopsphere-backend --replicas=3
```

### Check monitoring Pods

```bash
kubectl get pods
```

### Access Grafana locally

```bash
kubectl port-forward svc/monitoring-grafana 3030:80
```

Then open:

```text
http://localhost:3030
```

## 🔐 Security

Sensitive credentials are not stored in the source code.

The project uses:

* Jenkins Credentials for Docker Hub authentication
* Environment variables for application secrets
* Kubernetes configuration outside the Git repository

The following should never be committed:

```text
.env
kubeconfig
Docker Hub passwords
Grafana credentials
API keys
```

## 🎯 Key DevOps Concepts Demonstrated

* Git-based source control
* Docker image creation
* Docker Compose
* CI/CD with Jenkins
* Secure credential management
* Docker Hub image publishing
* Kubernetes Deployments
* Kubernetes Services
* Kubernetes application networking
* MongoDB deployment
* Automated Kubernetes deployment
* Helm
* Prometheus monitoring
* Grafana dashboards
* Containerized application lifecycle

## 📌 Project Outcome

ShopSphere demonstrates an end-to-end DevOps workflow where application code moves from GitHub through Jenkins, is packaged into Docker images, pushed to Docker Hub, automatically deployed to Kubernetes, and monitored using Prometheus and Grafana.

```text
Code → Build → Containerize → Push → Deploy → Monitor
```
