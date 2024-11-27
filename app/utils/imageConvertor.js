import * as FileSystem from "expo-file-system";

export async function convertImageToBase64(uri) {
    try {
      const base64Image = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return `data:image/jpeg;base64,${base64Image}`;
    } catch (error) {
      console.error("Error converting image to Base64:", error);
      throw error;
    }
  }
  