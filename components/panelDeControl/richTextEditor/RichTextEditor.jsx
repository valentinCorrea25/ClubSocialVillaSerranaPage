/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode } from "@lexical/rich-text";
import { $getRoot, $insertNodes, createEditor, ParagraphNode } from "lexical";
import { $generateNodesFromDOM } from "@lexical/html";
import "./styles.css";
import * as parse5 from "parse5";

import ExampleTheme from "./ExampleTheme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import AutoSavePlugin from "./plugins/AutoSavePlugin";
import { useEffect } from "react";

const placeholder = "Texto...";

export default function App({ setTextoRichText, initialHTML = "" }) {
  const editorConfig = {
    namespace: "React.js Demo",
    nodes: [HeadingNode, ParagraphNode],
    onError(error) {
      throw error;
    },
    theme: ExampleTheme,
    // Add initial state configuration
    editorState: () => {
      const editor = createEditor();
      if (initialHTML && typeof initialHTML === "string") {
        try {
          // In the browser you can use the native DOMParser API to parse the HTML string.
          const parser = new DOMParser();
          const dom = parser.parseFromString(initialHTML, "text/html");

          // Once you have the DOM instance it's easy to generate LexicalNodes.
          const nodes = $generateNodesFromDOM(editor, dom);

          // Select the root
          $getRoot().select();

          // Insert them at a selection.
          $insertNodes(nodes);
        } catch (error) {
          console.log("Error parsing HTML:", error);
          return null;
        }
      }
      return null;
    },
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input"
                aria-placeholder={placeholder}
                placeholder={
                  <div className="editor-placeholder">{placeholder}</div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <AutoSavePlugin setTextoRichText={setTextoRichText} />
          {/* <TreeViewPlugin /> */}
        </div>
      </div>
    </LexicalComposer>
  );
}
