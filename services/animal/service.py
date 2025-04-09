from fastapi import FastAPI, Response
import uvicorn
import mysql.connector
from mysql.connector import Error
import datetime
from pydantic import BaseModel

ALIVE = "True"

app = FastAPI()

class Animal(BaseModel):
  name: str
  species: str
  breed: str
  sex: str
  birth_date: str
  owner_name: str

@app.get("/info")
def get_info():
  return  Response("Serviço de animais rodando na porta 8002", status_code=200, media_type="text/plain")

@app.get("/alive")
def is_alive():
  return Response(ALIVE, staus_code=200, media_type="text/plain")

@app.get("/")
def get_animals():
  animals = []
  connection = conn()
  if connection:
    try:
      cursor = connection.cursor()
      cursor.execute("SELECT * FROM animals")
      animals = cursor.fetchall()

      cursor.close()
      connection.close()
    except Error as e:
      print("Erro ao executar a consulta:", e)

    return animals if animals else []
  else:
    return {"error": "Não foi possível conectar ao banco de dados"}

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
      return {"message": "Animal criado com sucesso!"}
    except Error as e:
      return {"error": "Falha ao registrar animal", "message": str(e)}
  else: 
    return {"error": "Não foi possível conectar ao banco de dados"}

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