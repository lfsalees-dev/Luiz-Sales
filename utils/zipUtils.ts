
import { GeneratedImage } from '../types';

// These are loaded from CDN in index.html, so we declare them for TypeScript
declare const JSZip: any;
declare const saveAs: any;

function dataURLtoBlob(dataurl: string): Blob {
    const arr = dataurl.split(',');
    if (arr.length < 2) {
        throw new Error('Invalid data URL');
    }
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) {
        throw new Error('Could not find MIME type in data URL');
    }
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

export async function downloadImagesAsZip(images: GeneratedImage[]): Promise<void> {
    if (images.length === 0) {
        alert("Nenhuma imagem para baixar.");
        return;
    }

    try {
        const zip = new JSZip();

        images.forEach(image => {
            const blob = dataURLtoBlob(image.url);
            zip.file(image.filename, blob);
        });

        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, "imagens_geradas.zip");
    } catch (error) {
        console.error("Erro ao criar o arquivo .zip:", error);
        alert("Ocorreu um erro ao tentar criar o arquivo .zip. Verifique o console para mais detalhes.");
    }
}
