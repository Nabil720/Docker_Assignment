from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, Flask! This is your first route."

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
