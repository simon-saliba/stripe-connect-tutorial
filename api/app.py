import json
import os

import stripe

stripe.api_key = "sk_test_51IyLknBE4nCaoI6V9vCpJK9vWpDS2jjX5PYm2rGXHIsBt56T7RNvjr324jFM0LWvdV2ZRttlv7Gy1bFJW51zwihp00z7xAoQ6r"
from flask import Flask, render_template, jsonify, request


app = Flask(__name__, static_folder=".", static_url_path="", template_folder=".")


@app.route("/create-payment-intent", methods=["POST"])
def create_payment():
    try:
        data = json.loads(request.data)
        if "amount" in data:
            try:
                intent = stripe.PaymentIntent.create(
                    amount=data["amount"], currency="usd"
                )
                return jsonify({"clientSecret": intent["client_secret"]})
            except ValueError as e:
                return jsonify(error=str(e)), 403
        else:
            return jsonify(error="No amount to pay in request"), 403
    except Exception as e:
        return jsonify(error=str(e)), 403


if __name__ == "__main__":
    app.run()
