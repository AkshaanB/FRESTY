import flask
from flask import Flask, jsonify, request
import tensorflow as tf
import cv2
import cvlib as cv
import numpy as np
import os

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, Flask!"

# @app.route("/predict",methods=['POST','GET'])
# def predict():
#     file_name = 'fresty.h5'
#     model = tf.keras.models.load_model(file_name)
#     return "Quality grading..."

# APP_ROOT = os.path.dirname(os.path.abspath(__file__))
# target = os.path.join(APP_ROOT,'uploaded_images/')

@app.route("/predict",methods=["POST"])
def predict():
    imagefile = request.files.get('imagefile', '')
    imagefile.save('C:\\Users\\User\\FRESTY\\uploaded_images\\test_image.jpg')
    file_name = 'C:\\Users\\User\\fresty.h5'
    model = tf.keras.models.load_model(file_name)
    print ("Model loded")
    model.compile(optimizer='adam',
              loss=tf.keras.losses.BinaryCrossentropy(from_logits=True),
              metrics=['accuracy'])
    img = cv2.imread('C:\\Users\\User\\FRESTY\\uploaded_images\\test_image.jpg')
    bbox, label, conf = cv.detect_common_objects(img)
    # output_image = draw_bbox(im, bbox, label, conf)
    print(label)
    if('apple' in label or 'orange' in label or 'tomato' in label):
        img = cv2.resize(img,(100,100))
        img = tf.cast(img, tf.float32)
        img = tf.keras.preprocessing.image.img_to_array(img)
        img = img/255
        img = np.reshape(img,[1,100,100,3])
        proba = model.predict(img)
        print(proba)
        if proba<=5.0:
            return jsonify({"Quality grading results: ": "It's not good to go to market!"})
        elif 12.0>proba>5.0:
            return jsonify({"Quality grading results: ": "You can decide whether putting it market or not"})
        else:
            return jsonify({"Quality grading results: ": "It's good to go to market!"})
    else:
        return jsonify({"Result: ": "It's neither a fruit nor a vegetable"})

if __name__ == '__main__':
    app.run()