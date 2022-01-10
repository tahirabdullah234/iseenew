from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from keras.layers.pooling import GlobalAveragePooling2D
from keras.models import load_model
from PIL import Image
import numpy as np
import os
import numpy as np
import json
import cv2
from tensorflow.keras.applications.resnet50 import ResNet50

# from keras.layers import GlobalMaxPooling2D

app = Flask(__name__)
CORS(app)
print(os.getcwd())
model = load_model(
    r'C:\Users\abdul\Desktop\iseenew\models\model_dr.h5', compile=True)
symptoms = load_model(
    r'C:\Users\abdul\Desktop\iseenew\models\symptoms training\mode_symp.h5', compile=True)


def crop_image_from_gray(img, tol=7):
    if img.ndim == 2:
        mask = img > tol
        return img[np.ix_(mask.any(1), mask.any(0))]
    elif img.ndim == 3:
        gray_img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
        mask = gray_img > tol

        check_shape = img[:, :, 0][np.ix_(mask.any(1), mask.any(0))].shape[0]
        if (check_shape == 0):  # image is too dark so that we crop out everything,
            return img  # return original image
        else:
            img1 = img[:, :, 0][np.ix_(mask.any(1), mask.any(0))]
            img2 = img[:, :, 1][np.ix_(mask.any(1), mask.any(0))]
            img3 = img[:, :, 2][np.ix_(mask.any(1), mask.any(0))]
            img = np.stack([img1, img2, img3], axis=-1)
        return img


def circle_crop(img, sigmaX=30):
    """
    Create circular crop around image centre
    """
    img = crop_image_from_gray(img)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    height, width, depth = img.shape

    x = int(width/2)
    y = int(height/2)
    r = np.amin((x, y))

    circle_img = np.zeros((height, width), np.uint8)
    cv2.circle(circle_img, (x, y), int(r), 1, thickness=-1)
    img = cv2.bitwise_and(img, img, mask=circle_img)
    img = crop_image_from_gray(img)
    img = cv2.addWeighted(img, 4, cv2.GaussianBlur(
        img, (0, 0), sigmaX), -4, 128)
    return img


def reshape_data(x):
    img_rows = 320
    img_cols = 320
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
            img = cv2.imread(image.filename)
            # img = cv2.resize(img, (320, 320), interpolation=cv2.INTER_AREA)
            x = np.array(img)
            print(x.shape)
            img = circle_crop(x)
            print(img.shape)
            img = cv2.resize(img, (320, 320), interpolation=cv2.INTER_AREA)

            # img.save(r'./'+image.filename)
            x = reshape_data(img)
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
        data = json.loads(request.data)
        print(data)
        symptom = data['symptoms'].split(',')
        # print(symptoms)
        inp = [int(i) for i in symptom]
        if sum(inp) == 0:
            return {'request': "true", "prediction": str(0)}
        else:
            inp = np.array(inp)
            # print(inp)
            # inp = inp['symptoms']
            inp = inp.reshape((1, 15))
            prediction = symptoms.predict(inp, verbose=1)
            print(prediction)
            return {'request': "true", "prediction": str(prediction[0][0])}


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
