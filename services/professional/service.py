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

class Professional(BaseModel):
    name: str
    crmv: str
    birth_date: str 

@app.get("/info")
def get_info():
  return  Response(json.dumps({"message": "Serviço de profissionais rodando na porta 8000"}), status_code=200, media_type="application/json")

@app.get("/alive")
def is_alive():
  return Response(json.dumps({"alive": ALIVE}), status_code=200, media_type="application/json")

@app.get("/")
def get_professionals():
  professionals = []
  connection = conn()
  if connection:
    try:
      cursor = connection.cursor()
      cursor.execute("SELECT * FROM professionals ORDER BY created_at DESC")
      professionals = cursor.fetchall()

      cursor.close()
      connection.close()

      return professionals if professionals else []
    
    except Error as e:
      return Response(json.dumps({"message": f"Erro ao executar a consulta de profissionais. Erro: {e} "}), status_code=500, media_type="application/json")
    
  else:
    return Response(json.dumps({"message": "Não foi possível conectar ao banco de dados de profissionais"}), status_code=500, media_type="application/json")
  
@app.post("/")
def create_professional(professional: Professional):
  connection = conn()
  if connection:
    try:
      current_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
      cursor = connection.cursor()
      cursor.execute("INSERT INTO professionals (name, crmv, birth_date, created_at) VALUES (%s, %s, %s, %s)", (professional.name, professional.crmv, professional.birth_date, current_date))
      connection.commit()

      cursor.close()
      connection.close()
      return Response(json.dumps({"message": "Profissional criado com sucesso!"}), status_code=201, media_type="application/json")
    except Error as e:
      return Response(json.dumps({"message": f"Erro ao registrar profissional. Erro: {e} "}), status_code=500, media_type="application/json")
  else:
    return Response(json.dumps({"message": "Não foi possível conectar ao banco de dados de profissionais"}), status_code=500, media_type="application/json")

#Conexão com banco de dados
def conn():
    try:
      connection = mysql.connector.connect(
          host="professional_db",
          user="user",
          password="user",
          database="professional_db"
      )
      if connection.is_connected():
          print("Conexão com o banco de dados estabelecida!")
          return connection
    except Error as e:
      print("Erro ao conectar no banco:", e)
      return None

if __name__ == "__main__":
  uvicorn.run("service:app", host="0.0.0.0", port=8000, reload=True)