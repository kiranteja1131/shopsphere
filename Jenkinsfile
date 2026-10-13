pipeline {
    agent any

    environment {
        DOCKERHUB_USER = ''
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

                        docker tag shopsphere-backend:${BUILD_NUMBER} "$DOCKER_USER/shopsphere-backend:latest"
                        docker tag shopsphere-frontend:${BUILD_NUMBER} "$DOCKER_USER/shopsphere-frontend:latest"

                        docker push "$DOCKER_USER/shopsphere-backend:latest"
                        docker push "$DOCKER_USER/shopsphere-frontend:latest"

                        docker logout
                    '''
                }
            }
        }

        stage('Deploy on EC2') {
            steps {
                sh '''
                    cd /home/ubuntu/shopsphere
                    docker compose up -d --build
                '''
            }
        }
    }

    post {
        success {
            echo 'ShopSphere pipeline completed successfully!'
        }
        failure {
            echo 'ShopSphere pipeline failed. Check the console output.'
        }
    }
}
