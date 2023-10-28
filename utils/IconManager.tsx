import * as iconsLib from 'react-icons/bs'

import { IconType } from 'react-icons'
import { IDirElement } from '@/types/globals'
import { FcFolder } from 'react-icons/fc'
import { Icon } from '@chakra-ui/icon'
import React from 'react'
import { BsFile } from 'react-icons/bs'
import capitalize from '@/utils/capitalize'

const iconValues: IconType[] = Object.values(iconsLib)
const iconNames: string[] = Object.keys(iconsLib)

type IconsMap = Map<string, IconType>

class IconManager {
    private iconsMap: IconsMap = new Map()
    constructor() {
        iconValues.forEach((icon, index) => {
            const name = iconNames.at(index)
            if (name) {
                this.iconsMap.set(name, icon)
            }
        })
    }

    public getIcon(dirElement: IDirElement) {
        if (!dirElement.isFile) {
            return <Icon as={FcFolder} />
        }

        const iconName = 'BsFiletype' + capitalize(dirElement.ext.slice(1))

        try {
            const foundIcon = this.iconsMap.get(iconName)
            if (foundIcon) {
                return <Icon as={foundIcon} />
            } else {
                return <Icon as={BsFile} />
            }
        } catch (e) {
            return <Icon as={BsFile} />
        }
    }
}

export default IconManager
