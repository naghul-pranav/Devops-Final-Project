# GUVI Devops Final Project: `Pet Adoption Platform`

## CI/CD Pipeline for React App: Build, Push to `Docker` Hub using `Jenkins`, and Deploy on `Minikube`

> [!NOTE]  
> Make sure to change all the credentials and links to your own in all the files and commands.

---

### Creating a React Vite Project with Pet Adoption Platform

#### Step 1: Create the Vite Project
- Open your terminal and run:
```bash
npm create vite@latest pet-adoption-platform -- --template react
cd pet-adoption-platform
npm install
```

#### Step 2: Create the Component Files
1. Create `src/Login.jsx`:
```js
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
2. Replace `src/App.jsx` with:
```js
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
3. Clean up the following unnecessary files:
- `src/App.css`
- `src/index.css`
- `src/assets/react.svg`
4. Update `src/main.jsx`:
```js
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

---

### Setup the Github and Docker Repositories

#### Push the local React Vite Project to Github
- Open the project directory using `Visual Studio Code`
- Click on `Version Control` icon in the Sidebar
- Click on `Create a new Github repository`
- Name is as `Devops-Final-Project` and save it as a `Public repository`

#### Create a new Docker Repository
- Go to `hub.docker.com`
- Login with the credentials
- Click on `Create a Repository` -> Name it as `devops-final-project` -> Set the visibility as `public` -> Click on `create`

#### Add `Dockerfile` and `Jenkinsfile` in Github Repository
Now come back to the `Github` Repository to add the following files, then commit the changes

- `Dockerfile`:
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

- `Jenkinsfile`:
```groovy
pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'docker-seccred'
        DOCKER_HUB_REPO = 'naghulpranavkk/devops-final-project'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/naghul-pranav/Devops-Final-Project.git', branch: 'main'
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

---

### Jenkins Plugins Setup
Go to `localhost:8080` -> `Manage Jenkins` -> `Plugins` -> `Available Plugins` and check whether following plugins are available
- ✅ `Pipeline` (Already included in newer Jenkins versions)
- ✅ `Git Plugin` (For cloning repositories)
- ✅ `Docker Pipeline Plugin` (For building & pushing Docker images)
- ✅ `Kubernetes Plugin` (For deploying to Minikube)
- ✅ `Credentials Binding Plugin` (For securely handling Docker Hub credentials)

---

### Create a Pipeline job in Jenkins to push the Docker Image to Dockerhub from Github
- Open Jenkins and create a Pipeline job -> Name it as `pipelinefinal`
- In the `General` section : 
  - Select `Discard old Builds` and set days to keep build and maximum no of builds to keep as `2`
- Scroll down to `Pipeline` section :
  - Select `Pipeline script from SCM`
  - In `SCM` select the option `git` and paste your `Repository URL` and change the branch to `main`
- Click `Save` and then `Build`

![Screenshot from 2025-03-30 20-03-08](https://github.com/user-attachments/assets/f70fe838-8fb9-44ab-8182-e1fea4af0bfb)

![Screenshot from 2025-03-30 20-02-09](https://github.com/user-attachments/assets/35f818a1-338c-4dcd-978f-eb5897c3b205)

---

### Pull the image from Docker Hub and run the build using Minikube
Open your terminal and execute the following commands
```bash
minikube start
```
![Screenshot from 2025-03-30 21-43-27](https://github.com/user-attachments/assets/b2feeb7e-96ea-476b-a3c4-0fb62f4b8fa7)

```bash
minikube status
```
![Screenshot from 2025-03-30 21-44-18](https://github.com/user-attachments/assets/9190351c-7b2a-4aae-975d-a19dd28118a8)

```bash
kubectl create deployment devops-final-project --image=naghulpranavkk/devops-final-project:latest
```
![Screenshot from 2025-03-30 21-46-27](https://github.com/user-attachments/assets/19aa040d-57bd-426a-92f4-ab9a5f0eb3b2)

```bash
kubectl expose deployment devops-final-project --type=NodePort --port=80
```
![Screenshot from 2025-03-30 21-46-53](https://github.com/user-attachments/assets/5bafecff-8a22-4513-8736-c4f9cd8a1df0)

```bash
kubectl get pods
```
![Screenshot from 2025-03-30 21-47-24](https://github.com/user-attachments/assets/1c993564-e1f9-4760-8586-302c3d2203d1)

```bash
minikube service devops-final-project
```
![Screenshot from 2025-03-30 21-48-45](https://github.com/user-attachments/assets/ae0fcd40-0ff5-4d6c-a7c0-d9883f150756)

Now the `React Vite Project` will be opened in the `browser` 

![Screenshot from 2025-03-30 20-23-49](https://github.com/user-attachments/assets/675786a4-04ea-412f-8b45-93a7dc724088)
![Screenshot from 2025-03-30 20-24-02](https://github.com/user-attachments/assets/33837b12-808c-4f40-b648-5d3e12dc2139)
![Screenshot from 2025-03-30 20-24-12](https://github.com/user-attachments/assets/0faa6bb6-01a6-4f19-9f67-2f3aad76f2f0)

