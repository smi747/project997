from ultralytics import YOLO
import sys, torch

# Load a pretrained YOLO model (recommended for training)
model = YOLO('yolov8n-cls.pt')

file = input()
# Perform object detection on an image using the model
results = model.predict(source=file, verbose=False)


#print(results[0].probs.top5conf)

a = list(map(lambda x: results[0].names[x], results[0].probs.top5))
b = results[0].probs.top5conf
string = "|"
for i in range(5):
    string += "Объект: " + str(a[i]) + " с вероятностью: " + str("{0:.2f}".format((b[i].item()*100))) + "%<br/>"

sys.stdout.write("{}".format(string))