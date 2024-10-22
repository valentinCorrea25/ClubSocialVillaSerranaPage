
import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from '@lexical/html';

function AutoSavePlugin({setTextoRichText}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Registrar el listener de actualizaciones
    const unregisterListener = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const texto = JSON.stringify(editorState.toJSON());
        const htmlString = $generateHtmlFromNodes(editor);
        setTextoRichText(htmlString)
        // localStorage.setItem('editorContent', jsonString); // Guardar el contenido en localStorage
        console.log('Contenido guardado automáticamente:', texto);
      });
    });

    // Limpia el listener al desmontar el componente
    return () => {
      unregisterListener();
    };
  }, [editor]);

  return null; // Este componente no necesita renderizar nada
}

export default AutoSavePlugin;
