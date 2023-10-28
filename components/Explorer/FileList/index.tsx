'use client'

import React, { FC } from 'react'
import { IDirElement } from '@/types/globals'
import FileListElement from '../FileListElement'
import { Accordion } from '@chakra-ui/accordion'
import IconManager from '@/utils/IconManager'

type Props = {
    dirElements: IDirElement[]
    iconManager: IconManager
}
const FileList: FC<Props> = ({ dirElements, iconManager }) => {
    return (
        <Accordion allowToggle>
            {dirElements.map((e, index) => (
                <FileListElement
                    iconManager={iconManager}
                    key={index}
                    dirElement={e}
                />
            ))}
        </Accordion>
    )
}

export default FileList
