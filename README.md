# albawani-request-form

## Environment Setup

1. Prepare the enviromment. It is recommended that you use Python 3.13 and venv.

```
python3 -m venv albawani-request-form
```

2. Activate the environment.
```
source albawani-request-form/bin/activate
```

3. Install dependencies and packages (Unlikely to get conflicts if you have venv, let the dependency resolver do its thing).

```
pip install -r requirements.txt
```

## Startup Command

The app is configured to run on port 8000. If you do not like it, you may have to tweak `const BACKEND_URL` in `script.js`.
```
gunicorn --workers 2 --worker-connections 1000 --max-requests 1000 --bind 0.0.0.0:8000 --timeout 1000 main:app 

```