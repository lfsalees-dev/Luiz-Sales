
import { GoogleGenAI } from "@google/genai";
import { GenerationOptions, GeneratedImage } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function sanitizeFilename(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9_.]+/g, '_').substring(0, 50);
}

export async function generateImagesBatch(
    baseIdentity: string,
    themes: string[],
    options: GenerationOptions
): Promise<GeneratedImage[]> {
    if (!baseIdentity.trim() || themes.length === 0) {
        return [];
    }

    console.log(`Starting batch generation for ${themes.length} themes.`);

    const allGeneratedImages: GeneratedImage[] = [];

    const generationTasks = themes.map(async (theme) => {
        const prompt = `${theme}, ${baseIdentity}, no text, textless, without words`;
        
        try {
            console.log(`Generating ${options.count} image(s) for theme: "${theme}"`);
            const response = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: prompt,
                config: {
                    numberOfImages: options.count,
                    outputMimeType: 'image/jpeg',
                    aspectRatio: options.aspectRatio,
                },
            });

            const themeImages: GeneratedImage[] = response.generatedImages.map((img, index) => {
                const base64ImageBytes: string = img.image.imageBytes;
                const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
                return {
                    theme: theme,
                    url: imageUrl,
                    filename: `${sanitizeFilename(theme)}_${index + 1}.jpeg`,
                };
            });
            return themeImages;
        } catch (error) {
            console.error(`Failed to generate images for theme: "${theme}"`, error);
            // Return an empty array for this theme to not block others
            return []; 
        }
    });

    const results = await Promise.all(generationTasks);
    
    // Flatten the array of arrays
    results.forEach(themeImages => {
        allGeneratedImages.push(...themeImages);
    });
    
    console.log(`Batch generation complete. Total images: ${allGeneratedImages.length}`);
    return allGeneratedImages;
}
