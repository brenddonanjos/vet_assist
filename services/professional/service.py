from fastapi import FastAPI, Response
import uvicorn
import mysql.connector
from mysql.connector import Error
import datetime
from pydantic import BaseModel

ALIVE = "True"

app = FastAPI()

class Professional(BaseModel):
    name: str
    crmv: str
    birth_date: str 

@app.get("/info")
def get_info():
  return  Response("Serviço de profissionais rodando na porta 8000", status_code=200, media_type="text/plain")

@app.get("/alive")
def is_alive():
  return Response(ALIVE, staus_code=200, media_type="text/plain")

@app.get("/")
def get_professionals():
  professionals = []
  connection = conn()
  if connection:
    try:
      cursor = connection.cursor()
      cursor.execute("SELECT * FROM professionals")
      professionals = cursor.fetchall()

      cursor.close()
      connection.close()

    except Error as e:
      print("Erro ao executar a consulta:", e)
      
    return professionals if professionals else []
  else:
    return {"error": "Não foi possível conectar ao banco de dados"}
  
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
      return {"message": "Profissional criado com sucesso!"}
    except Error as e:
      return {"error": "Falha ao registrar profissional", "message": str(e)}
  else:
    return {"error": "Não foi possível conectar ao banco de dados"}

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