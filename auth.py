from functools import wraps

from flask import session, redirect, url_for
import msal

from config import settings


def build_msal_app():
    return msal.ConfidentialClientApplication(
        client_id=settings.AZURE_CLIENT_ID,
        client_credential=settings.AZURE_CLIENT_SECRET,
        authority=settings.AUTHORITY
    )

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if "user" not in session:
            return redirect(url_for("login"))
        return f(*args, **kwargs)
    return decorated

def get_user_client():
    user = session["user"]

    safe_user = {
        "name": user.get("name", "Unknown User"),
        "email": user.get("preferred_username", "unknown@email.com")
    }

    return safe_user

