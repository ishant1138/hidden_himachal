from flask import Flask, request, jsonify, send_from_directory, render_template_string
import os
import json
from datetime import datetime

app = Flask(__name__, static_folder='.')

# File to store form submissions
SUBMISSIONS_FILE = 'form_submissions.json'

def load_submissions():
    if os.path.exists(SUBMISSIONS_FILE):
        with open(SUBMISSIONS_FILE, 'r') as f:
            return json.load(f)
    return []

def save_submission(submission):
    submissions = load_submissions()
    submissions.append(submission)
    with open(SUBMISSIONS_FILE, 'w') as f:
        json.dump(submissions, f, indent=2)

# Serve static files
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/kinnaur')
def kinnaur():
    return send_from_directory('.', 'kinnaur.html')

@app.route('/chanshal')
def chanshal():
    return send_from_directory('.', 'chanshal.html')

@app.route('/dodra-kwar')
def dodra_kwar():
    return send_from_directory('.', 'dodra-kwar.html')

@app.route('/reviews')
def reviews():
    return send_from_directory('.', 'reviews.html')

# Admin page to view submissions
@app.route('/admin')
def admin():
    submissions = load_submissions()
    admin_template = '''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Form Submissions</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .submission { 
                border: 1px solid #ddd; 
                padding: 15px; 
                margin-bottom: 15px; 
                border-radius: 5px;
                background-color: #f9f9f9;
            }
            .submission h3 { margin-top: 0; color: #333; }
            .submission p { margin: 5px 0; }
            .timestamp { color: #666; font-size: 0.9em; }
            .no-submissions { color: #666; font-style: italic; }
        </style>
    </head>
    <body>
        <h1>Form Submissions</h1>
        {% if submissions %}
            {% for submission in submissions %}
            <div class="submission">
                <h3>Submission from {{ submission.name }}</h3>
                <p><strong>Email:</strong> {{ submission.email }}</p>
                <p><strong>Phone:</strong> {{ submission.phone }}</p>
                <p><strong>Message:</strong> {{ submission.message }}</p>
                <p class="timestamp">Submitted on: {{ submission.timestamp }}</p>
            </div>
            {% endfor %}
        {% else %}
            <p class="no-submissions">No submissions yet.</p>
        {% endif %}
    </body>
    </html>
    '''
    return render_template_string(admin_template, submissions=submissions)

# Handle form submissions
@app.route('/submit-review', methods=['POST'])
def submit_review():
    data = request.form
    submission = {
        'name': data.get('name'),
        'email': data.get('email'),
        'message': data.get('message'),
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    save_submission(submission)
    return jsonify({'message': 'Review submitted successfully!'})

@app.route('/contact', methods=['POST'])
def contact():
    data = request.form
    submission = {
        'name': data.get('name'),
        'email': data.get('email'),
        'phone': data.get('phone'),
        'message': data.get('message'),
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    save_submission(submission)
    return jsonify({'message': 'Message sent successfully!'})

if __name__ == '__main__':
    app.run(debug=True) 