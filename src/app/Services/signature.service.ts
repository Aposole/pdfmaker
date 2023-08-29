import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignatureService {
  private signatureImageUrls: string[] = [];

  constructor() {}

  generateUniqueImageUrl(): string {
    // Generate a unique image URL, for example, using a timestamp
    const timestamp = new Date().getTime();
    const uniqueImageUrl = `https://example.com/signature/${timestamp}.png`;

    return uniqueImageUrl;
  }

  saveSignatureImageUrl(imageUrl: string): void {
    // Save the generated image URL to the array
    this.signatureImageUrls.push(imageUrl);
  }

  getSignatureImageUrls(): string[] {
    // Return the array of saved signature image URLs
    return this.signatureImageUrls;
  }
}
