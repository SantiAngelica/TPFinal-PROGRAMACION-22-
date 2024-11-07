import requests
import json 
from flask import jsonify


def sendEmail(to_name, from_name, data_message):

    data = {
        'service_id': 'service_nvzvfma',
        'template_id': 'template_uimixqs',
        'user_id': 'I5pi9Kd9YATpJPYBB',
        'template_params': {
            'from_name': from_name,
            'to_name': to_name,
            'message': json.dumps(data_message)
        }
    }

    headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'en-US,en;q=0.9',
        'Origin': 'http://127.0.0.1:8080',  
        'Referer': 'http://127.0.0.1:8080'
    }

    try:
        response = requests.post(
            'https://api.emailjs.com/api/v1.0/email/send',
            data=json.dumps(data),
            headers=headers
        )
        response.raise_for_status()
        return 200
    except requests.exceptions.RequestException as error:
        print(f'Oops... {error}')
        if error.response is not None:
            print(error.response.text)
        return 400

