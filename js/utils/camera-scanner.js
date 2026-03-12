/**
 * Camera Scanner Module
 * Dream OS 2026 - QR Code, Document, Barcode Scanner
 * Enterprise Camera API
 */

(function() {
    'use strict';
    
    console.log('📷 [CAMERA SCANNER] Initializing...');
    
    class CameraScanner {
        constructor() {
            this.stream = null;
            this.videoElement = null;
            this.canvasElement = null;
            this.isScanning = false;
            this.scanInterval = null;
        }
        
        // Check camera support
        isSupported() {
            return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
        }
        
        // Request camera permission
        async requestPermission() {
            if (!this.isSupported()) {
                return { granted: false, reason: 'Camera API not supported' };
            }
            try {
                const permission = await navigator.permissions.query({ name: 'camera' });
                return { granted: permission.state === 'granted', state: permission.state };
            } catch(e) {
                return { granted: false, reason: e.message };
            }
        }        
        // Start camera
        async startCamera(videoElementId) {
            if (!this.isSupported()) throw new Error('Camera not supported');
            try {
                this.videoElement = document.getElementById(videoElementId);
                if (!this.videoElement) throw new Error('Video element not found');
                this.stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
                    audio: false
                });
                this.videoElement.srcObject = this.stream;
                return new Promise((resolve) => {
                    this.videoElement.onloadedmetadata = () => {
                        this.videoElement.play();
                        console.log('✅ [CAMERA] Started');
                        resolve(true);
                    };
                });
            } catch(e) {
                console.error('[CAMERA] Error:', e);
                throw e;
            }
        }
        
        // Stop camera
        stopCamera() {
            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop());
                this.stream = null;
            }
            if (this.scanInterval) {
                clearInterval(this.scanInterval);
                this.scanInterval = null;
            }
            this.isScanning = false;
            console.log('⏹️ [CAMERA] Stopped');
        }
        
        // Capture frame from video
        captureFrame() {
            if (!this.videoElement || !this.stream) return null;
            if (!this.canvasElement) this.canvasElement = document.createElement('canvas');
            this.canvasElement.width = this.videoElement.videoWidth;
            this.canvasElement.height = this.videoElement.videoHeight;
            const ctx = this.canvasElement.getContext('2d');
            ctx.drawImage(this.videoElement, 0, 0);
            return this.canvasElement.toDataURL('image/png');
        }
        
        // Take photo
        async takePhoto() {
            const frame = this.captureFrame();
            if (!frame) throw new Error('Cannot capture photo');
            return { imageData: frame, timestamp: new Date().toISOString() };
        }
        
        // Get camera status
        getStatus() {
            return { supported: this.isSupported(), active: this.stream !== null, scanning: this.isScanning };
        }
    }
    
    window.CameraScanner = new CameraScanner();
    console.log('✅ [CAMERA SCANNER] Module loaded');
})();
