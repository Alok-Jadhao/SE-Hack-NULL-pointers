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
                sh 'docker build -t scoute/backend:$BUILD_NUMBER ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t scoute/frontend:$BUILD_NUMBER ./frontend'
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
                    sh 'docker push scoute/backend:$BUILD_NUMBER'
                    sh 'docker push scoute/frontend:$BUILD_NUMBER'
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl rollout restart deployment/backend backend=scoute/backend:$BUILD_NUMBER'
                sh 'kubectl rollout restart deployment/frontend frontend=scoute/frontend:$BUILD_NUMBER'
            }
        }
    }
}