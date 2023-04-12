from flask import Flask, request, render_template
import requests

SECRET_API_KEY = open("key.txt", "r").read().strip() # provide your api key here

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/openai-api-response', methods=['POST'])
def response():
    message_history = request.get_json()
    response_json = requests.post(
        'https://api.openai.com/v1/chat/completions',
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {SECRET_API_KEY}'
        },
        json = {
            "model": "gpt-3.5-turbo",
            "messages": message_history,
            "temperature": 0.7
        }
    ).json()
    return response_json['choices'][0]['message']

if __name__ == '__main__':
    app.run(debug=True)
