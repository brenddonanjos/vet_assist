from fastapi import FastAPI, Response
import uvicorn
import json
import mysql.connector
from mysql.connector import Error
import datetime
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

ALIVE = True

app = FastAPI()

#Permitir CORS para acesso via cliente local
origins = ["*",]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class Animal(BaseModel):
  name: str
  species: str
  breed: str
  sex: str
  birth_date: str
  owner_name: str

@app.get("/info")
def get_info():
  return  Response(json.dumps({"message": "Serviço de animais rodando na porta 8002"}), status_code=200, media_type="application/json")

@app.get("/alive")
def is_alive():
  {"alive": ALIVE}
  
  return Response(json.dumps({"alive": ALIVE}), status_code=200, media_type="application/json")

@app.get("/")
def get_animals():
  animals = []
  connection = conn()
  if connection:
    try:
      cursor = connection.cursor()
      cursor.execute("SELECT * FROM animals ORDER BY created_at DESC")
      animals = cursor.fetchall()

      cursor.close()
      connection.close()
      return animals if animals else []
    
    except Error as e:
      return Response(json.dumps({"message": f"Erro ao executar a consulta. Erro: {e} "}), status_code=500, media_type="application/json")

  else:
    return Response(json.dumps({"message": "Não foi possível conectar ao banco de dados"}), status_code=500, media_type="application/json")

@app.post("/")
def create_animal(animal: Animal):
  connection = conn()
  if connection:
    try:
      current_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
      cursor = connection.cursor()
      cursor.execute(
        "INSERT INTO animals (name, species, breed, sex, birth_date, owner_name, created_at) VALUES (%s, %s, %s, %s, %s, %s, %s)", 
        (animal.name, animal.species, animal.breed, animal.sex, animal.birth_date, animal.owner_name, current_date))
      connection.commit()

      cursor.close()
      connection.close()
      return Response(json.dumps({"message": "Animal criado com sucesso!"}), status_code=201, media_type="application/json")
    except Error as e:
      return Response(json.dumps({"message": f"Erro ao registrar animal. Erro: {e} "}), status_code=500, media_type="application/json")
  else: 
    return Response(json.dumps({"message": "Não foi possível conectar ao banco de dados"}), status_code=500, media_type="application/json")

#Conexão com banco de dados
def conn():
    try:
        connection = mysql.connector.connect(
            host="animal_db",
            user="user",
            password="user",
            database="animal_db"
        )
        if connection.is_connected():
            print("Conexão com o banco de dados estabelecida!")
            return connection
    except Error as e:
        print("Erro ao conectar no banco:", e)
    return None

if __name__ == "__main__":
  uvicorn.run("service:app", host="0.0.0.0", port=8000, reload=True)