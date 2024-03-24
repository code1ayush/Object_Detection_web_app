from flask import Flask, request, jsonify
import cv2
import numpy as np

app = Flask(__name__)

# Load the pre-trained model and class labels
config_file = 'ssd_mobilenet_v3_large_coco_2020_01_14.pbtxt'
frozen_model = 'frozen_inference_graph.pb'
model = cv2.dnn_DetectionModel(config_file, frozen_model)
class_labels = []
with open('labels.txt', 'rt') as f:
    class_labels = f.read().rstrip('\n').split('\n')

# Object detection route
@app.route('/detect_objects', methods=['POST'])
def detect_objects():
    # Get the image file from the request
    file = request.files['file']
    
    # Read the image file
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    
    # Perform object detection
    model.setInputSize(320, 320)
    model.setInputScale(1.0 / 127.5)
    model.setInputMean((127.5, 127.5, 127.5))
    model.setInputSwapRB(True)
    ClassIndex, confidence, bbox = model.detect(img, confThreshold=0.5)

    class_count = {}
    for ClassInd in ClassIndex.flatten():
        class_label = class_labels[ClassInd - 1]
        class_count[class_label] = class_count.get(class_label, 0) + 1
    
    count_info = ', '.join([f'{count} {label}' for label, count in class_count.items()])
    cv2.putText(img, count_info, (80, 150), cv2.FONT_HERSHEY_SIMPLEX, 6, (0, 0, 255), 20, cv2.LINE_AA)
    
    # Draw rectangles around detected objects
    for ClassInd, conf, boxes in zip(ClassIndex.flatten(), confidence.flatten(), bbox):
        cv2.rectangle(img, boxes, (0, 255, 0), 15)
        cv2.putText(img, class_labels[ClassInd - 1], (boxes[0] + 40, boxes[1] + 40), cv2.FONT_HERSHEY_PLAIN, 15, (255, 0, 0), 10)

    # Encode image to return
    _, img_encoded = cv2.imencode('.jpg', img)
    img_bytes = img_encoded.tobytes()

    # Return the processed image
    return img_bytes, 200, {'Content-Type': 'image/jpeg'}

if __name__ == '__main__':
    app.run(debug=True)

