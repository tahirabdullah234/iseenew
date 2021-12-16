from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from keras.models import load_model
from PIL import Image
import numpy as np
import os
import numpy as np

app = Flask(__name__)
CORS(app)
print(os.getcwd())
model = load_model(
    r'C:\Users\abdul\Desktop\iseenew\models\DR_14.h5', compile=True)
symptoms = load_model(
    r'C:\Users\abdul\Desktop\iseenew\models\symptoms training\mode_symp.h5', compile=True)


def reshape_data(x):
    """
    Reshapes arrays into format for MXNet
    INPUT
        img_rows: Array (image) height
        img_cols: Array (image) width
        channels: Specify if image is grayscale(1) or RGB (3)
        nb_classes: number of image classes/ categories
    OUTPUT
        Reshaped array of NumPy arrays
    """
    img_rows = 256
    img_cols = 256
    channels = 3
    x = x.reshape(1, img_rows, img_cols, channels)
    x = x.astype("float32")
    x /= 255
    return x


@ app.route('/classify', methods=['POST'])
def index():
    if request.method == 'POST':
        if 'file' in request.files:
            print(request.files['file'])
            image = request.files['file']
            image.save(image.filename)
            img = Image.open(image.filename).resize((256, 256))
            x = np.array(img)
            print(x.shape)
            x = reshape_data(x)
            prediction = model.predict(x)
            label = prediction.argmax(axis=-1).tolist()
            print("Model Prediction in numpy form")
            print(type(label))
            print(prediction)
            pred = prediction[0][label][0]
            os.remove(image.filename)
            return jsonify({
                'success': True,
                'label': label,
                'accuracy': float(pred),
            })
        else:
            return jsonify({
                'success': False,
                'message': 'No Image Attached'
            })


@ app.route('/symptom', methods=['POST'])
def indexSymp():
    if request.method == "POST":
        # inp = request.json
        # print(request.json)
        print(request.data)
        inp = np.array([int(i) for i in request.form['symptoms'].split(',')])
        print(inp)
        # inp = inp['symptoms']
        inp = inp.reshape((1, 15))
        prediction = symptoms.predict(inp, verbose=1)
        print(prediction)
        return {'request': "true"}


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001, debug=True)

# 10002_left.jpeg - 0
# 1623_right.jpeg - 0
# 1625_left.jpeg - 0
# 10000_left.jpeg - 0
# 10000_right.jpeg - 0
# 10001_right.jpeg - 0
# 10002_right.jpeg - 0
# 10004_left.jpeg - 0
# what is gaussian blur and why it is used
