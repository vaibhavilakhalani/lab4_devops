pipeline {
  agent any
  options { timestamps() }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Setup Python') {
      steps {
        bat '''
          python3 -m venv .venv
          . .venv/bin/activate
          pip install --upgrade pip
          pip install -r requirements.txt
        '''
      }
    }
    stage('Run Selenium Tests') {
      steps {
        bat '''
          . .venv/bin/activate
          pytest -q --junitxml=test-results/pytest-results.xml
        '''
      }
    }
    stage('Archive Results') {
      steps {
        junit 'test-results/pytest-results.xml'
        archiveArtifacts artifacts: 'test-results/**', fingerprint: true, onlyIfSuccessful: false
      }
    }
  }
  post {
    always {
      echo 'Pipeline finished.'
    }
  }
}
