
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export default function Header(): React.ReactElement {
    return (
        <header className="mb-8">
            <div className="flex items-center gap-3 mb-2">
                 <div className="bg-indigo-500 p-2 rounded-lg">
                    <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">
                    Gerador de Imagens
                </h1>
            </div>
            <p className="text-slate-400">
                Crie lotes de imagens com uma identidade visual consistente. Defina seu estilo e deixe a IA fazer o resto.
            </p>
        </header>
    );
}
