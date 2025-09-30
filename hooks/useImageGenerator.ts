
import { useState, useCallback } from 'react';
import { generateImagesBatch } from '../services/geminiService';
import { GeneratedImage, GenerationOptions } from '../types';

export default function useImageGenerator() {
    const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const generateImages = useCallback(async (baseIdentity: string, themesInput: string, options: GenerationOptions) => {
        const themes = themesInput.split('\n').map(t => t.trim()).filter(t => t.length > 0);

        if (!baseIdentity.trim() || themes.length === 0) {
            setError("Por favor, forneça uma identidade visual base e pelo menos um tema.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImages([]);

        try {
            const images = await generateImagesBatch(baseIdentity, themes, options);
            if (images.length === 0) {
                setError("Não foi possível gerar nenhuma imagem. Verifique o console para mais detalhes ou tente um prompt diferente.");
            }
            setGeneratedImages(images);
        } catch (e: unknown) {
            console.error(e);
            const errorMessage = e instanceof Error ? e.message : "Ocorreu um erro desconhecido.";
            setError(`Falha ao gerar imagens: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        generatedImages,
        isLoading,
        error,
        generateImages,
    };
}
