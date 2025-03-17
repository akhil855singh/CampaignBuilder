import React, { useState } from "react";
import { Box, Button, Flex, Heading, IconButton, Input } from "@chakra-ui/react";
import { CloseIcon, DragHandleIcon } from "@chakra-ui/icons";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ item, updateItem, removeItem }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Flex
            ref={ setNodeRef }
            style={ style }
            align="center"
            borderWidth="1px"
            borderColor="gray.300"
            borderRadius="md"
            overflow="hidden"
        >
            <IconButton
                icon={ <CloseIcon /> }
                colorScheme="red"
                onClick={ () => removeItem(item.id) }
                aria-label="Delete"
                borderRadius="none"
            />
            <Input
                placeholder="Label"
                value={ item.label }
                onChange={ (e) => updateItem(item.id, "label", e.target.value) }
                borderRadius="none"
                borderWidth="0px 1px 0px 0px"
                _focus={ { outline: "none", border: "none" } }
                textAlign="left"
                _placeholder={{ textAlign: "left" }}
            />
            <Input
                placeholder="Value"
                value={ item.value }
                onChange={ (e) => updateItem(item.id, "value", e.target.value) }
                borderRadius="none"
                borderWidth="0"
                _focus={ { outline: "none" } }
                textAlign="left"
                _placeholder={{ textAlign: "left" }}
            />
            <IconButton
                { ...attributes }
                { ...listeners }
                icon={ <DragHandleIcon /> }
                cursor="grab"
                aria-label="Drag"
                borderRadius="none"
            />
        </Flex>
    );
};

const WebhookEditor = () => {
    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const addItem = (setItems) => {
        setItems((prev) => [...prev, { id: Date.now().toString(), label: "", value: "" }]);
    };

    const updateItem = (setItems, id, field, value) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        );
    };

    const removeItem = (setItems, id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const onDragEnd = (setItems, event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setItems((prev) => {
                const oldIndex = prev.findIndex((item) => item.id === active.id);
                const newIndex = prev.findIndex((item) => item.id === over.id);
                const newArray = [...prev];
                const [movedItem] = newArray.splice(oldIndex, 1);
                newArray.splice(newIndex, 0, movedItem);
                return newArray;
            });
        }
    };

    return (
        <Box mt={ 4 } bg="white" maxW="full">
            {/* Headers Section */ }
            <Box mb={ 6 }>
                <Flex alignItems="center" gap={ 2 }>
                    <Heading size="sm" mb={ 2 }>Headers</Heading>
                    <Button textColor="white" colorScheme="yellow" size="sm" mb={ 2 } onClick={ () => addItem(setHeaders) }>Add a value</Button>
                </Flex>
                <DndContext sensors={ sensors } collisionDetection={ closestCenter } onDragEnd={ (e) => onDragEnd(setHeaders, e) }>
                    <SortableContext items={ headers } strategy={ verticalListSortingStrategy }>
                        { headers.map((item) => (
                            <SortableItem
                                key={ item.id }
                                item={ item }
                                updateItem={ (id, field, value) => updateItem(setHeaders, id, field, value) }
                                removeItem={ (id) => removeItem(setHeaders, id) }
                            />
                        )) }
                    </SortableContext>
                </DndContext>
            </Box>

            {/* Data Section */ }
            <Box>
                <Flex alignItems="center" gap={ 2 }>
                    <Heading size="sm" mb={ 2 }>Data</Heading>
                    <Button textColor="white" colorScheme="yellow" size="sm" mb={ 2 } onClick={ () => addItem(setData) }>Add a value</Button>
                </Flex>
                <DndContext sensors={ sensors } collisionDetection={ closestCenter } onDragEnd={ (e) => onDragEnd(setData, e) }>
                    <SortableContext items={ data } strategy={ verticalListSortingStrategy }>
                        { data.map((item) => (
                            <SortableItem
                                key={ item.id }
                                item={ item }
                                updateItem={ (id, field, value) => updateItem(setData, id, field, value) }
                                removeItem={ (id) => removeItem(setData, id) }
                            />
                        )) }
                    </SortableContext>
                </DndContext>
            </Box>
        </Box>
    );
};

export { WebhookEditor };
