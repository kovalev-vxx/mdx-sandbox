'use client'

import React from 'react'
import 'swagger-ui-react/swagger-ui.css'
import dynamic from 'next/dynamic'

type Props = {
    spec: Record<string, any>
}

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false })

export default function ReactSwagger({ spec }: Props) {
    return <SwaggerUI spec={spec} />
}
