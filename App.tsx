
import React from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ImageGallery from './components/ImageGallery';
import useImageGenerator from './hooks/useImageGenerator';
import { GenerationOptions } from './types';

export default function App(): React.ReactElement {
    const {
        generatedImages,
        isLoading,
        error,
        generateImages,
    } = useImageGenerator();

    const handleGenerate = (baseIdentity: string, themes: string, options: GenerationOptions) => {
        generateImages(baseIdentity, themes, options);
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row antialiased">
            <aside className="w-full lg:w-1/3 xl:w-1/4 p-6 lg:p-8 bg-slate-950/50 lg:h-screen lg:overflow-y-auto lg:sticky lg:top-0">
                <Header />
                <InputForm onGenerate={handleGenerate} isLoading={isLoading} />
            </aside>
            <main className="w-full lg:w-2/3 xl:w-3/4 p-6 lg:p-8">
                <ImageGallery 
                    images={generatedImages} 
                    isLoading={isLoading} 
                    error={error} 
                />
            </main>
        </div>
    );
}
