import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Checkbox,
    Input,
    Select,
    VStack,
    HStack,
    Text,
    Box,
    Grid
} from '@chakra-ui/react';
import { ButtonActions } from '../ModalView';

interface Props {
    handleClick: (actions: ButtonActions) => void
}

const ActionsModalView = ({handleClick}: Props) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
            <Modal isOpen={ isOpen } onClose={ () => setIsOpen(false) } size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Do Not Contact</ModalHeader>
                    <ModalCloseButton onClick={() => [handleClick(ButtonActions.CANCEL), setIsOpen(false)]} />
                    <ModalBody>
                        <VStack spacing={ 4 } align="stretch">
                            <Input placeholder="Name" />

                            <Box>
                                <Text mb={ 2 }>Execute this event...</Text>
                                <HStack spacing={ 2 }>
                                    <Button>Immediately</Button>
                                    <Button>At a relative time period</Button>
                                    <Button>At a specific date/time</Button>
                                </HStack>
                                <HStack mt={ 2 } spacing={ 2 }>
                                    <Input type="number" placeholder="1" w="20" />
                                    <Select placeholder="Select period">
                                        <option value="days">Days</option>
                                        <option value="hours">Hours</option>
                                        <option value="minutes">Minutes</option>
                                    </Select>
                                </HStack>
                            </Box>

                            <HStack spacing={ 2 }>
                                <Input placeholder="Send from" />
                                <Text>or between the hours of</Text>
                                <Input placeholder="00:00" w="20" />
                                <Text>and</Text>
                                <Input placeholder="00:00" w="20" />
                            </HStack>

                            <Box>
                                <Text mb={ 2 }>Schedule only on the selected days of the week:</Text>
                                <Grid templateColumns="repeat(3, 1fr)" gap={ 2 }>
                                    { ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Weekdays'].map(day => (
                                        <Checkbox key={ day }>{ day }</Checkbox>
                                    )) }
                                </Grid>
                            </Box>

                            <Box>
                                <Text mb={ 2 }>Channels *</Text>
                                <Input placeholder="Choose one or more..." />
                            </Box>

                            <Box>
                                <Text mb={ 2 }>Reason</Text>
                                <Input placeholder="Reason" />
                            </Box>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={ 3 }>Add</Button>
                        <Button onClick={ () => [handleClick(ButtonActions.CANCEL), setIsOpen(false)] }>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export {
    ActionsModalView
}
