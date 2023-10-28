'use client'

import React, { FC, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import FileSystemService from '@/service/FileSystemService'
import FileList from '@/components/Explorer/FileList'
import { Box } from '@chakra-ui/layout'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from '@chakra-ui/breadcrumb'
import IconManager from '@/utils/IconManager'

const Explorer = () => {
    const [currentPath, setCurrentPath] = useState('')
    const iconManager = new IconManager()

    const { data, isLoading } = useQuery({
        queryFn: () => FileSystemService.getDir('.'),
        queryKey: ['files'],
    })

    return (
        <Box as="div" width="100%">
            {data && (
                <>
                    <Breadcrumb>
                        {data.data.path.split('/').map((e, index) => (
                            <BreadcrumbItem key={index}>
                                <BreadcrumbLink>{e}</BreadcrumbLink>
                            </BreadcrumbItem>
                        ))}
                    </Breadcrumb>
                    <FileList
                        iconManager={iconManager}
                        dirElements={data.data.content}
                    />
                </>
            )}
        </Box>
    )
}

export default Explorer
