import flask
import requests
from flask import Flask, jsonify, request, send_file
import tensorflow as tf
import cv2
import cvlib as cv
from cvlib.object_detection import draw_bbox
import numpy as np
import os
import db
from flask_cors import cross_origin
from flask_pymongo import PyMongo
from datetime import datetime
import io

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb+srv://fresty_grading:20181234@fresty-quality-grading-gebmh.mongodb.net/accounts?retryWrites=true&w=majority'
mongo = PyMongo(app)

@app.route("/hello")
@cross_origin()
def home():
    f = request.files['file']  
    f.save(f.filename)
    print(response.json())

@app.route("/test", methods=['GET', 'POST'])
def test():
    db.db.predictedimages_collection.insert_one({"name": "Akshaan"})
    return jsonify({"Results: ": "Connected to the data base!"})

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
    imagefile.save('./uploaded_images/test_image_one.jpg')
    img = cv2.imread('./uploaded_images/test_image_one.jpg')
    bbox, label, conf = cv.detect_common_objects(img)
    foreground = img
    print(label)
    if('apple' in label or 'orange' in label or 'tomato' in label):
        # <<Extracting the object from the image>>
        image = cv2.cvtColor(foreground,cv2.COLOR_RGB2HSV)
        image = cv2.bilateralFilter(image,9,105,105)
        r,g,b=cv2.split(image)
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
        final = cv2.drawContours(image, [c], -1, (255,0, 0), 3)

        mask = np.zeros(image.shape,np.uint8)
        new_image = cv2.drawContours(mask,[c],0,255,-1,)
        new_image = cv2.bitwise_and(foreground, foreground, mask = equalize)

        # cv2.imwrite('C:\\Users\\User\\FRESTY\\uploaded_images\\image.png', new_image)
        # ----------------
        # <<Changing the background color to white>>
        # image="C:\\Users\\User\\FRESTY\\uploaded_images\\image.png"
        # image = cv2.imread(image)
        new_image[np.where((new_image==[0,0,0]).all(axis=2))]=[255,255,255]
        # cv2.imwrite('../image_new.png',image)
        # img = cv2.imread('C:\\Users\\User\\FRESTY\\uploaded_images\\image_new.png')
        # ----------------
        result = prediction(new_image)
        now = datetime.now()
        date_time = now.strftime("%d_%m_%Y_%H_%M_%S")
        path_1 = './uploaded_images/image_'
        extension = '.png'
        image_name = 'image_'+date_time+extension
        image_new = path_1+date_time+extension
        cv2.imwrite(image_new,new_image)
        # database = db.test_collection
        # data=open(image_new, encoding="utf8", errors='ignore')
        # thedata=data.read()
        # image = {
        #     "file_name": image_name,
        #     "contents" : imagefile
        # }
        # database.insert(image)
        # content = cv2.imread(image_new)
        # url="https://imageupload-unexpected-otter-ow.cfapps.eu10.hana.ondemand.com/predictedImages"
        # response = requests.post(url, data={'image':content,'results':result})
        # # mongo.db.test_collection.insert({'image':image_name,'result':result,'one/many':'one'})
        # print(response.status_code)
        if 'imagefile' in request.files:
            imagefile = request.files['imagefile']
            imagefile.filename = image_name
            mongo.save_file(imagefile.filename,imagefile)
            mongo.db.predictedimages.insert_one({"email ": "akshaanbandara@gmail.com","filename ": imagefile.filename,"results ": result,"count ":"one"})
            print("Image saved to database successfully!")
        # final_image = send_file(new_image,attachment_filename=image_name, mimetype='image/png')
        return jsonify({"Quality grading results: ": result})
    else:
        return jsonify({"Results: ": "It neither a fruit nor a vegetable"})


@app.route("/predict/many",methods=["POST"])
def predict_many():
    imagefile = request.files.get('imagefile', '')
    imagefile.save('./uploaded_images/test_image_many.jpg')
    img = cv2.imread('./uploaded_images/test_image_many.jpg')
    img_dummy = cv2.imread('./uploaded_images/test_image_many.jpg')
    bbox, label, conf = cv.detect_common_objects(img)
    output_image = draw_bbox(img, bbox, label, conf)
    new_image = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    i=0
    for value in label:
        if value == 'apple':
            val = label.index('apple')
            crop_img = img_dummy[bbox[i][1]:bbox[i][3], bbox[i][0]:bbox[i][2]]
            crop_img = cv2.cvtColor(crop_img, cv2.COLOR_BGR2RGB)
            img = image_creation(crop_img)
            result = prediction(img)
            now = datetime.now()
            date_time = now.strftime("%d_%m_%Y_%H_%M_%S")
            path_1 = './uploaded_images/image_'
            extension = '.png'
            image_name = 'image_'+date_time+extension
            image_new = path_1+date_time+extension
            img_final = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            cv2.imwrite(image_new,img_final)
            # mongo.db.save_file(image_name,new_image)
            # mongo.db.test_collection.insert({'image':image_name,'result':result,'one/many':'many'})
            print ("Quality grading results: ", result)
        if value == 'orange':
            val = label.index('orange')
            crop_img = img_dummy[bbox[i][1]:bbox[i][3], bbox[i][0]:bbox[i][2]]
            crop_img = cv2.cvtColor(crop_img, cv2.COLOR_BGR2RGB)
            img = image_creation(crop_img)
            result = prediction(img)
            now = datetime.now()
            date_time = now.strftime("%d_%m_%Y_%H_%M_%S")
            path_1 = './uploaded_images/image_'
            extension = '.png'
            image_name = 'image_'+date_time+extension
            image_new = path_1+date_time+extension
            img_final = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            cv2.imwrite(image_new,img_final)
            # mongo.db.save_file(image_name,new_image)
            # mongo.db.test_collection.insert({'image':image_name,'result':result,'one/many':'many'})
            print ("Quality grading results: ", result)
        if value == 'tomato':
            val = label.index('tomato')
            crop_img = img_dummy[bbox[i][1]:bbox[i][3], bbox[i][0]:bbox[i][2]]
            crop_img = cv2.cvtColor(crop_img, cv2.COLOR_BGR2RGB)
            img = image_creation(crop_img)
            result = prediction(img)
            now = datetime.now()
            date_time = now.strftime("%d_%m_%Y_%H_%M_%S")
            path_1 = './uploaded_images/image_'
            extension = '.png'
            image_name = 'image_'+date_time+extension
            image_new = path_1+date_time+extension
            img_final = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            cv2.imwrite(image_new,img_final)
            # mongo.db.save_file(image_name,new_image)
            # mongo.db.test_collection.insert({'image':image_name,'result':result,'one/many':'many'})
            print ("Quality grading results: ", result)
        i=i+1
    if 'imagefile' in request.files:
            imagefile = request.files['imagefile']
            imagefile.filename = image_name
            mongo.save_file(imagefile.filename,imagefile)
            mongo.db.predictedimages.insert_one({"email ": "akshaanbandara@gmail.com","filename ": imagefile.filename, "original / created: " : "original"})
            print("Image saved to database successfully!")
    return jsonify({"Results: ": "Process successfully ended"})


def image_creation(foreground):
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
        new_image[np.where((new_image==[0,0,0]).all(axis=2))]=[255,255,255]
        return new_image


def prediction(new_image):
    file_name = 'fresty.h5'
    model = tf.keras.models.load_model(file_name)
    print ("Model loded")
    model.compile(optimizer='adam',
                  loss=tf.keras.losses.BinaryCrossentropy(from_logits=True),
                  metrics=['accuracy'])
    image = cv2.resize(new_image,(100,100))
    image = tf.cast(image, tf.float32)
    image = tf.keras.preprocessing.image.img_to_array(image)
    image = image/255
    image = np.reshape(image,[1,100,100,3])
    proba = model.predict(image)
    print(proba)
    if proba<=0.0:
        return "It's not good to go to market!"
    elif 12.0>proba>0.0:
        return "You can decide whether putting it market or not"
    else:
        return "It's good to go to market!"

if __name__ == '__main__':
    app.run()