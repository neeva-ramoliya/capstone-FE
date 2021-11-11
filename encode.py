import base64

with open("./public/static/3d shyamal output.mp4", "rb") as videoFile:
    text = base64.b64encode(videoFile.read())
    print(text)
    # file = open("3d.txt", "wb") 
    # file.write(text)
    # file.close()