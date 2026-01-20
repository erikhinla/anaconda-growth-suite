"""
Eva Paradis Brand Bridge - Backend API
Flask application for handling Brevo CRM integration and lead management.

This backend serves as a proxy between the frontend and Brevo API,
protecting the API key and enabling server-side automation triggers.

Usage:
    1. Set environment variables (BREVO_API_KEY)
    2. Run: python app.py
    3. API endpoint: POST /api/subscribe

Environment Variables:
    BREVO_API_KEY - Your Brevo API key
    LIST_ID_EVA_MAIN - Brevo list ID for Eva Paradis subscribers (default: 2)
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Enable CORS for frontend requests
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:*", "http://127.0.0.1:*", "https://*.vercel.app", "https://*.netlify.app"],
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Configuration
BREVO_API_KEY = os.environ.get("BREVO_API_KEY", "YOUR_BREVO_API_KEY")
BREVO_URL = "https://api.brevo.com/v3/contacts"
LIST_ID_EVA_MAIN = int(os.environ.get("LIST_ID_EVA_MAIN", 2))

# Headers for Brevo API requests
BREVO_HEADERS = {
    "accept": "application/json",
    "content-type": "application/json",
    "api-key": BREVO_API_KEY
}


def validate_email(email: str) -> bool:
    """Basic email validation."""
    import re
    pattern = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
    return bool(re.match(pattern, email))


@app.route('/api/subscribe', methods=['POST', 'OPTIONS'])
def subscribe():
    """
    Subscribe a new lead to the Eva Paradis mailing list.

    Request Body:
        {
            "email": "user@example.com",
            "source": "brand_bridge"  // Optional
        }

    Response:
        Success (200): {"status": "success", "message": "User subscribed"}
        Error (400): {"status": "error", "message": "Error description"}
    """
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        return '', 204

    try:
        data = request.json

        if not data:
            return jsonify({
                "status": "error",
                "message": "No data provided"
            }), 400

        user_email = data.get('email', '').strip().lower()
        source = data.get('source', 'brand_bridge')

        # Validate email
        if not user_email:
            return jsonify({
                "status": "error",
                "message": "Email is required"
            }), 400

        if not validate_email(user_email):
            return jsonify({
                "status": "error",
                "message": "Invalid email format"
            }), 400

        # Prepare Brevo payload
        payload = {
            "email": user_email,
            "attributes": {
                "SOURCE": source.upper(),
                "STATUS": "Lead",  # Initial status: Browsed & Submitted
                "INTEREST": "VR_Experience",
                "SIGNUP_DATE": datetime.now().strftime("%Y-%m-%d"),
                "SIGNUP_TIME": datetime.now().strftime("%H:%M:%S")
            },
            "listIds": [LIST_ID_EVA_MAIN],
            "updateEnabled": True  # Update if contact exists
        }

        logger.info(f"Subscribing email: {user_email[:3]}***@{user_email.split('@')[1]}")

        # Send to Brevo
        response = requests.post(
            BREVO_URL,
            json=payload,
            headers=BREVO_HEADERS,
            timeout=10
        )

        # Handle Brevo response
        if response.status_code in [200, 201, 204]:
            logger.info(f"Successfully subscribed: {user_email[:3]}***")
            return jsonify({
                "status": "success",
                "message": "User subscribed"
            }), 200

        elif response.status_code == 400:
            # Check for duplicate (which is fine due to updateEnabled)
            error_data = response.json() if response.text else {}
            if error_data.get('code') == 'duplicate_parameter':
                logger.info(f"Contact already exists, updated: {user_email[:3]}***")
                return jsonify({
                    "status": "success",
                    "message": "Contact updated"
                }), 200

            logger.warning(f"Brevo error: {error_data}")
            return jsonify({
                "status": "error",
                "message": error_data.get('message', 'Subscription failed')
            }), 400

        else:
            logger.error(f"Brevo API error: {response.status_code} - {response.text}")
            return jsonify({
                "status": "error",
                "message": "Subscription service unavailable"
            }), 500

    except requests.exceptions.Timeout:
        logger.error("Brevo API timeout")
        return jsonify({
            "status": "error",
            "message": "Service temporarily unavailable"
        }), 503

    except requests.exceptions.RequestException as e:
        logger.error(f"Request error: {str(e)}")
        return jsonify({
            "status": "error",
            "message": "Network error"
        }), 500

    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return jsonify({
            "status": "error",
            "message": "An unexpected error occurred"
        }), 500


@app.route('/api/update-status', methods=['POST'])
def update_status():
    """
    Update a contact's status in Brevo.
    Used when tracking higher-intent actions (e.g., clicking OnlyFans link).

    Request Body:
        {
            "email": "user@example.com",
            "status": "Hot_Lead"  // Lead, Hot_Lead, Clicker, Subscriber
        }
    """
    try:
        data = request.json
        user_email = data.get('email', '').strip().lower()
        new_status = data.get('status', 'Hot_Lead')

        if not user_email or not validate_email(user_email):
            return jsonify({
                "status": "error",
                "message": "Valid email required"
            }), 400

        # Update contact in Brevo
        update_url = f"{BREVO_URL}/{requests.utils.quote(user_email)}"
        payload = {
            "attributes": {
                "STATUS": new_status,
                "LAST_ACTION_DATE": datetime.now().strftime("%Y-%m-%d")
            }
        }

        response = requests.put(
            update_url,
            json=payload,
            headers=BREVO_HEADERS,
            timeout=10
        )

        if response.status_code in [200, 204]:
            return jsonify({
                "status": "success",
                "message": "Contact status updated"
            }), 200
        else:
            return jsonify({
                "status": "error",
                "message": "Failed to update contact"
            }), 400

    except Exception as e:
        logger.error(f"Update status error: {str(e)}")
        return jsonify({
            "status": "error",
            "message": "An error occurred"
        }), 500


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint for monitoring."""
    return jsonify({
        "status": "healthy",
        "service": "Eva Paradis Brand Bridge API",
        "timestamp": datetime.now().isoformat()
    }), 200


if __name__ == '__main__':
    # Development server
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_DEBUG', 'True').lower() == 'true'

    print(f"""
    ╔════════════════════════════════════════════════════════════╗
    ║           Eva Paradis Brand Bridge API Server              ║
    ╠════════════════════════════════════════════════════════════╣
    ║  Endpoints:                                                ║
    ║    POST /api/subscribe    - Subscribe new lead             ║
    ║    POST /api/update-status - Update contact status         ║
    ║    GET  /api/health       - Health check                   ║
    ╠════════════════════════════════════════════════════════════╣
    ║  Running on: http://localhost:{port}                         ║
    ╚════════════════════════════════════════════════════════════╝
    """)

    app.run(host='0.0.0.0', port=port, debug=debug)
