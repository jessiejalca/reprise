from fastapi import FastAPI

app = FastAPI(title="Reprise")

@app.get("/health")
def health_check():
    return {"status": "ok"}