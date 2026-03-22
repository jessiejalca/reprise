# Reprise

A web app that turns songs into Anki flashcard decks for language learning.

## Overview

Reprise lets you search for a song in your target language, view the lyrics with translations side by side, select words and phrases to study, and generate a downloadable Anki deck — so you can actually understand the songs stuck in your head.

Currently supports French and Spanish.

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** Python, FastAPI
- **Database:** PostgreSQL (coming soon)
- **APIs:** Spotify, Genius, DeepL

## Getting Started

### Prerequisites

- Node.js
- Python 3.10+
- A virtual environment tool (venv)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Environment Variables

Copy `.env.example` to `.env` in the backend directory and fill in your API keys:

```bash
cp backend/.env.example backend/.env
```

## Running Tests

### Frontend

```bash
cd frontend
npm run test
```

### Backend

```bash
cd backend
pytest
```

## Status

In active development.
