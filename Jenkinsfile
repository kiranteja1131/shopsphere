pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                bat 'docker build -t shopsphere-backend ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                bat 'docker build -t shopsphere-frontend ./frontend'
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USERNAME',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {

                    bat 'docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%'

                    bat 'docker tag shopsphere-backend %DOCKER_USERNAME%/shopsphere-backend:latest'
                    bat 'docker tag shopsphere-frontend %DOCKER_USERNAME%/shopsphere-frontend:latest'

                    bat 'docker push %DOCKER_USERNAME%/shopsphere-backend:latest'
                    bat 'docker push %DOCKER_USERNAME%/shopsphere-frontend:latest'
                }
            }
        }

        stage('Check Kubernetes') {
            steps {
                bat 'kubectl version --client'
                bat 'kubectl get nodes'
            }
        }

        stage('Build Complete Stack') {
            steps {
                bat 'docker compose config'
            }
        }
    }

    post {
        success {
            echo 'ShopSphere CI pipeline completed successfully!'
        }

        failure {
            echo 'ShopSphere CI pipeline failed!'
        }
    }
}