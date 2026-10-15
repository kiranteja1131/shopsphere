pipeline {
    agent any

    environment {
        KUBECONFIG = '/var/lib/jenkins/.kube/config'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Images') {
            steps {
                sh '''
                    docker build -t shopsphere-backend:${BUILD_NUMBER} ./backend
                    docker build -t shopsphere-frontend:${BUILD_NUMBER} ./frontend
                '''
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'c6f1da3b-93a3-4747-a75b-2ecaaca226aa',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_TOKEN'
                )]) {
                    sh '''
                        echo "$DOCKER_TOKEN" | docker login -u "$DOCKER_USER" --password-stdin

                        docker tag shopsphere-backend:${BUILD_NUMBER} "$DOCKER_USER/shopsphere-backend:${BUILD_NUMBER}"
                        docker tag shopsphere-frontend:${BUILD_NUMBER} "$DOCKER_USER/shopsphere-frontend:${BUILD_NUMBER}"

                        docker push "$DOCKER_USER/shopsphere-backend:${BUILD_NUMBER}"
                        docker push "$DOCKER_USER/shopsphere-frontend:${BUILD_NUMBER}"

                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to EKS') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'c6f1da3b-93a3-4747-a75b-2ecaaca226aa',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_TOKEN'
                )]) {
                    sh '''
                        kubectl set image deployment/shopsphere-backend \
                          backend="$DOCKER_USER/shopsphere-backend:${BUILD_NUMBER}"

                        kubectl set image deployment/shopsphere-frontend \
                          frontend="$DOCKER_USER/shopsphere-frontend:${BUILD_NUMBER}"

                        kubectl rollout status deployment/shopsphere-backend --timeout=180s
                        kubectl rollout status deployment/shopsphere-frontend --timeout=180s
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'ShopSphere successfully deployed to EKS!'
        }
        failure {
            echo 'Pipeline failed. Check the Jenkins console output.'
        }
    }
}
