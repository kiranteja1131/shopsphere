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