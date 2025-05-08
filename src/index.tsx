// This line build correctly when using useEffect from WordPress rather than from React
// import { useRef, useEffect } from '@wordpress/element'

// This Link causes an error:
import { useRef, useEffect } from 'react'
/*
TypeError: Cannot read properties of null (reading 'useEffect')
    at r.useEffect (react.production.min.js:25:160)
    at fe (index.tsx:4:5)
    at ae (index.tsx:31:5)
    at ht (react-dom.min.js?ver=18.3.1.1:10:45677)
    at Qs (react-dom.min.js?ver=18.3.1.1:10:120133)
    at wl (react-dom.min.js?ver=18.3.1.1:10:88341)
    at bl (react-dom.min.js?ver=18.3.1.1:10:88269)
    at yl (react-dom.min.js?ver=18.3.1.1:10:88132)
    at il (react-dom.min.js?ver=18.3.1.1:10:84984)
    at fl (react-dom.min.js?ver=18.3.1.1:10:85364)
*/
import { registerBlockType } from '@wordpress/blocks'

export function useSetBlockIdEffect(clientId: string, setAttributes: Function) {
    useEffect(() => {
        setAttributes({ blockId: clientId })
    }, [clientId])
}

import {
    useBlockProps,
} from '@wordpress/block-editor'

export const meta = {
    name: "test/block",
    title: "TestBlock",
    icon: 'smiley',
    apiVersion: 3,
    supports: {
        color: {
            background: false,
            gradients: true,
            text: true,
        },
        typography: {
            fontSize: true,
            lineHeight: true,
        },
        shadow: true,
    },
    category: "layout",
}

export const edit = ({ clientId, attributes, setAttributes }: any) => {
    const { blockId } = attributes
    useSetBlockIdEffect(clientId, setAttributes)
    const containerRef = useRef<HTMLElement>(null)

    const blockProps = useBlockProps({
        className: `test-id-${ blockId }`,
        ref: containerRef,
    })

    return (<div { ...blockProps }>Edit</div>)
}

export const save = ({ attributes }: any) => {
    const { blockId } = attributes

    const blockProps = useBlockProps.save({
        className: `test-block-id-${ blockId }`,
    })

    return (<div { ...blockProps }>Edit</div>)
}

registerBlockType(meta.name, {
    title: meta.title,
    icon: meta.icon,
    supports: meta.supports,
    category: meta.category,
    attributes: {
        blockId: { type: "string", default: 'test' },
        layout: { type: 'string', default: 'content' },
        test: { type: 'string', default: 'test' },
    },
    edit,
    save,
})
