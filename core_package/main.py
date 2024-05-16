from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
import difflib

app = FastAPI()

# Mount static files directory
app.mount("/static", StaticFiles(directory="app/static"), name="static")

@app.post("/api/compare")
async def compare_text(request: Request):
    data = await request.json()
    text1 = data['text1']
    text2 = data['text2']
    
    diff = difflib.unified_diff(text1.splitlines(), text2.splitlines(), lineterm='')
    diff_output = '\n'.join(diff)
    
    return {"diff": diff_output}