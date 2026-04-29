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

        // 🔥 ADD THIS
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                    sonar-scanner \
                      -Dsonar.projectKey=campus-quiz \
                      -Dsonar.sources=. \
                      -Dsonar.host.url=http://host.docker.internal:9000 \
                      -Dsonar.login=$SONAR_AUTH_TOKEN
                    '''
                }
            }
        }

        // 🔥 ADD THIS
        stage('Quality Gate') {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
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
                    sh '''
                    echo $PASS | docker login -u $USER --password-stdin
                    docker push scoute/backend:$BUILD_NUMBER
                    docker push scoute/frontend:$BUILD_NUMBER
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl set image deployment/backend backend=scoute/backend:$BUILD_NUMBER
                kubectl set image deployment/frontend frontend=scoute/frontend:$BUILD_NUMBER

                kubectl rollout status deployment/backend
                kubectl rollout status deployment/frontend
                '''
            }
        }
    }
}