'use client'
import React, { FC, useCallback, useMemo } from 'react'
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/modal'
import { useDisclosure } from '@chakra-ui/hooks'
import { Button } from '@chakra-ui/button'

interface Props {
    config: IConfig
}

const ConfigModal: FC<Props> = ({ config }) => {
    const isOpen = useMemo(() => !config.root.length, [config.root])

    return (
        <Modal
            isOpen={true}
            onClose={() => {
                return
            }}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Select the base directory</ModalHeader>
                <ModalBody>
                    {/*<Button onClick={selectDirectory} variant="solid">*/}
                    {/*    Select*/}
                    {/*</Button>*/}
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={() => {
                            return
                        }}
                    >
                        Close
                    </Button>
                    <Button variant="ghost">Secondary Action</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ConfigModal
