import numpy as np
from keras.applications import VGG16
from keras.applications.vgg16 import preprocess_input
from keras.preprocessing import image

# Load pre-trained VGG16 model (you can use other models as well)
model = VGG16(weights='imagenet', include_top=False, input_shape=(224, 224, 3))

# Function to preprocess and extract features from an image
def extract_features(image_path):
    img = image.load_img(image_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    features = model.predict(img_array)
    return features.flatten()  # Flatten the feature vector

# Function to compute cosine similarity between two feature vectors
def cosine_similarity(feature1, feature2):
    dot_product = np.dot(feature1, feature2)
    norm_feature1 = np.linalg.norm(feature1)
    norm_feature2 = np.linalg.norm(feature2)
    similarity_score = dot_product / (norm_feature1 * norm_feature2)
    return similarity_score

if __name__ == "__main__":
    # Image paths
    uploaded_image_path = "./test-images/image4.jpeg"
    reference_image_path = "./reference-images/image1.jpeg"

    # Extracting features from the uploaded and reference images
    uploaded_image_features = extract_features(uploaded_image_path)
    reference_image_features = extract_features(reference_image_path)

    # Computing cosine similarity between the features
    similarity_score = cosine_similarity(uploaded_image_features, reference_image_features)

    # A threshold for similarity (adjust as needed)
    similarity_threshold = 0.1

    # Check if the similarity score is above the threshold
    if similarity_score >= similarity_threshold:
        print("The uploaded image matches the reference room.")
    else:
        print("The uploaded image does not match the reference room.")
        
    # save this model
    model.save('vgg16_model.h5')

