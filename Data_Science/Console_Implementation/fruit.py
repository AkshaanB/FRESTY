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

@app.route("/predict/one",methods=["POST"])
def predict_one():
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
    foreground = img
    print(label)
    if('apple' in label or 'orange' in label or 'tomato' in label):
        # <<Extracting the object from the image>>
        img = cv2.cvtColor(foreground,cv2.COLOR_RGB2HSV)
        img = cv2.bilateralFilter(img,9,105,105)
        r,g,b=cv2.split(img)
        equalize1= cv2.equalizeHist(r)
        equalize2= cv2.equalizeHist(g)
        equalize3= cv2.equalizeHist(b)
        equalize=cv2.merge((r,g,b))

        equalize = cv2.cvtColor(equalize,cv2.COLOR_RGB2GRAY)

        ret,thresh_image = cv2.threshold(equalize,0,255,cv2.THRESH_OTSU+cv2.THRESH_BINARY)
        equalize= cv2.equalizeHist(thresh_image)


        canny_image = cv2.Canny(equalize,250,255)
        canny_image = cv2.convertScaleAbs(canny_image)
        kernel = np.ones((3,3), np.uint8)
        dilated_image = cv2.dilate(canny_image,kernel,iterations=1)


        contours, hierarchy = cv2.findContours(dilated_image, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        contours= sorted(contours, key = cv2.contourArea, reverse = True)[:10]
        c=contours[0]
        print(cv2.contourArea(c))
        final = cv2.drawContours(img, [c], -1, (255,0, 0), 3)

        mask = np.zeros(img.shape,np.uint8)
        new_image = cv2.drawContours(mask,[c],0,255,-1,)
        new_image = cv2.bitwise_and(foreground, foreground, mask = equalize)

        cv2.imwrite('C:\\Users\\User\\FRESTY\\uploaded_images\\image.png', new_image)
        # ----------------
        # <<Changing the background color to white>>
        image="C:\\Users\\User\\FRESTY\\uploaded_images\\image.png"
        image = cv2.imread(image)
        image[np.where((image==[0,0,0]).all(axis=2))]=[255,255,255]
        cv2.imwrite('C:\\Users\\User\\FRESTY\\uploaded_images\\image_new.png',image)
        # ----------------
        image = cv2.resize(image,(100,100))
        image = tf.cast(image, tf.float32)
        image = tf.keras.preprocessing.image.img_to_array(image)
        image = image/255
        image = np.reshape(image,[1,100,100,3])
        proba = model.predict(image)
        print(proba)
        if proba<=5.0:
            return jsonify({"Quality grading results: ": "It's not good to go to market!"})
        elif 12.0>proba>5.0:
            return jsonify({"Quality grading results: ": "You can decide whether putting it market or not"})
        else:
            return jsonify({"Quality grading results: ": "It's good to go to market!"})
    else:
        return jsonify({"Result: ": "It's neither a fruit nor a vegetable"})


@app.route("/predict/many",methods=["POST"])
def predict_many():
    return jsonify({"Result: ": "Predicting for multiple fruits and vegetables"})



if __name__ == '__main__':
    app.run()