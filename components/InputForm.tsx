
import React, { useState } from 'react';
import { GenerationOptions, AspectRatio } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

interface InputFormProps {
    onGenerate: (baseIdentity: string, themes: string, options: GenerationOptions) => void;
    isLoading: boolean;
}

const aspectRatios: { value: AspectRatio; label: string }[] = [
    { value: '1:1', label: 'Quadrado (1:1)' },
    { value: '16:9', label: 'Paisagem (16:9)' },
    { value: '9:16', label: 'Retrato (9:16)' },
];

export default function InputForm({ onGenerate, isLoading }: InputFormProps): React.ReactElement {
    const [baseIdentity, setBaseIdentity] = useState<string>('Fotografia cinematográfica, cores vibrantes, luz suave de entardecer, profundidade de campo rasa, estilo fotorrealista, alta resolução.');
    const [themes, setThemes] = useState<string>('Um astronauta em um campo de flores\nUm robô lendo um livro antigo\nUma cidade flutuante ao pôr do sol');
    const [options, setOptions] = useState<GenerationOptions>({
        count: 2,
        aspectRatio: '1:1',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGenerate(baseIdentity, themes, options);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="base-identity" className="block text-sm font-medium text-slate-300 mb-2">
                    Identidade Visual Base
                </label>
                <textarea
                    id="base-identity"
                    rows={5}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="Ex: Estilo cyberpunk, neon, noite chuvosa..."
                    value={baseIdentity}
                    onChange={(e) => setBaseIdentity(e.target.value)}
                    disabled={isLoading}
                />
            </div>

            <div>
                <label htmlFor="themes" className="block text-sm font-medium text-slate-300 mb-2">
                    Temas (um por linha)
                </label>
                <textarea
                    id="themes"
                    rows={6}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="Um gato com chapéu de mago&#10;Uma floresta de cristal..."
                    value={themes}
                    onChange={(e) => setThemes(e.target.value)}
                    disabled={isLoading}
                />
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Quantidade por Tema
                    </label>
                    <select
                        value={options.count}
                        onChange={(e) => setOptions({ ...options, count: parseInt(e.target.value, 10) })}
                        disabled={isLoading}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    >
                        {[1, 2, 3, 4].map(num => (
                            <option key={num} value={num}>{num} imagem{num > 1 ? 'ns' : ''}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Proporção
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {aspectRatios.map(({ value, label }) => (
                            <button
                                key={value}
                                type="button"
                                onClick={() => setOptions({ ...options, aspectRatio: value })}
                                disabled={isLoading}
                                className={`px-3 py-2 text-xs font-semibold rounded-md transition text-center ${options.aspectRatio === value ? 'bg-indigo-600 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Gerando...
                    </>
                ) : (
                    <>
                        <SparklesIcon className="w-5 h-5" />
                        Gerar Imagens
                    </>
                )}
            </button>
        </form>
    );
}
