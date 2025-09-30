
import React from 'react';
import { GeneratedImage } from '../types';
import { downloadImagesAsZip } from '../utils/zipUtils';
import Loader from './Loader';
import { DownloadIcon } from './icons/DownloadIcon';

interface ImageGalleryProps {
    images: GeneratedImage[];
    isLoading: boolean;
    error: string | null;
}

const WelcomeState: React.FC = () => (
    <div className="text-center">
        <div className="mx-auto bg-slate-800 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        </div>
        <h3 className="text-lg font-semibold text-white">Sua galeria de imagens aparecerá aqui</h3>
        <p className="text-slate-400 mt-1">Preencha o formulário e clique em "Gerar" para começar.</p>
    </div>
);

const ErrorState: React.FC<{ message: string }> = ({ message }) => (
    <div className="text-center p-6 bg-red-900/20 border border-red-500/30 rounded-lg">
        <h3 className="text-lg font-semibold text-red-400">Ocorreu um Erro</h3>
        <p className="text-red-400/80 mt-1">{message}</p>
    </div>
);

export default function ImageGallery({ images, isLoading, error }: ImageGalleryProps): React.ReactElement {

    const handleDownloadAll = () => {
        downloadImagesAsZip(images);
    };
    
    const hasImages = images.length > 0;

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Galeria</h2>
                {hasImages && !isLoading && (
                    <button
                        onClick={handleDownloadAll}
                        className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                        <DownloadIcon className="w-4 h-4" />
                        Baixar Tudo (.zip)
                    </button>
                )}
            </div>

            <div className="relative p-4 bg-slate-950/50 rounded-lg min-h-[60vh] flex items-center justify-center">
                {isLoading && <Loader />}
                {!isLoading && error && <ErrorState message={error} />}
                {!isLoading && !error && !hasImages && <WelcomeState />}
                {!isLoading && !error && hasImages && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 w-full">
                        {images.map((image, index) => (
                            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg aspect-square">
                                <img src={image.url} alt={image.theme} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="absolute bottom-0 left-0 p-3 text-xs text-white capitalize">{image.theme}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
