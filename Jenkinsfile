pipeline {
    agent any

    environment {
        DOCKER_USER = "scoute"
        KUBECONFIG = "/var/jenkins_home/.kube/config"
    }

    stages {

        stage('Docker Cleanup login') {
            steps {
                sh 'docker logout || true'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t scoute/backend:latest ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t scoute/frontend:latest ./frontend'
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                    sh 'docker push scoute/backend:latest'
                    sh 'docker push scoute/frontend:latest'
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl rollout restart deployment backend'
                sh 'kubectl rollout restart deployment frontend'
            }
        }
    }
}