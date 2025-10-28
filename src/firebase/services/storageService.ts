import { storage } from '../index'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

// Upload avatar to Firebase Storage
export const uploadAvatar = async (
  userId: string,
  file: File
): Promise<string> => {
  try {
    // Create a reference to the file path
    const avatarRef = ref(storage, `avatars/${userId}/${file.name}`)
    
    // Upload the file
    const snapshot = await uploadBytes(avatarRef, file)
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref)
    return downloadURL
  } catch (error) {
    console.error('Error uploading avatar:', error)
    throw error
  }
}

// Delete avatar from Firebase Storage
export const deleteAvatar = async (filePath: string): Promise<void> => {
  try {
    const fileRef = ref(storage, filePath)
    await deleteObject(fileRef)
  } catch (error) {
    console.error('Error deleting avatar:', error)
    throw error
  }
}