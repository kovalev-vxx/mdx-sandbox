'use client'

import React, { FC, useEffect, useState } from 'react'
import { IDirElement } from '@/types/globals'
import FileSystemService from '@/service/FileSystemService'
import { useQuery } from '@tanstack/react-query'
import FileList from '@/components/Explorer/FileList'
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
} from '@chakra-ui/accordion'
import { Box, Flex } from '@chakra-ui/layout'
import { FcFolder } from 'react-icons/fc'
import { Icon } from '@chakra-ui/icon'
import IconManager from '@/utils/IconManager'

type Props = {
    dirElement: IDirElement
    iconManager: IconManager
}

const FileListElement: FC<Props> = ({ dirElement, iconManager }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const { data, refetch, isLoading } = useQuery({
        queryFn: () => FileSystemService.getDir(dirElement.absolutePath),
        queryKey: ['files', dirElement.absolutePath],
        enabled: false,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (isOpen) {
            refetch()
        }
    }, [isOpen, refetch])

    if (dirElement.isFile) {
        return (
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                            <Flex alignItems="center" gap="2">
                                {iconManager.getIcon(dirElement)}
                                <p>{dirElement.base}</p>
                            </Flex>
                        </Box>
                    </AccordionButton>
                </h2>
            </AccordionItem>
        )
    }

    return (
        <AccordionItem>
            <h2>
                <AccordionButton onClick={() => setIsOpen(!isOpen)}>
                    <Box as="span" flex="1" textAlign="left">
                        <Flex alignItems="center" gap="2">
                            <AccordionIcon />
                            <Icon as={FcFolder} />
                            <p>{dirElement.base}</p>
                        </Flex>
                    </Box>
                </AccordionButton>
            </h2>
            <AccordionPanel pt={0} pb={0} pl={10} pr={0}>
                {data && isOpen && (
                    <FileList
                        iconManager={iconManager}
                        dirElements={data.data.content}
                    />
                )}
            </AccordionPanel>
        </AccordionItem>
    )
}

export default FileListElement
