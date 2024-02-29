import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

export default class Model {
  constructor() {
    this.model = null;
  }

  async load() {
    this.model = await mobilenet.load();
  }

  async predict(imageInput, databaseImages) {
    const similarityThreshold = 0.1;
    const imageInputFeatures = await this.extractFeatures(imageInput);

    for (const databaseImage of databaseImages) {
      const databaseImageFeatures = await this.extractFeatures(databaseImage);
      const similarityScore = this.cosineSimilarity(imageInputFeatures, databaseImageFeatures);

      if (similarityScore < similarityThreshold) {
        return false;
      }
    }

    return true;
  }

  async extractFeatures(image) {
    const tensorImage = tf.browser.fromPixels(image);
    const resizedImage = tf.image.resizeBilinear(tensorImage, [224, 224]);
    const expandedImage = tf.expandDims(resizedImage, 0);
    const normalizedImage = tf.div(expandedImage, tf.scalar(255));
    const features = await this.model.predict(normalizedImage);
    return features;
  }

  cosineSimilarity(features1, features2) {
    const dotProduct = tf.matMul(features1, tf.transpose(features2));
    const normFeatures1 = tf.norm(features1);
    const normFeatures2 = tf.norm(features2);
    const similarity = tf.div(dotProduct, tf.mul(normFeatures1, normFeatures2));
    return similarity.dataSync()[0];
  }

  async save() {
    await this.model.save('localstorage://my-model');
  }
}