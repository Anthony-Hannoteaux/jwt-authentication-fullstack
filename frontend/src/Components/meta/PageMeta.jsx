import { useEffect } from "react";

/**
 * Composant générique permettant de gérer les métadonnées des pages lors de leurs rendu
 * @param {string} title
 * @param {string} description 
 */
export default function PageMeta({ title, description }) {
    useEffect(() => {
        document.title = title

        let meta = document.querySelector("meta[name='description']")

        if (!meta) {
            meta = document.createElement("meta")
            meta.setAttribute("name", "description")
            document.head.appendChild(meta)
        }

        meta.setAttribute("content", description)
    }, [title, description])

    return null
}