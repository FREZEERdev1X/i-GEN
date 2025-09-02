import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { generateImage, editImage } from '../services/geminiService';
import Spinner from './Spinner';

const aspectRatios = ["1:1", "16:9", "9:16", "4:3", "3:4"];

const ImageGenerator: React.FC = () => {
  const { t } = useLocalization();
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    setEditPrompt('');

    try {
      const imageUrl = await generateImage(prompt, aspectRatio);
      setGeneratedImage(imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errorGeneral'));
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDownload = () => {
    if(!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `frezeer-igen-${prompt.slice(0,20).replace(/\s/g, '_')}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleEdit = async () => {
    if (!editPrompt.trim() || !generatedImage) return;

    setIsEditing(true);
    setError(null);

    try {
      const imageUrl = await editImage(generatedImage, editPrompt);
      setGeneratedImage(imageUrl);
      setEditPrompt(''); // Clear prompt after successful edit
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errorGeneral'));
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center space-y-6 animate-fade-in-up">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">{t('title')}</h2>
        <p className="text-md md:text-lg text-slate-500 dark:text-slate-400 mt-2">{t('subtitle')}</p>
      </div>

      <div className="w-full max-w-2xl p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 transition-all duration-300">
        <div className="flex flex-col space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t('promptPlaceholder')}
            className="w-full h-24 p-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 transition-all text-slate-800 dark:text-slate-200"
            disabled={isLoading || isEditing}
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow">
               <label htmlFor="aspect-ratio" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">{t('aspectRatio')}</label>
               <select 
                id="aspect-ratio"
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full p-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 transition-all text-slate-800 dark:text-slate-200"
                disabled={isLoading || isEditing}
               >
                {aspectRatios.map(ratio => <option key={ratio} value={ratio}>{ratio}</option>)}
               </select>
            </div>
            <button
              onClick={handleGenerate}
              disabled={isLoading || isEditing || !prompt.trim()}
              className="self-end w-full sm:w-auto mt-5 px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg shadow-md hover:scale-105 disabled:hover:scale-100 transform transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading && <Spinner />}
              {isLoading ? t('generatingButton') : t('generateButton')}
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl h-auto min-h-[256px] flex items-center justify-center mt-6">
        {isLoading && (
           <div className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
             <Spinner large={true} />
             <p className="mt-4 text-lg">{t('generatingButton')}</p>
           </div>
        )}
        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-600 rounded-lg text-center">
            <h3 className="font-bold text-red-800 dark:text-red-200">{t('errorTitle')}</h3>
            <p className="text-red-600 dark:text-red-300">{error}</p>
          </div>
        )}
        {generatedImage && (
          <div className="w-full relative group animate-fade-in-up">
            <img src={generatedImage} alt={prompt} className="rounded-lg shadow-2xl w-full object-contain" />
            <button 
              onClick={handleDownload}
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={t('download')}
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {generatedImage && !isLoading && (
        <div className="w-full max-w-2xl p-4 mt-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 transition-all duration-300 animate-fade-in-up">
            <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">{t('editImageTitle')}</h3>
            <div className="flex flex-col space-y-4">
                <textarea
                    value={editPrompt}
                    onChange={(e) => setEditPrompt(e.target.value)}
                    placeholder={t('editPromptPlaceholder')}
                    className="w-full h-20 p-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 transition-all text-slate-800 dark:text-slate-200"
                    disabled={isEditing}
                />
                <button
                    onClick={handleEdit}
                    disabled={isEditing || !editPrompt.trim()}
                    className="self-end w-full sm:w-auto px-6 py-3 font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-md hover:scale-105 disabled:hover:scale-100 transform transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isEditing && <Spinner />}
                    {isEditing ? t('editingButton') : t('editButton')}
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;