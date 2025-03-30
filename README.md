# GUVI Devops Final Project: `Pet Adoption Platform`

## CI/CD Pipeline for React App: Build, Push to `Docker` Hub using `Jenkins`, and Deploy on `Minikube`

> [!NOTE]  
> Make sure to change all the credentials and links to your own in all the files and commands.

### Creating a React Vite Project with Pet Adoption Platform

#### Step 1: Create the Vite Project
- Open yout terminal and run:
```bash
npm create vite@latest pet-adoption-platform --template react
cd pet-adoption-platform
npm install
```

#### Step 2: Create the Component Files
- 1. Create src/Login.jsx:
```groovy
import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "naghul-pranav" && password === "Naghul@123") {
      onLogin();
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh",
      backgroundColor: "#f5f5f5"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        width: "400px",
        maxWidth: "90%"
      }}>
        <h1 style={{ 
          fontSize: "24px", 
          fontWeight: "bold", 
          marginBottom: "20px",
          textAlign: "center",
          color: "#333"
        }}>
          Pet Adoption Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "500",
              color: "#555"
            }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ 
                width: "100%", 
                padding: "10px", 
                border: "1px solid #ccc", 
                borderRadius: "5px",
                fontSize: "16px"
              }}
              placeholder="Enter username"
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "500",
              color: "#555"
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                width: "100%", 
                padding: "10px", 
                border: "1px solid #ccc", 
                borderRadius: "5px",
                fontSize: "16px"
              }}
              placeholder="Enter password"
            />
          </div>
          {error && (
            <p style={{ 
              color: "red", 
              marginBottom: "20px",
              textAlign: "center"
            }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            style={{ 
              width: "100%",
              padding: "12px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.3s"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#45a049"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#4CAF50"}
          >
            Login
          </button>
        </form>
        <div style={{ 
          marginTop: "20px",
          textAlign: "center",
          color: "#777",
          fontSize: "14px"
        }}>
          <p>Demo credentials:</p>
          <p>Username: naghul-pranav</p>
          <p>Password: Naghul@123</p>
        </div>
      </div>
    </div>
  );
}
```
- 2. Replace src/App.jsx with:
```groovy
import { useState } from "react";
import Login from "./Login";

const initialPets = [
  { id: 1, name: "Buddy", type: "Dog", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnYa0In6TaZgb-ThQhHECEoU6pVcl3zCUFwA&s", adopted: false },
  { id: 2, name: "Mittens", type: "Cat", image: "https://bestfriends.org/sites/default/files/styles/hero_mobile/public/hero-dash/Asana3808_Dashboard_Standard.jpg?h=ebad9ecf&itok=cWevo33k", adopted: false },
  { id: 3, name: "Charlie", type: "Rabbit", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2pRXZW019vGnfKnrZpMwd9Iw3_HXuwmaWdw&s", adopted: false },
];

export default function App() {
  const [pets, setPets] = useState(initialPets);
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const adoptPet = (id) => {
    setPets(pets.map((pet) => (pet.id === id ? { ...pet, adopted: true } : pet)));
  };

  const filteredPets = pets.filter((pet) => 
    pet.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "20px"
      }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Pet Adoption Platform</h1>
        <button 
          onClick={() => setIsLoggedIn(false)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>
      <input
        style={{ 
          width: "300px", 
          padding: "10px", 
          marginBottom: "20px", 
          border: "1px solid #ccc", 
          borderRadius: "5px",
          fontSize: "16px"
        }}
        placeholder="Search for a pet..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
        gap: "20px", 
        justifyContent: "center" 
      }}>
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <div 
              key={pet.id} 
              style={{ 
                border: "1px solid #ddd", 
                borderRadius: "10px", 
                padding: "20px", 
                textAlign: "center",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
            >
              <img 
                src={pet.image} 
                alt={pet.name} 
                style={{ 
                  width: "100px", 
                  height: "100px", 
                  borderRadius: "10px", 
                  marginBottom: "10px",
                  objectFit: "cover"
                }} 
              />
              <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>{pet.name}</h2>
              <p style={{ color: "#555" }}>{pet.type}</p>
              <button
                style={{ 
                  marginTop: "10px", 
                  padding: "10px 15px", 
                  borderRadius: "5px", 
                  backgroundColor: pet.adopted ? "gray" : "#4CAF50", 
                  color: "white", 
                  border: "none", 
                  cursor: pet.adopted ? "default" : "pointer",
                  transition: "background-color 0.3s"
                }}
                onClick={() => adoptPet(pet.id)}
                disabled={pet.adopted}
              >
                {pet.adopted ? "Adopted" : "Adopt"}
              </button>
            </div>
          ))
        ) : (
          <p style={{ color: "#555", gridColumn: "1/-1" }}>No pets found</p>
        )}
      </div>
    </div>
  );
}
```
- 3. Clean up the following unnecessary files:
  - src/App.css
  - src/index.css
  - src/assets/react.svg
- 4. Update src/main.jsx:
```groovy
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```
#### Step 3: Run the Project
- Start the development server:
```bash
npm run dev
```

### Dockerfile
```groovy
# Use an official Node.js image to build the React app
FROM node:18 as build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Use a lightweight web server for production
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Jenkinsfile
```groovy
pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'docker-seccred'
        DOCKER_HUB_REPO = 'sanjai4334/guvi-devops-final-project'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/sanjai4334/guvi-devops-final-project.git', branch: 'main'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_HUB_REPO:latest .'
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    sh 'docker push $DOCKER_HUB_REPO:latest'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
            echo 'Docker image pushed to Docker Hub!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
```

 - Add these into the main repo folder and commit the changes

## Install these plugins 
 - ✅ Pipeline (Already included in newer Jenkins versions)
 - ✅ Git Plugin (For cloning repositories)
 - ✅ Docker Pipeline Plugin (For building & pushing Docker images)
 - ✅ Kubernetes Plugin (For deploying to Minikube)
 - ✅ Credentials Binding Plugin (For securely handling Docker Hub credentials)

## Create a pipeline job to push the docker image to dockerhub
 - Open Jenkins and create a pipeline job
 - In the connfigure section : 
    - In General section select `Discard old Builds` and set days to keep build and no of builds to keep as `2`
 - Scroll down to `Pipeline` section :
    - Select `Pipeline script from SCM`
    - In `SCM` select `git` and paste your `Repository URL` and change the branch to `main`
 - Click Save and then Build

![image](https://github.com/user-attachments/assets/875a758f-d546-4663-be6e-40e7ff6a1e02)

## Pull the image from Docker hub and run the build using Minikube
 - Open your terminal and execute the following commands

```bash
minikube start
kubectl create deployment guvi-devops-final --image=sanjai4334/guvi-devops-final-project:latest
kubectl expose deployment guvi-devops-final --type=NodePort --port=80
minikube service guvi-devops-final
```

![image](https://github.com/user-attachments/assets/13abc9c0-38bb-48ac-8f19-6d43634bf387)
