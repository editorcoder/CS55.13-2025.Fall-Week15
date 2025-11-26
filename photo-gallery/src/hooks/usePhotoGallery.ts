import { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);

  const addNewToGallery = async () => {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    // Create the `fileName` with current timestamp
    const fileName = Date.now() + ".jpeg";

    // Create `savedImageFile` matching `UserPhoto` interface
    const savedImageFile = [
      {
        filepath: fileName,
        webviewPath: capturedPhoto.webPath,
      },
      ...photos,
    ];

    // Update the `photos` array with the new photo
    setPhotos(savedImageFile);
  };

  return {
    addNewToGallery,
    photos,
  };
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}
