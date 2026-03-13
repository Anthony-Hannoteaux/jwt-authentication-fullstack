import { useState } from "react";

/**
 * Hook personnalisé permettant la gestion des variables d'états et des handlers des composants de formulaire
 * @param {Object} initialValues 
 * @returns {{
 *  values: Object,
 *  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
 * }}
 */

export default function useForm(initialValues) {
    const [values, setValues] = useState(initialValues)

    const handleChange = (e) => {
        const { name, value } = e.target
        // On passe en paramètre une fonction
        // Nous avons besoin de mettre à jour notre état en fonction des résultats précédents
        // @link https://fr.react.dev/reference/react/Component#setstate-parameters
        setValues((previousValues) => ({
            ...previousValues,
            [name]: value
        }))
    }

    return {
        values,
        handleChange
    }
}