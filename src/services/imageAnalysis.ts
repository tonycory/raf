import * as tf from '@tensorflow/tfjs-node';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { createWorker } from 'tesseract.js';
import sharp from 'sharp';

export class ImageAnalyzer {
  private ocrWorker: Tesseract.Worker | null = null;
  private objectDetectionModel: cocoSsd.ObjectDetection | null = null;

  async initialize() {
    // Initialize OCR worker
    this.ocrWorker = await createWorker('eng');
    
    // Initialize object detection model
    this.objectDetectionModel = await cocoSsd.load();
  }

  async analyzeImage(imageBuffer: Buffer) {
    try {
      const results = {
        text: await this.extractText(imageBuffer),
        objects: await this.detectObjects(imageBuffer),
        chartAnalysis: await this.analyzeChart(imageBuffer),
      };

      return results;
    } catch (error) {
      console.error('Error analyzing image:', error);
      throw error;
    }
  }

  private async extractText(imageBuffer: Buffer) {
    if (!this.ocrWorker) throw new Error('OCR worker not initialized');

    // Preprocess image for better OCR
    const processedBuffer = await sharp(imageBuffer)
      .greyscale()
      .normalize()
      .toBuffer();

    const { data: { text } } = await this.ocrWorker.recognize(processedBuffer);
    return text;
  }

  private async detectObjects(imageBuffer: Buffer) {
    if (!this.objectDetectionModel) throw new Error('Object detection model not initialized');

    const tensor = tf.node.decodeImage(imageBuffer);
    const predictions = await this.objectDetectionModel.detect(tensor as any);
    (tensor as tf.Tensor).dispose();

    return predictions;
  }

  private async analyzeChart(imageBuffer: Buffer) {
    // Базовый анализ графиков
    // TODO: Добавить специфическую логику для распознавания типов графиков
    // и извлечения данных
    return {
      type: 'chart-detection-pending',
      confidence: 0,
      data: null
    };
  }

  async cleanup() {
    if (this.ocrWorker) {
      await this.ocrWorker.terminate();
    }
  }
} 